import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReferralContentService } from '@custom/components/pages/home/services/referral-content.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { ServiceInternationalization } from '@custom/services/utils/service.internationalization';

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
    public internationalization: ServiceInternationalization
  ) {}

  ngOnInit(): void {}

  referr(): void {
    this.serviceAuth.reqSignup(this.form.value);
  }
}
