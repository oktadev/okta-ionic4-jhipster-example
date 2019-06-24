import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IAlbum {
  id?: number;
  title?: string;
  description?: any;
  created?: Moment;
  user?: IUser;
}

export class Album implements IAlbum {
  constructor(public id?: number, public title?: string, public description?: any, public created?: Moment, public user?: IUser) {}
}
