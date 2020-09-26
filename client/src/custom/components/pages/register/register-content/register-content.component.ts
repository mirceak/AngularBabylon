import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '@custom/components/pages/register/register.service';
import { EntityServiceUser } from '@custom/entities/user/service/entity.service.user';

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
    private entityServiceUser: EntityServiceUser,
    private router: Router
  ) {}

  register() {
    this.entityServiceUser.register(this.form.value).subscribe(
      (res) => {
        this.router.navigate(['/login']);
      },
      (error) => console.log(error)
    );
  }
}
