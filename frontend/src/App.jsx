import { useState } from 'react';
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/dashboard";
import AddClass from './Components/AddClass';
import Section from './Components/Section';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Basefile from './Components/Basefile';
import Print from './Components/print';
import SignIn from './Components/SignIn';
import LogIn from './Components/login';
import Notfound from './Components/Notfound';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />} />

        <Route path='/signin' element={
          <div>
            <SignIn />
          </div>
        } />
        <Route path='/login' element={
          <div>
            <LogIn />
          </div>
        } />
        <Route path='/admin' element={
          <Basefile >
            <Dashboard />
          </Basefile>
        } />
        <Route path='/addclass' element={
          <Basefile >
            <AddClass />
          </Basefile>
        } />
        <Route path='/section/:class_id/:section_id' element={
          <Basefile >
            <Section />
          </Basefile>
        } />
        <Route path='/section/:class_id' element={
          <Basefile >
            <Section />
          </Basefile>
        } />
        <Route path='/print' element={
          <Print />
        } />
        <Route path='*' element={
          <Notfound />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
