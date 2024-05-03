import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonTools } from '@common/tools/common-tools';
import { ButtonComponent } from '@components/button/button.component';
import { InputComponent } from '@components/input/input.component';
import { CategoryInterface } from '@core/interfaces/category.interface';
import { CategoryService } from '@core/services/category.service';
import { TranslateModule } from '@ngx-translate/core';
import { blankStringValidator } from '@shared/helpers/validators';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    PanelModule,
    ReactiveFormsModule,
    ButtonComponent,
    RouterLink,
    InputComponent,
    TranslateModule
  ],
  templateUrl: './category-form.component.html',
  styles: `
    :host ::ng-deep {
      .p-panel-header {
        border-radius: 12px 12px 0 0;
      }

      .p-panel-content {
        border-radius: 0 0 12px 12px
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoryFormComponent
  extends CommonTools
  implements OnInit
{
  service = inject(CategoryService);
  formGroup = this.getFormGroup();
  category = signal<CategoryInterface | undefined>(undefined);

  ngOnInit(): void {
    this.id.set(this.route.snapshot.params['id']);

    if (this.id()) {
      this.service.getOne(this.id()).subscribe((res) => {
        this.formGroup.patchValue(res);
      });
    }
  }

  save() {
    const subscription = this.id()
      ? this.service.update(this.dto, this.id())
      : this.service.create(this.dto);

    this.loading.set(true);
    subscription.subscribe({
      next: ({ id }) => {
        this.loading.set(false);
        this.router.navigate(['/app/category/edit', id]);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  getFormGroup() {
    return this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.minLength(3), blankStringValidator()],
      ],
      description: [
        '',
        [Validators.required, Validators.minLength(3), blankStringValidator()],
      ],
    });
  }

  get controls() {
    return this.formGroup.controls;
  }

  get dto() {
    return this.formGroup.getRawValue();
  }
}
