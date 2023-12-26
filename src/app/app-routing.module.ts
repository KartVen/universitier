import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './shared/modules/page/page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { ProfileComponent } from './content/profile/profile.component';
import { SettingsComponent } from './content/settings/settings.component';
import { AuthGuard } from './_utils/guards/auth.guard';
import { PeopleComponent } from './content/admin/people/people.component';
import { UniversityComponent } from './content/admin/university/university.component';
import { StaffAddEditComponent } from './content/admin/people/staffs/crud/staff-add-edit/staff-add-edit.component';
import { StaffViewComponent } from './content/admin/people/staffs/crud/staff-view/staff-view.component';
import { StudentAddEditComponent } from './content/admin/people/students/crud/student-add-edit/student-add-edit.component';
import { StudentViewComponent } from './content/admin/people/students/crud/student-view/student-view.component';
import { AcademicYearAddEditComponent } from './content/admin/university/academic-years/crud/academic-year-add-edit/academic-year-add-edit.component';
import { AcademicYearViewComponent } from './content/admin/university/academic-years/crud/academic-year-view/academic-year-view.component';
import { FacultyAddEditComponent } from './content/admin/university/faculties/crud/faculty-add-edit/faculty-add-edit.component';
import { FacultyViewComponent } from './content/admin/university/faculties/crud/faculty-view/faculty-view.component';
import { CourseViewComponent } from './content/admin/university/courses/crud/course-view/course-view.component';
import { CourseAddEditComponent } from './content/admin/university/courses/crud/course-add-edit/course-add-edit.component';

export const BASE_API_URL = 'http://localhost:8080';

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
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
      },
      {
        path: 'university',
        children: [
          {
            path: '',
            component: UniversityComponent,
            title: 'Programy nauczania',
          },
          { path: 'faculty-add', component: FacultyAddEditComponent },
          {
            path: 'faculties',
            children: [
              {
                path: ':id',
                children: [
                  { path: '', component: FacultyViewComponent },
                  { path: 'edit', component: FacultyAddEditComponent },
                ],
              },
            ],
          },
          { path: 'academic-year-add', component: AcademicYearAddEditComponent },
          {
            path: 'academic-years',
            children: [
              {
                path: ':id',
                children: [
                  { path: '', component: AcademicYearViewComponent },
                  { path: 'edit', component: AcademicYearAddEditComponent },
                ],
              },
            ],
          },
          { path: 'course-add', component: CourseAddEditComponent },
          {
            path: 'courses',
            children: [
              {
                path: ':id',
                children: [
                  { path: '', component: CourseViewComponent },
                  { path: 'edit', component: CourseAddEditComponent },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'people',
        children: [
          { path: '', component: PeopleComponent, title: 'Pracownicy i studenci' },
          { path: 'staff-add', component: StaffAddEditComponent },
          {
            path: 'staffs',
            children: [
              {
                path: ':id',
                children: [
                  { path: '', component: StaffViewComponent },
                  { path: 'edit', component: StaffAddEditComponent },
                ],
              },
            ],
          },
          { path: 'student-add', component: StudentAddEditComponent },
          {
            path: 'students',
            children: [
              {
                path: ':id',
                children: [
                  { path: '', component: StudentViewComponent },
                  { path: 'edit', component: StudentAddEditComponent },
                ],
              },
            ],
          },
        ],
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
    role: ['STUDENT, LECTURER, ADMINISTRATOR'],
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
    role: ['STUDENT'],
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
    role: ['ADMINISTRATOR'],
    menus: [
      {
        name: 'Programy nauczania',
        icon: 'school',
        router: '/university',
      },
      {
        name: 'Pracownicy i studenci',
        icon: 'people',
        router: '/people',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export type Menu = {
  name: string;
  icon: string;
  router: string;
};

export type MenuGroup = {
  name?: string;
  role?: string[];
  menus: Menu[];
};
