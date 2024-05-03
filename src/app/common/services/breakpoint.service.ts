import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, inject, signal } from '@angular/core';
import { BreakpointType } from '@common/types/breakpoint.type';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  breakpointObserver = inject(BreakpointObserver);

  private _currentBreakpoint = signal<BreakpointType>('DESKTOP');

  currentBreakpoint = this._currentBreakpoint.asReadonly();

  private _setCurrentBreakpoint() {
    if (this.breakpointObserver.isMatched(['(min-width: 1200px)'])) {
      this._currentBreakpoint.set('DESKTOP');
    }

    if (this.breakpointObserver.isMatched(['(max-width: 1199px)'])) {
      this._currentBreakpoint.set('TABLET');
    }

    if (this.breakpointObserver.isMatched(['(max-width: 600px)'])) {
      this._currentBreakpoint.set('MOBILE');
    }
  }

  setCurrentBreakpoint() {
    this._setCurrentBreakpoint();
  }
}
