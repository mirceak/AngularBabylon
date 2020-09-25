import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginService } from '@custom/components/pages/login/login.service';

@Component({
  selector: 'app-login-content',
  templateUrl: './login-content.component.html',
  styleUrls: ['./login-content.component.scss'],
  providers: [LoginService],
})
export class LoginContentComponent {
  form = new FormGroup({});

  constructor(public loginService: LoginService) {}

  login(): void {}
}
