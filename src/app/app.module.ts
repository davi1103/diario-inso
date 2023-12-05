import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { IndexComponent } from './pages/index/index.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CrearEntradaComponent } from './pages/crear-entrada/crear-entrada.component';
import { BuscarEntradaComponent } from './pages/buscar-entrada/buscar-entrada.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SafeUrlService } from './services/domSanitize.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    IndexComponent,
    RegisterComponent,
    LoginComponent,
    CrearEntradaComponent,
    BuscarEntradaComponent,
    HomeComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // Añade FormsModule aquí
    
  ],
  providers: [
    SafeUrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
