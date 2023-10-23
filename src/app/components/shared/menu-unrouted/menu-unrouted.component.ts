import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-unrouted',
  templateUrl: './menu-unrouted.component.html',
  styleUrls: ['./menu-unrouted.component.css']
})
export class MenuUnroutedComponent implements OnInit {

  items: any[];

  constructor() {
    this.items = [
      {
        label: 'Home',
        routerLink: '/home'
      },
      {
        label: 'User List',
        routerLink: '/admin/user/plist'
      },
      {
        label: 'Thread List',
        routerLink: 'admin/thread/plist'
      },
      {
        label: 'Reply List',
        routerLink: 'admin/reply/plist'
      }
    ];
  }
  ngOnInit() {
  }

}

