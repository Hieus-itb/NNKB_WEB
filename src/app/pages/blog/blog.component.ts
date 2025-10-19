import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SchemaActionService } from '../../service/schema-action.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  blogs: any[] = [];
  latestNews: any[] = [];
  archives: { monthName: string; monthIndex: number; year: number; blogs: any[] }[] = [];
  selectedArchive: { monthName: string; monthIndex: number; year: number; blogs: any[] } | null = null;

  pageIndex = 1;     // mặc định trang 1
  pageSize = 3;      // số bài mỗi trang
  totalPages = 0;    // số trang tính được

  constructor(
    private schemaService: SchemaActionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // lắng nghe query params
    this.route.queryParamMap.subscribe(params => {
      const month = Number(params.get('month'));
      const year = Number(params.get('year'));
      const page = Number(params.get('page')) || 1;

      this.pageIndex = page;

      if (month && year) {
        this.loadBlogs(month, year);
      } else {
        this.loadBlogs();
      }
    });

    // load latest news
    this.schemaService.getLatestNews(3).subscribe({
      next: news => (this.latestNews = news),
      error: err => console.error('Lỗi khi load latest news:', err)
    });

    // load archives
    this.schemaService.getArchives().subscribe({
      next: archives => (this.archives = archives),
      error: err => console.error('Lỗi khi load archives:', err)
    });

    // lắng nghe selected archive
    this.schemaService.selectedArchive$.subscribe(archive => {
      this.selectedArchive = archive;
    });
  }

  loadBlogs(month?: number, year?: number): void {
    let start: number | undefined;
    let end: number | undefined;

    if (month && year) {
      start = new Date(year, month - 1, 1).getTime();
      end = new Date(year, month, 0, 23, 59, 59).getTime();
    }

    this.schemaService.searchNews(this.pageIndex, this.pageSize, start, end).subscribe({
      next: res => {
        const blogs = res?.PHHAPI?.body || [];
        this.blogs = blogs;

        // 🔹 Tự tính totalPages
        if (blogs.length < this.pageSize) {
          // Nếu số bài ít hơn pageSize => đây là trang cuối
          this.totalPages = this.pageIndex;
        } else {
          // Giả định vẫn còn trang sau
          this.totalPages = this.pageIndex + 1;
        }
      },
      error: err => console.error('Lỗi khi lấy blogs:', err)
    });
  }

  goToPage(page: number) {
    if (page < 1) return;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }

  // trả về mảng số trang
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  selectArchive(archive: { monthName: string; monthIndex: number; year: number; blogs: any[] }) {
    this.schemaService.selectArchive(archive);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { month: archive.monthIndex, year: archive.year, page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  clearArchive() {
    this.schemaService.clearArchive();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { month: null, year: null, page: 1 },
      queryParamsHandling: 'merge'
    });
  }
}

