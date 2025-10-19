import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SchemaActionService } from '../../service/schema-action.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {
  blog: any;

  // latest news
  latestNews: any[] = [];

  // archives
  archives: { monthName: string; monthIndex: number; year: number; blogs: any[] }[] = [];
  selectedArchive: { monthName: string; monthIndex: number; year: number; blogs: any[] } | null = null;

  constructor(
    private route: ActivatedRoute,
    public schemaService: SchemaActionService
  ) { }

  ngOnInit(): void {
    // load chi tiết blog
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadBlogDetail(slug);
      }
    });

    // latest news
    this.schemaService.getLatestNews(3).subscribe({
      next: news => (this.latestNews = news),
      error: err => console.error('Lỗi khi load latest news:', err)
    });

    // archives
    this.schemaService.getArchives().subscribe({
      next: archives => (this.archives = archives),
      error: err => console.error('Lỗi khi load archives:', err)
    });

    // selected archive
    this.schemaService.selectedArchive$.subscribe(archive => {
      this.selectedArchive = archive;
    });
  }

  loadBlogDetail(slug: string): void {
    this.schemaService.getBlogBySlug(slug).subscribe({
      next: res => {
        this.blog = res?.PHHAPI?.body?.[0] || null;
      },
      error: err => console.error('Lỗi khi load chi tiết:', err)
    });
  }
}
