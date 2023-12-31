import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
    form!: FormGroup;
    mostrarContrasena: boolean = false;
  
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  
    ngOnInit(): void {
      this.inicializarFormularioLogin();
    }
  
    inicializarFormularioLogin(): void {
      this.form = this.fb.group({
        correo:['', [Validators.required , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        contrasena: ['', [Validators.required, Validators.minLength(8)]]
      });
    }

    get correoNoValido(){
      return this.form.get('correo')?.invalid && this.form.get('correo')?.touched;
    }
  
    get contrasenaNoValido(){
      return this.form.get('contrasena')?.invalid && this.form.get('contrasena')?.touched;
    }

  
    onSubmit(): void {
      if (this.form.valid) {
        const datosLogin = this.form.value;
        this.authService.login(datosLogin.correo, datosLogin.contrasena).subscribe(
          Response => {
            // Maneja aquí el inicio de sesión exitoso
            console.log('Usuario ha iniciado sesión exitosamente', Response);
            this.router.navigate(['/home'])
            this.authService.setAuthState(true);
          },
          error => {
            console.log(error.error)
            alert(error.error)
          }
        );
      } else {
        // Maneja el error de validación del formulario
        console.error('El formulario no es válido');
        this.authService.setAuthState(false);
        alert('Porfavor complete los campos correctamente')
      }
    }
  
    // Funciones auxiliares para obtener los errores de los controles del formulario
    get correo() { return this.form.get('correo'); }
    get contrasena() { return this.form.get('contrasena'); }
  }