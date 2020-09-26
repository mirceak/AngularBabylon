import { Component, OnInit } from '@angular/core';
import { ServiceUser } from '@custom/entities/user/service/service.user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private serviceUser: ServiceUser) {}

  ngOnInit(): void {
    this.serviceUser.getEntities().subscribe(
      (data) => console.log(111, data),
      (error) => console.log(error),
      () => console.log('done')
    );
  }
}
