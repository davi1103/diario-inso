import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlApi = 'http://localhost:5000/api/usuarios'; // Asegúrate de reemplazar esto con la URL real de tu API
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  // Método para iniciar sesión
  login(correo: string, contrasena: string): Observable<any> {
    // Creamos el objeto de datos que enviaremos al servidor
    const datosLogin = {
      correo: correo,
      contrasena: contrasena
    };

    // Hacemos una petición POST al servidor con las credenciales
    return this.http.post(`${this.urlApi}/login`, datosLogin, {withCredentials:true, responseType: 'text' });
  }

  logout(): void {
    this.http.post(`${this.urlApi}/logout`, {}, { withCredentials: true, responseType: 'text' })
      .subscribe({
        next: (responseBody) => {
          // responseBody es de tipo string ya que responseType es 'text'
          console.log('Respuesta del servidor:', responseBody);
          this.isAuthenticatedSubject.next(false);
          this.router.navigate(['/login']);
          alert("Sesion cerrada con éxito")
        },
        error: (error) => {
          console.error('Error durante el cierre de sesión', error);
        }
      });
  }

  setAuthState(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  // Aquí puedes agregar otros métodos relacionados con la autenticación como registro, logout, etc.
}