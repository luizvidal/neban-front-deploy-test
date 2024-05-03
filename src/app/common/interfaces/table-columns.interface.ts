import { DropdownDataInterface } from './dropdown-data.interface';

export interface TableColumnsInterface {
  field: string;
  label: string;
  headerStyle?: string;
  customTemplate?: boolean;
  customFilterDropdownOptions?: DropdownDataInterface[];
  showAddButton?: boolean;
  showMatchModes?: boolean;
  showOperator?: boolean;
  titleCasePipe?: boolean;
  currencyPipe?: boolean;
  type?: string;
  booleanColumnField?: boolean;
  trueMessage?: string;
  falseMessage?: string;
  enumColumnField?: boolean;
  enumData?: { [key: string]: string };
}
