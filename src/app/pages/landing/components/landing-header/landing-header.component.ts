import {
  CommonModule,
  NgComponentOutlet,
  NgTemplateOutlet,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  QueryList,
  ViewChildren,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChangeLanguageButtonComponent } from '@common/components/change-language-button/change-language-button.component';
import { ChangeThemeButtonComponent } from '@common/components/change-theme-button/change-theme-button.component';
import { ResponsiveComponent } from '@common/components/responsive/responsive.component';
import { ButtonComponent } from '@components/button/button.component';
import { ImgComponent } from '@components/img/img.component';
import { LinkComponent } from '@components/link/link.component';
import { LogoComponent } from '@components/logo/logo.component';
import { TranslateModule } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-landing-header',
  standalone: true,
  imports: [
    ButtonComponent,
    LogoComponent,
    LinkComponent,
    SidebarModule,
    ImgComponent,
    CommonModule,
    NgComponentOutlet,
    NgTemplateOutlet,
    ChangeThemeButtonComponent,
    ChangeLanguageButtonComponent,
    RouterLink,
    TranslateModule,
  ],
  templateUrl: './landing-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingHeaderComponent extends ResponsiveComponent {
  @ViewChildren(LinkComponent)
  links!: QueryList<LinkComponent>;
  keycloakService = inject(KeycloakService);
  sidebarVisible = false;
  currencyImgs = [
    'countries-currency/usd.svg',
    'countries-currency/brl.svg',
    'countries-currency/ars.svg',
    'countries-currency/aud.svg',
    'countries-currency/cad.svg',
  ];
  linkData = signal<any[]>([]);

  ngOnInit(): void {
    this.setTranslation();
  }

  setTranslation() {
    this.loadTranslation('LANDING.HEADER.NAVBAR').subscribe((translation) => {
      translation[2].CHILDREN.forEach((child: any, index: number) => {
        child.SRC = this.currencyImgs[index];
      });
      this.linkData.set(translation);
    });
  }

  openOverlay(link: LinkComponent) {
    this.closeOpennedOverlays();
    () => link.op.show.call;
  }

  closeOpennedOverlays() {
    this.links.forEach((link) => link.op.hide());
  }

  onRegister() {
    // this.keycloakService.register({
    //   action: 'register',
    //   redirectUri: environment.keycloak.redirectUri,
    // });
  }
}
