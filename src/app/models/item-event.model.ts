export class ItemEvent {
  diId?: number;
  eventId?: number;
  type?: string;
  status?: string;
  statusText?: string;
  started?: Date;
  startedBy?: string;
  completed?: Date;
  completedBy?: string;
  eventConfiguration?: string;
  stepId?: number;
}
