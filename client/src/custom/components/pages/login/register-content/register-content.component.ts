import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterService } from '@custom/components/pages/login/services/register.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register-content',
  templateUrl: './register-content.component.html',
  styleUrls: ['./register-content.component.scss'],
})
export class RegisterContentComponent {
  form = new FormGroup({});

  constructor(
    public registerService: RegisterService,
    private serviceAuth: ServiceAuth,
    public translate: TranslateService
  ) {}

  register() {
    this.serviceAuth.register(this.form.value);
  }
}
