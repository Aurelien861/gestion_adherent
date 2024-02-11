import {Member} from "./member.model";

export interface Group {
  id?: string;
  number?: string;
  name?: string;
  city?: string;
  cp?: number;
  members?: string[];
  [key: string]: any;
}
