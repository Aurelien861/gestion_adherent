export interface Address {
  id?: string;
  number: number;
  street: string;
  city: string;
  cp: number;
  [key: string]: any;
}
