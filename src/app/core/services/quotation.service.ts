import { Injectable } from '@angular/core';
import { CrudService } from '@common/services/crud.service';
import { QuotationInterface } from '@core/interfaces/quotation.interface';

@Injectable({
  providedIn: 'root',
})
export class QuotationService extends CrudService<QuotationInterface> {
  constructor() {
    super('quotation');
  }
}
