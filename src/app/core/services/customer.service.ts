import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Params } from '@angular/router';
import { CrudService } from '@common/services/crud.service';
import { PermissionsType } from '@common/types/permissions.type';
import { CustomerInterface } from '@core/interfaces/customer.interface';
import { KeycloakService } from 'keycloak-angular';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends CrudService<CustomerInterface> {
  keycloakService = inject(KeycloakService);
  customerPermission = signal<PermissionsType | undefined>(undefined);
  customerId = signal('');
  loggedCustomer = signal<CustomerInterface | undefined>(undefined);

  constructor() {
    super('customer');
  }

  registerCustomer() {
    const headers = new HttpHeaders({
      'Disable-Success-Toast': 'true',
      'Disable-Error-Toast': 'true',
    });
    return this.httpClient
      .post<{
        id: string;
        permission: PermissionsType;
        username: string;
      }>(`${this.apiUrl}/${this.uri}/welcome`, null, {
        headers,
      })
      .pipe(take(1));
  }

  save(
    data: any,
    queryParams?: Params,
    headers_?: Params
  ): Observable<CustomerInterface> {
    const params = new HttpParams({ fromObject: queryParams });

    const headers = new HttpHeaders({ ...headers_ });

    return this.httpClient
      .put<CustomerInterface>(`${this.apiUrl}/${this.uri}`, data, {
        headers,
        params,
      })
      .pipe(take(1));
  }

  block(id: string) {
    return this.httpClient
      .put(`${this.apiUrl}/${this.uri}/block/${id}`, {})
      .pipe(take(1));
  }

  unblock(id: string) {
    return this.httpClient
      .put(`${this.apiUrl}/${this.uri}/unblock/${id}`, {})
      .pipe(take(1));
  }

  isCustomerLoggedIn() {
    return this.keycloakService.isLoggedIn();
  }
}
