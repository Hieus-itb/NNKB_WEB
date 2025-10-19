import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemaActionService } from '../../service/schema-action.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events: any[] = [];

  constructor(private schemaService: SchemaActionService) {}

  ngOnInit(): void {
    this.loadEvent();
  }

  loadEvent(): void {
    this.schemaService.searchEvent(1, 6).subscribe({
      next: res => {
        this.events = res?.PHHAPI?.body || [];
        console.log('Events loaded:', this.events);
      },
      error: err => {
        console.error('Lỗi khi lấy events:', err);
      }
    });
  }
}

