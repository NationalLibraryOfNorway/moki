import {Component, Input} from '@angular/core';
import {DigitizedItem} from "../../models/digitized-item.model";
import {MatAnchor} from "@angular/material/button";
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {ProductionDetailsComponent} from "../production-details/production-details.component";
import {ProductionService} from "../../services/production.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-child-item',
  standalone: true,
  imports: [
    MatAnchor,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIcon,
    MatTooltip,
    ProductionDetailsComponent
  ],
  templateUrl: './child-item.component.html',
  styleUrl: './child-item.component.scss'
})
export class ChildItemComponent {
  @Input() child: DigitizedItem;

  readonly relationUrl = `${environment.relationUrl}/periodicals/issue`;

  constructor(
    private productionService: ProductionService
  ) { }

  isSupportedMaterialType(): boolean {
    if (!this.child || !this.child.plineId) {
      return false;
    }
    return this.productionService.isSupportedMaterialType(this.child.plineId);
  }

  itemIsFinished(): boolean {
    return this.productionService.itemIsFinished(this.child);
  }
}
