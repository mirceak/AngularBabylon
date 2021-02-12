import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContactsContentService } from '@custom/components/pages/home/contacts-content.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';

@Component({
  selector: 'app-contacts-content',
  templateUrl: './contacts-content.component.html',
  styleUrls: ['./contacts-content.component.scss'],
  providers: [ContactsContentService],
})
export class ContactsContentComponent implements OnInit {
  form = new FormGroup({});
  acceptForm = new FormGroup({});

  constructor(
    public contactsContentService: ContactsContentService,
    public serviceAuth: ServiceAuth
  ) {}

  ngOnInit(): void {
  }

  addContact(): void {
    this.serviceAuth.reqContact(this.form.value);
  }
  acceptContact(): void {
    this.serviceAuth.accContact(this.acceptForm.value);
  }
}
