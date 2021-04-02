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
    this.serviceModals.showLoading({
      title: this.translate.instant('components.swal.loading'),
      html: this.translate.instant('pages.mailBox.creating'),
    });
    await this.serviceAuth.reqMailBox(this.form.value);

    this.serviceModals.hideLoading();
    this.serviceModals.showToast({
      status: 'success',
      statusMessage: this.translate.instant('components.toastr.success'),
      title: this.translate.instant('pages.mailBox.created'),
    });
  }
  async acceptMailBox() {
    this.serviceModals.showLoading({
      title: this.translate.instant('components.swal.loading'),
      html: this.translate.instant('pages.mailBox.accepting'),
    });
    await this.serviceAuth.accMailBox(this.acceptForm.value);

    this.serviceModals.hideLoading();
    this.serviceModals.showToast({
      status: 'success',
      statusMessage: this.translate.instant('components.toastr.success'),
      title: this.translate.instant('pages.mailBox.accepted'),
    });
  }
}
