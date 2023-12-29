import './App.css'
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import {Grid, GridItem} from "@chakra-ui/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import About from "./components/About";
import React, {useState} from "react";
import Login from "./components/Login";
import BikeDB from "./components/BikeDB";
import Ride from "./components/Ride.tsx";
import Register from "./components/Register.tsx";
import AddBike from "./components/AddBike.tsx";


function App() {

    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 600;

    React.useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);

    return (
        <>
            <div className={width > breakpoint ? 'containerDesktop' : 'containerMobile'}>
                <BrowserRouter>
                    <Grid
                        templateAreas={{
                            base: `"header"
                                    "main"
                                    "footer"`
                        }}
                        templateColumns={{
                            base: `1fr`
                        }}
                        templateRows={`110px 1fr 50px`}
                        height={'100vh'}
                    >
                        <GridItem area={'header'}>
                            <Header breakpoint={breakpoint} width={width}/>
                        </GridItem>
                        <GridItem area={'main'}>
                            <Routes>
                                <Route path='/' element={<Landing breakpoint={breakpoint} width={width}/>}/>
                                <Route path='/about' element={<About/>}/>
                                <Route path='/login' element={<Login/>}/>
                                <Route path='/bikeDB' element={<BikeDB/>}/>
                                <Route path='/ride' element={<Ride/>}/>
                                <Route path='/register' element={<Register/>}/>
                                <Route path='/addbike' element={<AddBike/>}/>
                            </Routes>
                        </GridItem>
                        <GridItem area={'footer'}>
                            <Footer/>
                        </GridItem>
                    </Grid>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App
