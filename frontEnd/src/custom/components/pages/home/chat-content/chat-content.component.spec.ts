// tslint:disable
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatContentComponent } from './chat-content.component';
import { ChatContentService } from '../services/chat-content.service';
import { ProviderMailBox } from '@custom/entities/mailBox/provider/provider.mailBox';
import { ProviderIdentity } from '@custom/entities/identity/provider/provider.identity';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
class MockChatContentService {}

@Injectable()
class MockTranslateService {
  translate() {}
  instant() {}
}
@Injectable()
class MockProviderMailBox {
  sendMessage() {}
}

@Injectable()
class MockProviderIdentity {}

@Injectable()
class MockActivatedRoute {}

describe('ChatContentComponent', () => {
  let fixture: ComponentFixture<ChatContentComponent>;
  let component: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ChatContentComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ChatContentService, useClass: MockChatContentService },
        { provide: ProviderMailBox, useClass: MockProviderMailBox },
        { provide: ProviderIdentity, useClass: MockProviderIdentity },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: TranslateService, useClass: MockTranslateService },
      ],
    })
      .overrideComponent(ChatContentComponent, {
        set: {
          providers: [
            { provide: ChatContentService, useClass: MockChatContentService },
          ],
        },
      })
      .compileComponents();
    fixture = TestBed.createComponent(ChatContentComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function () {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #scrollToBottom()', async () => {
    component.scroller = component.scroller || {};
    component.scroller.nativeElement = {
      scrollTop: {},
    };
    component.scrollToBottom();
  });

  it('should run #trackByFn()', async () => {
    expect(
      component.trackByFn(
        {},
        {
          timeStamp: {},
        }
      )
    ).toBeTruthy();
  });

  it('should run #send()', async () => {
    component.providerIdentity = component.providerIdentity || {};
    component.providerIdentity.serviceSocket = {
      serviceApi: {
        serviceModals: {
          showLoading: function () {},
          showToast: function () {},
          hideLoading: function () {},
        },
        translate: {
          instant: function () {},
        },
      },
    };
    component.translate = component.translate || {};
    spyOn(component.translate, 'instant');
    component.providerMailBox = component.providerMailBox || {};
    spyOn(component.providerMailBox, 'sendMessage').and.returnValue({
      then: function () {
        return {
          catch: function () {
            return [null];
          },
        };
      },
    });
    component.providerMailBox.mailBoxObservable = {
      value: {},
    };
    component.form = component.form || {};
    component.form.value = 'value';
    await component.send();
    expect(component.translate.instant).toHaveBeenCalled();
    expect(component.providerMailBox.sendMessage).toHaveBeenCalled();
  });
});
