import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginService } from '@custom/components/pages/login/services/login.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-content',
  templateUrl: './login-content.component.html',
  styleUrls: ['./login-content.component.scss'],
})
export class LoginContentComponent {
  form = new FormGroup({});

  constructor(
    public loginService: LoginService,
    private serviceAuth: ServiceAuth,
    public translate: TranslateService
  ) {}

  login(): void {
    this.serviceAuth.login(this.form.value);
  }
}
