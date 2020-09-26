import { Component, OnInit } from '@angular/core';
import { ServiceEntityUser } from '@custom/entities/user/service/service.entity.user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private serviceEntityUser: ServiceEntityUser) {}

  ngOnInit(): void {
    this.serviceEntityUser.getEntities().subscribe(
      (data) => console.log(111, data),
      (error) => console.log(error),
      () => console.log('done')
    );
  }
}
