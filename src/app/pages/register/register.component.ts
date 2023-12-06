import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  forms!: FormGroup;
  mostrarContrasena: boolean = false;

  constructor(private fb:FormBuilder, private http: HttpClient, private router: Router){
    this.crearFormulario();
  }

  get nombreNoValido(){
    return this.forms.get('nombre')?.invalid && this.forms.get('nombre')?.touched;
  }

  get correoNoValido(){
    return this.forms.get('correo')?.invalid && this.forms.get('correo')?.touched;
  }

  get contrasenaNoValido(){
    return this.forms.get('contrasena')?.invalid && this.forms.get('contrasena')?.touched;
  }

  crearFormulario(){

    this.forms = this.fb.group({
      nombre:['', Validators.required],
      correo:['', [Validators.required , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      contrasena: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$')]]
      
    })

  }

  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  registrar(){

    console.log(this.forms);

    if(this.forms.valid){

      const formData = this.forms.value;
      this.http.post('https://diarioinso.onrender.com/api/usuarios/registro', formData,{responseType: 'text'}).subscribe(
        response => {
          alert(response);
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error.error)
            alert(error.error)
        }
        
      )

    }
  }

}
