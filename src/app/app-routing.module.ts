import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './shared/modules/page/page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { ProfileComponent } from './content/profile/profile.component';
import { SettingsComponent } from './content/settings/settings.component';
import { MenuGroup } from './shared/components/sidebar/sidebar.component';
import { PeopleComponent } from './content/people/people.component';
import { UniversityComponent } from './content/university/university.component';

const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: PageComponent,
    children: [{ path: '', component: HomeComponent }],
    title: 'Strona główna',
  },
  { path: 'login', component: LoginComponent, title: 'Logowanie' },
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
      },
      {
        path: 'university',
        component: UniversityComponent,
        title: 'Zarządzanie uczelnią',
      },
      {
        path: 'people',
        component: PeopleComponent,
        title: 'Zarządzanie ludźmi',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profil',
      },
      { path: 'settings', component: SettingsComponent, title: 'Ustawienia' },
    ],
  },
  { path: '**', redirectTo: '/home' },
];

export const SIDEBAR_MENUS: MenuGroup[] = [
  {
    menus: [{ name: 'Dashboard', icon: 'dashboard', router: '/dashboard' }],
  },
  {
    menus: [
      {
        name: 'Harmonogramy',
        icon: 'event',
        router: '/agendas',
      },
    ],
  },
  {
    name: 'Student',
    menus: [
      {
        name: 'Oceny',
        icon: 'grade',
        router: '/grades',
      },
    ],
  },
  {
    name: 'Administracja',
    menus: [
      {
        name: 'Zarządzanie uczelnią',
        icon: 'school',
        router: '/university',
      },
      {
        name: 'Zarządzanie ludźmi',
        icon: 'people',
        router: '/people',
      },
    ],
  },
  {
    name: 'Profil',
    menus: [
      { name: 'Profil', icon: 'person', router: '/profile' },
      { name: 'Ustawienia', icon: 'settings', router: '/settings' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
