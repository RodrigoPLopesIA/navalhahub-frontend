
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

import {
  BarbershopPhone,
  BarbershopRequest,
  BarbershopResponse,
  BarbershopService
} from '../../services/barbershop-service';

@Component({
  selector: 'app-barbershops',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './barbershops.html',
  styleUrl: './barbershops.css',
})
export class Barbershops implements OnInit {

  private readonly barbershopService = inject(BarbershopService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);

  barbershops: BarbershopResponse[] = [];

  loading = true;
  error = false;

  // Modal
  showEditModal = false;
  selectedBarbershop: BarbershopResponse | null = null;

  // Formulário de edição
  editForm: any = this.emptyForm();

  ngOnInit(): void {
    this.loadBarbershops();
  }



  loadBarbershops(): void {
    console.log('Iniciando carregamento...');

    this.loading = true;
    this.error = false;

    this.barbershopService.findAll()
      .pipe(
        finalize(() => {
          console.log('Finalize executado.');

          this.loading = false;

          console.log('Valor do loading:', this.loading);

          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Resposta recebida:', response);

          this.barbershops = response.content;

          console.log('Barbearias carregadas:', this.barbershops.length);
        },
        error: (error) => {
          console.error('Erro na requisição:', error);
          this.error = true;
        }
      });
  }

  private emptyForm() {
    return {
      name: '',
      slug: '',
      address: {
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      },
      phones: [
        {
          number: '',
          type: 'WHATSAPP'
        }
      ]
    };
  }

  editBarbershop(barbershop: BarbershopResponse): void {
    this.selectedBarbershop = barbershop;

    this.editForm = {
      name: barbershop.name,
      slug: barbershop.slug,
      address: {
        street: barbershop.address.street ?? '',
        number: barbershop.address.number ?? '',
        complement: barbershop.address.complement ?? '',
        neighborhood: barbershop.address.neighborhood ?? '',
        city: barbershop.address.city ?? '',
        state: barbershop.address.state ?? '',
        zipCode: barbershop.address.zipCode ?? '',
        country: barbershop.address.country ?? ''
      },
      phones: barbershop.phones?.length
        ? barbershop.phones.map(phone => ({
          number: phone.number ?? '',
          type: phone.type ?? ''
        }))
        : [{ number: '', type: 'WHATSAPP' }]
    };

    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedBarbershop = null;
    this.editForm = this.emptyForm();
  }

  toggleBarbershopStatus(barbershop: BarbershopResponse): void {
    const newStatus = !barbershop.active;

    this.barbershopService.updateStatus(barbershop.id, newStatus).subscribe({
      next: (response) => {
        console.log(
          `Barbearia ${newStatus ? 'ativada' : 'desativada'}:`,
          response
        );

        this.loadBarbershops();
      },
      error: (error) => {
        console.error('Erro ao alterar status da barbearia:', error);
      }
    });
  }

  createBarbershop(): void {
    this.selectedBarbershop = null;
    this.editForm = this.emptyForm();
    this.showEditModal = true;
  }

  generateSlug(barbershopName: string): string {
    return barbershopName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-');
  }
  saveBarbershop(): void {
    const request: BarbershopRequest = {
      name: this.editForm.name,
      slug: this.generateSlug(this.editForm.name),
      address: {
        ...this.editForm.address
      },
      phones: this.editForm.phones.map((phone: BarbershopPhone) => ({
        number: phone.number,
        type: phone.type
      }))
    };

    // Edição
    if (this.selectedBarbershop) {
      this.barbershopService.update(
        this.selectedBarbershop.id,
        request
      ).subscribe({
        next: (response) => {
          console.log('Barbearia atualizada:', response);

          this.closeEditModal();
          this.loadBarbershops();
        },
        error: (error) => {
          console.error('Erro ao atualizar barbearia:', error);
        }
      });

      return;
    }

    // Criação
    this.barbershopService.create(request).subscribe({
      next: (response) => {
        console.log('Barbearia cadastrada:', response);

        this.closeEditModal();
        this.loadBarbershops();
      },
      error: (error) => {
        console.error('Erro ao cadastrar barbearia:', error);
      }
    });
  }
  selectBarbershop(barbershop: BarbershopResponse): void {
    if (!barbershop.active) {
      return;
    }

    localStorage.setItem('selectedBarbershopId', barbershop.id);

    this.router.navigate(['/dashboard']);
  }
}
