import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
export declare class LayoutSimpleComponent implements OnDestroy {
    mobileQuery: MediaQueryList;
    private _mobileQueryListener;
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher);
    ngOnDestroy(): void;
}
//# sourceMappingURL=layout-simple.component.d.ts.map