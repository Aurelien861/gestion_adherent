import {Component, OnInit, ViewChild} from '@angular/core';
import {MemberService} from "../../../services/member-service";
import {Table, TableModule} from "primeng/table";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {RatingModule} from "primeng/rating";
import {TagModule} from "primeng/tag";
import { FormsModule } from '@angular/forms';
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";

export interface Member {
  id?: string;
  name?: string;
  firstname?: string;
  address?: Address;
  city?: string;
  email?: string;
  [key: string]: any;
}

export interface Address {
  id?: string;
  number: number;
  street: string;
  city: string;
  cp: number;
  [key: string]: any;
}

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    TableModule,
    CurrencyPipe,
    RatingModule,
    TagModule,
    FormsModule,
    NgForOf,
    NgIf,
    RippleModule,
    ButtonModule,
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit{

  @ViewChild('dt') dataTable?: Table;
  members : Member[] = [];
  loading: boolean = true;
  columns: any[] = [];

  constructor(private membersService: MemberService) {}

  ngOnInit() {
    this.columns = [
      { field: 'name', header: 'Nom', pSortableColumn: 'name', visible: true, frozen: true },
      { field: 'firstname', header: 'Prénom', pSortableColumn: 'firstname', visible: true},
      { field: 'address', header: 'Adresse', pSortableColumn: 'address', visible: true},
      { field: 'number', header: 'Numéro', pSortableColumn: 'number', visible: false},
      { field: 'street', header: 'Rue', pSortableColumn: 'street', visible: false},
      { field: 'city', header: 'Ville', pSortableColumn: 'city', visible: false},
      { field: 'email', header: 'Email', pSortableColumn: 'email', visible: true},
      { field: 'buttons', header: '', visible: true}
    ];
    this.membersService.getMembersDataPromise().then((members) => {
      for(let member of members){
        this.members.push({...member, city: member.address.city})
      }
      this.loading = false;
      this.dataTable?.reset();
    });
  }

  onSort(event: any) {
    this.members.sort((a, b) => {
      const field = event.field === 'address' ? 'city' : event.field;
      const value1 = a[field].toLowerCase();
      const value2 = b[field].toLowerCase();

      if (value1 === null || value1 === undefined) return 1;
      if (value2 === null || value2 === undefined) return -1;

      return (event.order * (value1 < value2 ? -1 : 1));
    });
  }

  editMember(member: Member) {

  }

  deleteMember(member: Member) {

  }

}
