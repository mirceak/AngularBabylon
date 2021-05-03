import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterService } from '@custom/components/pages/login/services/register.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { ServiceModals } from '@custom/services/utils/service.modals';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register-content',
  templateUrl: './register-content.component.html',
  styleUrls: ['./register-content.component.scss'],
  providers: [RegisterService],
})
export class RegisterContentComponent {
  form = new FormGroup({});

  constructor(
    public registerService: RegisterService,
    private serviceAuth: ServiceAuth,
    public translate: TranslateService,
    public serviceModals: ServiceModals
  ) {}

  async register(): Promise<any> {
    this.serviceModals.showLoading({
      title: this.translate.instant('components.swal.loading'),
      html: this.translate.instant('pages.register.registering'),
    });
    await this.serviceAuth
      .register(this.form.value)
      .then(() => {
        this.serviceModals.hideLoading();
        this.serviceModals.showToast({
          status: 'success',
          statusMessage: this.translate.instant('components.toastr.success'),
          title: this.translate.instant('pages.register.registered'),
        });
      })
      .catch((error) => {
        // handled as toast in services/utils/service.http.ts
      });
  }
}
