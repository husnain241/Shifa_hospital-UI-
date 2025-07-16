import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, InputGroup } from 'react-bootstrap';
import { Search, Filter, Star, MapPin, Clock, ArrowLeft, Eye } from 'lucide-react';

const DoctorDirectory = ({ onNavigate, onSelectDoctor }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedFeeRange, setSelectedFeeRange] = useState('all');

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist',
      department: 'Cardiology',
      photo: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rating: 4.8,
      experience: '15 years',
      fee: 150,
      availability: 'available',
      room: 'Room 204',
      timings: '9:00 AM - 5:00 PM'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Neurologist',
      department: 'Neurology',
      photo: 'https://images.pexels.com/photos/6789735/pexels-photo-6789735.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rating: 4.9,
      experience: '12 years',
      fee: 180,
      availability: 'busy',
      room: 'Room 301',
      timings: '10:00 AM - 6:00 PM'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialization: 'Pediatrician',
      department: 'Pediatrics',
      photo: 'https://images.pexels.com/photos/4173249/pexels-photo-4173249.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rating: 4.7,
      experience: '8 years',
      fee: 120,
      availability: 'available',
      room: 'Room 102',
      timings: '8:00 AM - 4:00 PM'
    },
    {
      id: 4,
      name: 'Dr. David Wilson',
      specialization: 'Orthopedic Surgeon',
      department: 'Orthopedics',
      photo: 'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rating: 4.6,
      experience: '20 years',
      fee: 200,
      availability: 'available',
      room: 'Room 405',
      timings: '11:00 AM - 7:00 PM'
    },
    {
      id: 5,
      name: 'Dr. Lisa Anderson',
      specialization: 'Dermatologist',
      department: 'Dermatology',
      photo: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rating: 4.5,
      experience: '10 years',
      fee: 130,
      availability: 'busy',
      room: 'Room 203',
      timings: '9:00 AM - 5:00 PM'
    },
    {
      id: 6,
      name: 'Dr. Robert Taylor',
      specialization: 'General Surgeon',
      department: 'Surgery',
      photo: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rating: 4.8,
      experience: '18 years',
      fee: 250,
      availability: 'available',
      room: 'Room 501',
      timings: '7:00 AM - 3:00 PM'
    }
  ];

  const departments = ['all', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Surgery'];
  const feeRanges = [
    { value: 'all', label: 'All Ranges' },
    { value: '0-150', label: '$0 - $150' },
    { value: '151-200', label: '$151 - $200' },
    { value: '201+', label: '$201+' }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || doctor.department === selectedDepartment;
    const matchesFeeRange = selectedFeeRange === 'all' || 
                           (selectedFeeRange === '0-150' && doctor.fee <= 150) ||
                           (selectedFeeRange === '151-200' && doctor.fee >= 151 && doctor.fee <= 200) ||
                           (selectedFeeRange === '201+' && doctor.fee >= 201);
    
    return matchesSearch && matchesDepartment && matchesFeeRange;
  });

  const handleDoctorSelect = (doctor) => {
    onSelectDoctor(doctor);
    onNavigate('doctor-detail');
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
            <h2 className="mb-0">Doctor Directory</h2>
          </div>
          <p className="text-muted">Find and connect with our qualified medical professionals</p>
        </Col>
      </Row>

      {/* Search and Filters */}
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="primary">
              <Search size={16} />
            </Button>
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept === 'all' ? 'All Departments' : dept}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={selectedFeeRange}
            onChange={(e) => setSelectedFeeRange(e.target.value)}
          >
            {feeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Doctor Cards */}
      <Row className="g-4">
        {filteredDoctors.map(doctor => (
          <Col key={doctor.id} md={6} lg={4}>
            <Card className="h-100 doctor-card">
              <div className="position-relative">
                <Card.Img 
                  variant="top" 
                  src={doctor.photo} 
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Badge 
                  bg={doctor.availability === 'available' ? 'success' : 'danger'}
                  className="availability-badge"
                >
                  <span className={`status-indicator status-${doctor.availability}`}></span>
                  {doctor.availability === 'available' ? 'Available' : 'Busy'}
                </Badge>
              </div>
              
              <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-2">{doctor.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-primary">{doctor.specialization}</Card.Subtitle>
                
                <div className="mb-2">
                  <div className="d-flex align-items-center mb-1">
                    <Star size={16} className="text-warning me-1" />
                    <span className="me-2">{doctor.rating}</span>
                    <small className="text-muted">({doctor.experience} experience)</small>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <MapPin size={16} className="text-muted me-1" />
                    <small>{doctor.room}</small>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <Clock size={16} className="text-muted me-1" />
                    <small>{doctor.timings}</small>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <div className="fw-bold text-primary">${doctor.fee}</div>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    <Eye size={16} className="me-1" />
                    View Profile
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredDoctors.length === 0 && (
        <Row className="mt-5">
          <Col className="text-center">
            <div className="py-5">
              <Search size={48} className="text-muted mb-3" />
              <h4 className="text-muted">No doctors found</h4>
              <p className="text-muted">Try adjusting your search criteria</p>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default DoctorDirectory;