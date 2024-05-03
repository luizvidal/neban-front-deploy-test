import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Params } from '@angular/router';
import { PaginatedDataInterface } from '@common/interfaces/paginated-data.interface';
import { RequestParamsInterface } from '@common/interfaces/request.interface';
import { environment } from '@environments/environment';
import { take } from 'rxjs';

export abstract class CrudService<T> {
  apiUrl = environment.neban.url;
  httpClient = inject(HttpClient);

  constructor(protected uri: string) {}

  public getAll(
    params_: RequestParamsInterface = { page: 0, size: 10 },
    queryParams?: Params,
    headers_?: Params
  ) {
    const params = new HttpParams({
      fromObject: {
        ...params_,
        ...queryParams,
      },
    });

    const headers = new HttpHeaders({ ...headers_ });

    return this.httpClient
      .get<PaginatedDataInterface<T>>(`${this.apiUrl}/${this.uri}`, {
        headers,
        params,
      })
      .pipe(take(1));
  }

  public getOne(id: string, queryParams?: Params, headers_?: Params) {
    const params = new HttpParams({ fromObject: queryParams });

    const headers = new HttpHeaders({ ...headers_ });

    return this.httpClient
      .get<T>(`${this.apiUrl}/${this.uri}/${id}`, {
        headers,
        params,
      })
      .pipe(take(1));
  }

  public create(data: unknown, queryParams?: Params, headers_?: Params) {
    const params = new HttpParams({ fromObject: queryParams });

    const headers = new HttpHeaders({ ...headers_ });

    return this.httpClient
      .post<T>(`${this.apiUrl}/${this.uri}`, data, { headers, params })
      .pipe(take(1));
  }

  public update(
    data: unknown,
    id: string,
    queryParams?: Params,
    headers_?: Params
  ) {
    const params = new HttpParams({ fromObject: queryParams });

    const headers = new HttpHeaders({ ...headers_ });

    return this.httpClient
      .put<T>(`${this.apiUrl}/${this.uri}/${id}`, data, { headers, params })
      .pipe(take(1));
  }

  public delete(id: string, queryParams?: Params, headers_?: Params) {
    const params = new HttpParams({ fromObject: queryParams });

    const headers = new HttpHeaders({ ...headers_ });

    return this.httpClient
      .delete<T>(`${this.apiUrl}/${this.uri}/${id}`, { headers, params })
      .pipe(take(1));
  }
}
