import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { BarbershopResponse, BarbershopService } from '../../services/barbershop-service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,
    RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {


  authService = inject(AuthService)
  barbershopService = inject(BarbershopService)
  id?: string | null
  barbershop!: BarbershopResponse

  ngOnInit(): void {
    this.findBarbershopById()
  }

  logout(): void {
    this.authService.logout()
  }
  getToken(): string | undefined {
    return this.authService.getToken()
  }
  getUsername(): string | undefined {
    return this.authService.getUsername()
  }
  getUser() {
    return this.authService.getUser()
  }

  findBarbershopById() {
    this.id = localStorage.getItem("selectedBarbershopId")
    this.barbershopService.findById(String(this.id)).subscribe({
      next: (response) => {
        this.barbershop = response
      },
      error: (error) => {
        console.error("error ao buscar barbearia: ", error);

      }
    })
  }
}
