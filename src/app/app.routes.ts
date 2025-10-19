import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
// import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
    { path: 'event', component: EventListComponent, },
{ path: 'event-detail/:slug', component: EventDetailComponent, },
{ path: 'blog' , component: BlogComponent},
{ path: 'blog-detail/:slug', component: BlogDetailComponent},
{ path: 'my-account', component: MyAccountComponent},
  { path: '**', redirectTo: '' } // fallback to home



];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }