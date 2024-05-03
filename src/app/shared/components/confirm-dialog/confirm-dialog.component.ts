import { Component, Input, inject } from '@angular/core';
import { CommonTools } from '@common/tools/common-tools';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [ConfirmDialogModule],
  template: '<p-confirmDialog />',
})
export class ConfirmDialogComponent extends CommonTools {
  confirmationService = inject(ConfirmationService);

  @Input() message =
    'Atencão, esta ação não poderá ser desfeita, deseja prosseguir?';
  @Input() header = 'Deletar';
  @Input() icon = 'pi pi-info-circle';
  @Input() acceptButtonStyleClass = 'p-button-danger p-button-text';
  @Input() rejectButtonStyleClass = 'p-button-info p-button-text';
  @Input() acceptIcon = 'none';
  @Input() rejectIcon = 'none';
  @Input() acceptLabel = 'Sim';
  @Input() rejectLabel = 'Não';
  @Input({ alias: 'confirmCallback' }) acceptCb: () => void = () => {};
  @Input({ alias: 'rejectCallback' }) rejectCb: () => void = () => {};

  ngOnInit(): void {
    this.loadTranslation('COMMON').subscribe(() => {
      this.message = this.translateService.instant(
        'COMMON.ATTENTION_CANOT_BE_UNDONE'
      );
      this.acceptLabel = this.translateService.instant('COMMON.YES');
      this.rejectLabel = this.translateService.instant('COMMON.NO');
    });
  }

  showDialog() {
    this.confirmationService.confirm({
      message: this.message,
      header: this.header,
      icon: this.icon,
      acceptButtonStyleClass: this.acceptButtonStyleClass,
      rejectButtonStyleClass: this.rejectButtonStyleClass,
      acceptIcon: this.acceptIcon,
      rejectIcon: this.rejectIcon,
      acceptLabel: this.acceptLabel,
      rejectLabel: this.rejectLabel,
      accept: this.acceptCb,
      reject: this.rejectCb,
    });
  }
}
