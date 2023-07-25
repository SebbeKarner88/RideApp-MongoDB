import React from 'react';
import './CSS/Footer.styles.css'
import {HStack} from "@chakra-ui/react";
import {FaRegCopyright} from "react-icons/fa";

const Footer = ({width, breakpoint}) => {

    return (
        <>
            <div
                className='footerBox'>
                <HStack justifyContent="space-between">
                    <HStack>
                        <h1>RIDEAPP 2023</h1>
                        <FaRegCopyright/>
                    </HStack>
                    <h1>PLACEHOLDER INFO</h1>
                </HStack>
            </div>
        </>
);
}

export default Footer;