export interface PaginatedRequestParamsInterface {
  page: number;
  size: number;
}

export interface FilteredRequestParamsInterface {
  filterGlobal?: string;
  filters?: string;
}

export interface SortedRequestParamsInterface {
  sort?: 'asc' | 'desc';
  sortField?: string;
}

export interface RequestParamsInterface
  extends PaginatedRequestParamsInterface,
    FilteredRequestParamsInterface,
    SortedRequestParamsInterface {}
