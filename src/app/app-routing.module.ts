import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CrearEntradaComponent } from './pages/crear-entrada/crear-entrada.component';
import { BuscarEntradaComponent } from './pages/buscar-entrada/buscar-entrada.component';


const routes: Routes = [
  { path:'', component: IndexComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component:LoginComponent},
  { path: 'home', component:HomeComponent}, 
  { path: 'crear-entrada', component:CrearEntradaComponent},
  { path: 'buscar-entrada', component: BuscarEntradaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
