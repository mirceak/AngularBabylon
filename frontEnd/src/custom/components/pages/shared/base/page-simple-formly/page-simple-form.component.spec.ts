// tslint:disable
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageFormSimpleComponent } from './page-simple-form.component';

describe('PageFormSimpleComponent', () => {
  let fixture: ComponentFixture<PageFormSimpleComponent>;
  let component: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [PageFormSimpleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [],
    })
      .overrideComponent(PageFormSimpleComponent, {})
      .compileComponents();
    fixture = TestBed.createComponent(PageFormSimpleComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function () {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #emitSubmit()', async () => {
    spyOn(component.forSubmit, 'emit');
    component.fields = [];
    component.emitSubmit();
    expect(component.forSubmit.emit).toHaveBeenCalled();
  });
});
