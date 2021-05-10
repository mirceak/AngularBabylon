// tslint:disable
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageSimpleComponent } from './page-simple.component';

describe('PageSimpleComponent', () => {
  let fixture: ComponentFixture<PageSimpleComponent>;
  let component: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [PageSimpleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [],
    })
      .overrideComponent(PageSimpleComponent, {})
      .compileComponents();
    fixture = TestBed.createComponent(PageSimpleComponent);
    component = fixture.debugElement.componentInstance;
  });
  
  afterEach(() => {
    component.ngOnDestroy = function () {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    expect(component.ngOnInit()).toBeUndefined();
  });
});
