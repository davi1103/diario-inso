import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EntradaService } from '../../services/entrada.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-entrada',
  templateUrl: './crear-entrada.component.html',
  styleUrls: ['./crear-entrada.component.scss']
})

export class CrearEntradaComponent {

  entradaForm: FormGroup;
  

  constructor(private fb: FormBuilder, private entradaService: EntradaService, private router: Router) {
    this.entradaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(70)]],
      descripcion: ['', [Validators.required, Validators.maxLength(1000)]],
      imagen: ['', [Validators.required]] // Asegúrate de que la imagen es requerida
    });
  }

  get tituloNoValido(){
    return this.entradaForm.get('titulo')?.invalid && this.entradaForm.get('titulo')?.touched;
  }
  get limiteTituloAlcanzado(): boolean {
    const titulo = this.entradaForm.get('titulo')?.value;
    return titulo?.length === 70;
  }

  get descripcionNoValido(){
    return this.entradaForm.get('descripcion')?.invalid && this.entradaForm.get('descripcion')?.touched;
  }
  get limiteDescripcionAlcanzado(): boolean {
    const descripcion = this.entradaForm.get('descripcion')?.value;
    return descripcion?.length === 1000;
  }

  get imagenNoValido(){
    return this.entradaForm.get('imagen')?.invalid && this.entradaForm.get('imagen')?.touched;
  }

  onFileChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length === 1) {
      const file = fileList[0];
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(file.type)) {
        alert('Por favor, selecciona una imagen válida (JPEG, PNG, GIF).');
        this.entradaForm.get('imagen')?.reset(); // Usamos el operador opcional (?) para evitar el error
      } else {
        this.entradaForm.patchValue({ imagen: file });
        this.entradaForm.get('imagen')?.updateValueAndValidity(); // Nuevamente, el operador opcional (?)
      }
    } else if (fileList && fileList.length > 1) {
      alert('Por favor, selecciona solo una imagen.');
      this.entradaForm.get('imagen')?.reset(); // Y aquí también
    }
  }
  


  crearEntrada(): void {
    if (this.entradaForm.valid) {
      const formData = new FormData();
      formData.append('titulo', this.entradaForm.get('titulo')!.value);
      formData.append('descripcion', this.entradaForm.get('descripcion')!.value);
      formData.append('imagen', this.entradaForm.get('imagen')!.value);

      this.entradaService.crearEntrada(formData).subscribe({
        next: (respuesta) => {
          console.log('Entrada creada con éxito', respuesta);
          alert('Entrada creada correctamente');
          this.router.navigate(['/home']); // Modifica según la ruta deseada
        },
        error: (error) => {
          alert('Para buscar una entrada debe iniciar sesión')
        this.router.navigate(['/login'])
        }
      });
    }
  }

}


