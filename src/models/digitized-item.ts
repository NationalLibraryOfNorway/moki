import {ItemIdentifier} from "@/models/item-identifier.ts";
import {ItemEvent} from "@/models/item-event.ts";
import {MaterialType} from "@/enums/material-type.ts";

export class DigitizedItem {
  id?: number;
  description?: string;
  searchId?: string;
  type?: MaterialType;
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
  identifiers?: ItemIdentifier[];
}
