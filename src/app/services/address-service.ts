import {Injectable} from "@angular/core";
import {Address} from "../models/address.model";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  addressToString(address: Address): string {
    return address.number + ' ' + address.street + ', ' + address.cp + ' ' + address.city;
  }
}
