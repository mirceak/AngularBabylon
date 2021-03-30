import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReferralContentService } from '@custom/components/pages/home/services/referral-content.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-referral-content',
  templateUrl: './referral-content.component.html',
  styleUrls: ['./referral-content.component.scss'],
})
export class ReferralContentComponent implements OnInit {
  form = new FormGroup({});

  constructor(
    public referralContentService: ReferralContentService,
    public serviceAuth: ServiceAuth,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {}

  referr(): void {
    this.serviceAuth.reqSignup(this.form.value);
  }
}
