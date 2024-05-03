import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="card">
      <h1 class="m-0 p-0 mb-3 text-lg font-semibold text-primary">
        {{ 'HOME.TITLE' | translate }}
      </h1>
      <p>
        {{ 'HOME.PARAGRAPH' | translate }}
      </p>
    </div>
  `,
  standalone: true,
  imports: [TranslateModule],
})
export default class HomeComponent {}
