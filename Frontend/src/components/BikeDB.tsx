import {
    Card,
    CardBody,
    Stack,
    Heading,
    Divider,
    Image, HStack, Spinner, Button,
} from '@chakra-ui/react'
import React, {useEffect, useState} from "react"
import {fetchApi} from "../services/fetch.api.tsx"
import {IBike} from "../interfaces/IBike.ts"
import "./CSS/BikeDB.styles.css"

const BikeDB = ({width, breakpoint}) => {

    const [bikeList, setBikeList] = useState<IBike[]>([]);
    const [userBikeList, setUserBikeList] = useState<IBike[]>([]);
    const [dbLoaded, setDbLoaded] = useState(false)
    const [userLoaded, setUserLoaded] = useState(false)

    useEffect(() => {
        // @ts-ignore
        fetchApi.getAllBikes(sessionStorage.getItem('token')).then((bikes: IBike[]) => {
            setBikeList(bikes);
            setDbLoaded(true);
        });
        // @ts-ignore
        fetchApi.getBikeCollectionByUserId(sessionStorage.getItem('userId'), sessionStorage.getItem('token')).then((bikes: IBike[]) => {
            setUserBikeList(bikes);
            setUserLoaded(true);
        });
    }, []);


    function addBike(bike:IBike) {

        // @ts-ignore
        fetchApi.addBikeToCollection(sessionStorage.getItem('userId'), sessionStorage.getItem('token'), bike).then((bike: IBike) => {
            window.location.reload()
        })

    }

    return (
        <>
            <div
                className='container'>
                {dbLoaded ?
                    bikeList.map((bike: IBike, index) => (
                        <Card
                            key={index}
                            marginTop={2}
                            style={{
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
                            width='350px'>
                            <CardBody>
                                <Stack
                                    className='imgBackground'
                                    height='200px'
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
                                    {userBikeList.find((uBike) => uBike.bikeId === bike.bikeId) ?
                                        <Button
                                            className='addButton'
                                            variant={"unstyled"}
                                            disabled={true}>
                                            In Collection
                                        </Button>
                                        :
                                        <Button
                                            className='addButton'
                                            variant={"unstyled"}
                                            onClick={() => addBike(bike)}>
                                            Add to Collection
                                        </Button>
                                    }
                                    <HStack
                                        justifyContent='space-evenly'>
                                        <div><strong>Frame: </strong> {bike.material}</div>
                                        <div><strong>Type: </strong> {bike.type}</div>
                                    </HStack>
                                    <Divider/>
                                    <HStack
                                        justifyContent='space-evenly'>
                                        <div><strong>Gears: </strong> {bike.gears}</div>
                                        <div><strong>Wheelsize: </strong> {bike.wheelSize}"</div>
                                    </HStack>
                                    <Divider/>
                                    <HStack
                                        justifyContent='space-evenly'>
                                        <div><strong>Color: </strong> {bike.colors.map(color => color + " ")}</div>
                                    </HStack>
                                    <Divider/>
                                </Stack>
                                <Divider/>
                                <Stack mt='3' mb='3' spacing='3'>
                                    <Heading size='md'>More pictures</Heading>
                                    <HStack
                                        justifyContent='space-evenly'>
                                        {bike.pictures.map(pic => (
                                            <Stack
                                                className='imgBackground'
                                                width='100px'
                                                marginTop={1}
                                                overflow='hidden'>
                                                <Image src={pic}
                                                       height='auto'>

                                                </Image>
                                            </Stack>
                                        ))}
                                    </HStack>
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
        </>
    );
};

export default BikeDB;
