import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ResponsiveComponent } from '@common/components/responsive/responsive.component';
import { ButtonComponent } from '@components/button/button.component';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-landing-tab-panel',
  standalone: true,
  imports: [TabViewModule, DividerModule, ButtonComponent, NgClass],
  templateUrl: './landing-tab-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingTabPanelComponent extends ResponsiveComponent {
  howSendData = signal<any>(undefined);

  howRecieveData = signal<any>(undefined);

  ngOnInit(): void {
    this.setTranslation();
  }

  setTranslation() {
    this.loadTranslation('LANDING.TAB_PANEL').subscribe((translation) => {
      if (translation['HOW_SEND']) {
        this.howSendData.set(translation['HOW_SEND']);
      }

      if (translation['HOW_RECEIVE']) {
        this.howRecieveData.set(translation['HOW_RECEIVE']);
      }
    });
  }
}
