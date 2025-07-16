import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Badge } from 'react-bootstrap';
import { Send, MessageCircle, User, Bot, Calendar, Users, ArrowLeft } from 'lucide-react';

const ChatbotScreen = ({ onNavigate }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Shifa Hospital Smart Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('doctor') || message.includes('appointment')) {
      return "I can help you find doctors and book appointments. Would you like me to show you available doctors or help you schedule an appointment?";
    } else if (message.includes('emergency')) {
      return "For emergencies, please call 911 or visit our emergency department immediately. For non-emergency cases, I can help you find the right doctor.";
    } else if (message.includes('symptom') || message.includes('pain')) {
      return "I understand you're experiencing symptoms. While I can't provide medical diagnosis, I can help you find the right specialist. Could you tell me more about your symptoms?";
    } else if (message.includes('location') || message.includes('direction')) {
      return "I can help you navigate our hospital. Are you looking for a specific department or doctor's office?";
    } else {
      return "I'm here to help with appointments, finding doctors, navigation, and general hospital information. What would you like to know?";
    }
  };

  const quickActions = [
    { text: 'Find a Doctor', action: () => onNavigate('doctors') },
    { text: 'View My Appointments', action: () => onNavigate('appointments') },
    { text: 'Hospital Navigation', action: () => onNavigate('navigation') },
    { text: 'Emergency Services', action: () => {} }
  ];

  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card>
            <Card.Header className="bg-primary text-white">
              <Row className="align-items-center">
                <Col>
                  <Button 
                    variant="link" 
                    className="text-white p-0 me-3"
                    onClick={() => onNavigate('home')}
                  >
                    <ArrowLeft size={20} />
                  </Button>
                  <MessageCircle size={24} className="me-2" />
                  <strong>Shifa Hospital Smart Assistant</strong>
                </Col>
                <Col xs="auto">
                  <Badge bg="success">Online</Badge>
                </Col>
              </Row>
            </Card.Header>
            
            <Row className="g-0" style={{ height: '70vh' }}>
              {/* Chat History */}
              <Col md={8}>
                <div className="chat-container p-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`message ${message.sender} fade-in`}
                    >
                      <div className="d-flex align-items-center mb-2">
                        {message.sender === 'user' ? (
                          <User size={16} className="me-2" />
                        ) : (
                          <Bot size={16} className="me-2" />
                        )}
                        <small className="text-muted">
                          {message.timestamp.toLocaleTimeString()}
                        </small>
                      </div>
                      <div>{message.text}</div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="message bot">
                      <div className="d-flex align-items-center mb-2">
                        <Bot size={16} className="me-2" />
                        <small className="text-muted">Typing...</small>
                      </div>
                      <div className="loading-spinner"></div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
                
                <Card.Footer>
                  <Form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="text"
                        placeholder="Describe your symptoms or ask a question..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        disabled={isTyping}
                      />
                      <Button type="submit" variant="primary" disabled={isTyping}>
                        <Send size={16} />
                      </Button>
                    </div>
                  </Form>
                </Card.Footer>
              </Col>
              
              {/* Quick Actions */}
              <Col md={4} className="border-start">
                <div className="p-3">
                  <h6 className="mb-3">Quick Actions</h6>
                  <ListGroup variant="flush">
                    {quickActions.map((action, index) => (
                      <ListGroup.Item 
                        key={index}
                        action 
                        onClick={action.action}
                        className="border-0 py-3"
                      >
                        {action.text}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  
                  <hr />
                  
                  <h6 className="mb-3">Recent Conversations</h6>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="border-0 py-2">
                      <div className="fw-bold">Cardiology Consultation</div>
                      <small className="text-muted">2 hours ago</small>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 py-2">
                      <div className="fw-bold">Appointment Booking</div>
                      <small className="text-muted">Yesterday</small>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 py-2">
                      <div className="fw-bold">Hospital Navigation</div>
                      <small className="text-muted">3 days ago</small>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatbotScreen;