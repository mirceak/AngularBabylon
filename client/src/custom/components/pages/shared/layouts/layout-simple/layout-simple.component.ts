import { MediaMatcher } from '@angular/cdk/layout';
import { AfterContentInit, AfterViewChecked, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceInternationalization } from '@custom/services/utils/service.internationalization';

@Component({
  selector: 'app-layout-simple',
  templateUrl: './layout-simple.component.html',
  styleUrls: ['./layout-simple.component.scss'],
})
export class LayoutSimpleComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  startedSession = false;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public router: Router, public internationalization: ServiceInternationalization) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", this._mobileQueryListener);
  }

  changedNav(snav) {
    this.startedSession = true;
    snav.toggle();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("change", this._mobileQueryListener);
  }
}
