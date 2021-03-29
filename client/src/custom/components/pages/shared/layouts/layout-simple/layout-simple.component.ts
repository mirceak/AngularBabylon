import { MediaMatcher } from '@angular/cdk/layout';
import { AfterContentInit, AfterViewChecked, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-simple',
  templateUrl: './layout-simple.component.html',
  styleUrls: ['./layout-simple.component.scss'],
})
export class LayoutSimpleComponent implements OnDestroy, AfterViewChecked {
  mobileQuery: MediaQueryList;
  startedSession = true;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", this._mobileQueryListener);
  }

  ngAfterViewChecked(): void {
    this.startedSession = true;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("change", this._mobileQueryListener);
  }
}
