import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MailBoxContentService } from '@custom/components/pages/home/services/mailBox-content.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2/src/sweetalert2';

@Component({
  selector: 'app-mailBox-content',
  templateUrl: './mailBox-content.component.html',
  styleUrls: ['./mailBox-content.component.scss'],
})
export class MailBoxContentComponent implements OnInit {
  form = new FormGroup({});
  acceptForm = new FormGroup({});

  constructor(
    public mailBoxContentService: MailBoxContentService,
    public serviceAuth: ServiceAuth,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {}

  addMailBox(): void {
    this.serviceAuth.reqMailBox(this.form.value);
  }
  acceptMailBox(): void {
    this.serviceAuth.accMailBox(this.acceptForm.value);
  }
}
