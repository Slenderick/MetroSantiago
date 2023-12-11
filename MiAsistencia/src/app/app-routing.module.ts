import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'formulario',
    loadChildren: () => import('./formulario/formulario.module').then(m => m.FormularioPageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'recopilador',
    loadChildren: () => import('./recopilador/recopilador.module').then(m => m.RecopiladorPageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'crud-usuarios',
    loadChildren: () => import('./crud-usuarios/crud-usuarios.module').then(m => m.CRUDUsuariosPageModule)
  },
  {
    path: 'metro',
    loadChildren: () => import('./metro/metro.module').then(m => m.MetroPageModule)
  },
  {
    path: 'crear-estacion',
    loadChildren: () => import('./crear-estacion/crear-estacion.module').then(m => m.CrearEstacionPageModule)
  },
  {
    path: 'crear-combinacion',
    loadChildren: () => import('./crear-combinacion/crear-combinacion.module').then(m => m.CrearCombinacionPageModule)
  },
  {
    path: 'ver-estacion',
    loadChildren: () => import('./ver-estacion/ver-estacion.module').then(m => m.VerEstacionPageModule)
  },
  {
    path: 'ver-combinacion',
    loadChildren: () => import('./ver-combinacion/ver-combinacion.module').then(m => m.VerCombinacionPageModule),
  },
  {
    path: 'edit-usuarios',
    loadChildren: () => import('./edit-usuarios/edit-usuarios.module').then(m => m.EditUsuariosPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
