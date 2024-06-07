import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./components/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'profile/:username',
    loadChildren: () => import('./components/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./components/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'song/:id',
    loadChildren: () => import('./components/song/song.module').then( m => m.SongPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
