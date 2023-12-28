
import {FieldValues} from "react-hook-form";
import {IGeoLocation} from "../interfaces/IGeoLocation.ts";
import {IRide} from "../interfaces/IRide.ts";
import {IBike} from "../interfaces/IBike.ts";


 export const fetchApi = {

    login: (login: FieldValues) => {
        return (
            fetch("http://localhost:8080/api/auth/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(login),
            })
                .then((response) => response.json())
                .catch((e) => console.log(`Could not fetch data ${e}`))
        );
    },

     register: (data: FieldValues) => {
         return (
             fetch("http://localhost:8080/api/auth/register", {
                 method: "POST",
                 headers: {
                     "Content-Type": "application/json",
                 },
                 body: JSON.stringify(data),
             })
                 .then((response) => response.json())
                 .catch((e) => console.log(`Could not fetch data ${e}`))
         );
     },

     getAllBikes: (auth: string) => {
         return (
             fetch("http://localhost:8080/bike/getAll", {
                 method: "GET",
                 headers: {
                     "Authorization": "Bearer " + auth,
                     "Content-Type": "application/json",
                 },
             })
                 .then((response) => response.json())
                 .catch((e) => console.log(`Could not fetch data ${e}`))
         );
     },

     getAllRides: (userId: string, auth: string) => {
         return (
             fetch("http://localhost:8080/rides/getAllByUserId", {
                 method: "GET",
                 headers: {
                     "Authorization": "Bearer " + auth,
                     "userId": userId,
                     "Content-Type": "application/json",
                 },
             })
                 .then((response) => response.json())
                 .catch((e) => console.log(`Could not fetch data ${e}`))
         );
     },

     getBikeCollectionByUserId: (userId: string, auth: string) => {
         return (
             fetch("http://localhost:8080/user/getBikeCollectionByUserId", {
                 method: "GET",
                 headers: {
                     "Authorization": "Bearer " + auth,
                     "userId": userId,
                     "Content-Type": "application/json",
                 },
             })
                 .then((response) => response.json())
                 .catch((e) => console.log(`Could not fetch data ${e}`))
         );
     },

     startNewRide: (userId: string, bikeId: string, auth: string, rideEntity:IRide) => {
         return (
             fetch("http://localhost:8080/rides/add", {
                 method: "POST",
                 headers: {
                     "Authorization": "Bearer " + auth,
                     "userId": userId,
                     "bikeId": bikeId,
                     "Content-Type": "application/json",
                 },
                 body: JSON.stringify(rideEntity),
             })
                 .then((response) => response.json())
                 .catch((e) => console.log(`Could not fetch data ${e}`))
         );
     },

     addGeoLocCheckpoint: (auth: string, rideId: string, geoLoc: IGeoLocation) => {
         return (
             fetch("http://localhost:8080/rides/addCheckpoint", {
                 method: "POST",
                 headers: {
                     "Authorization": "Bearer " + auth,
                     "rideId": rideId,
                     "Content-Type": "application/json",
                 },
                 body: JSON.stringify(geoLoc),
             })
                 .then((response) => response.json())
                 .catch((e) => console.log(`Could not fetch data ${e}`))
         );
     },

     addBikeToCollection: (userId: string, auth: string, bike:IBike) => {
         return (
             fetch("http://localhost:8080/bike/addToBikeCollection", {
                 method: "POST",
                 headers: {
                     "Authorization": "Bearer " + auth,
                     "userId": userId,
                     "Content-Type": "application/json",
                 },
                 body: JSON.stringify(bike),
             })
                 .then((response) => response.json())
                 .catch((e) => console.log(`Could not fetch data ${e}`))
         );
     },
}