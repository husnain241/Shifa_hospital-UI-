import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import {
  Activity,
  MessageCircle,
  Calendar,
  Users,
  MapPin,
  Clock,
  Settings,
  Home,
} from "lucide-react";

// Components
import HomeScreen from "./components/HomeScreen";
import ChatbotScreen from "./components/ChatbotScreen";
import DoctorDirectory from "./components/DoctorDirectory";
import DoctorDetail from "./components/DoctorDetail";
import RealTimeScheduling from "./components/RealTimeScheduling";
import NavigationScreen from "./components/NavigationScreen";
import MyAppointments from "./components/MyAppointments";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case "chat":
        return <ChatbotScreen onNavigate={setCurrentScreen} />;
      case "doctors":
        return (
          <DoctorDirectory
            onNavigate={setCurrentScreen}
            onSelectDoctor={setSelectedDoctor}
          />
        );
      case "doctor-detail":
        return (
          <DoctorDetail doctor={selectedDoctor} onNavigate={setCurrentScreen} />
        );
      case "scheduling":
        return <RealTimeScheduling onNavigate={setCurrentScreen} />;
      case "navigation":
        return <NavigationScreen onNavigate={setCurrentScreen} />;
      case "appointments":
        return <MyAppointments onNavigate={setCurrentScreen} />;
      case "admin":
        return <AdminPanel onNavigate={setCurrentScreen} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="App">
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand
            onClick={() => setCurrentScreen("home")}
            style={{ cursor: "pointer" }}
          >
            <Activity size={32} className="me-2" />
            Shifa Hospital Smart Chatbot
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => setCurrentScreen("home")}>
                <Home size={18} className="me-1" />
                Home
              </Nav.Link>
              <Nav.Link onClick={() => setCurrentScreen("chat")}>
                <MessageCircle size={18} className="me-1" />
                Chat
              </Nav.Link>
              <Nav.Link onClick={() => setCurrentScreen("doctors")}>
                <Users size={18} className="me-1" />
                Doctors
              </Nav.Link>
              <Nav.Link onClick={() => setCurrentScreen("scheduling")}>
                <Calendar size={18} className="me-1" />
                Schedule
              </Nav.Link>
              <Nav.Link onClick={() => setCurrentScreen("navigation")}>
                <MapPin size={18} className="me-1" />
                Navigation
              </Nav.Link>
              <Nav.Link onClick={() => setCurrentScreen("appointments")}>
                <Clock size={18} className="me-1" />
                My Appointments
              </Nav.Link>
              <Nav.Link onClick={() => setCurrentScreen("admin")}>
                <Settings size={18} className="me-1" />
                Admin
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {renderScreen()}
    </div>
  );
}

export default App;
