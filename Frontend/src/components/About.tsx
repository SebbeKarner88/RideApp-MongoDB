import React from 'react';
import'./CSS/About.styles.css'
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
                            SEJOLI AB is a company that values creativity, laughter, coding
                            skills and pushing for success. No idea is a bad idea.
                            <br/>
                            <br/>
                            Our motto is:
                            <strong>"It is just beepity baapity boopity"</strong>.
                        </div>
                    </section>
                </Box>
            </Container>
        </>
    );
}

export default About;