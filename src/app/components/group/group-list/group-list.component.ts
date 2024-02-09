import { Component } from '@angular/core';
import {MenuComponent} from "../../menu/menu.component";

@Component({
  selector: 'app-group-list',
  standalone: true,
    imports: [
        MenuComponent
    ],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss'
})
export class GroupListComponent {

}
