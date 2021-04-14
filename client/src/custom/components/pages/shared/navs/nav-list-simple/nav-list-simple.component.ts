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
import { ProviderUser } from '@custom/entities/user/provider/provider.user';

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
    public ProviderUser: ProviderUser
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

  onChangeLang($event) {
    this.serviceModals.showLoading({
      title: this.translate.instant('components.swal.loading'),
      html: this.translate.instant('components.nav.changingLang'),
    });
    this.langObserver = this.internationalization.setLanguage($event.value);
    $event.source.value = 'null';
    if (this.langObserver) {
      this.langObserver.toPromise().then((lang) => {
        this.serviceModals.showToast({
          status: 'success',
          statusMessage: this.translate.instant('components.toastr.success'),
          title: this.translate.instant('components.nav.changedLang'),
        });
        this.serviceModals.hideLoading();
      });
    }
  }

  onChangeNav() {
    this.changedNav.emit(null);
  }
}
