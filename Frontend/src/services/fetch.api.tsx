
import {FieldValues} from "react-hook-form";
import {IGeoLocation} from "../interfaces/IGeoLocation.ts";
import {IRide} from "../interfaces/IRide.ts";
import {IBike} from "../interfaces/IBike.ts";

const local = "http://localhost:8080";
const deployed = "https://rideapp-5hf9.onrender.com";
let isDeployed = true;
let url = isDeployed ? deployed : local;
 export const fetchApi = {

    login: (login: FieldValues) => {
        return (
            fetch( url + "/api/auth/authenticate", {
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-credentials": "true",
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
             fetch(url + "/api/auth/register", {
                 method: "POST",
                 headers: {
                     "Access-Control-Allow-Origin": "*",
                     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                     "Access-Control-Allow-credentials": "true",
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
             fetch(url + "/bike/getAll", {
                 method: "GET",
                 headers: {
                     "Access-Control-Allow-Origin": "*",
                     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                     "Access-Control-Allow-credentials": "true",
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
             fetch(url + "/rides/getAllByUserId", {
                 method: "GET",
                 headers: {
                     "Access-Control-Allow-Origin": "*",
                     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                     "Access-Control-Allow-credentials": "true",
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
             fetch(url + "/user/getBikeCollectionByUserId", {
                 method: "GET",
                 headers: {
                     "Access-Control-Allow-Origin": "*",
                     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                     "Access-Control-Allow-credentials": "true",
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
             fetch(url + "/rides/add", {
                 method: "POST",
                 headers: {
                     "Access-Control-Allow-Origin": "*",
                     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                     "Access-Control-Allow-credentials": "true",
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

     addGeoLocCheckpoint: (auth: string, rideId: string, geoLoc: IGeoLocation[]) => {
         return (
             fetch(url + "/rides/addCheckpoint", {
                 method: "POST",
                 headers: {
                     "Access-Control-Allow-Origin": "*",
                     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                     "Access-Control-Allow-credentials": "true",
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
             fetch(url + "/bike/addToBikeCollection", {
                 method: "POST",
                 headers: {
                     "Access-Control-Allow-Origin": "*",
                     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                     "Access-Control-Allow-credentials": "true",
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

     addNewBike: (auth: string, bike:IBike) => {
         return (
             fetch(url + "/bike/add", {
                 method: "POST",
                 headers: {
                     "Access-Control-Allow-Origin": "*",
                     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                     "Access-Control-Allow-credentials": "true",
                     "Authorization": "Bearer " + auth,
                     "Content-Type": "application/json",
                 },
                 body: JSON.stringify(bike),
             })
                 .then((response) => response.json())
                 .catch((e) => console.log(`Could not fetch data ${e}`))
         );
     },
}