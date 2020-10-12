export class Camera {
   constructor(id: number, name: string, roverId: number, fullName: string) {
    this.id = id;
    this.name = name;
    this.rover_id = roverId;
    this.full_name = fullName;
  }

  id: number;
  name: string;
  // tslint:disable-next-line:variable-name
  rover_id: number;
  // tslint:disable-next-line:variable-name
  full_name: string;
}
