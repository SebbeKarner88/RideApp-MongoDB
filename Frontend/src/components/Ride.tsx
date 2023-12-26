import {
    Button,
    Card,
    CardBody,
    Container,
    Divider,
    Heading,
    HStack,
    Image,
    Spinner,
    Stack,
    VStack
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {IRide} from "../interfaces/IRide.ts";
import "./CSS/Ride.styles.css"
import {fetchApi} from "../services/fetch.api.tsx";
import {IBike} from "../interfaces/IBike.ts";
import {IGeoLocation} from "../interfaces/IGeoLocation.ts";


const Ride = ({width, breakpoint}) => {
    const [bikeList, setBikeList] = useState<IBike[]>([]);
    const [bikesLoaded, setBikesLoaded] = useState(false)
    const [rideList, setRideList] = useState<IRide[]>([])
    const [ridesLoaded, setRidesLoaded] = useState(false)
    const [latNumber, setLatNumber] = useState<number>(0)
    const [longNumber, setLongNumber] = useState<number>(0)
    const [currentRide, setCurrentRide] = useState<IRide>()
    const [ongoingRide, setOngoingRide] = useState(false)
    let rideInterval: number | undefined;

    useEffect(() => {
        getLocation();
        // @ts-ignore
        fetchApi.getAllRides(sessionStorage.getItem('userId'), sessionStorage.getItem('token')).then((rides: IRide[]) => {
            setRideList(rides);
            setRidesLoaded(true);

        });
        // @ts-ignore
        fetchApi.getBikeCollectionByUserId(sessionStorage.getItem('userId'), sessionStorage.getItem('token')).then((bikes: IBike[]) => {
            setBikeList(bikes);
            setBikesLoaded(true);
        });
    }, []);


    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position: any) {
        setLatNumber(position.coords.latitude);
        setLongNumber(position.coords.longitude);
    }

    function addCheckpoint(rideId: string) {
        getLocation();
        const geoLoc: IGeoLocation = {
            latitude: latNumber,
            longitude: longNumber
        }
        // @ts-ignore
        fetchApi.addGeoLocCheckpoint(sessionStorage.getItem('token'), rideId, geoLoc).then(updatedRide => {
            setCurrentRide(updatedRide)
        })
    }

    function startNewRide(bikeId: string) {
        getLocation();
        const rideEntity: { locCheckpoints: { latitude: number; longitude: number }[] } =
            {
                locCheckpoints: [{latitude: latNumber, longitude: longNumber}]
            }
        // @ts-ignore
        fetchApi.startNewRide(sessionStorage.getItem('userId'), bikeId, sessionStorage.getItem('token'), rideEntity).then((ride: IRide) => {
            setOngoingRide(true)
            setCurrentRide(ride)
            rideInterval = setInterval(() => addCheckpoint(ride.rideId), 5000)
        })
    }

    function stopRide() {
        clearInterval(rideInterval); // TODO FUNKAR INTE!
        window.location.reload();
        setOngoingRide(false);
    }

    return (
        <>
            <div
                className='mainContainer'>
                <VStack>
                    <div
                        className='topContainer'
                    >
                        <Heading>Start a new Ride</Heading>
                        {bikesLoaded ?
                            bikeList.map((bike: IBike, index) => (
                                <Card
                                    key={index}
                                    marginTop={2}
                                    style={{
                                        backgroundColor: 'rgba(17, 17, 17, 0.8)',
                                        backdropFilter: 'blur(11px)',
                                        borderStyle: 'solid',
                                        borderWidth: '2px',
                                        borderColor: 'A67E3FC1',
                                        borderRadius: '15px',
                                        color: '#a67e3f',
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontSize: '19px'
                                    }}
                                    width='300px'>
                                    <CardBody>
                                        <Stack
                                            className='imgBackground'
                                            height='170px'
                                            overflow='hidden'>
                                            <Image
                                                src={bike.pictures[0]}></Image>
                                        </Stack>
                                        <Stack mt='3' spacing='3'>
                                            <HStack
                                                justifyContent='center'>
                                                <Heading size='md'>{bike.maker}</Heading>
                                                <Heading size='md'>{bike.model}</Heading>
                                                <Heading size='md'>{bike.year}</Heading>
                                            </HStack>
                                        </Stack>
                                        <Divider marginTop={2}/>
                                        <Stack>
                                            {ongoingRide ?
                                                <Button
                                                    marginTop={4}
                                                    onClick={() => stopRide()}>Stop</Button>
                                                :
                                                <Button
                                                    marginTop={4}
                                                    onClick={() => startNewRide(bike.bikeId)}>Start</Button>
                                            }
                                        </Stack>
                                    </CardBody>
                                </Card>
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
                    <div
                        className='bottomContainer'>
                        {ridesLoaded ?
                            rideList.map((ride: IRide, index) => (
                                <>
                                    <div key={index}> {ride.rideId} </div>
                                </>
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
                </VStack>
            </div>
        </>
    );
};

export default Ride;
