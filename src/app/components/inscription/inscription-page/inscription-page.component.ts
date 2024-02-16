import {Component, OnInit, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {ReactiveFormsModule} from "@angular/forms";
import {InscriptionFormComponent} from "../inscription-form/inscription-form.component";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-inscription-page',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    PasswordModule,
    ReactiveFormsModule,
    InscriptionFormComponent
  ],
  templateUrl: './inscription-page.component.html',
  styleUrl: './inscription-page.component.scss'
})
export class InscriptionPageComponent{

  @ViewChild('inscriptionForm', {read: InscriptionFormComponent}) inscriptionForm?: InscriptionFormComponent;

  constructor() { }
  signIn() {
    this.inscriptionForm?.submit();
  }

}
