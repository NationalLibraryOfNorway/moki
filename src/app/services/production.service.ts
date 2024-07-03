import {Injectable} from '@angular/core';
import {DigitizedItem} from "../models/digitized-item.model";
import {catchError, map, mergeMap, Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DigitizedItemBuilder} from "../builders/digitized-item.builder";
import {ItemEvent} from "../models/item-event.model";
import {ItemEventBuilder} from "../builders/item-event.builder";
import {MaterialTypeEnum} from "../enums/material-type.enum";

@Injectable({
  providedIn: 'root',

})
export class ProductionService {

  constructor(
    private http: HttpClient
  ) { }

  searchByUrn(searchQuery: string): Observable<DigitizedItem | undefined> {
    return this.http.get<DigitizedItem>(`/papi/proddb/${searchQuery}`).pipe(
      map(item => new DigitizedItemBuilder(item).build()),
      mergeMap(item => {
        if (item.id && (item.type === MaterialTypeEnum.NewspaperBundle || item.type === MaterialTypeEnum.PeriodicalBundle)) {
          return this.getRelatedItems(item.id).pipe(
            map(relatedItems => {
              item.childItems = relatedItems;
              return item;
            }),
            catchError(err => {
              console.error(`Error fetching related items for ${item.id}:`, err);
              return of(item);
            })
          );
        }
        return of(item);
      }),
      mergeMap(item => {
        return this.getEventsById(item.id?.toString()!!).pipe(
          map(events => {
            item.events = events;
            return item;
          }),
          catchError(err => {
            console.error(`Error fetching events for ${item.id}:`, err);
            return of(item);
          })
        );
      }),
      catchError(err => {
        console.error(`Error fetching item ${searchQuery}:`, err);
        return of(undefined);
      })
    );
  }

  private getEventsById(id: string): Observable<ItemEvent[]> {
    return this.http.get<ItemEvent[]>(`/papi/proddb/${id}/events`).pipe(
      map(items => items.map(item => new ItemEventBuilder(item).build())),
      // TODO: Change sort to follow actual step order
      map(items => items.sort((a, b) => {
        if (a.stepId === undefined || b.stepId === undefined) return 0;
        return a.stepId - b.stepId;
      }))
    );
  }

  private getRelatedItems(id: number): Observable<DigitizedItem[]> {
    return this.http.get<DigitizedItem[]>(`/papi/proddb/${id}/children`).pipe(
      map(items => items.map(item => new DigitizedItemBuilder(item).build()))
    );
  }

}
