import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchemaActionService {
  private apiUrl = 'https://gw-dl.dlcorp.com.vn/config/schemaactionpublic/search';
  private selectedArchiveSource = new BehaviorSubject<{ monthName: string; monthIndex: number; year: number; blogs: any[] } | null>(null);
  selectedArchive$ = this.selectedArchiveSource.asObservable();

  constructor(private http: HttpClient) { }


  // blog & blog detail
  searchNews(pageIndex?: number, pageSize?: number, start?: number, end?: number): Observable<any> {
    const param: any = {
      isactive: true,
      type: 'news'
    };

    if (start && end) {
      param.longtime = { $gt: start, $lt: end };
    }

    const payload = {
      code: 'news',
      param,
      sort: { longtime: -1 },
      pagesize: pageSize,
      pageindex: pageIndex
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, payload, { headers });
  }

  getBlogBySlug(slug: string): Observable<any> {
    const payload = {
      code: 'news',
      param: { isactive: true, type: 'news', slug },
      pagesize: 1,
      pageindex: 1
    };
    return this.http.post<any>(this.apiUrl, payload);
  }

  buildArchives(blogs: any[]): { monthName: string; monthIndex: number; year: number; blogs: any[] }[] {
    const grouped: { [key: string]: any[] } = {};

    blogs.forEach(b => {
      const date = new Date(b.longtime);
      const monthIndex = date.getMonth() + 1;
      const monthName = date.toLocaleString('en-US', { month: 'long' });
      const year = date.getFullYear();
      const key = `${monthIndex}-${year}`;

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(b);
    });

    return Object.keys(grouped)
      .map(key => {
        const [monthIndex, year] = key.split('-').map(Number);
        const monthName = new Date(year, monthIndex - 1).toLocaleString('en-US', { month: 'long' });
        return {
          monthName,
          monthIndex,
          year,
          blogs: grouped[key]
        };
      })
      .sort((a, b) => {
        const timeA = a.blogs[0].longtime;
        const timeB = b.blogs[0].longtime;
        return timeB - timeA;
      });
  }

  getLatestNews(limit: number = 3): Observable<any[]> {
    return this.searchNews(1, limit).pipe(
      map(res => res?.PHHAPI?.body || [])
    );
  }

  getArchives(): Observable<{ monthName: string; monthIndex: number; year: number; blogs: any[] }[]> {
    return this.searchNews(1, 200).pipe(
      map(res => {
        const blogs = res?.PHHAPI?.body || [];
        return this.buildArchives(blogs);
      })
    );
  }

  selectArchive(archive: { monthName: string; monthIndex: number; year: number; blogs: any[] }) {
    this.selectedArchiveSource.next(archive);
  }

  clearArchive() {
    this.selectedArchiveSource.next(null);
  }



  // event & event detail
  searchEvent(pageIndex: number = 1, pageSize: number = 6, start?: number, end?: number): Observable<any> {
    const param: any = {
      isactive: true,
      buildingid: ''
    };
    if (start && end) {
      param.begintime = { $gt: start };
      param.endtime = { $lt: end };
    }
    const payload = {
      param,
      code: 'event',
      sort: { begintime: -1 },
      pagesize: pageSize,
      pageindex: pageIndex
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, payload, { headers });
  }

  getEventBySlug(slug: string): Observable<any> {
  const payload = {
    code: 'event',
    param: { isactive: true, slug },
    pagesize: 1,
    pageindex: 1
  };

  return this.http.post<any>(this.apiUrl, payload).pipe(
    map(res => res?.PHHAPI?.body?.[0] || null)
  );
}
}
