import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { config } from 'rxjs';
import { AuthorizerGuard } from './authorizer.guard';
import { ProfileComponent } from './profile/profile.component';
import { ViewProfileComponent } from './shared/view-profile/view-profile.component';
import { StudentslistComponent } from './studentslist/studentslist.component';

const routes: Routes = [
  {
    path: "Home",
    loadChildren: () => import('./home/home.module').then(home => home.HomeModule)
  },
  {
    path: "",
    loadChildren: () => import('./home/home.module').then(home => home.HomeModule)
  },
  {
    path: "Admin",
    loadChildren: () => import('./admin/admin.module').then(admin => admin.AdminModule),
    canActivate:[AuthorizerGuard]
  },
  {
    path: "Parent",
    loadChildren: () => import('./parent/parent.module').then(parent => parent.ParentModule),
    canActivate:[AuthorizerGuard]
  },
  {
    path: "Teacher",
    loadChildren: () => import('./teacher/teacher.module').then(teacher => teacher.TeacherModule),
    canActivate:[AuthorizerGuard]
  },
  {
    path: "Driver",
    loadChildren: () => import('./driver/driver.module').then(driver => driver.DriverModule),
    canActivate:[AuthorizerGuard]
  },
  {
    path: "Profile",
    component: ProfileComponent
  },
  {
    path: "Person",
    component: ViewProfileComponent
  },
  {
    path: "Students",
    component: StudentslistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
