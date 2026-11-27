import { Component } from '@angular/core';
import { BarberProfile, BarberProfileComponent } from '../../components/barbers/barber-profile-component/barber-profile-component';
import { BarberListComponent } from '../../components/barbers/barber-list.component/barber-list.component';


@Component({
  selector: 'app-barbers-page',
  standalone: true,
  imports: [
    BarberListComponent,
    BarberProfileComponent
  ],
  templateUrl: './barbers-page.component.html',
  styleUrl: './barbers-page.component.css'
})
export class BarbersPageComponent {

  selectedBarber: BarberProfile | null = null;

  openProfile(barber: { id: string }): void {
    this.selectedBarber = this.getMockProfile(barber.id);
  }

  closeProfile(): void {
    this.selectedBarber = null;
  }

  editBarber(barber: BarberProfile): void {
    console.log('Editar barbeiro:', barber);

    // Futuramente abrirá a tela de edição.
  }

  changeStatus(barber: BarberProfile): void {
    console.log('Alterar status:', barber);

    // Futuramente chamará o endpoint de ativação/desativação.
  }

  private getMockProfile(id: string): BarberProfile {
    return {
      id,
      name: 'João Pedro',
      initials: 'JP',
      role: 'Barbeiro',
      email: 'joao@exemplo.com',
      phone: '(11) 99999-9999',
      active: true,
      rating: 4.9,
      appointmentsToday: 6,
      monthlyAppointments: 128,
      monthlyRevenue: 4250,

      services: [
        {
          id: '1',
          name: 'Corte degradê',
          duration: 40,
          price: 45,
          active: true
        },
        {
          id: '2',
          name: 'Barba',
          duration: 30,
          price: 30,
          active: true
        },
        {
          id: '3',
          name: 'Combo corte + barba',
          duration: 60,
          price: 70,
          active: true
        }
      ],

      workingDays: [
        { day: 'Segunda-feira', enabled: true, start: '09:00', end: '19:00', breakStart: '12:00', breakEnd: '13:00' },
        { day: 'Terça-feira', enabled: true, start: '09:00', end: '19:00', breakStart: '12:00', breakEnd: '13:00' },
        { day: 'Quarta-feira', enabled: true, start: '09:00', end: '19:00', breakStart: '12:00', breakEnd: '13:00' },
        { day: 'Quinta-feira', enabled: true, start: '09:00', end: '19:00', breakStart: '12:00', breakEnd: '13:00' },
        { day: 'Sexta-feira', enabled: true, start: '09:00', end: '19:00', breakStart: '12:00', breakEnd: '13:00' },
        { day: 'Sábado', enabled: true, start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
        { day: 'Domingo', enabled: false, start: '', end: '', breakStart: '', breakEnd: '' }
      ],

      appointments: [
        {
          id: '1',
          customer: 'Carlos Henrique',
          service: 'Corte degradê',
          date: '27/11/2026',
          time: '14:00',
          price: 45,
          status: 'CONFIRMED'
        },
        {
          id: '2',
          customer: 'Pedro Santos',
          service: 'Barba',
          date: '27/11/2026',
          time: '15:00',
          price: 30,
          status: 'PENDING'
        },
        {
          id: '3',
          customer: 'Lucas Oliveira',
          service: 'Combo corte + barba',
          date: '26/11/2026',
          time: '10:00',
          price: 70,
          status: 'COMPLETED'
        }
      ]
    };
  }
}