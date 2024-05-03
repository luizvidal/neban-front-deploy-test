import { Component, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [RouterLink, OverlayPanelModule],
  template: ` <div
      class="flex align-items-center gap-1 cursor-pointer"
      (mouseenter)="overlay && overlayPanel.show($event)"
    >
      <a
        [routerLink]="routerLink || null"
        class="text-base text-color-secondary font-semibold no-underline hover:underline hover:text-primary"
        >{{ label }}
      </a>
      @if(overlay && showIcon) {
      <i class="pi pi-chevron-down text-blue-600"></i>
      }
    </div>

    <p-overlayPanel #overlayPanel>
      <div (mouseleave)="overlayPanel.hide()">
        <ng-content />
      </div>
    </p-overlayPanel>`,
})
export class LinkComponent {
  @Input() label = '';
  @Input() routerLink = '';
  @Input() overlay = false;
  @Input() showIcon = true;
  @ViewChild('overlayPanel') op!: OverlayPanel;
}
