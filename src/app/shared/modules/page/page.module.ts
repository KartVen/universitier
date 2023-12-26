import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { HomeComponent } from '../../../home/home.component';
import { DashboardComponent } from '../../../content/dashboard/dashboard.component';
import { ProfileComponent } from '../../../content/profile/profile.component';
import { SettingsComponent } from '../../../content/settings/settings.component';
import { CardComponent } from '../../components/card/card.component';

@NgModule({
  declarations: [
    PageComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    SidebarComponent,
    MatToolbarModule,
    ToolbarComponent,
    CardComponent,
  ],
})
export class PageModule {}
