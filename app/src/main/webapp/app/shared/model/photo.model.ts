import { Moment } from 'moment';
import { IAlbum } from 'app/shared/model/album.model';
import { ITag } from 'app/shared/model/tag.model';

export interface IPhoto {
  id?: number;
  title?: string;
  description?: any;
  imageContentType?: string;
  image?: any;
  taken?: Moment;
  album?: IAlbum;
  tags?: ITag[];
}

export class Photo implements IPhoto {
  constructor(
    public id?: number,
    public title?: string,
    public description?: any,
    public imageContentType?: string,
    public image?: any,
    public taken?: Moment,
    public album?: IAlbum,
    public tags?: ITag[]
  ) {}
}
