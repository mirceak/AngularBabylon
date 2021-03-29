import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterService } from '@custom/components/pages/login/services/register.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';

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
    private serviceAuth: ServiceAuth
  ) {}

  register() {
    this.serviceAuth.register(this.form.value);
  }
}
