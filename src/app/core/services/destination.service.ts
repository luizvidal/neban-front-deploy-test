import { Injectable } from '@angular/core';
import { CrudService } from '@common/services/crud.service';
import { DestinationInterface } from '@core/interfaces/destination.interface';

@Injectable({
  providedIn: 'root',
})
export class DestinationService extends CrudService<DestinationInterface> {
  constructor() {
    super('destination');
  }
}
