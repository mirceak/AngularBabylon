import { Component, OnInit } from '@angular/core';
import { EntityServiceUser } from '@custom/entities/user/service/entity.service.user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private entityServiceUser: EntityServiceUser) {}

  ngOnInit(): void {
    this.entityServiceUser.getEntities().subscribe(
      (data) => console.log(111, data),
      (error) => console.log(error),
      () => console.log('done')
    );
  }
}
