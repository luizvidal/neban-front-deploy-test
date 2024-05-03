export interface FilteredRequestParamsInterface {
  filterParam?:
    | 'CONTAINS'
    | 'NOT_CONTAINS'
    | 'ENDS_WITH'
    | 'STARTS_WITH'
    | 'EQUALS'
    | 'NOT_EQUALS';
  filterValue?: string;
  filterField?: string;
}

