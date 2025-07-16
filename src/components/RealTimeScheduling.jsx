import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Modal, Alert } from 'react-bootstrap';
import { ArrowLeft, Calendar, Clock, User, CheckCircle, AlertCircle } from 'lucide-react';

const RealTimeScheduling = ({ onNavigate }) => {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', status: 'available' },
    { id: 2, name: 'Dr. Michael Chen', specialization: 'Neurologist', status: 'busy' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'Pediatrician', status: 'available' },
    { id: 4, name: 'Dr. David Wilson', specialization: 'Orthopedic Surgeon', status: 'available' },
    { id: 5, name: 'Dr. Lisa Anderson', specialization: 'Dermatologist', status: 'busy' },
    { id: 6, name: 'Dr. Robert Taylor', specialization: 'General Surgeon', status: 'available' }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const getAvailableSlots = (doctorId, date) => {
    // Mock availability - in real app, this would come from backend
    const unavailableSlots = ['10:00 AM', '2:00 PM']; // Mock busy slots
    return timeSlots.filter(slot => !unavailableSlots.includes(slot));
  };

  const handleBooking = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      setShowSuccessModal(true);
    }
  };

  const getStatusBadge = (status) => {
    return status === 'available' ? (
      <Badge bg="success">
        <span className="status-indicator status-available"></span>
        Available
      </Badge>
    ) : (
      <Badge bg="danger">
        <span className="status-indicator status-busy"></span>
        Busy
      </Badge>
    );
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
            <h2 className="mb-0">Real-Time Scheduling</h2>
          </div>
          <p className="text-muted">Book appointments with live availability updates</p>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <Calendar size={20} className="me-2" />
                Book Your Appointment
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Select Doctor</Form.Label>
                      <Form.Select 
                        value={selectedDoctor} 
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                      >
                        <option value="">Choose a doctor...</option>
                        {doctors.map(doctor => (
                          <option key={doctor.id} value={doctor.id} disabled={doctor.status === 'busy'}>
                            {doctor.name} - {doctor.specialization}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Select Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {selectedDoctor && selectedDate && (
                  <div className="mb-4 fade-in">
                    <Form.Label>Available Time Slots</Form.Label>
                    <div className="d-flex flex-wrap gap-2">
                      {getAvailableSlots(selectedDoctor, selectedDate).map(slot => (
                        <Button
                          key={slot}
                          variant={selectedTime === slot ? 'primary' : 'outline-primary'}
                          size="sm"
                          onClick={() => setSelectedTime(slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDoctor && selectedDate && selectedTime && (
                  <Alert variant="info" className="fade-in">
                    <AlertCircle size={20} className="me-2" />
                    <strong>Booking Summary:</strong><br />
                    Doctor: {doctors.find(d => d.id.toString() === selectedDoctor)?.name}<br />
                    Date: {new Date(selectedDate).toLocaleDateString()}<br />
                    Time: {selectedTime}
                  </Alert>
                )}

                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={handleBooking}
                  disabled={!selectedDoctor || !selectedDate || !selectedTime}
                >
                  Book Appointment
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h6 className="mb-0">
                <Clock size={18} className="me-2" />
                Real-Time Status
              </h6>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <small className="text-muted">Last Updated: {new Date().toLocaleTimeString()}</small>
              </div>
              
              {doctors.map(doctor => (
                <div key={doctor.id} className="d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
                  <div>
                    <div className="fw-bold">{doctor.name}</div>
                    <small className="text-muted">{doctor.specialization}</small>
                  </div>
                  {getStatusBadge(doctor.status)}
                </div>
              ))}
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Header>
              <h6 className="mb-0">Quick Tips</h6>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <CheckCircle size={16} className="text-success me-2" />
                  Status updates every 30 seconds
                </li>
                <li className="mb-2">
                  <CheckCircle size={16} className="text-success me-2" />
                  Instant booking confirmation
                </li>
                <li className="mb-2">
                  <CheckCircle size={16} className="text-success me-2" />
                  SMS/Email notifications
                </li>
                <li className="mb-0">
                  <CheckCircle size={16} className="text-success me-2" />
                  Free cancellation up to 2 hours
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Body className="text-center py-4">
          <CheckCircle size={64} className="text-success mb-3" />
          <h4 className="mb-3">Appointment Booked Successfully!</h4>
          <p className="mb-4">
            Your appointment has been confirmed. You will receive a confirmation 
            email and SMS shortly.
          </p>
          <div className="d-flex gap-2 justify-content-center">
            <Button 
              variant="primary" 
              onClick={() => {
                setShowSuccessModal(false);
                onNavigate('appointments');
              }}
            >
              View My Appointments
            </Button>
            <Button 
              variant="outline-primary" 
              onClick={() => {
                setShowSuccessModal(false);
                onNavigate('home');
              }}
            >
              Back to Home
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default RealTimeScheduling;