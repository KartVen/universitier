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
import { FacultyAddEditComponent } from './content/admin/university/faculties/crud/faculty-add-edit/faculty-add-edit.component';
import { FacultyViewComponent } from './content/admin/university/faculties/crud/faculty-view/faculty-view.component';
import { CourseViewComponent } from './content/admin/university/courses/crud/course-view/course-view.component';
import { CourseAddEditComponent } from './content/admin/university/courses/crud/course-add-edit/course-add-edit.component';
import { ProgrammeAddEditComponent } from './content/admin/university/programmes/crud/programme-add-edit/programme-add-edit.component';
import { ProgrammeViewComponent } from './content/admin/university/programmes/crud/programme-view/programme-view.component';
import { ModuleAddEditComponent } from './content/admin/university/modules/crud/module-add-edit/module-add-edit.component';
import { ModuleViewComponent } from './content/admin/university/modules/crud/module-view/module-view.component';
import { GroupAddEditComponent } from './content/admin/university/groups/crud/group-add-edit/group-add-edit.component';
import { ConnectionAddEditComponent } from './content/admin/university/connections/crud/connection-add-edit/connection-add-edit.component';

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
                  { path: '', component: FacultyViewComponent, title: 'Szczegóły wydziału' },
                  { path: 'edit', component: FacultyAddEditComponent, title: 'Edytuj wydział' },
                ],
              },
            ],
          },
          { path: 'academic-year-add', component: AcademicYearAddEditComponent },
          {
            path: 'academic-years',
            children: [
              {
                path: ':id/edit',
                title: 'Edytuj rok akademicki',
                component: AcademicYearAddEditComponent,
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
                  { path: '', component: CourseViewComponent, title: 'Szczegóły kierunku' },
                  { path: 'edit', component: CourseAddEditComponent, title: 'Edytuj kierunek' },
                ],
              },
            ],
          },
          { path: 'programme-add', component: ProgrammeAddEditComponent },
          {
            path: 'programmes',
            children: [
              {
                path: ':id',
                children: [
                  { path: '', component: ProgrammeViewComponent, title: 'Szczegóły specjalności' },
                  {
                    path: 'edit',
                    component: ProgrammeAddEditComponent,
                    title: 'Edytuj specjalność',
                  },
                ],
              },
            ],
          },
          { path: 'module-add', component: ModuleAddEditComponent },
          {
            path: 'modules',
            children: [
              {
                path: ':id',
                children: [
                  { path: '', component: ModuleViewComponent, title: 'Szczegóły modułu' },
                  { path: 'edit', component: ModuleAddEditComponent, title: 'Edytuj moduł' },
                ],
              },
            ],
          },
          { path: 'group-add', component: GroupAddEditComponent },
          {
            path: 'groups',
            children: [
              {
                path: ':id/edit',
                title: 'Edytuj grupę',
                component: GroupAddEditComponent,
              },
            ],
          },
          { path: 'connection-add', component: ConnectionAddEditComponent },
          {
            path: 'connections',
            children: [
              {
                path: ':id/edit',
                title: 'Edytuj powiązanie',
                component: ConnectionAddEditComponent,
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
                  { path: '', component: StaffViewComponent, title: 'Szczegóły pracownika' },
                  { path: 'edit', component: StaffAddEditComponent, title: 'Edytuj pracownika' },
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
                  { path: '', component: StudentViewComponent, title: 'Szczegóły studenta' },
                  { path: 'edit', component: StudentAddEditComponent, title: 'Edytuj studenta' },
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
