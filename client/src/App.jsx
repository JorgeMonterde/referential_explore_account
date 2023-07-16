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


function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Main />   
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
