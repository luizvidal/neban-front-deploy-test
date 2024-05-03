import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-landing-footer',
  standalone: true,
  imports: [DividerModule, TranslateModule],
  templateUrl: './landing-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingFooterComponent {
  protected readonly currentYear = signal(new Date().getFullYear());
}
