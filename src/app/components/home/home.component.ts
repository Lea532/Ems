import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router:Router) {
  }
  ems() {
    this.router.navigate(['/overview']);
  }
}
