import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-buscar-entrada',
  templateUrl: './buscar-entrada.component.html',
  styleUrls: ['./buscar-entrada.component.scss']
})
export class BuscarEntradaComponent {
  searchTerm: string = ''; // Propiedad para almacenar el término de búsqueda
  fecha: String = '';
  entradas: any[] = []; // Propiedad para almacenar las entradas encontradas
  safeUrl: any;

  constructor(private sanitizer: DomSanitizer, private http: HttpClient, private router: Router) { }

  buscarEntradasText() {
    this.http.get<any[]>(`http://localhost:5000/api/entradas/buscarTexto?searchTerm=${this.searchTerm}`, {withCredentials:true}).subscribe(
      (response) => {
        this.entradas = response.map(entrada => ({
          ...entrada,
          imagenUrl: this.getSafeUrl(entrada.imagen)
        }));
      },
      (error) => {
        alert('Para buscar una entrada debe iniciar sesión')
        this.router.navigate(['/login']);
      }
    );
  }

  buscarEntradasDate() {
    this.http.get<any[]>(`https://diarioinso.onrender.com/api/entradas/buscarFecha?fecha=${this.fecha}`, {withCredentials:true}).subscribe(
      (response) => {
        this.entradas = response.map(entrada => ({
          ...entrada,
          imagenUrl: this.getSafeUrl(entrada.imagen)
        }));
      },
      (error) => {
        alert('Para buscar una entrada debe iniciar sesión')
        this.router.navigate(['/login']);
      }
    );
  }

  getSafeUrl(base64Image: string): SafeResourceUrl {
    const imageBlobUrl = `data:image/jpeg;base64,${base64Image}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageBlobUrl);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }

}
