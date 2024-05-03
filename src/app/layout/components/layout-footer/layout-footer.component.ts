import { Component } from '@angular/core';
import { LogoComponent } from '@components/logo/logo.component';
@Component({
  selector: 'app-layout-footer',
  template: `
    <div class="layout-footer">
      <app-logo />
    </div>
  `,
  standalone: true,
  imports: [LogoComponent],
})
export class LayoutFooterComponent {}
