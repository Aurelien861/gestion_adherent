import {Component, OnInit} from '@angular/core';
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {InputTextModule} from "primeng/inputtext";
import { FormBuilder, Validators } from '@angular/forms';
import {regexValidator} from "../../../services/regexValidator.service";
import {MemberService} from "../../../services/member-service";
import {DropdownModule} from "primeng/dropdown";
import {Group} from "../../../models/group.model";
import {GroupService} from "../../../services/group-service";
import {SelectButtonModule} from "primeng/selectbutton";
import {InputNumberModule} from "primeng/inputnumber";
import {NgIf} from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";



@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    PasswordModule,
    ButtonModule,
    TooltipModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    SelectButtonModule,
    InputNumberModule,
    NgIf
  ],
  templateUrl: './inscription-form.component.html',
  styleUrl: './inscription-form.component.scss'
})
export class InscriptionFormComponent implements OnInit{

  groups : Group[] = [];
  groupNames!: string[];
  missGroup = false;

  inscriptionForm = this.fb.group({
    firstName: ['test', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
    lastName: ['test', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
    email: ['test@test.fr', Validators.required, regexValidator(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)],
    address: this.fb.group({
      number: [12, Validators.required, regexValidator(/^\d{1,4}[A-Za-z]{0,3}$/)],
      street: ['test', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
      city: ['test', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
      cp: [56789, Validators.required, regexValidator(/^\d{5}$/)]
    }),
    group:['', Validators.required],
    password: ['123456789Ab', Validators.required, [regexValidator(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]],
    memberType: new FormControl('Client')
  });

  statusOptions: any[] = [
    { label: 'Client', value: 'Client' },
    { label: 'Actif', value: 'Actif' }
  ];


  constructor(private fb: FormBuilder,
              private memberService: MemberService,
              private groupService: GroupService,
              private auth: AuthService,
              private router: Router) { };

  public ngOnInit() {
    this.groupService.getGroups().subscribe(groups => {
      for(let group of groups){
        this.groups.push(this.groupService.parseGroup(group));
      }
      this.groupNames = groups
        .filter((group: { nomGroupe: undefined; }) => group.nomGroupe !== undefined)
        .map((group: { nomGroupe: any; }) => group.nomGroupe!);
    });
  }

  submit(): boolean {
    if(this.inscriptionForm && this.inscriptionForm.valid) {
      const email = this.inscriptionForm.get('email')?.value;
      const number = this.inscriptionForm.get('address')?.get('number')?.value;
      const street = this.inscriptionForm.get('address')?.get('street')?.value;
      const cp = this.inscriptionForm.get('address')?.get('cp')?.value;
      const city = this.inscriptionForm.get('address')?.get('city')?.value;
      const firstname = this.inscriptionForm.get('firstName')?.value;
      const password = this.inscriptionForm.get('password')?.value;
      const name = this.inscriptionForm.get('lastName')?.value;
      const memberType = this.inscriptionForm.get('memberType')?.value;
      const groupName = this.inscriptionForm.get('group')?.value;
      let groupId = undefined;
      if(groupName) {
        groupId = this.groups.find((group) => group.name === groupName)?.id;
      }
      if(email && number && street && city && cp && city && firstname && password && name && groupId && memberType) {
        this.memberService.signIn({
          address: {
            number: number,
            street: street,
            cp: cp,
            city: city,
          },
          city: city,
          email: email,
          firstname: firstname,
          password: password,
          name: name,
          groupId: groupId,
          memberType: memberType
        }).subscribe( member => {
          const email = this.inscriptionForm.get('email')?.value;
          const password = this.inscriptionForm?.get('password')?.value;
          if(email && password) {
            this.auth.login(email, password).then(response => {
              console.log(email)
              console.log(password)
              if(response) {
                this.router.navigateByUrl('material-list');
              }
            });
          }
          }
        );
      }
      this.missGroup = false;
      return true;
    } else {
      if(this.inscriptionForm.get('group')?.value == '') {
        this.missGroup = true;
      }
      return false;
    }
  }

  reset() {
    this.inscriptionForm.reset();
  }

}
