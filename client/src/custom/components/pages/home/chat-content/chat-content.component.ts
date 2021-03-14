import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatContentService } from '@custom/components/pages/home/services/chat-content.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss'],
})
export class ChatContentComponent implements OnInit {
  form = new FormGroup({});
  mailBox = null;

  constructor(
    public chatContentService: ChatContentService,
    private serviceAuth: ServiceAuth,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mailBox = this.serviceAuth.mailBoxes.filter((current) => {
      return current._id == this.route.snapshot.params._id;
    })[0];
    console.log(this.mailBox);
  }

  mailBoxSorter(a, b) {
    return a.timeStamp<b.timeStamp
  }

  send(): void {
    this.serviceAuth.sendMessage(this.form.value, this.mailBox);
  }
}
