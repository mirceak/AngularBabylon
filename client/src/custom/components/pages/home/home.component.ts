import { Component, OnInit } from '@angular/core';
import { UserService } from '@custom/entities/user/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data) => console.log(111, data),
      (error) => console.log(error),
      () => console.log('done')
    );
  }
}
