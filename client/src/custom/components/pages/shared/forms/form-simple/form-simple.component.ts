import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-form-simple',
  templateUrl: './form-simple.component.html',
  styleUrls: ['./form-simple.component.scss']
})
export class FormSimpleComponent {
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Input() form: FormGroup;
  @Input() fields: [FormlyFieldConfig];
  @Input() submitLabel: string;
  @Input() submitIcon: string;

  constructor() { }

}
