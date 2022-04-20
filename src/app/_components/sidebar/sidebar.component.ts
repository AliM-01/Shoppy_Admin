import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  route: string;

  constructor(location: Location, router: Router) {
    this.route = router.url;
    router.events.subscribe(() => {
      if (location.path() != "") {
        this.route = location.path().toString();

      } else {
        this.route = "";
      }
    });
  }

}
