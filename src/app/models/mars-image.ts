import {Camera} from './camera';
import {MarsRover} from './mars-rover';

export class MarsImage {
 id: number;
 sol: number;
 camera: Camera;
 src: string;
 earthDate: Date;
 rover: MarsRover;
}
