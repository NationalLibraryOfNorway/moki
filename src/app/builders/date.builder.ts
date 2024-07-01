export class DateBuilder {
  constructor(private data?: string) {}

  public build(): Date | undefined {
    const timezoneRegex = new RegExp('(?:Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])$');
    return this.data != null ? new Date(this.data.replace(timezoneRegex, '+00:00')) : undefined;
  }
}
