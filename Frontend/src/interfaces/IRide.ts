import {IUser} from "./IUser";
import {IBike} from "./IBike";
import {IGeoLocation} from "./IGeoLocation";

export interface IRide {

    rideId : string,
    user : IUser,
    bike : IBike,
    startTime : string,
    endTime : string,
    locCheckpoints : IGeoLocation[],
    rideLengthKM : number,
    rideDuration : string,
    avgSpeedKMT : number

}