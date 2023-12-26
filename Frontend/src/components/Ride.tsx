import {IBike} from "../interfaces/IBike.ts";
import {Card, CardBody, Divider, Heading, HStack, Image, Spinner, Stack} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {IRide} from "../interfaces/IRide.ts";
import "./CSS/Ride.styles.css"
import {fetchApi} from "../services/fetch.api.tsx";

const Ride = ({width, breakpoint}) => {

    const [rideList, setRideList] = useState<IRide[]>([]);
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        // @ts-ignore
        fetchApi.getAllRides(sessionStorage.getItem('userId'), sessionStorage.getItem('token')).then((rides: IRide[]) => {
            setRideList(rides);
            setLoaded(true);
        });
    }, []);

    return (
        <>
            <div
                className='container'>
                {loaded ?
                    rideList.map((ride: IRide, index) => (
                        <div> {ride.rideId} </div>
                    ))
                    :
                    <Spinner
                        thickness='4px'
                        speed='0.55s'
                        emptyColor='gray.200'
                        color='#a67e3f'
                        size='xl'
                    />
                }

            </div>
        </>
    );
};

export default Ride;
