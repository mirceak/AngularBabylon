import { Component, OnInit } from '@angular/core';
import { ServiceInternationalization } from '@custom/services/utils/service.internationalization';
@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {

  constructor(public internationalization: ServiceInternationalization) { }

  ngOnInit(): void {
  }

}
