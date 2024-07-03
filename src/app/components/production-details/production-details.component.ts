import {Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {DigitizedItem} from "../../models/digitized-item.model";
import {ItemEvent} from "../../models/item-event.model";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-production-details',
  standalone: true,
  imports: [
    DatePipe,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatRow,
    MatRowDef,
    MatTable,
    MatTooltip,
    MatHeaderCellDef
  ],
  templateUrl: './production-details.component.html',
  styleUrl: './production-details.component.scss'
})
export class ProductionDetailsComponent {
  @Input() selectedObject: DigitizedItem;
  @Input() eventsDataSource: MatTableDataSource<ItemEvent> = new MatTableDataSource<ItemEvent>([]);
  readonly eventColumns: string[] = [
    'type',
    'status',
    'statusText',
    'started',
    'startedBy',
    'completed',
    'completedBy'
  ];
}
