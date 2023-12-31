// Importing necessary styles and components
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// Importing custom components
import Create from './components/create';
import Read from './components/read';
import Edit from './components/edit';
import Content from './components/content';
import Dashboard from './components/dashboard'; 
import Order from './components/order'; 
import OrderList from './components/orderlist';

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
            <Nav.Link href="/">HOME</Nav.Link>
            <NavDropdown title="ADD" id="basic-nav-dropdown">
              <NavDropdown.Item href="/create">SCOOTER</NavDropdown.Item>
              <NavDropdown.Item href="/order">ORDER</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="DISPLAY" id="basic-nav-dropdown">
              <NavDropdown.Item href="/read">SCOOTER</NavDropdown.Item>
              <NavDropdown.Item href="/orderlist">ORDER</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/dashboard">ANALYZE</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Routes for different components */}
      <Routes>
        <Route path='/' element={<Content></Content>}></Route>
        <Route path='/read' element={<Read></Read>}></Route>
        <Route path='/create' element={<Create></Create>}></Route>
        <Route path='/edit/:id' element={<Edit></Edit>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/order' element={<Order></Order>}></Route>
        <Route path='/orderlist' element={<OrderList></OrderList>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
