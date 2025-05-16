import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  
  ngOnInit(): void {
  throw new Error('Method not implemented.');
}

isCollapsed = false;

toggleMenu() {
  this.isCollapsed = !this.isCollapsed;
}

}
