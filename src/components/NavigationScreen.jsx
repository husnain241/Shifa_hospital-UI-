import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Badge } from 'react-bootstrap';
import { ArrowLeft, MapPin, Navigation, Clock, ArrowRight } from 'lucide-react';

const NavigationScreen = ({ onNavigate }) => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const destinations = [
    { id: 'reception', name: 'Reception', floor: 'Ground Floor', room: 'Main Lobby' },
    { id: 'cardiology', name: 'Cardiology Department', floor: '2nd Floor', room: 'Room 204' },
    { id: 'neurology', name: 'Neurology Department', floor: '3rd Floor', room: 'Room 301' },
    { id: 'pediatrics', name: 'Pediatrics Department', floor: '1st Floor', room: 'Room 102' },
    { id: 'orthopedics', name: 'Orthopedics Department', floor: '4th Floor', room: 'Room 405' },
    { id: 'emergency', name: 'Emergency Department', floor: 'Ground Floor', room: 'Emergency Wing' },
    { id: 'pharmacy', name: 'Pharmacy', floor: 'Ground Floor', room: 'Near Reception' },
    { id: 'cafeteria', name: 'Cafeteria', floor: 'Ground Floor', room: 'East Wing' }
  ];

  const getNavigationInstructions = (destinationId) => {
    const instructions = {
      reception: [
        'You are currently at the main entrance',
        'Walk straight ahead for 20 meters',
        'Reception desk will be on your right'
      ],
      cardiology: [
        'From reception, turn right toward the elevators',
        'Take the elevator to the 2nd floor',
        'Turn left after exiting the elevator',
        'Walk 30 meters down the hallway',
        'Room 204 will be on your right'
      ],
      neurology: [
        'From reception, turn right toward the elevators',
        'Take the elevator to the 3rd floor',
        'Turn right after exiting the elevator',
        'Walk 40 meters down the hallway',
        'Room 301 will be on your left'
      ],
      pediatrics: [
        'From reception, turn left toward the stairs',
        'Take the stairs to the 1st floor',
        'Turn right after reaching the 1st floor',
        'Walk 25 meters down the hallway',
        'Room 102 will be on your left'
      ],
      orthopedics: [
        'From reception, turn right toward the elevators',
        'Take the elevator to the 4th floor',
        'Turn left after exiting the elevator',
        'Walk 35 meters down the hallway',
        'Room 405 will be on your right'
      ],
      emergency: [
        'From main entrance, turn right immediately',
        'Follow the red emergency signs',
        'Walk 50 meters to the emergency wing',
        'Emergency department entrance will be clearly marked'
      ],
      pharmacy: [
        'From reception, turn left',
        'Walk 15 meters toward the east wing',
        'Pharmacy will be on your right, next to the gift shop'
      ],
      cafeteria: [
        'From reception, walk straight ahead',
        'Pass the information desk on your left',
        'Turn right at the end of the hallway',
        'Cafeteria entrance will be 20 meters ahead'
      ]
    };
    
    return instructions[destinationId] || [];
  };

  const handleStartNavigation = (destinationId) => {
    setSelectedDestination(destinationId);
    setIsNavigating(true);
  };

  const estimatedTime = selectedDestination ? Math.floor(Math.random() * 5) + 2 : 0;

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
            <h2 className="mb-0">Hospital Navigation</h2>
          </div>
          <p className="text-muted">Interactive map and step-by-step directions</p>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <MapPin size={20} className="me-2" />
                Hospital Map
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="navigation-map position-relative">
                {/* Mock hospital layout */}
                <div className="text-center mb-3">
                  <h6>Shifa Hospital - Interactive Floor Plan</h6>
                </div>
                
                {/* Room markers */}
                <div className="room-marker" style={{ top: '20%', left: '50%' }} 
                     onClick={() => handleStartNavigation('reception')}>
                  R
                </div>
                <div className="room-marker" style={{ top: '10%', left: '20%' }} 
                     onClick={() => handleStartNavigation('emergency')}>
                  E
                </div>
                <div className="room-marker" style={{ top: '30%', left: '80%' }} 
                     onClick={() => handleStartNavigation('cardiology')}>
                  C
                </div>
                <div className="room-marker" style={{ top: '60%', left: '30%' }} 
                     onClick={() => handleStartNavigation('neurology')}>
                  N
                </div>
                <div className="room-marker" style={{ top: '50%', left: '70%' }} 
                     onClick={() => handleStartNavigation('pediatrics')}>
                  P
                </div>
                <div className="room-marker" style={{ top: '80%', left: '20%' }} 
                     onClick={() => handleStartNavigation('pharmacy')}>
                  PH
                </div>
                <div className="room-marker" style={{ top: '70%', left: '80%' }} 
                     onClick={() => handleStartNavigation('cafeteria')}>
                  CF
                </div>

                {/* Legend */}
                <div className="position-absolute bottom-0 start-0 p-3 bg-white border rounded">
                  <small>
                    <strong>Legend:</strong><br />
                    R - Reception | E - Emergency | C - Cardiology<br />
                    N - Neurology | P - Pediatrics | PH - Pharmacy | CF - Cafeteria
                  </small>
                </div>

                {/* Current location indicator */}
                <div className="position-absolute top-0 end-0 p-3">
                  <Badge bg="primary">
                    <MapPin size={16} className="me-1" />
                    You are here: Main Entrance
                  </Badge>
                </div>
              </div>

              {isNavigating && selectedDestination && (
                <div className="mt-4 fade-in">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">
                      <Navigation size={20} className="me-2" />
                      Navigating to: {destinations.find(d => d.id === selectedDestination)?.name}
                    </h6>
                    <Badge bg="info">
                      <Clock size={16} className="me-1" />
                      ~{estimatedTime} min
                    </Badge>
                  </div>
                  
                  <div className="bg-light p-3 rounded">
                    <h6 className="mb-3">Step-by-step directions:</h6>
                    <div className="d-flex flex-column gap-2">
                      {getNavigationInstructions(selectedDestination).map((instruction, index) => (
                        <div key={index} className="d-flex align-items-center">
                          <Badge bg="primary" className="me-3">{index + 1}</Badge>
                          <span>{instruction}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h6 className="mb-0">Popular Destinations</h6>
            </Card.Header>
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                {destinations.map(destination => (
                  <ListGroup.Item 
                    key={destination.id} 
                    action 
                    onClick={() => handleStartNavigation(destination.id)}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <div className="fw-bold">{destination.name}</div>
                      <small className="text-muted">{destination.floor} - {destination.room}</small>
                    </div>
                    <ArrowRight size={16} className="text-muted" />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Header>
              <h6 className="mb-0">Navigation Features</h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center">
                  <div className="bg-primary rounded-circle p-2 me-3">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="fw-bold">Interactive Map</div>
                    <small className="text-muted">Click on any room marker</small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="bg-success rounded-circle p-2 me-3">
                    <Navigation size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="fw-bold">Turn-by-turn Directions</div>
                    <small className="text-muted">Detailed step-by-step guide</small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="bg-info rounded-circle p-2 me-3">
                    <Clock size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="fw-bold">Estimated Time</div>
                    <small className="text-muted">Walking time estimates</small>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NavigationScreen;