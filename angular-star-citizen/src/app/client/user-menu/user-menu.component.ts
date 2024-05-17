import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent {
  constructor(private router: Router) { }
}
