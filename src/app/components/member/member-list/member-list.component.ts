import {Component, OnInit} from '@angular/core';
import {MemberService} from "../../../services/member-service";
import {ConfirmationService, MessageService} from "primeng/api";
import {TableModule} from "primeng/table";
import {CurrencyPipe} from "@angular/common";
import {RatingModule} from "primeng/rating";
import {TagModule} from "primeng/tag";
import { FormsModule } from '@angular/forms';

export interface Member {
  id?: string;
  name?: string;
  firstname?: string;
  address?: Address;
  email?: string;
}

export interface Address {
  id?: string;
  number?: number;
  street?: string;
  city?: string;
  cp?: number
}

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    TableModule,
    CurrencyPipe,
    RatingModule,
    TagModule,
    FormsModule
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit{

  members! : Member[];
  loading: boolean = true;

  constructor(private membersService: MemberService) {}

  ngOnInit() {
    this.membersService.getMembersDataPromise().then((members) => {
      this.members = members;
      this.loading = false;
    });
  }


}
