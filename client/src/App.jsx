import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
//import './App.css'

//styles
import "normalize.css";
import "../styles/style.scss";


//import components
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

//contexts
import { DetailsContext } from "../context/detailsContext";


function App() {
  
//details state
  const [details, setDetails] = useState({});
  const detailsState = {details, setDetails};


  return (
    <>
      <BrowserRouter>
        <Header />
        <DetailsContext.Provider value={{detailsState}} >
          <Main />
        </DetailsContext.Provider>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
