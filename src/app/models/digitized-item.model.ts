import {ItemEvent} from "./item-event.model";
import {MaterialTypeEnum} from "../enums/material-type.enum";

export class DigitizedItem {
  id?: number;
  description?: string;
  type?: MaterialTypeEnum;
  status?: string;
  createdBy?: string;
  createdDate?: Date;
  priority?: number;
  extraInfo?: string;
  parentItemId?: number;
  nameId?: number;
  plineId?: number;
  language?: string;
  events?: ItemEvent[];
  childItems?: DigitizedItem[];
}
