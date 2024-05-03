import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedDataInterface } from '@common/interfaces/paginated-data.interface';
import { CrudService } from '@common/services/crud.service';
import { CategoryInterface } from '@core/interfaces/category.interface';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends CrudService<CategoryInterface> {
  constructor() {
    super('categories');
  }

  public getDropdownData() {
    const params = new HttpParams({
      fromObject: {
        page: 0,
        size: 1000,
        sort: 'asc',
        sortField: 'name',
      },
    });

    return this.httpClient
      .get<PaginatedDataInterface<CategoryInterface>>(
        `${this.apiUrl}/${this.uri}`,
        {
          params,
        }
      )
      .pipe(
        take(1),
        map((response) =>
          response.content.map((category) => ({
            label: category.name,
            value: category.id,
          }))
        )
      );
  }
}
