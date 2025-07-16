import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Nav,
  Table,
  Modal,
  Form,
  Badge,
} from "react-bootstrap";
import {
  ArrowLeft,
  Users,
  Calendar,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Shield,
} from "lucide-react";

const AdminPanel = ({ onNavigate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("doctors");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      status: "available",
      room: "Room 204",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "Neurologist",
      status: "busy",
      room: "Room 301",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialization: "Pediatrician",
      status: "available",
      room: "Room 102",
    },
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "John Smith",
      doctor: "Dr. Sarah Johnson",
      date: "2025-01-15",
      time: "10:00 AM",
      status: "confirmed",
    },
    {
      id: 2,
      patient: "Maria Garcia",
      doctor: "Dr. Emily Rodriguez",
      date: "2025-01-16",
      time: "2:00 PM",
      status: "confirmed",
    },
    {
      id: 3,
      patient: "Ahmed Hassan",
      doctor: "Dr. Michael Chen",
      date: "2025-01-17",
      time: "11:00 AM",
      status: "completed",
    },
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock authentication
    if (
      loginData.email === "admin@shifa-hospital.com" &&
      loginData.password === "admin123"
    ) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials. Use admin@shifa-hospital.com / admin123");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ email: "", password: "" });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return <Badge bg="success">Available</Badge>;
      case "busy":
        return <Badge bg="danger">Busy</Badge>;
      case "confirmed":
        return <Badge bg="success">Confirmed</Badge>;
      case "completed":
        return <Badge bg="primary">Completed</Badge>;
      case "cancelled":
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const handleDeleteDoctor = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctors((prev) => prev.filter((doctor) => doctor.id !== id));
    }
  };

  const handleDeleteAppointment = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments((prev) => prev.filter((apt) => apt.id !== id));
    }
  };

  if (!isLoggedIn) {
    return (
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card>
              <Card.Header className="bg-primary text-white text-center">
                <Shield size={32} className="mb-2" />
                <h4 className="mb-0">Admin Login</h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter admin email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary" className="w-100">
                    Login
                  </Button>
                </Form>
                <div className="mt-3 text-center">
                  <small className="text-muted">
                    Demo credentials:
                    <br />
                    Email: admin@shifa-hospital.com
                    <br />
                    Password: admin123
                  </small>
                </div>
              </Card.Body>
            </Card>
            <div className="text-center mt-3">
              <Button variant="link" onClick={() => onNavigate("home")}>
                <ArrowLeft size={16} className="me-1" />
                Back to Home
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={3}>
          <Card className="admin-sidebar">
            <Card.Body>
              <div className="text-center mb-4">
                <Shield size={32} className="mb-2" />
                <h5>Admin Panel</h5>
                <small className="text-muted">Hospital Management</small>
              </div>

              <Nav className="flex-column">
                <Nav.Link
                  className={`admin-nav-link ${
                    activeTab === "doctors" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("doctors")}
                >
                  <Users size={16} className="me-2" />
                  Manage Doctors
                </Nav.Link>
                <Nav.Link
                  className={`admin-nav-link ${
                    activeTab === "appointments" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("appointments")}
                >
                  <Calendar size={16} className="me-2" />
                  Manage Appointments
                </Nav.Link>
                <Nav.Link
                  className={`admin-nav-link ${
                    activeTab === "status" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("status")}
                >
                  <Settings size={16} className="me-2" />
                  Update Status
                </Nav.Link>
              </Nav>

              <div className="mt-4">
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  className="text-white ms-2"
                  onClick={() => onNavigate("home")}
                >
                  <ArrowLeft size={16} />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  {activeTab === "doctors" && "Manage Doctors"}
                  {activeTab === "appointments" && "Manage Appointments"}
                  {activeTab === "status" && "Update Real-Time Status"}
                </h5>
                {(activeTab === "doctors" || activeTab === "appointments") && (
                  <Button variant="primary" onClick={() => setShowModal(true)}>
                    <Plus size={16} className="me-1" />
                    Add New
                  </Button>
                )}
              </div>
            </Card.Header>
            <Card.Body>
              {activeTab === "doctors" && (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Doctor Name</th>
                      <th>Specialization</th>
                      <th>Room</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor) => (
                      <tr key={doctor.id}>
                        <td>{doctor.name}</td>
                        <td>{doctor.specialization}</td>
                        <td>{doctor.room}</td>
                        <td>{getStatusBadge(doctor.status)}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                          >
                            <Eye size={14} />
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="me-2"
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteDoctor(doctor.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

              {activeTab === "appointments" && (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Doctor</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>{appointment.patient}</td>
                        <td>{appointment.doctor}</td>
                        <td>
                          {new Date(appointment.date).toLocaleDateString()}
                        </td>
                        <td>{appointment.time}</td>
                        <td>{getStatusBadge(appointment.status)}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                          >
                            <Eye size={14} />
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="me-2"
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() =>
                              handleDeleteAppointment(appointment.id)
                            }
                          >
                            <Trash2 size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

              {activeTab === "status" && (
                <Row>
                  <Col>
                    <h6 className="mb-3">Real-Time Doctor Status</h6>
                    <Row className="g-3">
                      {doctors.map((doctor) => (
                        <Col key={doctor.id} md={6} lg={4}>
                          <Card>
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="mb-0">{doctor.name}</h6>
                                {getStatusBadge(doctor.status)}
                              </div>
                              <p className="text-muted mb-3">
                                {doctor.specialization}
                              </p>
                              <div className="d-flex gap-2">
                                <Button
                                  variant="success"
                                  size="sm"
                                  onClick={() => {
                                    setDoctors((prev) =>
                                      prev.map((d) =>
                                        d.id === doctor.id
                                          ? { ...d, status: "available" }
                                          : d
                                      )
                                    );
                                  }}
                                >
                                  Available
                                </Button>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => {
                                    setDoctors((prev) =>
                                      prev.map((d) =>
                                        d.id === doctor.id
                                          ? { ...d, status: "busy" }
                                          : d
                                      )
                                    );
                                  }}
                                >
                                  Busy
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "add" ? "Add New" : "Edit"}{" "}
            {activeTab === "doctors" ? "Doctor" : "Appointment"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {activeTab === "doctors" ? (
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Doctor Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter doctor name" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Specialization</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter specialization"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Room Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter room number" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select>
                      <option value="available">Available</option>
                      <option value="busy">Busy</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter patient name"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Doctor</Form.Label>
                    <Form.Select>
                      <option value="">Select doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.name}>
                          {doctor.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Time</Form.Label>
                    <Form.Control type="time" />
                  </Form.Group>
                </Col>
              </Row>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPanel;
