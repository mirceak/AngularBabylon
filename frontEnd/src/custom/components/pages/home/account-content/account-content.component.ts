import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountContentService } from '@custom/components/pages/home/services/account-content.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { ServiceModals } from '@custom/services/utils/service.modals';
import { TranslateService } from '@ngx-translate/core';
import { ServiceApi } from '@custom/services/utils/service.api';
import { ProviderIdentity } from '@custom/entities/identity/provider/provider.identity';

@Component({
  selector: 'app-referral-content',
  templateUrl: './account-content.component.html',
  styleUrls: ['./account-content.component.scss'],
  providers: [AccountContentService],
})
export class AccountContentComponent implements OnInit {
  form = new FormGroup({});

  constructor(
    public accountContentService: AccountContentService,
    public serviceAuth: ServiceAuth,
    public serviceApi: ServiceApi,
    public translate: TranslateService,
    public serviceModals: ServiceModals,
    public providerIdentity: ProviderIdentity
  ) {}

  ngOnInit(): void {}

  async updateAccount(): Promise<any> {
    this.serviceModals.showLoading({
      title: this.translate.instant('components.swal.loading'),
      html: this.translate.instant('pages.account.updating'),
    });
    await this.providerIdentity.updateAccount(this.form.value)
      .then(() => {
        this.providerIdentity.recycleBin.next(this.providerIdentity.state);
        this.serviceModals.showToast({
          status: 'success',
          statusMessage: this.translate.instant('components.toastr.success'),
          title: this.translate.instant('pages.account.updated'),
        });
      })
      .catch((error) => {
        // handled as toast in services/utils/service.http.ts
      });
  }
}
