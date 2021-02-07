import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceAuth } from '@custom/services/auth/service.auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private serviceAuth: ServiceAuth,
    private router: Router,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    if (this.serviceAuth.currentUser) {
      this.zone.run(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
