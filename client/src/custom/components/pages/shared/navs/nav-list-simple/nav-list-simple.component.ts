import { Component, OnInit } from '@angular/core';
import { ServiceAuth } from '@custom/services/auth/service.auth';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list-simple.component.html',
  styleUrls: ['./nav-list-simple.component.scss']
})
export class NavListSimpleComponent implements OnInit {

  constructor(public serviceAuth: ServiceAuth) { }

  ngOnInit(): void {
  }

}
