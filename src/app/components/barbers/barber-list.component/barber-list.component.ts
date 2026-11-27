import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface Barber {
  id: string;
  name: string;
  initials: string;
  role: string;
  active: boolean;
  appointmentsToday: number;
  rating: number;
  services: string[];
}

type BarberFilter = 'ALL' | 'ACTIVE' | 'INACTIVE';

@Component({
  selector: 'app-barber-list',
  imports: [DecimalPipe, RouterLink, RouterLinkActive],
  templateUrl: './barber-list.component.html',
  styleUrl: './barber-list.component.css',
})
export class BarberListComponent {
  @Output() addRequested = new EventEmitter<void>();
  @Output() profileRequested = new EventEmitter<Barber>();
  @Output() editRequested = new EventEmitter<Barber>();
  @Output() statusChanged = new EventEmitter<Barber>();

  searchTerm = '';
  selectedFilter: BarberFilter = 'ALL';
  openMenuId: string | null = null;

  // Dados temporários para desenvolvimento da interface
  barbers: Barber[] = [
    {
      id: '1',
      name: 'João Pedro',
      initials: 'JP',
      role: 'Barbeiro',
      active: true,
      appointmentsToday: 6,
      rating: 4.9,
      services: ['Corte degradê', 'Barba', 'Combo']
    },
    {
      id: '2',
      name: 'Carlos Eduardo',
      initials: 'CE',
      role: 'Barbeiro',
      active: true,
      appointmentsToday: 5,
      rating: 4.8,
      services: ['Corte social', 'Barba', 'Pigmentação']
    },
    {
      id: '3',
      name: 'Lucas Martins',
      initials: 'LM',
      role: 'Barbeiro',
      active: true,
      appointmentsToday: 4,
      rating: 5.0,
      services: ['Corte degradê', 'Combo']
    },
    {
      id: '4',
      name: 'Gabriel Santos',
      initials: 'GS',
      role: 'Barbeiro',
      active: true,
      appointmentsToday: 3,
      rating: 4.7,
      services: ['Corte social', 'Barba']
    },
    {
      id: '5',
      name: 'Rafael Oliveira',
      initials: 'RO',
      role: 'Barbeiro',
      active: false,
      appointmentsToday: 0,
      rating: 4.6,
      services: ['Corte degradê']
    },
    {
      id: '6',
      name: 'Matheus Costa',
      initials: 'MC',
      role: 'Barbeiro',
      active: true,
      appointmentsToday: 6,
      rating: 4.9,
      services: ['Corte degradê', 'Barba', 'Combo']
    }
  ];

  get totalBarbers(): number {
    return this.barbers.length;
  }

  get activeBarbers(): number {
    return this.barbers.filter(barber => barber.active).length;
  }

  get todayAppointments(): number {
    return this.barbers.reduce(
      (total, barber) => total + barber.appointmentsToday,
      0
    );
  }

  get averageRating(): number {
    if (!this.barbers.length) return 0;

    return this.barbers.reduce(
      (total, barber) => total + barber.rating,
      0
    ) / this.barbers.length;
  }

  get filteredBarbers(): Barber[] {
    return this.barbers.filter(barber => {

      const matchesSearch = barber.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      const matchesFilter =
        this.selectedFilter === 'ALL' ||
        (this.selectedFilter === 'ACTIVE' && barber.active) ||
        (this.selectedFilter === 'INACTIVE' && !barber.active);

      return matchesSearch && matchesFilter;
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }

  setFilter(filter: BarberFilter): void {
    this.selectedFilter = filter;
  }

  toggleMenu(id: string): void {
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  addBarber(): void {
    this.addRequested.emit();
  }

  viewBarber(barber: Barber): void {
    this.openMenuId = null;
    this.profileRequested.emit(barber);
  }

  editBarber(barber: Barber): void {
    this.openMenuId = null;
    this.editRequested.emit(barber);
  }

  toggleBarberStatus(barber: Barber): void {
    barber.active = !barber.active;

    this.openMenuId = null;
    this.statusChanged.emit(barber);
  }
}
