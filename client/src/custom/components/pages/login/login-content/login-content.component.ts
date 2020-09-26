import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginService } from '@custom/components/pages/login/login.service';
import { UserService } from '@custom/entities/user/service/user.service';

@Component({
  selector: 'app-login-content',
  templateUrl: './login-content.component.html',
  styleUrls: ['./login-content.component.scss'],
  providers: [LoginService],
})
export class LoginContentComponent {
  form = new FormGroup({});

  constructor(
    public loginService: LoginService,
    private userService: UserService
  ) {}

  login(): void {
    this.userService.login(this.form.value).subscribe((res) => {console.log(res)});
  }
}
