export interface PaginatedDataInterface<T> {
  content: T[];
  pageable: PageableInterface;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: SortInterface;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface PageableInterface {
  pageNumber: number;
  pageSize: number;
  sort: SortInterface;
  offset: boolean;
  unpaged: boolean;
  paged: boolean;
}

export interface SortInterface {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
