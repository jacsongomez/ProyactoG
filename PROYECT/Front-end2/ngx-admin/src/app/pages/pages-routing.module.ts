import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'principal',
      loadChildren:() => import('./principal/principal.module')
      .then(m=>m.PrincipalModule),
    },
    {
      path: 'usuarios',
      loadChildren:()=> import('./usuarios/usuarios.module')
      .then(m=>m.UsuariosModule),
    },
    {
      path: 'roles',
      loadChildren:()=> import('./roles/roles.module')
      .then(m=>m.RolesModule),
    },
    {
      path: 'permisos',
      loadChildren:()=> import('./permisos/permisos.module')
      .then(m=>m.PermisosModule),
    },
    {
      path: 'permiRol',
      loadChildren:()=> import('./permi-rol/permi-rol.module')
      .then(m=>m.PermiRolModule),
    },
    {
      path: 'capacidades',
      loadChildren: () => import('./capacidades/capacidades.module')
      .then(m => m.CapacidadesModule),
    },
    {
      path: 'personas',
      loadChildren: () => import('./personas/personas.module')
      .then(m => m.PersonasModule),
    },
    {
      path: 'programas',
      loadChildren: () => import('./programas/programas.module')
      .then(m => m.ProgramasModule),
    },
    {
      path: 'asigCap',
      loadChildren: () => import('./asig-cap/asig-cap.module')
      .then(m => m.AsigCapModule),
    },
    {
      path: 'consejos',
      loadChildren: () => import('./consejos/consejos.module')
      .then(m => m.ConsejosModule),
    },
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: '/pages/dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
