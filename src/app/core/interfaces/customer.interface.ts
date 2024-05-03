export interface CustomerInterface {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  nationality: string;
  maritalStatus: string;
  propertyRegime: string;
  profession: string;
  rg: string;
  cpf: string;
  address: string;
  cep: string;

  blocked: boolean;
  permission: 'ADMIN' | 'USER' | 'SUPER';

  // helper fields
  active: boolean;
  disableSwitch?: boolean;
}

export interface CustomerDtoInterface {
  firstName: string;
  lastName: string;
  nationality: string;
  maritalStatus: string | null;
  propertyRegime: string | null;
  profession: string;
  rg: string;
  cpf: string;
  address: string;
  cep: string;
}
