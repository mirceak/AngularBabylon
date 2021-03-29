import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-form-simple',
  templateUrl: './page-form-simple.component.html',
  styleUrls: ['./page-form-simple.component.scss'],
})
export class PageFormSimpleComponent {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Input() form: FormGroup;
  @Input() fields: [FormlyFieldConfig];
  @Input() submitLabel: string;
  @Input() submitIcon: string;
  @Input() submitDisabled: boolean;

  constructor() {}

  emitSubmit() {
    this.onSubmit.emit();
    this.fields.forEach((field)=>{
      field.options.resetModel();
    })
  }
}
