import { Component, OnInit } from '@angular/core';
import { EntityUserService } from '@custom/entities/user/service/entity.user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private entityUserService: EntityUserService) {}

  ngOnInit(): void {
    this.entityUserService.getEntities().subscribe(
      (data) => console.log(111, data),
      (error) => console.log(error),
      () => console.log('done')
    );
  }
}
