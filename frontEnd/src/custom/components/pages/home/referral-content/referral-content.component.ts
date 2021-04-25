import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReferralContentService } from '@custom/components/pages/home/services/referral-content.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { ServiceModals } from '@custom/services/utils/service.modals';
import { TranslateService } from '@ngx-translate/core';
import { ProviderReferral } from '@custom/entities/referral/provider/provider.referral';
import { ServiceApi } from '@custom/services/utils/service.api';

@Component({
  selector: 'app-referral-content',
  templateUrl: './referral-content.component.html',
  styleUrls: ['./referral-content.component.scss'],
  providers: [ReferralContentService],
})
export class ReferralContentComponent implements OnInit {
  form = new FormGroup({});

  constructor(
    public referralContentService: ReferralContentService,
    public serviceAuth: ServiceAuth,
    public serviceApi: ServiceApi,
    public translate: TranslateService,
    public serviceModals: ServiceModals,
    public providerReferral: ProviderReferral
  ) {}

  ngOnInit(): void {}

  async referr(): Promise<any> {
    this.serviceModals.showLoading({
      title: this.translate.instant('components.swal.loading'),
      html: this.translate.instant('pages.referral.creating'),
    });
    await this.providerReferral.reqSignup(this.form.value)
      .then(() => {
        this.serviceModals.showToast({
          status: 'success',
          statusMessage: this.translate.instant('components.toastr.success'),
          title: this.translate.instant('pages.referral.created'),
        });
        this.serviceApi.serviceModals.hideLoading();
      })
      .catch((error) => {
        // handled as toast in services/utils/service.http.ts
      });
  }
}
