import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginIdentityService } from '@custom/components/pages/login/services/login-identity.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { ServiceInternationalization } from '@custom/services/utils/service.internationalization';
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
  langWatcher: any;

  constructor(
    public loginIdentityService: LoginIdentityService,
    private internationalization: ServiceInternationalization,
    private serviceAuth: ServiceAuth,
    public translate: TranslateService,
    public serviceModals: ServiceModals
  ) {}

  async login(): Promise<any> {
    this.serviceModals.showLoading({
      title: this.translate.instant('components.swal.loading'),
      html: this.translate.instant('services.guards.auth-identity.resuming'),
    });
    await this.serviceAuth.providerIdentity.login(this.form.value)
      .then(() => {
        this.langWatcher = this.internationalization.setLang.subscribe(() => {
          this.serviceModals.showToast({
            status: 'success',
            statusMessage: this.translate.instant('components.toastr.success'),
            title: this.translate.instant(
              'services.guards.auth-identity.resume'
            ),
          });
          this.langWatcher.unsubscribe();
        });
        this.serviceAuth.serviceApi.zone.run(() => {
          this.serviceAuth.serviceApi.loggedIn.next(true);
          this.serviceAuth.serviceApi.serviceModals.hideLoading();
          this.serviceAuth.serviceApi.router.navigate(['/']);
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
