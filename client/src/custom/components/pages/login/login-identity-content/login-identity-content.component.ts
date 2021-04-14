import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginIdentityService } from '@custom/components/pages/login/services/login-identity.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { ServiceModals } from '@custom/services/utils/service.modals';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-identity-content',
  templateUrl: './login-identity-content.component.html',
  styleUrls: ['./login-identity-content.component.scss'],
  providers: [LoginIdentityService],
})
export class LoginIdentityContentComponent {
  form = new FormGroup({});

  constructor(
    public loginIdentityService: LoginIdentityService,
    private serviceAuth: ServiceAuth,
    public translate: TranslateService,
    public serviceModals: ServiceModals
  ) {}

  async login() {
    this.serviceModals.showLoading({
      title: this.translate.instant('components.swal.loading'),
      html: this.translate.instant('services.guards.auth-identity.resuming'),
    });
    await this.serviceAuth.ProviderIdentity.login(this.form.value)
      .then(() => {
        this.serviceModals.showToast({
          status: 'success',
          statusMessage: this.translate.instant('components.toastr.success'),
          title: this.translate.instant('services.guards.auth-identity.resume'),
        });
      })
      .catch((error) => {
        this.serviceModals.showToast({
          status: 'error',
          statusMessage: this.translate.instant('components.toastr.error'),
          title: this.translate.instant('services.guards.auth-identity.wrong'),
        });
      });
  }
}
