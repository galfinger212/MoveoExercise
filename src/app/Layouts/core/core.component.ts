import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  sideBarOpen = false;
  constructor() { }

  ngOnInit(): void {
  }
  sideBarToggle()
  {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
