import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  NgZone,
  OnInit,
  Output,
} from '@angular/core';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { ServiceInternationalization } from '@custom/services/utils/service.internationalization';
import { ServiceModals } from '@custom/services/utils/service.modals';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list-simple.component.html',
  styleUrls: ['./nav-list-simple.component.scss'],
})
export class NavListSimpleComponent implements OnInit {
  @Output() changedNav: EventEmitter<any> = new EventEmitter();
  waitForLanguage;
  langObserver;

  constructor(
    public serviceAuth: ServiceAuth,
    public translate: TranslateService,
    public internationalization: ServiceInternationalization,
    private serviceModals: ServiceModals,
    private zone: NgZone
  ) {}

  ngOnInit(): void {}

  logout() {
    this.serviceModals
      .confirm({
        html: this.translate.instant('components.swal.confirmChanges', {
          changes: this.translate.instant('services.auth.confirmLogout'),
        }),
        confirmButtonText: this.translate.instant('components.swal.confirm'),
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.serviceAuth.logout();

          this.serviceModals.showToast({
            status: 'success',
            statusMessage: this.translate.instant('components.toastr.success'),
            title: this.translate.instant('pages.login.loggedOut'),
          });
        }
      });
  }

  showToast() {
    this.serviceModals.showToast({
      status: 'success',
      statusMessage: this.translate.instant('components.toastr.success'),
      title: this.translate.instant('components.nav.changedLang'),
    });
    this.serviceModals.hideLoading();
    this.langObserver.unsubscribe();
  }

  onChangeLang($event) {
    this.serviceModals.showLoading({
      title: this.translate.instant('components.swal.loading'),
      html: this.translate.instant('components.nav.changingLang'),
    });
    this.langObserver = this.internationalization
      .setLanguage($event)
      .subscribe(this.showToast.bind(this));
  }

  onChangeNav() {
    this.changedNav.emit(null);
  }
}
