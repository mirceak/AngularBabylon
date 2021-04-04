import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MailBoxContentService } from '@custom/components/pages/home/services/mailBox-content.service';
import { ProviderMailBox } from '@custom/entities/mailBox/provider/provider.mailBox';
import { ServiceApi } from '@custom/services/utils/service.api';
import { ServiceModals } from '@custom/services/utils/service.modals';
import { TranslateService } from '@ngx-translate/core';

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
    public ProviderMailBox: ProviderMailBox,
    public translate: TranslateService,
    private serviceModals: ServiceModals,
    public serviceApi: ServiceApi
  ) {}

  ngOnInit(): void {}

  async addMailBox() {
    this.serviceModals.showLoading({
      title: this.translate.instant('components.swal.loading'),
      html: this.translate.instant('pages.mailBox.creating'),
    });
    await this.ProviderMailBox.reqMailBox(this.form.value);

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
    await this.ProviderMailBox.accMailBox(this.acceptForm.value);

    this.serviceModals.hideLoading();
    this.serviceModals.showToast({
      status: 'success',
      statusMessage: this.translate.instant('components.toastr.success'),
      title: this.translate.instant('pages.mailBox.accepted'),
    });
  }
}
