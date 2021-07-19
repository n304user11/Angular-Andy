import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MemberSearchComponent } from './member-search/member-search.component';
import { MenuComponent } from './menu/menu.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  { path: 'member-search', component: MemberSearchComponent },
  { path: 'search-result', component: SearchResultComponent },
  { path: 'menu', component: MenuComponent },
  { path: '**', component: MenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
