import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {name:"chintan",rollno:10};
  }

 
}
