import {Item} from './Item';

export interface User {
  objectID: string;
  email: string;
  password: string;
  name: string;
  firstname: string;
  address: string;
  roles: string;
  roleList: string[];
  login: string;
  nbPoints: number;
  banned: boolean;
  favoriteItems: Item[];
  givenItems: string[];
  takenItems: string[];
}
