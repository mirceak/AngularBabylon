import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-form-simple',
  templateUrl: './page-simple-form.component.html',
  styleUrls: ['./page-simple-form.component.scss'],
})
export class PageFormSimpleComponent {
  @Output() forSubmit: EventEmitter<any> = new EventEmitter();
  @Input() form!: FormGroup;
  @Input() fields!: FormlyFieldConfig[];
  @Input() submitLabel!: string;
  @Input() submitIcon!: string;
  @Input() submitDisabled!: boolean;

  constructor() {}

  emitSubmit(): void {
    this.forSubmit.emit();
    this.fields.forEach((field: any) => {
      field.options.resetModel();
    });
  }
}
