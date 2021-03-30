import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterService } from '@custom/components/pages/login/services/register.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { ServiceInternationalization } from '@custom/services/utils/service.internationalization';

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
    public internationalization: ServiceInternationalization
  ) {}

  register() {
    this.serviceAuth.register(this.form.value);
  }
}
