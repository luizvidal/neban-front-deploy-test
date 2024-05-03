import { NgClass } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChangeLanguageButtonComponent } from '@common/components/change-language-button/change-language-button.component';
import { ChangeThemeButtonComponent } from '@common/components/change-theme-button/change-theme-button.component';
import { ButtonComponent } from '@components/button/button.component';
import { LinkComponent } from '@components/link/link.component';
import { LogoComponent } from '@components/logo/logo.component';
import { KeycloakService } from 'keycloak-angular';
import { MenuItem } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-layout-topbar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    LogoComponent,
    ChangeThemeButtonComponent,
    ButtonComponent,
    OverlayPanelModule,
    LinkComponent,
    ChangeLanguageButtonComponent,
  ],
  template: `
    <div class="layout-topbar">
      <app-logo />

      <button
        #menubutton
        class="p-link layout-menu-button layout-topbar-button text-primary"
        (click)="layoutService.onMenuToggle()"
      >
        <i class="pi pi-bars"></i>
      </button>

      <button
        #topbarmenubutton
        class="p-link layout-topbar-menu-button layout-topbar-button text-primary"
        (click)="layoutService.showProfileSidebar()"
      >
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <div
        #topbarmenu
        class="layout-topbar-menu"
        [ngClass]="{
          'layout-topbar-menu-mobile-active':
            layoutService.state.profileSidebarVisible
        }"
      >
        <div class="flex gap-3">
          <app-change-language-button />

          <app-change-theme-button />

          <app-button
            [rounded]="true"
            [outlined]="true"
            icon="pi pi-sign-out"
            (click)="logout()"
          />
        </div>
      </div>
    </div>

    <p-overlayPanel #overlayPanel>
      <div class="flex flex-column gap-3">
        <app-link label="Configurações de usuário" />
        <app-link label="Sair" />
      </div>
    </p-overlayPanel>
  `,
})
export class LayoutTopbarComponent {
  keycloakService = inject(KeycloakService);
  layoutService = inject(LayoutService);

  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  logout() {
    this.keycloakService.logout('http://localhost:4200');
  }
}
