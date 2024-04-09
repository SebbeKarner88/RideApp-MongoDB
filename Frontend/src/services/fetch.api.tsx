import {FieldValues} from "react-hook-form";
import {IGeoLocation} from "../interfaces/IGeoLocation.ts";
import {IRide} from "../interfaces/IRide.ts";
import {IBike} from "../interfaces/IBike.ts";


export const fetchApi = {

    login: (login: FieldValues) => {
        return (
            fetch("https://rideapp-latest.onrender.com/api/auth/authenticate", {
                method: "POST",
                mode: 'no-cors',
                headers: {
                    "Access-Control-Allow-Origin": "*",
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
            fetch("https://rideapp-latest.onrender.com/api/auth/register", {
                method: "POST",
                mode: 'no-cors',
                headers: {
                    "Access-Control-Allow-Origin": "*",
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
            fetch("https://rideapp-latest.onrender.com/bike/getAll", {
                method: "GET",
                mode: 'no-cors',
                headers: {
                    "Access-Control-Allow-Origin": "*",
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
            fetch("https://rideapp-latest.onrender.com/rides/getAllByUserId", {
                method: "GET",
                mode: 'no-cors',
                headers: {
                    "Access-Control-Allow-Origin": "*",
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
            fetch("https://rideapp-latest.onrender.com/user/getBikeCollectionByUserId", {
                method: "GET",
                mode: 'no-cors',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "Bearer " + auth,
                    "userId": userId,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .catch((e) => console.log(`Could not fetch data ${e}`))
        );
    },

    startNewRide: (userId: string, bikeId: string, auth: string, rideEntity: IRide) => {
        return (
            fetch("https://rideapp-latest.onrender.com/rides/add", {
                method: "POST",
                mode: 'no-cors',
                headers: {
                    "Access-Control-Allow-Origin": "*",
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
            fetch("https://rideapp-latest.onrender.com/rides/addCheckpoint", {
                method: "POST",
                mode: 'no-cors',
                headers: {
                    "Access-Control-Allow-Origin": "*",
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

    addBikeToCollection: (userId: string, auth: string, bike: IBike) => {
        return (
            fetch("https://rideapp-latest.onrender.com/bike/addToBikeCollection", {
                method: "POST",
                mode: 'no-cors',
                headers: {
                    "Access-Control-Allow-Origin": "*",
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

    addNewBike: (auth: string, bike: IBike) => {
        return (
            fetch("https://rideapp-latest.onrender.com/bike/add", {
                method: "POST",
                mode: 'no-cors',
                headers: {
                    "Access-Control-Allow-Origin": "*",
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