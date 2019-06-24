import { IPhoto } from 'app/shared/model/photo.model';

export interface ITag {
  id?: number;
  name?: string;
  photos?: IPhoto[];
}

export class Tag implements ITag {
  constructor(public id?: number, public name?: string, public photos?: IPhoto[]) {}
}
