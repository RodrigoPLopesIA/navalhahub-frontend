import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type ProfileTab = 'OVERVIEW' | 'SERVICES' | 'AVAILABILITY' | 'APPOINTMENTS';

interface BarberService {
  id: string;
  name: string;
  duration: number;
  price: number;
  active: boolean;
}

interface BarberAppointment {
  id: string;
  customer: string;
  service: string;
  date: string;
  time: string;
  price: number;
  status: 'COMPLETED' | 'CONFIRMED' | 'PENDING' | 'CANCELED';
}

interface WorkingDay {
  day: string;
  enabled: boolean;
  start: string;
  end: string;
  breakStart: string;
  breakEnd: string;
}

export interface BarberProfile {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
  phone: string;
  active: boolean;
  rating: number;
  appointmentsToday: number;
  monthlyAppointments: number;
  monthlyRevenue: number;
  services: BarberService[];
  workingDays: WorkingDay[];
  appointments: BarberAppointment[];
}

@Component({
  selector: 'app-barber-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barber-profile-component.html'
})
export class BarberProfileComponent {

  @Input() barber: BarberProfile | null = null;

  @Output() back = new EventEmitter<void>();
  @Output() edit = new EventEmitter<BarberProfile>();
  @Output() statusChange = new EventEmitter<BarberProfile>();

  selectedTab: ProfileTab = 'OVERVIEW';

  get activeServices(): number {
    return this.barber?.services.filter(service => service.active).length ?? 0;
  }

  get completedAppointments(): number {
    return this.barber?.appointments.filter(
      appointment => appointment.status === 'COMPLETED'
    ).length ?? 0;
  }

  get upcomingAppointments(): BarberAppointment[] {
    return this.barber?.appointments.filter(
      appointment =>
        appointment.status === 'CONFIRMED' ||
        appointment.status === 'PENDING'
    ) ?? [];
  }

  selectTab(tab: ProfileTab): void {
    this.selectedTab = tab;
  }

  goBack(): void {
    this.back.emit();
  }

  editBarber(): void {
    if (this.barber) {
      this.edit.emit(this.barber);
    }
  }

  toggleStatus(): void {
    if (this.barber) {
      this.statusChange.emit(this.barber);
    }
  }

  getStatusLabel(status: BarberAppointment['status']): string {
    const labels = {
      COMPLETED: 'Concluído',
      CONFIRMED: 'Confirmado',
      PENDING: 'Pendente',
      CANCELED: 'Cancelado'
    };

    return labels[status];
  }

  getStatusClass(status: BarberAppointment['status']): string {
    const classes = {
      COMPLETED: 'bg-green-500/10 text-green-400 border-green-500/20',
      CONFIRMED: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      PENDING: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      CANCELED: 'bg-red-500/10 text-red-400 border-red-500/20'
    };

    return classes[status];
  }
}