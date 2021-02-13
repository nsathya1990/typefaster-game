import { Component, Input, OnInit } from '@angular/core';

import User from '../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() currentUser: User = null;
  constructor() {}

  ngOnInit(): void {}
}
