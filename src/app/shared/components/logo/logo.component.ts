import { Component } from '@angular/core';
import { ImgComponent } from '@components/img/img.component';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [ImgComponent],
  template: `<div class="flex-center gap-2">
    <div>
      <app-img
        src="logo/neban.png"
        width="93.75px"
        height="25px"
        class="cursor-pointer"
      />
    </div>
  </div> `,
})
export class LogoComponent {}
