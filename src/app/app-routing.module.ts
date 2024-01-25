import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { UploadComponent } from './upload/upload.component';
import { UploadGuard } from './services/upload.guard';
import { AuthGuard } from './services/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardGuard } from './services/dashboard.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent, canActivate: [AuthGuard] },
  {path: 'upload', component: UploadComponent, canActivate: [UploadGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [DashboardGuard]},
  {path: '**', redirectTo: '/signup', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
