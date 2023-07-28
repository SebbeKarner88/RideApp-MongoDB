import {IBike} from "./IBike";
import {IRide} from "./IRide";

export interface IUser {
    userId: string,
    username : string,
    role : string,
    password : string,
    firstName : string,
    lastName : string,
    phoneNumber : string,
    street : string,
    streetNumber : number,
    zipCode : string,
    city : string,
    country : string,
    bikeCollection: IBike[],
    userRides: IRide[]
}
