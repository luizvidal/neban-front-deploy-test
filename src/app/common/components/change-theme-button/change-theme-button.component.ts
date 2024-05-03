import { Component, OnInit, computed, inject } from '@angular/core';
import { LayoutService } from '@app/layout/services/layout.service';
import { ButtonComponent } from '@components/button/button.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-change-theme-button',
  standalone: true,
  imports: [ButtonComponent, ButtonModule],
  template: `<app-button
    (onClick)="changeTheme()"
    [rounded]="true"
    [icon]="icon()"
    [outlined]="true"
    severity="success"
  /> `,
})
export class ChangeThemeButtonComponent implements OnInit {
  private readonly layoutService = inject(LayoutService);

  protected readonly theme = this.layoutService.theme;

  icon = computed(() =>
    this.theme() == 'lara-light-blue' ? 'pi pi-moon' : 'pi pi-sun'
  );

  changeTheme() {
    if (this.theme() == 'lara-light-blue')
      this.layoutService.switchTheme('lara-dark-blue');
    else this.layoutService.switchTheme('lara-light-blue');
  }

  ngOnInit(): void {
    this.layoutService.loadTheme();
  }
}
