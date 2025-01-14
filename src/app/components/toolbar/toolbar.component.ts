import { Component } from '@angular/core';
import {MaterialModule} from "../../material/material.module";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  constructor(private keycloak: KeycloakService) {
  }

  logout(){
    this.keycloak.logout();
  }
}
