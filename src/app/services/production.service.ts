import {Injectable} from '@angular/core';
import {DigitizedItem} from "../models/digitized-item.model";
import {catchError, map, mergeMap, Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DigitizedItemBuilder} from "../builders/digitized-item.builder";
import {ItemEvent} from "../models/item-event.model";
import {ItemEventBuilder} from "../builders/item-event.builder";
import {MaterialTypeEnum} from "../enums/material-type.enum";
import {environment} from "../../environments/environment";
import {ItemIdentifier} from "../models/item-identifier.model";

@Injectable({
  providedIn: 'root',

})
export class ProductionService {

  private baseUrl = `${environment.baseHref}/api`

  constructor(
    private http: HttpClient
  ) { }

  searchItem(searchQuery: string): Observable<DigitizedItem | undefined> {
    let httpQuery: Observable<DigitizedItem>;

    if (this.isValidBarcode(searchQuery)) {
      httpQuery = this.http.get<DigitizedItem[]>(`${this.baseUrl}/proddb/barcode/${searchQuery}`).pipe(
        mergeMap(items => items.map(item => new DigitizedItemBuilder(item).build()))
      )
    } else {
      httpQuery = this.http.get<DigitizedItem>(`${this.baseUrl}/proddb/${searchQuery}`).pipe(
        map(item => new DigitizedItemBuilder(item).build())
      );
    }

    return httpQuery.pipe(
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
        if (!item.id) {
          return of(item);
        }
        return this.getEventsById(item.id).pipe(
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
      mergeMap(item => {
        if (!item.id) {
          return of(item);
        }
        return this.getIdentifiersById(item.id).pipe(
          map(identifiers => {
            item.identifiers = identifiers;
            return item;
          }),
          catchError(err => {
            console.error(`Error fetching identifiers for ${item.id}:`, err);
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

  getEventsById(id: number): Observable<ItemEvent[]> {
    return this.http.get<ItemEvent[]>(`${this.baseUrl}/proddb/${id}/events`).pipe(
      map(items => items.map(item => new ItemEventBuilder(item).build())),
      // TODO: Change sort to follow actual step order
      map(items => items.sort((a, b) => {
        if (a.stepId === undefined || b.stepId === undefined) return 0;
        return a.stepId - b.stepId;
      }))
    );
  }

  getRelatedItems(id: number): Observable<DigitizedItem[]> {
    return this.http.get<DigitizedItem[]>(`${this.baseUrl}/proddb/${id}/children`).pipe(
      map(items => items.map(item => new DigitizedItemBuilder(item).build()))
    );
  }

  getIdentifiersById(id: number): Observable<ItemIdentifier[]> {
    return this.http.get<ItemIdentifier[]>(`${this.baseUrl}/proddb/${id}/identifiers`);
  }

  isSupportedMaterialType(productionLineId: number): boolean {
    return this.isDigitizedPeriodical(productionLineId) ||
      productionLineId === 16 ||  // Bøker - Ordinær bokløype
      productionLineId === 24 ||  // Bøker - Komplett fra POS
      productionLineId === 30 ||  // Bøker - Ordinær bokløype v2
      productionLineId === 32 ||  // Bøker - Komplett fra POS v2
      productionLineId === 39;    // Bøker - DFB Cover
  }

  isDigitizedPeriodical(productionLineId: number): boolean {
    return productionLineId === 26 || // Demonteringsskanning v2 (Flere hefter)
      productionLineId === 27 ||      // POS og V-form skanning v2 (1) (Return m/omslag)
      productionLineId === 28 ||      // POS og demonteringsskanning v2 (Kassering m/omslag)
      productionLineId === 37;        // Tidsskrift - Komplett (Enkelthefte)
  }

  itemIsFinished(item: DigitizedItem): boolean {
    switch (item.type) {
      case MaterialTypeEnum.Book:
        return item.status === 'moveToPreservation.done' || item.status === 'AddToSearchIndex.done';
      case MaterialTypeEnum.Periodical:
        return item.status === 'moveToPreservation.done' || item.status === 'AddToSearchIndex.done';
      case MaterialTypeEnum.PeriodicalBundle:
        // If parent does not have split periodika as final status, return false
        if (item.status !== 'SplitPeriodika.done') {
          return false;
        }
        // If any child item does not have moveToPreservation.done or AddToSearchIndex.done, return false
        return item.childItems?.every(childItem => {
          return childItem.status === 'moveToPreservation.done' || childItem.status === 'AddToSearchIndex.done';
        }) ?? false;
      default:
        return false;
    }
  }

  private isValidBarcode(barcode: string): boolean {
    const barcodeVariant1 = new RegExp('^\\d{2}[a-zA-Z]{1,2}\\d{5}$');
    const barcodeVariant2 = new RegExp('^\\d{2}[a-zA-Z]\\d{6}$');
    const barcodeVariant3 = new RegExp('^h\\d{2}[a-zA-Z]\\d{5}$|^h\\d{8}$')
    return barcodeVariant1.test(barcode) || barcodeVariant2.test(barcode) || barcodeVariant3.test(barcode);
  }
}
