import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SchemaActionService } from '../../service/schema-action.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent implements OnInit {
  event: any = null;

  constructor(
    private route: ActivatedRoute,
    private schemaService: SchemaActionService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.schemaService.getEventBySlug(slug).subscribe({
          next: eventItem => this.event = eventItem,
          error: err => console.error('Lỗi khi load event detail:', err)
        });
      }
    });
  }
}

