import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidbarForme: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  //open a side bar
  toggleSidebar() {
    this.toggleSidbarForme.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 200);
  }
}
