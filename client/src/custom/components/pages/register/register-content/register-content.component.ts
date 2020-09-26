import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '@custom/components/pages/register/register.service';
import { ServiceUser } from '@custom/entities/user/service/service.user';

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
    private serviceUser: ServiceUser,
    private router: Router
  ) {}

  register() {
    this.serviceUser.register(this.form.value).subscribe(
      (res) => {
        this.router.navigate(['/login']);
      },
      (error) => console.log(error)
    );
  }
}
