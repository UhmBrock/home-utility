
type CalendarId = string;
type EventId = string;

interface IEvent {
  id: EventId;
  title: string;
  description?: string;
  start: Date;
  end: Date;
}

interface ICalendar {
  id: CalendarId;
  title: string;
}

interface ICalendarClient {
  createEvent(event: IEvent): Promise<IEvent>;
  updateEvent(event: IEvent): Promise<IEvent>;
  deleteEvent(eventId: EventId | IEvent): Promise<void>;
  getEvents(): Promise<IEvent[]>;
  getEvent(eventId: EventId | IEvent): Promise<IEvent>;
  getCalendars(): Promise<ICalendar[]>;
  getCalendar(calendarId: CalendarId | ICalendar): Promise<ICalendar>;
  createCalendar(calendar: ICalendar): Promise<ICalendar>;
  updateCalendar(calendarId: CalendarId | ICalendar, calendar: ICalendar): Promise<ICalendar>;
  deleteCalendar(calendarId: CalendarId | ICalendar): Promise<void>;
}
