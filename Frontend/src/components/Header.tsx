
import {HStack, Image} from "@chakra-ui/react";
import logo from '../assets/images/RideApp-cropped-logo.webp'
import {Link} from "react-router-dom";
import './CSS/Header.styles.css'
import NavBar from "./Navbar";


// @ts-ignore
const Header = ({width, breakpoint}) => {

    return (
        <>
            <HStack className='headerBox'
                    zIndex='dropdown'
                    position="relative"
                    justifyContent="space-between"
                    padding="15px">
                <div>
                    <HStack>
                        {width > breakpoint ? <Link to="/">
                            <Image className="logo" src={logo} height="70px"/>
                        </Link> : null}
                    </HStack>
                </div>
                <NavBar breakpoint={breakpoint} width={width}/>
            </HStack>
        </>
    );
}

export default Header;