// Importing necessary styles and components
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// Importing custom components
import Add from './components/add';
import Display from './components/display';
import Edit from './components/edit';
import Content from './components/content';
import Dashboard from './components/dashboard'; 

// Main function component for the entire application
function App() {
  return (
     // Using BrowserRouter to enable routing in the application
    <BrowserRouter>
     {/* Main container for the entire application */}
    <div className="App">
      {/* Navigation bar using Bootstrap components */}
       <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          {/* Navigation links */}
          <Navbar.Brand href="/"></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/add">Add</Nav.Link>
            <Nav.Link href="/display">Display</Nav.Link>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Routes for different components */}
      <Routes>
        <Route path='/' element={<Content></Content>}></Route>
        <Route path='/display' element={<Display></Display>}></Route>
        <Route path='/add' element={<Add></Add>}></Route>
        <Route path='/edit/:id' element={<Edit></Edit>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
