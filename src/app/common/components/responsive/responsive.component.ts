import { CommonTools } from '@common/tools/common-tools';

export abstract class ResponsiveComponent extends CommonTools {
  constructor() {
    super();
  }

  currentBreakpoint = this.breakpointService.currentBreakpoint;

  get isDesktop() {
    return this.currentBreakpoint() == 'DESKTOP';
  }

  get isTablet() {
    return this.currentBreakpoint() == 'TABLET';
  }

  get isMobile() {
    return this.currentBreakpoint() == 'MOBILE';
  }
}
