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

  constructor(
    public serviceAuth: ServiceAuth,
    public translate: TranslateService,
    public internationalization: ServiceInternationalization,
    private serviceModals: ServiceModals,
    private zone: NgZone,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  logout() {
    this.serviceAuth.logout();

    this.serviceModals.showToast({
      icon: 'success',
      title: this.translate.instant('pages.login.loggedOut'),
    });
  }

  onChangeLang($event) {
    this.internationalization.setLanguage($event);
    this.changeDetectorRef.detectChanges();

    this.waitForLanguage = setInterval(() => {
      if (this.translate.store.translations[this.internationalization.lang]) {
        clearInterval(this.waitForLanguage);
        this.serviceModals.showToast({
          icon: 'success',
          title: this.translate.instant('components.nav.changedLang'),
        });
      }
    }, 5);
  }

  onChangeNav() {
    this.changedNav.emit(null);
  }
}
