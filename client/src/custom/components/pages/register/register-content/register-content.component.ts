import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '@custom/components/pages/register/register.service';
import { ServiceEntityUser } from '@custom/entities/user/service/service.entity.user';

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
    private serviceEntityUser: ServiceEntityUser,
    private router: Router
  ) {}

  register() {
    this.serviceEntityUser.register(this.form.value).subscribe(
      (res) => {
        this.router.navigate(['/login']);
      },
      (error) => console.log(error)
    );
  }
}
