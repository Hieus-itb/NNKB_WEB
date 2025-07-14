import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
    { path: 'event', component: EventListComponent },
{ path: 'event-detail', component: EventDetailComponent },
  { path: '**', redirectTo: '' } // fallback to home



];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }