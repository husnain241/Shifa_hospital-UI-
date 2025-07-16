import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal, Alert } from 'react-bootstrap';
import { ArrowLeft, Calendar, Clock, User, Phone, MapPin, X, CheckCircle } from 'lucide-react';

const MyAppointments = ({ onNavigate }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist',
      date: '2025-01-15',
      time: '10:00 AM',
      status: 'confirmed',
      room: 'Room 204',
      reason: 'Regular checkup',
      fee: 150
    },
    {
      id: 2,
      doctorName: 'Dr. Emily Rodriguez',
      specialization: 'Pediatrician',
      date: '2025-01-20',
      time: '2:00 PM',
      status: 'confirmed',
      room: 'Room 102',
      reason: 'Child vaccination',
      fee: 120
    },
    {
      id: 3,
      doctorName: 'Dr. Michael Chen',
      specialization: 'Neurologist',
      date: '2025-01-08',
      time: '11:00 AM',
      status: 'completed',
      room: 'Room 301',
      reason: 'Headache consultation',
      fee: 180
    },
    {
      id: 4,
      doctorName: 'Dr. David Wilson',
      specialization: 'Orthopedic Surgeon',
      date: '2025-01-05',
      time: '9:00 AM',
      status: 'cancelled',
      room: 'Room 405',
      reason: 'Knee pain evaluation',
      fee: 200
    }
  ]);

  const upcomingAppointments = appointments.filter(apt => apt.status === 'confirmed');
  const pastAppointments = appointments.filter(apt => apt.status === 'completed' || apt.status === 'cancelled');

  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmed':
        return <Badge bg="success">Confirmed</Badge>;
      case 'completed':
        return <Badge bg="primary">Completed</Badge>;
      case 'cancelled':
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const handleCancelAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const confirmCancellation = () => {
    if (selectedAppointment) {
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === selectedAppointment.id 
            ? { ...apt, status: 'cancelled' }
            : apt
        )
      );
      setShowCancelModal(false);
      setSelectedAppointment(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center mb-3">
            <Button 
              variant="link" 
              className="text-primary p-0 me-3"
              onClick={() => onNavigate('home')}
            >
              <ArrowLeft size={20} />
            </Button>
            <h2 className="mb-0">My Appointments</h2>
          </div>
          <p className="text-muted">Manage your upcoming and past appointments</p>
        </Col>
      </Row>

      {/* Upcoming Appointments */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <Calendar size={20} className="me-2" />
                Upcoming Appointments ({upcomingAppointments.length})
              </h5>
            </Card.Header>
            <Card.Body>
              {upcomingAppointments.length === 0 ? (
                <div className="text-center py-4">
                  <Calendar size={48} className="text-muted mb-3" />
                  <h6 className="text-muted">No upcoming appointments</h6>
                  <p className="text-muted">Book your next appointment to see it here</p>
                  <Button variant="primary" onClick={() => onNavigate('scheduling')}>
                    Book Appointment
                  </Button>
                </div>
              ) : (
                <Row className="g-3">
                  {upcomingAppointments.map(appointment => (
                    <Col key={appointment.id} md={6} lg={4}>
                      <Card className="h-100 border-start border-4 border-success">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <h6 className="mb-1">{appointment.doctorName}</h6>
                              <small className="text-muted">{appointment.specialization}</small>
                            </div>
                            {getStatusBadge(appointment.status)}
                          </div>
                          
                          <div className="mb-3">
                            <div className="d-flex align-items-center mb-1">
                              <Calendar size={16} className="text-muted me-2" />
                              <small>{formatDate(appointment.date)}</small>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                              <Clock size={16} className="text-muted me-2" />
                              <small>{appointment.time}</small>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                              <MapPin size={16} className="text-muted me-2" />
                              <small>{appointment.room}</small>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <small className="text-muted">Reason:</small>
                            <div>{appointment.reason}</div>
                          </div>
                          
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="fw-bold text-primary">${appointment.fee}</div>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => handleCancelAppointment(appointment)}
                            >
                              <X size={16} className="me-1" />
                              Cancel
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Past Appointments */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <CheckCircle size={20} className="me-2" />
                Past Appointments ({pastAppointments.length})
              </h5>
            </Card.Header>
            <Card.Body>
              {pastAppointments.length === 0 ? (
                <div className="text-center py-4">
                  <CheckCircle size={48} className="text-muted mb-3" />
                  <h6 className="text-muted">No past appointments</h6>
                  <p className="text-muted">Your completed appointments will appear here</p>
                </div>
              ) : (
                <Row className="g-3">
                  {pastAppointments.map(appointment => (
                    <Col key={appointment.id} md={6} lg={4}>
                      <Card className={`h-100 border-start border-4 ${appointment.status === 'completed' ? 'border-primary' : 'border-danger'}`}>
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <h6 className="mb-1">{appointment.doctorName}</h6>
                              <small className="text-muted">{appointment.specialization}</small>
                            </div>
                            {getStatusBadge(appointment.status)}
                          </div>
                          
                          <div className="mb-3">
                            <div className="d-flex align-items-center mb-1">
                              <Calendar size={16} className="text-muted me-2" />
                              <small>{formatDate(appointment.date)}</small>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                              <Clock size={16} className="text-muted me-2" />
                              <small>{appointment.time}</small>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                              <MapPin size={16} className="text-muted me-2" />
                              <small>{appointment.room}</small>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <small className="text-muted">Reason:</small>
                            <div>{appointment.reason}</div>
                          </div>
                          
                          <div className="fw-bold text-primary">${appointment.fee}</div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Cancel Confirmation Modal */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <div>
              <Alert variant="warning">
                <strong>Are you sure you want to cancel this appointment?</strong>
              </Alert>
              <div className="mb-3">
                <strong>Appointment Details:</strong>
                <ul className="list-unstyled mt-2">
                  <li>Doctor: {selectedAppointment.doctorName}</li>
                  <li>Date: {formatDate(selectedAppointment.date)}</li>
                  <li>Time: {selectedAppointment.time}</li>
                  <li>Room: {selectedAppointment.room}</li>
                </ul>
              </div>
              <p className="text-muted">
                <strong>Note:</strong> Cancellations made less than 2 hours before the appointment 
                may be subject to a cancellation fee.
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Keep Appointment
          </Button>
          <Button variant="danger" onClick={confirmCancellation}>
            Cancel Appointment
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyAppointments;