import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { LinkComponent } from './link.component';

@Component({
  template: `
    <app-link [label]="label" [routerLink]="routerLink" [overlay]="overlay">
      <div class="content">Link content</div>
    </app-link>
  `,
  standalone: true,
  imports: [LinkComponent, RouterLink],
})
class TestHostComponent {
  label = 'Test Link';
  routerLink = '/test';
  overlay = true;
}

describe('LinkComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let linkComponent: LinkComponent;
  let linkDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        OverlayPanelModule,
        TestHostComponent,
        LinkComponent,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    linkDebugElement = fixture.debugElement.query(By.css('app-link'));
    linkComponent = linkDebugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(linkComponent).toBeTruthy();
  });

  it('should display label', () => {
    const labelElement: HTMLElement = linkDebugElement.query(
      By.css('a')
    ).nativeElement;
    expect(labelElement.textContent).toContain(testHost.label);
  });

  it('should have routerLink attribute', () => {
    const routerLinkAttribute = linkDebugElement.query(By.css('a')).attributes[
      'ng-reflect-router-link'
    ];
    expect(routerLinkAttribute).toEqual('/test');
  });

  it('should display overlay icon if overlay is enabled', () => {
    testHost.overlay = true;
    fixture.detectChanges();
    const overlayIcon: HTMLElement = linkDebugElement.query(
      By.css('i')
    ).nativeElement;
    expect(overlayIcon).toBeTruthy();
  });

  it('should not display overlay icon if overlay is disabled', () => {
    testHost.overlay = false;
    fixture.detectChanges();
    const overlayIcon = linkDebugElement.query(By.css('i'));
    expect(overlayIcon).toBeNull();
  });

  it('should display overlay content when hovered', () => {
    const overlayPanel = linkComponent.op;
    const spy = jest.spyOn(overlayPanel, 'show');

    const linkElement: HTMLElement = linkDebugElement.nativeElement;
    linkElement.addEventListener('mouseenter', (event) =>
      overlayPanel.show(event)
    );
    linkElement.dispatchEvent(new MouseEvent('mouseenter'));

    expect(spy).toHaveBeenCalled();
  });

  it('should hide overlay content when mouse leaves', () => {
    const overlayPanel = linkComponent.op;
    const hideSpy = jest.spyOn(overlayPanel, 'hide');
    const showSpy = jest.spyOn(overlayPanel, 'show');

    const linkElement: HTMLElement = linkDebugElement.nativeElement;

    linkElement.addEventListener('mouseenter', (event) =>
      overlayPanel.show(event)
    );

    linkElement.addEventListener('mouseleave', () => overlayPanel.hide());

    linkElement.dispatchEvent(new MouseEvent('mouseenter'));

    linkElement.dispatchEvent(new MouseEvent('mouseleave'));

    expect(showSpy).toHaveBeenCalled();
    expect(hideSpy).toHaveBeenCalled();
  });
});
