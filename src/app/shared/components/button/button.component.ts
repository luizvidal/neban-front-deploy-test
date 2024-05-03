import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SeverityType } from '@common/types/severity.type';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule, NgClass],
  template: `
    @if (useButton) {
      <button
        pButton
        [type]="type"
        [icon]="icon"
        [class]="styleClass"
      ></button>
    } @else {
      <p-button
        [severity]="severity"
        [rounded]="rounded"
        [outlined]="outlined"
        [label]="label"
        [styleClass]="styleClass"
        [icon]="icon"
        [iconPos]="iconPos"
        [disabled]="disabled"
        [loading]="loading"
        [loadingIcon]="loadingIcon"
        (onClick)="onClick.emit()"
      >
        <span class="cursor-pointer"><ng-content /></span>
      </p-button>
    }
  `,
})
export class ButtonComponent {
  @Input() useButton = false
  @Input() label = '';
  @Input() styleClass = '';
  @Input() class = '';
  @Input() icon = '';
  @Input() loadingIcon = 'pi pi-spinner';
  @Input() iconPos: 'left' | 'right' = 'right';
  @Input() severity: SeverityType = 'primary';
  @Input() id = 'id';
  @Input() rounded = false;
  @Input() outlined = false;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() type = 'button';
  @Output() onClick = new EventEmitter<void>();
}
