import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterService } from '@custom/components/pages/register/register.service';

@Component({
  selector: 'app-register-content',
  templateUrl: './register-content.component.html',
  styleUrls: ['./register-content.component.scss'],
  providers: [RegisterService],
})
export class RegisterContentComponent {
  form = new FormGroup({});

  constructor(public registerService: RegisterService) {}

}
