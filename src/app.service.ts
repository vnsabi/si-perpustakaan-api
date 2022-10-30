import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    let stringEx = "Kavi lagi mandi 1231321";

    let numberEx = 3428419
    let booleanEx = false
    let array = [ 123, "Kavi", true, false, 11, "" ];
    let object = {
      nama: "Kavi",
      usia: 4,
      gender: "Male"
    };

    let json = [
      {
        id: 1,
        name: "Kavi"
      },
      {
        id: 2,
        name: "Ebrahim"
      },
      {
        id: 3,
        name: "Altair"
      }
    ];

    console.log(json[0])
    return "HELLO";
  }
  

}
