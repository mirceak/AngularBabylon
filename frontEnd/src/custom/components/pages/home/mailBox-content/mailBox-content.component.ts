import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MailBoxContentService } from '@custom/components/pages/home/services/mailBox-content.service';
import { ProviderMailBox } from '@custom/entities/mailBox/provider/provider.mailBox';
import { ServiceApi } from '@custom/services/api/service.api';
import { ServiceModals } from '@custom/services/plugins/service.modals';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-mailbox-content',
  templateUrl: './mailBox-content.component.html',
  styleUrls: ['./mailBox-content.component.scss'],
  providers: [MailBoxContentService],
})
export class MailBoxContentComponent implements OnInit {
  form = new FormGroup({});
  acceptForm = new FormGroup({});

  constructor(
    public mailBoxContentService: MailBoxContentService,
    public providerMailBox: ProviderMailBox,
    public translate: TranslateService,
    public serviceModals: ServiceModals,
    public serviceApi: ServiceApi
  ) {}

  ngOnInit(): void {}

  async addMailBox(): Promise<any> {
    this.serviceModals.showLoading({
      title: this.translate.instant('components.swal.loading'),
      html: this.translate.instant('pages.mailBox.creating'),
    });
    await this.providerMailBox
      .reqMailBox(this.form.value)
      .then((): void => {
        this.serviceModals.showToast({
          status: 'success',
          statusMessage: this.translate.instant('components.toastr.success'),
          title: this.translate.instant('pages.mailBox.created'),
        });
        this.serviceModals.hideLoading();
      })
      .catch((error): void => {
        // handled as toast in services/utils/service.http.ts
      });
  }
  async acceptMailBox(): Promise<any> {
    this.serviceModals.showLoading({
      title: this.translate.instant('components.swal.loading'),
      html: this.translate.instant('pages.mailBox.acceptingMailBox'),
    });
    await this.providerMailBox
      .accMailBox(this.acceptForm.value)
      .then((): void => {
        this.serviceModals.showToast({
          status: 'success',
          statusMessage: this.translate.instant('components.toastr.success'),
          title: this.translate.instant('pages.mailBox.accepted'),
        });
        this.serviceModals.hideLoading();
      })
      .catch((error): void => {
        // handled as toast in services/utils/service.http.ts
      });
  }
}
