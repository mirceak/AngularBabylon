import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { ServiceInternationalization } from '@custom/services/utils/service.internationalization';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout-simple',
  templateUrl: './layout-simple.component.html',
  styleUrls: ['./layout-simple.component.scss'],
})
export class LayoutSimpleComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  startedSession = false;

  private mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public router: Router,
    public internationalization: ServiceInternationalization,
    public translate: TranslateService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  changedNav(snav: any): void {
    this.startedSession = true;
    snav.toggle();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
}
