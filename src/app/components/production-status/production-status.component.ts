import {Component} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {DigitizedItem} from "../../models/digitized-item.model";
import {ProductionService} from "../../services/production.service";
import {MatTooltipModule} from "@angular/material/tooltip";
import {forkJoin, tap} from "rxjs";
import {AsyncPipe, DatePipe} from "@angular/common";
import {ItemEvent} from "../../models/item-event.model";
import {MaterialTypeEnum} from "../../enums/material-type.enum";

@Component({
  selector: 'app-production-status',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    FormsModule,
    DatePipe,
    AsyncPipe
  ],
  templateUrl: './production-status.component.html',
  styleUrl: './production-status.component.scss'
})
export class ProductionStatusComponent {

  searchInputValue: string = '';
  displayResults = false;
  dataSource: MatTableDataSource<DigitizedItem> = new MatTableDataSource<DigitizedItem>([]);
  eventsDataSource: MatTableDataSource<ItemEvent> = new MatTableDataSource<ItemEvent>([]);
  selectedObject: DigitizedItem | undefined;
  notFoundIds: string[] = [];

  readonly eventColumns: string[] = [
    'type',
    'status',
    'statusText',
    'started',
    'startedBy',
    'completed',
    'completedBy'
  ];

  readonly displayedColumns: string[] = [
    'id',
    'description',
    'type',
    'status',
    'relationLink'
  ];

  constructor(
    private productionService: ProductionService
  ) {
  }

  setSelectedObject(item: DigitizedItem | undefined) {
    if (this.selectedObject === item) {
      this.selectedObject = undefined;
      this.eventsDataSource.data = [];
      return;
    }

    this.selectedObject = item;
    this.eventsDataSource.data = this.selectedObject?.events ?? [];
  }

  clear() {
    this.searchInputValue = '';
    this.dataSource.data = [];
    this.notFoundIds = [];
    this.displayResults = false;
    this.setSelectedObject(undefined);
  }

  search() {
    this.displayResults = false;
    this.dataSource.data = [];
    this.selectedObject = undefined;

    const descriptions = this.searchInputValue.split('\n').map(s => s.trim());
    const uniqueDescriptions = Array.from(new Set(descriptions));
    forkJoin(this.normalizeNames(uniqueDescriptions).filter(Boolean).map(description => {
      return this.productionService
        .searchByUrn(description)
        .pipe(tap(item => {
          if (!item) this.notFoundIds.push(description);
          else this.dataSource.data.push(item)
        }))
    }))
      .subscribe({
        next: () => {
          this.displayResults = true;
        },
        error: err => {
          console.error('Error while fetching data: ', err)
          this.displayResults = true;
        }
      })
  }

  // Helper method to allow searching for digibok without the digibok_ prefix
  normalizeNames(descriptions: string[]): string[] {
    const regex = /^(19|20)\d\d(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])\d{5}$/;
    return descriptions.map(description => {
      if (regex.test(description)) {
        return 'digibok_' + description;
      }
      return description;
    });
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

  isSupportedMaterialType(type: MaterialTypeEnum): boolean {
    return type === MaterialTypeEnum.Book ||
      type === MaterialTypeEnum.PeriodicalBundle ||
      type === MaterialTypeEnum.Periodical;
  }

  isDigitizedPeriodical(item: DigitizedItem): boolean {
    return (item.type === MaterialTypeEnum.PeriodicalBundle || item.type === MaterialTypeEnum.Periodical) &&
      (item.plineId === 26 || item.plineId === 27 || item.plineId === 28 || item.plineId === 37);
  }

}
