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
import {forkJoin, map, mergeMap, tap} from "rxjs";
import {DatePipe} from "@angular/common";
import {ItemEvent} from "../../models/item-event.model";

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
    DatePipe
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
    'status'
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
    this.displayResults = false;
    this.setSelectedObject(undefined);
  }

  search() {
    this.displayResults = false;
    this.dataSource.data = [];
    this.selectedObject = undefined;

    const descriptions = this.searchInputValue.split('\n').map(s => s.trim());
    const uniqueDescriptions = Array.from(new Set(descriptions));
    forkJoin(uniqueDescriptions.filter(Boolean).map(description => {
      return this.productionService
        .searchByUrn(description)
        .pipe(
          mergeMap(item => {
            return this.productionService.getEventsById(item.id?.toString()!!).pipe(
              map(events => {
                item.events = events;
                return item;
              })
            )
          }),
          tap(item => this.dataSource.data.push(item))
        )
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

  itemIsFinished(status: string, type: string): boolean {
    if (type.toLowerCase() === 'bok') {
      return status === 'moveToPreservation.done' || status === 'AddToSearchIndex.done';
    }

    if (type.toLowerCase().endsWith('periodika')) {
      // TODO: Placeholder, will need to check if each child item has moveToPreservation.done or AddToSearchIndex.done
      //  AND that the parent item has an equivalent status
      return false;
    }

    return status === 'moveToPreservation.done' || status === 'AddToSearchIndex.done';
  }
}
