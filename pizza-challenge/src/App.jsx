import { useState } from 'react'
import { Switch, Route, useLocation, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css'
import Siparis from "./components/Siparis"


function App() {
  return (
    
    <BrowserRouter>
    <Switch>
      <Route exact path="/"> 
      <Siparis />
      </Route>
      <Route>
      </Route>
    </Switch>
    </BrowserRouter>
  )
}

export default App
