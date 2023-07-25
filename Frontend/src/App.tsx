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


function App() {

    return (
        <>
            <div className='container'>
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
                        templateRows={`100px 1fr 50px`}
                        height={'100vh'}
                    >
                        <GridItem area={'header'}>
                            <Header/>
                        </GridItem>
                        <GridItem area={'main'}>
                            <Routes>
                                <Route path='/' element={<Landing></Landing>}/>
                                <Route path='/about' element={<About></About>}/>
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
