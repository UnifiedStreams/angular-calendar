import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MonthViewDay, CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-month-cell',
  template: `
    <div class="cal-cell-top">
      <span class="cal-day-badge" *ngIf="day.badgeTotal > 0">{{ day.badgeTotal }}</span>
      <span class="cal-day-number">{{ day.date | calendarDate:'monthViewDayNumber':locale }}</span>
    </div>
    <div class="cal-events">
      <div
        class="cal-event"
        *ngFor="let event of ((day.events.length <= 3)?day.events:day.events.slice(0,2))"
        [style.backgroundColor]="event.color.primary"
        [ngClass]="event?.cssClass"
        (mouseenter)="highlightDay.emit({event: event})"
        (mouseleave)="unhighlightDay.emit({event: event})"
        mwlDraggable
        [dropData]="{event: event}"
        [dragAxis]="{x: event.draggable, y: event.draggable}"
        (click)="$event.stopPropagation(); eventClicked.emit({event: event})">
        {{(event.title.length>20)?event.title.substring(0,20) + '...' : event.title}}
      </div>
     <div class="cal-event" style="background-color:transparent; color:rgba(0,0,0,.54);" *ngIf="day.events.length > 3">{{day.events.length - 2 + ' More'}}</div>
    </div>
  `,
  host: {
    '[class]': '"cal-cell cal-day-cell " + day?.cssClass',
    '[class.cal-past]': 'day.isPast',
    '[class.cal-today]': 'day.isToday',
    '[class.cal-future]': 'day.isFuture',
    '[class.cal-weekend]': 'day.isWeekend',
    '[class.cal-in-month]': 'day.inMonth',
    '[class.cal-out-month]': '!day.inMonth',
    '[class.cal-has-events]': 'day.events.length > 0',
    '[class.cal-open]': 'day === openDay',
    '[style.backgroundColor]': 'day.backgroundColor'
  }
})
export class CalendarMonthCellComponent {

  @Input() day: MonthViewDay;

  @Input() openDay: MonthViewDay;

  @Input() locale: string;

  @Input() tooltipPlacement: string;

  @Output() highlightDay: EventEmitter<any> = new EventEmitter();

  @Output() unhighlightDay: EventEmitter<any> = new EventEmitter();

  @Output() eventClicked: EventEmitter<{event: CalendarEvent}> = new EventEmitter<{event: CalendarEvent}>();

}