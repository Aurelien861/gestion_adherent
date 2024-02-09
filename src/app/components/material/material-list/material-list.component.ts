import { Component } from '@angular/core';
import {MenuComponent} from "../../menu/menu.component";

@Component({
  selector: 'app-material-list',
  standalone: true,
    imports: [
        MenuComponent
    ],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.scss'
})
export class MaterialListComponent {

}
