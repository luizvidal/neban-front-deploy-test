import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuService } from '../../../services/menu.service';
@Component({
  selector: '[app-layout-menu-item]',
  template: `
    @if (groupVisible) { @if (root && item.visible !== false) {
    <div class="layout-menuitem-root-text text-primary">
      {{ item.label }}
    </div>
    }

    <a
      *ngIf="(!item.routerLink || item.items) && item.visible !== false"
      [attr.href]="item.url"
      (click)="itemClick($event)"
      [ngClass]="item.class"
      [attr.target]="item.target"
      class="text-primary"
      tabindex="0"
      pRipple
    >
      <i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
      <span class="layout-menuitem-text text-primary">{{ item.label }}</span>
      <i
        class="pi pi-fw pi-angle-down layout-submenu-toggler text-primary"
        *ngIf="item.items"
      ></i>
    </a>
    <a
      *ngIf="item.routerLink && !item.items && item.visible !== false"
      (click)="itemClick($event)"
      [ngClass]="item.class"
      [routerLink]="item.routerLink"
      routerLinkActive="active-route"
      [routerLinkActiveOptions]="
        item.routerLinkActiveOptions || {
          paths: 'exact',
          queryParams: 'ignored',
          matrixParams: 'ignored',
          fragment: 'ignored'
        }
      "
      [fragment]="item.fragment"
      [queryParamsHandling]="item.queryParamsHandling"
      [preserveFragment]="item.preserveFragment"
      [skipLocationChange]="item.skipLocationChange"
      [replaceUrl]="item.replaceUrl"
      [state]="item.state"
      [queryParams]="item.queryParams"
      [attr.target]="item.target"
      tabindex="0"
      pRipple
    >
      <i [ngClass]="item.icon" class="layout-menuitem-icon text-primary"></i>
      <span class="layout-menuitem-text text-primary">{{ item.label }}</span>
      <i
        class="pi pi-fw pi-angle-down layout-submenu-toggler text-primary"
        *ngIf="item.items"
      ></i>
    </a>

    <ul
      *ngIf="item.items && item.visible !== false"
      [@children]="submenuAnimation"
    >
      <ng-template ngFor let-child let-i="index" [ngForOf]="item.items">
        <li
          app-layout-menu-item
          [item]="child"
          [index]="i"
          [parentKey]="key"
          [class]="child?.badgeClass"
        ></li>
      </ng-template>
    </ul>
    }
  `,
  animations: [
    trigger('children', [
      state(
        'collapsed',
        style({
          height: '0',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
        })
      ),
      transition(
        'collapsed <=> expanded',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
    ]),
  ],
  standalone: true,
  imports: [NgIf, RippleModule, NgClass, RouterLinkActive, RouterLink, NgFor],
})
export class LayoutMenuItemComponent {
  @Input() item: any;

  @Input() index!: number;

  @Input() @HostBinding('class.layout-root-menuitem') root!: boolean;

  @Input() parentKey!: string;

  @Input() groupVisible = true;

  active = false;

  menuSourceSubscription: Subscription;

  menuResetSubscription: Subscription;

  key: string = '';

  constructor(public router: Router, private menuService: MenuService) {
    this.menuSourceSubscription = this.menuService.menuSource$.subscribe(
      (value) => {
        Promise.resolve(null).then(() => {
          if (value.routeEvent) {
            this.active =
              value.key === this.key || value.key.startsWith(this.key + '-')
                ? true
                : false;
          } else {
            if (
              value.key !== this.key &&
              !value.key.startsWith(this.key + '-')
            ) {
              this.active = false;
            }
          }
        });
      }
    );

    this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
      this.active = false;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((params) => {
        if (this.item.routerLink) {
          this.updateActiveStateFromRoute();
        }
      });
  }

  ngOnInit() {
    this.key = this.parentKey
      ? this.parentKey + '-' + this.index
      : String(this.index);

    if (this.item.routerLink) {
      this.updateActiveStateFromRoute();
    }
  }

  ngOnChanges() {
    this.key = this.parentKey
      ? this.parentKey + '-' + this.index
      : String(this.index);

    if (this.item.routerLink) {
      this.updateActiveStateFromRoute();
    }
  }

  updateActiveStateFromRoute() {
    const activeRoute = this.router.isActive(this.item.routerLink[0], {
      paths: 'exact',
      queryParams: 'ignored',
      matrixParams: 'ignored',
      fragment: 'ignored',
    });

    if (activeRoute) {
      this.menuService.onMenuStateChange({ key: this.key, routeEvent: true });
    }
  }

  itemClick(event: Event) {
    // avoid processing disabled items
    if (this.item.disabled) {
      event.preventDefault();
      return;
    }

    // execute command
    if (this.item.command) {
      this.item.command({ originalEvent: event, item: this.item });
    }

    // toggle active state
    if (this.item.items) {
      this.active = !this.active;
    }

    this.menuService.onMenuStateChange({ key: this.key });
  }

  get submenuAnimation() {
    return this.root ? 'expanded' : this.active ? 'expanded' : 'collapsed';
  }

  @HostBinding('class.active-menuitem')
  get activeClass() {
    return this.active && !this.root;
  }

  ngOnDestroy() {
    if (this.menuSourceSubscription) {
      this.menuSourceSubscription.unsubscribe();
    }

    if (this.menuResetSubscription) {
      this.menuResetSubscription.unsubscribe();
    }
  }
}
