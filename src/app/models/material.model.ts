export interface Material {
  id?: string;
  brand: string;
  model: string;
  type: string;
  price: number;
  [key: string]: any;
}
