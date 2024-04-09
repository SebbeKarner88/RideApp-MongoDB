import './CSS/Footer.styles.css'
import {HStack} from "@chakra-ui/react";
import {FaRegCopyright} from "react-icons/fa";
import {BsFacebook, BsGithub, BsLinkedin} from "react-icons/bs";

const Footer = () => {

    return (
        <>
            <div
                className='footerBox'>
                <HStack
                    className='copyRight'
                    justifyContent="space-between">
                    <HStack>
                        <FaRegCopyright/>
                        <h1> KarnerDesign.</h1>
                    </HStack>
                    <HStack
                    className='linkLogos'
                    justifyContent='space-evenly'
                    width='150px'>
                       <a href='https://www.facebook.com/sebastian.karner'> <BsFacebook/> </a>
                        <a href='https://www.linkedin.com/in/sebastian-k%C3%A4rner-3270b140/'> <BsLinkedin/> </a>
                        <a href='https://github.com/SebbeKarner88'> <BsGithub/> </a>

                    </HStack>
                </HStack>
            </div>
        </>
);
}

export default Footer;