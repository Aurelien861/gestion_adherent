import { Component } from '@angular/core';
import {PasswordModule} from "primeng/password";
import {DividerModule} from "primeng/divider";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [
    PasswordModule,
    DividerModule,
    FormsModule
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {

  password!: string;

}
