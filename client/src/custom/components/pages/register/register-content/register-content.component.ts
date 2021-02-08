import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterService } from '@custom/components/pages/register/register.service';
import { ServiceUser } from '@custom/entities/user/service/service.user';
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
    private serviceAuth: ServiceAuth,
    private serviceUser: ServiceUser,
  ) {}

  register() {
    this.serviceAuth.register(this.form.value);
  }
}
