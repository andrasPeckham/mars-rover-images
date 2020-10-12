import {Camera} from '../camera';
import {MarsRover} from '../RoverResult/mars-rover';

export class MarsImage {
 id: number;
 sol: number;
 camera: Camera;
  // tslint:disable-next-line:variable-name
 img_src: string;
  // tslint:disable-next-line:variable-name
 earth_date: Date;
 rover: MarsRover;
}
