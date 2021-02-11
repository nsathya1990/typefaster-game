import { Component, Input, OnInit } from '@angular/core';

import User from '../../models/User';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  @Input() user: User;

  constructor() {}

  ngOnInit(): void {}

}
