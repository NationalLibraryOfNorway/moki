import {DigitizedItem} from "../models/digitized-item.model";
import {DateBuilder} from "./date.builder";
import {MaterialTypeEnum} from "../enums/material-type.enum";

export class DigitizedItemBuilder {
  constructor(private data: DigitizedItem) {}

  public build(): DigitizedItem {
    const res = new DigitizedItem();
    res.id = this.data.id;
    res.description = this.data.description;
    res.type = this.toMaterialType(this.data.type ?? '');
    res.status = this.data.status;
    res.createdBy = this.data.createdBy;
    res.createdDate = new DateBuilder(this.data.createdDate?.toString()).build() ?? undefined;
    res.priority = this.data.priority;
    res.extraInfo = this.data.extraInfo;
    res.parentItemId = this.data.parentItemId;
    res.nameId = this.data.nameId;
    res.plineId = this.data.plineId;
    res.language = this.data.language;
    res.events = [];
    return res;
  }


  private toMaterialType(type: string): MaterialTypeEnum {
    switch (type.toLowerCase()) {
      case 'avis':
        return MaterialTypeEnum.Newspaper;
      case 'perm_aviser':
        return MaterialTypeEnum.NewspaperBundle;
      case 'periodika':
        return MaterialTypeEnum.Periodical;
      case 'perm_periodika':
        return MaterialTypeEnum.PeriodicalBundle;
      case 'manuskript':
        return MaterialTypeEnum.Manuscript;
      case 'bok':
        return MaterialTypeEnum.Book;
      default:
        return MaterialTypeEnum.Other;
    }
  }
}
