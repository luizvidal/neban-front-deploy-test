import { Injectable, inject } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  messageService = inject(MessageService);

  showMessage(message: Message) {
    this.messageService.add(message);
  }
}
