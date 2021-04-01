import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MailBoxContentService } from '@custom/components/pages/home/services/mailBox-content.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { ServiceModals } from '@custom/services/utils/service.modals';
import { TranslateService } from '@ngx-translate/core';

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
    public translate: TranslateService,
    private serviceModals: ServiceModals
  ) {}

  ngOnInit(): void {}

  async addMailBox() {
    await this.serviceAuth.reqMailBox(this.form.value);

    this.serviceModals.showToast({
      icon: 'success',
      title: this.translate.instant('pages.mailBox.created'),
    });
  }
  async acceptMailBox() {
    await this.serviceAuth.accMailBox(this.acceptForm.value);

    this.serviceModals.showToast({
      icon: 'success',
      title: this.translate.instant('pages.mailBox.accepted'),
    });
  }
}
