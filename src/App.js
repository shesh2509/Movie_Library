import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ListView from './components/ListView'; 


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path ="/home" element = {<Home/>}/>
          <Route path = "/" element = {<Login/>}/>
          <Route path="/lists/:id" element = {<ListView />} />
          <Route path = "/signup" element = {<SignUp/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
