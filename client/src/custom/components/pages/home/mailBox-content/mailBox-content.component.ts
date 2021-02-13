import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MailBoxContentService } from '@custom/components/pages/home/mailBox-content.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';

@Component({
  selector: 'app-mailBox-content',
  templateUrl: './mailBox-content.component.html',
  styleUrls: ['./mailBox-content.component.scss'],
  providers: [MailBoxContentService],
})
export class MailBoxContentComponent implements OnInit {
  form = new FormGroup({});
  acceptForm = new FormGroup({});

  constructor(
    public mailBoxContentService: MailBoxContentService,
    public serviceAuth: ServiceAuth
  ) {}

  ngOnInit(): void {}

  addMailBox(): void {
    this.serviceAuth.reqMailBox(this.form.value);
  }
  acceptMailBox(): void {
    this.serviceAuth.accMailBox(this.acceptForm.value);
  }
}
