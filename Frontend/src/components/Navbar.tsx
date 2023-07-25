import React from 'react';
import {Button, HStack, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {GiHamburgerMenu} from "react-icons/gi";
import './CSS/Navbar.styles.css'

const NavBar = ({width, breakpoint}) => {

    return width < breakpoint ? (
            <Menu>
                <MenuButton
                    className='burgerMenuButton'
                    as={Button}
                    boxSize={14}
                    fontSize={24}
                marginRight={2}>
                    <GiHamburgerMenu className='burgerMenuLogo'/>
                </MenuButton>
                <MenuList
                    className='burgermenu'
                    backgroundColor='#000000FF'
                    p={0}
                    minW="0"
                    w='90vw'
                marginTop={7}>
                    <MenuItem
                        backgroundColor='#0000005A'
                        justifyContent={"center"}>
                        <Link className='navLanding' to={'/'}>Home</Link>
                    </MenuItem>
                    <MenuItem
                        backgroundColor='#0000005A'
                        justifyContent={"center"}>
                        <Link className='navBikeDB' to={'bikeDB'}>Bicycle DB</Link>
                    </MenuItem>
                    <MenuItem
                        backgroundColor='#0000005A'
                        justifyContent={"center"}>
                        <Link className='navLogin' to={'login'}>Login</Link>
                    </MenuItem>
                    <MenuItem
                        backgroundColor='#0000005A'
                        justifyContent={"center"}>
                        <Link className='navAbout' to={'about'}>About</Link>
                    </MenuItem>
                </MenuList>
            </Menu>
        ) :
        (
            <HStack className='navbar'
                    width={"350px"}
                    justifyContent='space-between'
                    paddingRight={13}>
                <Link className='navBikeDB' to={'bikeDB'}>Bicycle DB</Link>
                <Link className='navLogin' to={'login'}>Login</Link>
                <Link className='navAbout' to={'about'}>About</Link>
            </HStack>
        );
};

export default NavBar;