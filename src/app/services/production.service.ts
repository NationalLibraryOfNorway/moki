import {Injectable} from '@angular/core';
import {DigitizedItem} from "../models/digitized-item.model";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DigitizedItemBuilder} from "../builders/digitized-item.builder";
import {ItemEvent} from "../models/item-event.model";
import {ItemEventBuilder} from "../builders/item-event.builder";

@Injectable({
  providedIn: 'root',

})
export class ProductionService {

  constructor(
    private http: HttpClient
  ) { }

  searchByUrn(searchQuery: string): Observable<DigitizedItem> {
    return this.http.get<DigitizedItem>(`/papi/item/${searchQuery}`).pipe(
      map(item => new DigitizedItemBuilder(item).build())
    );
  }

  getEventsById(id: string): Observable<ItemEvent[]> {
    return this.http.get<ItemEvent[]>(`/papi/item/${id}/events`).pipe(
      map(items => items.map(item => new ItemEventBuilder(item).build())),
      map(items => items.sort((a, b) => {
        if (a.stepId === undefined || b.stepId === undefined) return 0;
        return a.stepId - b.stepId;
      }))
    );
  }

  // getRelatedItems(id: string): Observable<DigitizedItem[]> {
  //   return this.http.get<DigitizedItem[]>(`/papi/item/${id}`).pipe(
  //     map(items => items.map(item => new DigitizedItemBuilder(item).build()))
  //   );
  // }

}
