import {Photo} from './photo';

export class PhotoManifest {
  name: string;
  // tslint:disable-next-line:variable-name
  landing_date: Date;
  // tslint:disable-next-line:variable-name
  launch_date: Date;
  status: string;
  // tslint:disable-next-line:variable-name
  max_sol: number;
  // tslint:disable-next-line:variable-name
  max_date: Date;
  // tslint:disable-next-line:variable-name
  total_photos: number;
  photos: Photo[];
}
