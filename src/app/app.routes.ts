import { Routes } from '@angular/router';
import {MenuComponent} from "./components/menu/menu.component";
import {MyProfileComponent} from "./components/member/my-profile/my-profile.component";
import {ConnexionComponent} from "./components/connexion/connexion.component";
import {MemberListComponent} from "./components/member/member-list/member-list.component";
import {GroupListComponent} from "./components/group/group-list/group-list.component";
import {MaterialListComponent} from "./components/material/material-list/material-list.component";
import {AuthGuard} from "./services/permission.service";
import {InscriptionPageComponent} from "./components/inscription/inscription-page/inscription-page.component";

export const routes: Routes = [
  {path: '', component: MaterialListComponent, canActivate: [AuthGuard]},
  {path: 'member-list', component: MemberListComponent, canActivate: [AuthGuard]},
  {path: 'group-list', component: GroupListComponent, canActivate: [AuthGuard]},
  {path: 'material-list', component: MaterialListComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: MyProfileComponent, canActivate: [AuthGuard]},
  {path: 'auth/login', component: ConnexionComponent},
  {path: 'sign-in', component: InscriptionPageComponent},
];

/*export const routes: Routes = [
  {path: '', component: ConnexionComponent},
  {path: 'member-list', component: MemberListComponent},
  {path: 'group-list', component: GroupListComponent},
  {path: 'material-list', component: MaterialListComponent},
  {path: 'profile', component: MyProfileComponent},
  {path: 'auth/login', component: ConnexionComponent}
];*/
