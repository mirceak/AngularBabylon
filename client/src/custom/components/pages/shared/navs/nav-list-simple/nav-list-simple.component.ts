import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { ServiceInternationalization } from '@custom/services/utils/service.internationalization';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list-simple.component.html',
  styleUrls: ['./nav-list-simple.component.scss'],
})
export class NavListSimpleComponent implements OnInit {
  @Output() changedNav: EventEmitter<any> = new EventEmitter();

  constructor(
    public serviceAuth: ServiceAuth,
    public internationalization: ServiceInternationalization
  ) {}

  ngOnInit(): void {}

  onChangeNav() {
    this.changedNav.emit(null);
  }
}
