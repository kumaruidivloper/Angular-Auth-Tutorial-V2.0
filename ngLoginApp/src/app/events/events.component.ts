import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events = [];
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents()
    .subscribe(
      res => this.events = res,
      err => console.log(err),
    );
  }

}
