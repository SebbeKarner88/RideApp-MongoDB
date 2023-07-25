import React from 'react';
import {HStack, Image} from "@chakra-ui/react";
import logo from '../assets/images/RideApp-cropped-logo.webp'
import './CSS/Landing.styles.css'

const Landing = ({width, breakpoint}) => {

    return (
        <>
            <HStack justifyContent='center'>
                {width < breakpoint ? <Image className='logoBox' src={logo} width='80vw'/> : null}
            </HStack>
        </>
    );
}

export default Landing;