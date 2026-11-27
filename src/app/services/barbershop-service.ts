
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth-service';

export interface BarbershopAddress {
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface BarbershopPhone {
  number: string;
  type: 'WHATSAPP' | 'COMMERCIAL';
}

export interface BarbershopRequest {
  name: string;
  slug: string;
  address: BarbershopAddress;
  phones: BarbershopPhone[];
}

export interface BarbershopResponse {
  id: string;
  name: string;
  slug: string;
  address: BarbershopAddress;
  phones: BarbershopPhone[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PageResponse<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class BarbershopService {

  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  private readonly apiUrl = 'http://localhost:8081/api/barbershops';

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  findAll(): Observable<PageResponse<BarbershopResponse>> {
    return this.http.get<PageResponse<BarbershopResponse>>(
      this.apiUrl,
      { headers: this.getHeaders() }
    );
  }
  findById(id: string): Observable<BarbershopResponse> {
    return this.http.get<BarbershopResponse>(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  update(
    id: string,
    request: BarbershopRequest
  ): Observable<BarbershopResponse> {
    return this.http.put<BarbershopResponse>(
      `${this.apiUrl}/${id}`,
      request,
      { headers: this.getHeaders() }
    );
  }

  create(request: BarbershopRequest): Observable<BarbershopResponse> {
    return this.http.post<BarbershopResponse>(
      this.apiUrl,
      request,
      {
        headers: this.getHeaders()
      }
    );
  }

  updateStatus(id: string, active: boolean): Observable<BarbershopResponse> {
    return this.http.patch<BarbershopResponse>(
      `${this.apiUrl}/${id}/status`,
      {
        status: active
      },      {
        headers: this.getHeaders()
      }
    );
  }
}
