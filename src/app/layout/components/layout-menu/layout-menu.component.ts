import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { CommonTools } from '@common/tools/common-tools';
import { CustomerService } from '@core/services/customer.service';
import { LayoutMenuItemComponent } from './layout-menu-item/layout-menu-item.component';

@Component({
  selector: 'app-layout-menu',
  template: `
    <ul class="layout-menu">
      @for (item of menuItems; track $index) { @if (item.separator) {
      <li class="menu-separator"></li>
      } @else {
      <li
        app-layout-menu-item
        [item]="item"
        [index]="$index"
        [root]="true"
        [groupVisible]="item.groupVisible"
      ></li>
      }}
    </ul>
  `,
  standalone: true,
  imports: [NgFor, NgIf, LayoutMenuItemComponent],
})
export class LayoutMenuComponent extends CommonTools {
  menuItems: any[] = [];
  customerService = inject(CustomerService);
  customerId = signal('');

  ngOnInit(): void {
    this.setMenuItemsTranslation();
  }

  setMenuItemsTranslation() {
    this.loadTranslation('COMMON').subscribe(() => {
      this.menuItems = [
        {
          label: this.translateService.instant('COMMON.ADMINISTRATION'),
          groupVisible: this.customerService.customerPermission() !== 'USER',
          items: [
            {
              label: this.translateService.instant('COMMON.CUSTOMERS'),
              icon: 'pi pi-fw pi-users',
              routerLink: ['/app/customer'],
            },
            {
              label: this.translateService.instant(
                'COMMON.TRANSACTION_CATEGORIES'
              ),
              icon: 'pi pi-fw pi-tags',
              routerLink: ['/app/category'],
            },
            // {
            //   label: this.translateService.instant('COMMON.TRANSACTION_STATUS'),
            //   icon: 'pi pi-fw pi-ticket',
            //   routerLink: ['/app/transaction-status'],
            // },
            {
              label: this.translateService.instant(
                'COMMON.NEBAN_BANK_ACCOUNTS'
              ),
              icon: 'pi pi-fw pi-wallet',
              routerLink: ['/app/neban-bank-account'],
            },
            {
              label: this.translateService.instant('COMMON.DESTINATIONS'),
              icon: 'pi pi-fw pi-map-marker',
              routerLink: ['/app/destination'],
            },
            {
              label: this.translateService.instant('COMMON.QUOTATIONS'),
              icon: 'pi pi-fw pi-dollar',
              routerLink: ['/app/quotation'],
            },
          ],
        },
        {
          label: this.translateService.instant('COMMON.START'),
          groupVisible: true,
          items: [
            {
              label: this.translateService.instant('COMMON.START'),
              icon: 'pi pi-fw pi-home',
              routerLink: ['/app/home'],
            },

            {
              label: this.translateService.instant('COMMON.DATA'),
              icon: 'pi pi-fw pi-id-card',
              routerLink: ['/app/data'],
            },

            {
              label: this.translateService.instant('COMMON.BANK_ACCOUNTS'),
              icon: 'pi pi-fw pi-money-bill',
              routerLink: ['/app/customer-bank-account'],
            },
            {
              label: this.translateService.instant('COMMON.TRANSACTIONS'),
              icon: 'pi pi-fw pi-arrow-right-arrow-left',
              routerLink: ['/app/transaction'],
            },
          ],
        },
      ];
    });
  }
}
