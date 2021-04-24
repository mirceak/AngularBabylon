import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MailBoxContentService } from '@custom/components/pages/home/services/mailBox-content.service';
import { ProviderMailBox } from '@custom/entities/mailBox/provider/provider.mailBox';
import { ServiceApi } from '@custom/services/utils/service.api';
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
    public serviceApi: ServiceApi
  ) {}

  ngOnInit(): void {}

  async addMailBox() {
    this.serviceApi.serviceModals.showLoading({
      title: this.translate.instant('components.swal.loading'),
      html: this.translate.instant('pages.mailBox.creating'),
    });
    await this.ProviderMailBox.reqMailBox(this.form.value)
      .then(() => {
        this.serviceApi.serviceModals.showToast({
          status: 'success',
          statusMessage: this.serviceApi.translate.instant(
            'components.toastr.success'
          ),
          title: this.serviceApi.translate.instant('pages.mailBox.created'),
        });
        this.serviceApi.serviceModals.hideLoading();
      })
      .catch((error) => {
        //handled as toast in services/utils/service.http.ts
      });
  }
  async acceptMailBox() {
    this.serviceApi.serviceModals.showLoading({
      title: this.translate.instant('components.swal.loading'),
      html: this.translate.instant('pages.mailBox.acceptingMailBox'),
    });
    await this.ProviderMailBox.accMailBox(this.acceptForm.value)
      .then(() => {
        this.serviceApi.serviceModals.showToast({
          status: 'success',
          statusMessage: this.serviceApi.translate.instant(
            'components.toastr.success'
          ),
          title: this.serviceApi.translate.instant('pages.mailBox.accepted'),
        });
        this.serviceApi.serviceModals.hideLoading();
      })
      .catch((error) => {
        //handled as toast in services/utils/service.http.ts
      });
  }
}
