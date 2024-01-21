import {Component, OnInit, Renderer2, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenubarModule} from "primeng/menubar";
import { MenuItem } from 'primeng/api';
import {TabMenuModule} from "primeng/tabmenu";
import {ButtonModule} from "primeng/button";
import {SplitButtonModule} from "primeng/splitbutton";
import {AvatarModule} from "primeng/avatar";
import {MenuModule} from "primeng/menu";
import {PanelMenuModule} from "primeng/panelmenu";
import {MemberListComponent} from "../member/member-list/member-list.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenubarModule,
    MenubarModule,
    TabMenuModule,
    CommonModule,
    ButtonModule,
    SplitButtonModule,
    AvatarModule,
    MenuModule,
    PanelMenuModule,
    MemberListComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  @ViewChild('profileMenu', { read: ElementRef }) profileMenu?:ElementRef;
  @ViewChild('profileMenuButton', { read: ElementRef }) profileMenuButton?:ElementRef;
  tabs?: MenuItem[];
  profileMenuItems?: MenuItem[];
  firstName = 'Aurelien';
  lastName = 'Dufour';
  showProfileMenu = false;

  activeTab?: MenuItem;

  constructor(private renderer: Renderer2) { }


  ngOnInit() {
    this.tabs = [
      { label: 'Membres', icon: 'pi pi-fw pi-user' },
      { label: 'Groupes', icon: 'pi pi-fw pi-users' },
      { label: 'Matériel', icon: 'pi pi-fw pi-truck' }
    ];

    this.profileMenuItems = [
      {
        label: 'Se connecter',
      }
    ];

    this.activeTab = this.tabs[0];

    this.renderer.listen('document', 'click', (event) => {
      if (!this.profileMenu?.nativeElement.contains(event.target) && !this.profileMenuButton?.nativeElement.contains(event.target)) {
        this.showProfileMenu = false;
      }
    });
  }

  onProfileMenuButtonClick() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  onActiveItemChange(event: MenuItem) {
    this.activeTab = event;
  }

}
