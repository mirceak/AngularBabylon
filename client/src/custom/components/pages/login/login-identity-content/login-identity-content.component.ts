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
    this.serviceAuth.ProviderIdentity.login();
  }
}
