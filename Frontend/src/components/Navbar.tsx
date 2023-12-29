import {useEffect, useState} from 'react';
import {Button, HStack, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {GiHamburgerMenu} from "react-icons/gi";
import './CSS/Navbar.styles.css'

// @ts-ignore
const NavBar = ({width, breakpoint}) => {

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem('token'))
            setLoggedIn(true)
    }, []);

    function handleLogout() {
        sessionStorage.clear();
        setLoggedIn(false)
    }

    return width < breakpoint ? (
            <Menu>
                <MenuButton
                    className='burgerMenuButton'
                    variant='unstyled'
                    as={Button}
                    boxSize={14}
                    fontSize={24}>
                    <GiHamburgerMenu
                        className='burgerMenuLogo '
                        ></GiHamburgerMenu>
                </MenuButton>
                <MenuList
                    className='burgermenu'
                    backgroundColor='#000000FF'
                    p={0}
                    minW="0"
                    w='90vw'
                    marginTop={6}>
                    <MenuItem
                        backgroundColor='#0000005A'
                        justifyContent={"center"}>
                        <Link className='navLanding' to={'/'}>Home</Link>
                    </MenuItem>
                    {loggedIn ? (
                        <>
                            <MenuItem
                                backgroundColor='#0000005A'
                                justifyContent={"center"}>
                                <Link className='navBikeDB' to={'bikeDB'}>Bike-DB</Link>
                            </MenuItem>
                            <MenuItem
                                backgroundColor='#0000005A'
                                justifyContent={"center"}>
                                <Link className='navRide' to={'ride'}>Ride</Link>
                            </MenuItem>
                        </>
                    ) : (
                        <MenuItem
                            backgroundColor='#0000005A'
                            justifyContent={"center"}>
                            <Link className='navAbout' to={'about'}>About</Link>
                        </MenuItem>
                    )}
                    {loggedIn ? (
                        <MenuItem
                            backgroundColor='#0000005A'
                            justifyContent={"center"}>
                            <Link className='navLogin'
                                  onClick={handleLogout} to={'/'}>Logout</Link>
                        </MenuItem>
                    ) : (
                        <MenuItem
                            backgroundColor='#0000005A'
                            justifyContent={"center"}>
                            <Link className='navLogin' to={'login'}>Login</Link>
                        </MenuItem>
                    )}
                </MenuList>
            </Menu>
        ) :
        (
            <HStack className='navbar'
                    width={"350px"}
                    justifyContent='space-evenly'
                    paddingRight={13}>
                {loggedIn ? (
                    <>
                        <Link className='navBikeDB' to={'bikeDB'}>Bike-DB</Link>
                        <Link className='navRide' to={'ride'}>Ride</Link>
                    </>
                ) : (
                    <Link className='navAbout' to={'about'}>About</Link>
                )}
                {loggedIn ? (
                    <Link className='navLogin'
                          onClick={handleLogout} to={'/'}>Logout</Link>
                ) : (
                    <Link className='navLogin' to={'login'}>Login</Link>
                )}
            </HStack>
        );
};

export default NavBar;