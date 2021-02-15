import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReferralContentService } from '@custom/components/pages/home/services/referral-content.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';

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
    public serviceAuth: ServiceAuth
  ) {}

  ngOnInit(): void {}

  referr(): void {
    this.serviceAuth.reqSignup(this.form.value);
  }
}
