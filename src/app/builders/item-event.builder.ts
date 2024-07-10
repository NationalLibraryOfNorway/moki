import { ItemEvent } from '../models/item-event.model';
import {DateBuilder} from "./date.builder";

export class ItemEventBuilder {
  constructor(private data?: ItemEvent) {
  }

  public build(): ItemEvent {
    const res = new ItemEvent();
    res.diId = this.data?.diId;
    res.eventId = this.data?.eventId;
    res.type = this.data?.type;
    res.status = this.data?.status;
    res.statusText = this.data?.statusText;
    res.started = new DateBuilder(this.data?.started?.toString()).build() ?? undefined;
    res.startedBy = this.data?.startedBy;
    res.completed = new DateBuilder(this.data?.completed?.toString()).build() ?? undefined;
    res.completedBy = this.data?.completedBy;
    res.eventConfiguration = this.data?.eventConfiguration;
    res.stepId = this.data?.stepId;

    return res;
  }


}
