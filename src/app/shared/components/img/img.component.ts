import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import { AlphaNumeric } from '@common/types/alpha-numeric.type';
import { StyleType } from '@common/types/style.type';

@Component({
  selector: 'app-img',
  standalone: true,
  imports: [NgStyle],
  template: `
    <div>
      <img
        [alt]="alt"
        [src]="src()"
        [ngStyle]="{
        width,
        height,
      }"
        [style]="imgStyle"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgComponent {
  src = signal('');

  @Input() containerStyle?: StyleType;
  @Input() imgStyle?: StyleType;
  @Input() width: AlphaNumeric = '28px';
  @Input() height: AlphaNumeric = '28px';
  @Input() alt = '';

  @Input('src') set _src(src: string) {
    this.src.set(`assets/images/${src}`);
  }
}
