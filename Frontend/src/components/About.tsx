import React from 'react';
import './CSS/About.styles.css'
import {Box, Container} from "@chakra-ui/react";

const About = ({width, breakpoint}) => {

    return (
        <>
            <Container
                maxW='1200px'
                width={{base: '100%', md: '80%'}}
                height={{base: '80%', md: '80%'}}
                justifyContent='center'
                alignContent='center'
            >
                <Box className='about'>
                    <section className='information'>
                        <div>
                            RideApp is a Master Thesis project developed by Sebastian Kärner, <br/>a Java
                            developer student at EC Education in Stockholm, Sweden.
                            <br/>
                            <br/>
                            <br/>
                            <i>"My passion for cycling inspired me to develop this application.
                                <br/>
                                Though there are many apps like this out there,<br/>
                                I wanted to make a GPS tracker from scratch, not by using a service."</i>
                            <br/>
                            <br/>
                            <strong>/ Sebastian Kärner.</strong>
                        </div>
                    </section>
                </Box>
            </Container>
        </>
    );
}

export default About;