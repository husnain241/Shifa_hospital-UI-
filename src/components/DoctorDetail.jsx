import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Nav, Tab, Badge, Modal, Form } from 'react-bootstrap';
import { ArrowLeft, Calendar, Clock, MapPin, Star, Phone, Mail, Award, Users } from 'lucide-react';

const DoctorDetail = ({ doctor, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('about');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    reason: '',
    patientName: '',
    phone: ''
  });

  if (!doctor) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <h4>Doctor not found</h4>
          <Button variant="primary" onClick={() => onNavigate('doctors')}>
            Back to Directory
          </Button>
        </div>
      </Container>
    );
  }

  const reviews = [
    {
      id: 1,
      patient: 'John Smith',
      rating: 5,
      comment: 'Excellent doctor! Very thorough and caring. Highly recommend.',
      date: '2 days ago'
    },
    {
      id: 2,
      patient: 'Maria Garcia',
      rating: 4,
      comment: 'Great experience. Dr. was very professional and knowledgeable.',
      date: '1 week ago'
    },
    {
      id: 3,
      patient: 'Ahmed Hassan',
      rating: 5,
      comment: 'Outstanding care and attention to detail. Will definitely return.',
      date: '2 weeks ago'
    }
  ];

  const availableSlots = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: false },
    { time: '4:00 PM', available: true }
  ];

  const handleBookingSubmit = () => {
    // Here you would typically submit the booking to your backend
    console.log('Booking submitted:', bookingData);
    setShowBookingModal(false);
    // Show success message or redirect
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <Button 
            variant="link" 
            className="text-primary p-0 me-3"
            onClick={() => onNavigate('doctors')}
          >
            <ArrowLeft size={20} />
          </Button>
          <span className="text-muted">Back to Directory</span>
        </Col>
      </Row>

      <Row>
        <Col lg={4}>
          <Card>
            <Card.Img 
              variant="top" 
              src={doctor.photo} 
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <Card.Body className="text-center">
              <Card.Title className="mb-2">{doctor.name}</Card.Title>
              <Card.Subtitle className="text-primary mb-3">{doctor.specialization}</Card.Subtitle>
              
              <Badge 
                bg={doctor.availability === 'available' ? 'success' : 'danger'}
                className="mb-3"
                style={{ fontSize: '14px' }}
              >
                <span className={`status-indicator status-${doctor.availability}`}></span>
                {doctor.availability === 'available' ? 'Available Now' : 'Currently Busy'}
              </Badge>

              <div className="mb-3">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <Star size={20} className="text-warning me-1" />
                  <span className="fw-bold">{doctor.rating}</span>
                  <span className="text-muted ms-1">(4.8/5)</span>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <MapPin size={16} className="text-muted me-2" />
                  <span>{doctor.room}</span>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <Clock size={16} className="text-muted me-2" />
                  <span>{doctor.timings}</span>
                </div>
              </div>

              <div className="mb-3">
                <h5 className="text-primary">${doctor.fee}</h5>
                <small className="text-muted">Consultation Fee</small>
              </div>

              <Button 
                variant="primary" 
                size="lg" 
                className="w-100"
                onClick={() => setShowBookingModal(true)}
                disabled={doctor.availability === 'busy'}
              >
                <Calendar size={20} className="me-2" />
                Book Appointment
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card>
            <Card.Header>
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'about'} 
                    onClick={() => setActiveTab('about')}
                  >
                    About
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'reviews'} 
                    onClick={() => setActiveTab('reviews')}
                  >
                    Reviews
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'schedule'} 
                    onClick={() => setActiveTab('schedule')}
                  >
                    Schedule
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>

            <Card.Body>
              {activeTab === 'about' && (
                <div className="fade-in">
                  <h5 className="mb-3">About Dr. {doctor.name}</h5>
                  <p className="mb-4">
                    Dr. {doctor.name} is a highly experienced {doctor.specialization} with {doctor.experience} of 
                    dedicated service in the medical field. Known for providing compassionate care and 
                    utilizing the latest medical technologies and techniques.
                  </p>

                  <Row className="mb-4">
                    <Col md={6}>
                      <h6 className="mb-3">
                        <Award size={20} className="me-2 text-primary" />
                        Education & Certifications
                      </h6>
                      <ul className="list-unstyled">
                        <li className="mb-2">• MD in {doctor.specialization}</li>
                        <li className="mb-2">• Board Certified</li>
                        <li className="mb-2">• Fellowship in Advanced {doctor.specialization}</li>
                        <li className="mb-2">• Member of Medical Association</li>
                      </ul>
                    </Col>
                    <Col md={6}>
                      <h6 className="mb-3">
                        <Users size={20} className="me-2 text-primary" />
                        Experience
                      </h6>
                      <ul className="list-unstyled">
                        <li className="mb-2">• {doctor.experience} of practice</li>
                        <li className="mb-2">• 5000+ successful treatments</li>
                        <li className="mb-2">• Published researcher</li>
                        <li className="mb-2">• International speaker</li>
                      </ul>
                    </Col>
                  </Row>

                  <h6 className="mb-3">Contact Information</h6>
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex align-items-center">
                      <Phone size={16} className="me-2 text-muted" />
                      <span>(555) 123-4567</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <Mail size={16} className="me-2 text-muted" />
                      <span>{doctor.name.toLowerCase().replace(/\s+/g, '.')}@shifa-hospital.com</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="fade-in">
                  <h5 className="mb-4">Patient Reviews</h5>
                  {reviews.map(review => (
                    <Card key={review.id} className="mb-3">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">{review.patient}</h6>
                          <small className="text-muted">{review.date}</small>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < review.rating ? 'text-warning' : 'text-muted'} 
                            />
                          ))}
                        </div>
                        <p className="mb-0">{review.comment}</p>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === 'schedule' && (
                <div className="fade-in">
                  <h5 className="mb-4">Available Schedule</h5>
                  <Row>
                    <Col md={6}>
                      <h6 className="mb-3">Today's Availability</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {availableSlots.map((slot, index) => (
                          <Button
                            key={index}
                            variant={slot.available ? 'outline-success' : 'outline-secondary'}
                            size="sm"
                            disabled={!slot.available}
                          >
                            {slot.time}
                          </Button>
                        ))}
                      </div>
                    </Col>
                    <Col md={6}>
                      <h6 className="mb-3">Working Hours</h6>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span>Monday - Friday</span>
                          <span>{doctor.timings}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Saturday</span>
                          <span>9:00 AM - 1:00 PM</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Sunday</span>
                          <span>Closed</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Booking Modal */}
      <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment with {doctor.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Patient Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={bookingData.patientName}
                    onChange={(e) => setBookingData({...bookingData, patientName: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Preferred Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Preferred Time</Form.Label>
                  <Form.Select
                    value={bookingData.time}
                    onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                  >
                    <option value="">Select time</option>
                    {availableSlots.filter(slot => slot.available).map((slot, index) => (
                      <option key={index} value={slot.time}>{slot.time}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Reason for Visit</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={bookingData.reason}
                onChange={(e) => setBookingData({...bookingData, reason: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBookingModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleBookingSubmit}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DoctorDetail;