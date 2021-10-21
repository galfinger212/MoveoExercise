import { Component, OnInit } from '@angular/core';

@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  sideBarOpen = false;
  constructor() { }

  onClick(event: any) {
    if (event.target !== document.getElementById('menuIcon') && event.target !== document.getElementById('menuButton')) {
      if (this.sideBarOpen)
        this.sideBarOpen = !this.sideBarOpen;
    }
  }

  ngOnInit(): void {
  }
  sideBarToggle() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
