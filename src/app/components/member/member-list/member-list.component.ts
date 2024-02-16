import {Component, OnInit, ViewChild} from '@angular/core';
import {MemberService} from "../../../services/member-service";
import {Table, TableModule} from "primeng/table";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {RatingModule} from "primeng/rating";
import {TagModule} from "primeng/tag";
import { FormsModule } from '@angular/forms';
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {StyleClassModule} from "primeng/styleclass";
import {AutoFocusModule} from "primeng/autofocus";
import {Member} from "../../../models/member.model";
import {MenuComponent} from "../../menu/menu.component";
import {RouterOutlet} from "@angular/router";
import {DialogModule} from "primeng/dialog";
import {InscriptionComponent} from "../../inscription/inscription.component";
import {EditMemberComponent} from "../edit-member/edit-member.component";
import {RemoveMemberComponent} from "../remove-member/remove-member.component";

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
    StyleClassModule,
    AutoFocusModule,
    MenuComponent,
    RouterOutlet,
    DialogModule,
    InscriptionComponent,
    EditMemberComponent,
    RemoveMemberComponent,
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit{

  @ViewChild('dt') dataTable?: Table
  @ViewChild('inscriptionForm', {read: InscriptionComponent}) inscriptionForm?: InscriptionComponent;
  members : Member[] = [];
  loading: boolean = true;
  columns: any[] = []
  selectedMember?: Member;
  isEditionDialogOpen = false;
  isDeletionDialogOpen = false;
  isInscriptionDialogOpen = false;
  groupId!: string | null;

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
    this.groupId = sessionStorage.getItem('currentGroupId');
    if(this.groupId != null) {
      this.membersService.getMembers(this.groupId).subscribe((members) => {
        for(let rawMember of members){
          const member: Member = this.createMember(rawMember);
          this.members.push({...member, city: member.address.city})
        }
        this.loading = false;
        this.dataTable?.reset();
      });
    }
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

  openInscriptionDialog() {
    this.isInscriptionDialogOpen = true;
  }

  closeInscriptionDialog() {
    this.isInscriptionDialogOpen = false;
    this.inscriptionForm?.reset();
  }

  submitInscriptionForm() {
    if(this.inscriptionForm?.submit()) {
      this.isInscriptionDialogOpen = false;
    }
  }

  openEditionDialog(member: Member) {
    this.selectedMember = member;
    this.isEditionDialogOpen = true;
  }

  closeEditionDialog() {
    this.isEditionDialogOpen = false;
  }

  openDeletionDialog(member: Member) {
    this.selectedMember = member;
    this.isDeletionDialogOpen = true;
  }

  closeDeletionDialog() {
    this.isDeletionDialogOpen = false;
  }

  createMember(rawMember: any): Member {
    const parts = rawMember.adresse?.split(',');
    if(parts && parts.length == 2) {
      const numberAndStreet = parts[0].trim().split(' ');
      if(numberAndStreet && numberAndStreet.length > 1) {
        const numberStr = numberAndStreet[0];
        const number = parseInt(numberStr);
        const street = parts[0].replace(numberStr, '').trim();
        const cpAndCity = parts[1].trim().split(' ');
        if(cpAndCity && cpAndCity.length == 2){
          const cp = parseInt(cpAndCity[0]);
          const city = cpAndCity[1];
          return {
            name: rawMember.nom,
            firstname: rawMember.prenom,
            address: {
              number: number,
              street: street,
              city: city,
              cp: cp
            },
            email: rawMember.email
          }
        }
      }
    }
    return {address:{}};
  }
}
