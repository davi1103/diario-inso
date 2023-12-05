import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isUserAuthenticated!: boolean;
  private authSubscription: Subscription;

  constructor(public authService: AuthService) {
    this.authSubscription = this.authService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        this.isUserAuthenticated = isAuthenticated;
      }
    );
  }
  ngOnDestroy() {
    // Asegúrate de desuscribirte para evitar fugas de memoria
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
  }
}
