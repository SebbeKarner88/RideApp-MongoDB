import {
    Card,
    CardBody,
    Stack,
    Heading,
    Divider,
    Image, HStack, Spinner,
} from '@chakra-ui/react'
import React, {useEffect, useState} from "react"
import {fetchApi} from "../services/fetch.api.tsx"
import {IBike} from "../interfaces/IBike.ts"
import "./CSS/BikeDB.styles.css"

const BikeDB = ({width, breakpoint}) => {

    const [bikeList, setBikeList] = useState<IBike[]>([]);
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        // @ts-ignore
        fetchApi.getAllBikes(sessionStorage.getItem('token')).then((bikes: IBike[]) => {
            setBikeList(bikes);
            setLoaded(true);
        });
    }, []);


    return (
        <>
            <div
                className='container'
            >
                {loaded ?
                    bikeList.map((bike: IBike, index) => (
                        <Card
                            key={index}
                            className='bikeListCard'
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
                                        <Heading size='sm'>{bike.model}</Heading>
                                        <Heading size='sm'>{bike.year}</Heading>
                                    </HStack>
                                    <HStack
                                        justifyContent='space-evenly'>
                                        <div><strong>Frame:</strong> {bike.material}</div>
                                        <div><strong>Type:</strong> {bike.type}</div>
                                    </HStack>
                                    <Divider/>
                                    <HStack
                                        justifyContent='space-evenly'>
                                        <div><strong>Gears:</strong> {bike.gears}</div>
                                        <div><strong>Wheelsize:</strong> {bike.wheelSize}"</div>
                                    </HStack>
                                    <Divider/>
                                    <HStack
                                        justifyContent='space-evenly'>
                                        <div><strong>Color:</strong> {bike.colors.map(color => color + " ")}</div>
                                    </HStack>
                                    <Divider/>
                                </Stack>
                                <Divider/>
                                <Stack mt='3' spacing='3'>
                                    <Heading size='md'>More pictures</Heading>
                                    <HStack
                                        justifyContent='space-evenly'>
                                        {bike.pictures.map(pic => (
                                            <div>
                                                <Image src={pic}
                                                       height='70px'></Image>
                                            </div>
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
