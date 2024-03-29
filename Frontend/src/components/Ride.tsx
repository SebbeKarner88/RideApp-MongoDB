import {
    Button,
    Card,
    CardBody,
    Divider,
    Heading,
    HStack,
    Image,
    Stack,
    VStack
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {IRide} from "../interfaces/IRide.ts";
import "./CSS/Ride.styles.css"
import {fetchApi} from "../services/fetch.api.tsx";
import {IBike} from "../interfaces/IBike.ts";
import MapComponent from "./MapComponent.tsx";

const Ride = () => {
    const [bikeList, setBikeList] = useState<IBike[]>([]);
    const [bikesLoaded, setBikesLoaded] = useState(false);
    const [rideList, setRideList] = useState<IRide[]>([]);
    const [ridesLoaded, setRidesLoaded] = useState(false);
    const [currentRide, setCurrentRide] = useState<IRide>();

    const [coordinatesList, setCoordinatesList] = useState<{ latitude: number; longitude: number }[]>([]);
    const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number }>();
    const [isTracking, setIsTracking] = useState<boolean>(false);

    useEffect(() => {
        startCoordinates();
        // @ts-ignore
        fetchApi.getAllRides(sessionStorage.getItem('userId'), sessionStorage.getItem('token')).then((rides: IRide[]) => {
            if (rides.length > 0) {
                setRidesLoaded(true);
                setRideList(rides);
            }
        });
        // @ts-ignore
        fetchApi.getBikeCollectionByUserId(sessionStorage.getItem('userId'), sessionStorage.getItem('token')).then((bikes: IBike[]) => {
            if (bikes.length > 0) {
                setBikesLoaded(true);
                setBikeList(bikes);
            }
        });
    }, []);

    useEffect(() => {
        let intervalId: number;

        if (isTracking) {
            intervalId = setInterval(fetchCoordinates, 8000);
            fetchCoordinates();
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isTracking]);

    const startCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCoordinates({ latitude, longitude });
            },
            (error) => {
                console.error('Error getting coordinates:', error);
            }
        );
    };

    const options = {
        enableHighAccuracy: true,
        maximumAge: 0
    };

    const fetchCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCoordinatesList((prevList) => [...prevList, { latitude, longitude }]);
            },
            (error) => {
                console.error('Error getting coordinates:', error);
            },
            options);
    };

    function startNewRide(bikeId: string) {
        // @ts-ignore
        const rideEntity: { locCheckpoints: { latitude: number; longitude: number }[] } = {locCheckpoints: [coordinates]};
        // @ts-ignore
        fetchApi.startNewRide(sessionStorage.getItem('userId'), bikeId, sessionStorage.getItem('token'), rideEntity).then((ride: IRide) => {
            setCurrentRide(ride);
            setIsTracking(true);
        });

    }

    function stopRide() {
        setIsTracking(false)
        // @ts-ignore
        fetchApi.addGeoLocCheckpoint(sessionStorage.getItem('token'), currentRide?.rideId, coordinatesList).then(updatedRide => {
            setCurrentRide(updatedRide);
        });
        window.location.reload();
    }

    return (
        <>
            <div
                className='mainContainer'>
                {bikesLoaded ?
                    <Heading
                        className='rideHeading'
                        marginTop={3}>Start a new Ride</Heading>
                    :
                    <Heading
                        className='errorHeading'
                        marginTop={3}>No bikes in collection</Heading>}
                <VStack>
                    <div
                        className='topContainer'
                    >
                        <HStack className='ownedBikes'>
                            {bikesLoaded ?
                                bikeList.map((bike: IBike, index) => (
                                    <Card
                                        key={index}
                                        style={{
                                            marginTop: '10px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.92)',
                                            backdropFilter: 'blur(3px)',
                                            borderStyle: 'solid',
                                            borderWidth: '2px',
                                            borderColor: 'A67E3FC1',
                                            borderRadius: '15px',
                                            color: '#a67e3f',
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontSize: '19px'
                                        }}
                                        width='320px'>
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
                                                {isTracking ?
                                                    <Button
                                                        marginTop={4}
                                                        onClick={() => stopRide()}>Stop</Button>
                                                    :
                                                    <Button
                                                        className='startButton'
                                                        marginTop={4}
                                                        variant={"unstyled"}
                                                        onClick={() => startNewRide(bike.bikeId)}>Start</Button>}
                                            </Stack>
                                        </CardBody>
                                    </Card>
                                ))
                                :
                                <div></div>
                            }
                        </HStack>
                    </div>
                    <Divider
                        marginTop='40px'
                        borderColor={'darkgoldenrod'}
                        borderWidth='5px'/>
                    {bikesLoaded ?
                        <Heading
                            className='rideHeading'
                            marginTop={3}>Ride History</Heading>
                        :
                        <Heading
                            className='errorHeading'
                            marginTop={3}>No Rides in collection</Heading>}
                    <div
                        className='bottomContainer'>
                        {ridesLoaded ?
                            rideList.map((ride: IRide, index) => (
                                <>
                                    <Card
                                        direction={{base: 'column', sm: 'row'}}
                                        overflow='hidden'
                                        variant='outline'
                                        key={index}
                                        style={{
                                            marginTop: '20px',
                                            marginBottom: '20px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.92)',
                                            backdropFilter: 'blur(3px)',
                                            borderStyle: 'solid',
                                            borderWidth: '2px',
                                            borderColor: 'darkgoldenrod',
                                            borderRadius: '15px',
                                            color: '#a67e3f',
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontSize: '19px'
                                        }}
                                    >
                                        <MapComponent coordinatesList={ride.locCheckpoints}/>
                                        <Stack>
                                            <CardBody
                                                margin={3}>
                                                <Heading
                                                    size='lg'
                                                    marginBottom={6}>{ride.bike.maker} {ride.bike.model}</Heading>
                                                <Divider
                                                    borderColor='darkgoldenrod'/>
                                                <HStack marginTop={3}>
                                                    <div><strong>Start time: </strong> {ride.startTime}</div>
                                                    <div><strong> | </strong></div>
                                                    <div><strong>Finish time: </strong> {ride.startTime}</div>
                                                </HStack>
                                                <Divider
                                                    borderColor='darkgoldenrod'/>
                                                <HStack marginTop={3}>
                                                    <div><strong>Length: </strong> {ride.rideLengthKM} Km</div>
                                                    <div><strong> | </strong></div>
                                                    <div><strong>Elapsed time: </strong> {ride.rideDuration}</div>
                                                    <div><strong> | </strong></div>
                                                    <div><strong>Average speed: </strong> {ride.avgSpeedKMT} Km/t
                                                    </div>
                                                </HStack>
                                                <Divider
                                                    borderColor='darkgoldenrod'/>
                                                <HStack marginTop={3}>
                                                    <div>
                                                        <strong>Rider: </strong> {ride.user.firstName} {ride.user.lastName}
                                                    </div>
                                                    <div><strong> | </strong></div>
                                                    <div><strong>Rides
                                                        recorded: </strong> {ride.user.userRides.length + 1}</div>
                                                </HStack>
                                            </CardBody>
                                        </Stack>
                                    </Card>
                                </>
                            ))
                            :
                            <div></div>
                        }
                    </div>
                </VStack>
            </div>
        </>
    );
};

export default Ride;
