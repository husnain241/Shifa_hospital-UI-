import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  MessageCircle,
  Users,
  Calendar,
  Phone,
  Activity,
  Shield,
  HelpCircle,
} from "lucide-react";

const HomeScreen = ({ onNavigate }) => {
  // Looping typewriter animation for subtitle
  const [typedText, setTypedText] = React.useState("");
  const [colorIndex, setColorIndex] = React.useState(0);
  const fullText =
    "Your intelligent healthcare companion for seamless hospital navigation, doctor consultations, and appointment management.";
  // Gradient colors for heading
  const gradientColors = [
    "#6a11cb", // purple
    "#2575fc", // blue
    "#43e97b", // green
    "#38f9d7", // teal
    "#fa8bff", // pink
    "#f9d423", // yellow
    "#fc913a", // orange
    "#ff4e50", // red
  ];
  React.useEffect(() => {
    let i = 0;
    let typing = true;
    let timeout;
    // Adjust these values to slow down the color movement
    const typeSpeed = 40; // was 25
    const eraseSpeed = 18; // was 10
    function typeLoop() {
      if (typing) {
        if (i <= fullText.length) {
          setTypedText(fullText.slice(0, i));
          setColorIndex(i);
          i++;
          timeout = setTimeout(typeLoop, typeSpeed);
        } else {
          typing = false;
          timeout = setTimeout(typeLoop, 1200);
        }
      } else {
        if (i >= 0) {
          setTypedText(fullText.slice(0, i));
          setColorIndex(i);
          i--;
          timeout = setTimeout(typeLoop, eraseSpeed);
        } else {
          typing = true;
          timeout = setTimeout(typeLoop, 600);
        }
      }
    }
    typeLoop();
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-center">
        <Container>
          <span
            className="rotate-vert-centre mb-4"
            style={{ display: "inline-block" }}
          >
            <Activity size={80} />
          </span>
          <h1 className="display-4 fw-bold mb-4 type-animated">
            {Array.from("Welcome to Shifa Hospital Smart Chatbot").map(
              (char, idx, arr) => {
                // Animate a moving gradient highlight of 7 chars wide
                const highlightWidth = 7;
                let highlightStart = colorIndex % arr.length;
                let highlightEnd =
                  (highlightStart + highlightWidth) % arr.length;
                let isHighlighted = false;
                if (highlightEnd > highlightStart) {
                  isHighlighted = idx >= highlightStart && idx < highlightEnd;
                } else {
                  isHighlighted = idx >= highlightStart || idx < highlightEnd;
                }
                let color;
                if (isHighlighted) {
                  // Assign gradient color based on position in highlight
                  const gradIdx =
                    (idx - highlightStart + highlightWidth) % highlightWidth;
                  color = gradientColors[gradIdx % gradientColors.length];
                }
                return (
                  <span
                    key={idx}
                    style={{
                      color: color,
                      transition: "color 0.2s",
                    }}
                  >
                    {char}
                  </span>
                );
              }
            )}
          </h1>
          <p className="lead mb-5" style={{ minHeight: 60 }}>
            {typedText}
            <span className="type-cursor">|</span>
          </p>
          <style>{`
            .type-cursor {
              display: inline-block;
              width: 1ch;
              animation: blink 1s steps(1) infinite;
            }
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
            .type-animated span {
              font-weight: bold;
              font-family: inherit;
            }
            /* rotate-vert-centre animation (slower) */
            .rotate-vert-centre {
              animation: rotate-vert-centre 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite both;
            }
            @keyframes rotate-vert-centre {
              0% {
                transform: rotateY(0);
              }
              100% {
                transform: rotateY(360deg);
              }
            }
          `}</style>
          <Row className="justify-content-center">
            <Col md={8}>
              <Row className="g-3">
                <Col md={6}>
                  <Button
                    variant="light"
                    size="lg"
                    className="w-100 py-3"
                    onClick={() => onNavigate("chat")}
                  >
                    <MessageCircle size={24} className="me-2" />
                    Start Chat
                  </Button>
                </Col>
                <Col md={6}>
                  <Button
                    variant="outline-light"
                    size="lg"
                    className="w-100 py-3"
                    onClick={() => onNavigate("doctors")}
                  >
                    <Users size={24} className="me-2" />
                    View Doctors
                  </Button>
                </Col>
                <Col md={6}>
                  <Button
                    variant="outline-light"
                    size="lg"
                    className="w-100 py-3"
                    onClick={() => onNavigate("scheduling")}
                  >
                    <Calendar size={24} className="me-2" />
                    Real-Time Scheduling
                  </Button>
                </Col>
                <Col md={6}>
                  <Button
                    variant="light"
                    size="lg"
                    className="w-100 py-3"
                    onClick={() => onNavigate("navigation")}
                  >
                    <Phone size={24} className="me-2" />
                    Contact Us
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <Container className="py-5">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-6 fw-bold mb-3">
              Why Choose Shifa Hospital?
            </h2>
            <p className="lead text-muted">
              Experience the future of healthcare with our smart, AI-powered
              hospital management system.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 text-center fade-in">
              <Card.Body className="p-4">
                <MessageCircle size={48} className="text-primary mb-3" />
                <Card.Title>Smart Chatbot</Card.Title>
                <Card.Text>
                  Get instant answers to your health queries and navigate the
                  hospital with our AI assistant.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center fade-in">
              <Card.Body className="p-4">
                <Calendar size={48} className="text-primary mb-3" />
                <Card.Title>Real-Time Scheduling</Card.Title>
                <Card.Text>
                  Book appointments instantly with live availability updates and
                  automated confirmations.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center fade-in">
              <Card.Body className="p-4">
                <Users size={48} className="text-primary mb-3" />
                <Card.Title>Expert Doctors</Card.Title>
                <Card.Text>
                  Connect with our qualified specialists across all medical
                  departments and specializations.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="footer text-center">
        <Container>
          <Row>
            <Col md={4}>
              <h5 className="mb-3">
                <Activity size={24} className="me-2" />
                Shifa Hospital
              </h5>
              <p>
                Your trusted healthcare partner providing world-class medical
                services.
              </p>
            </Col>
            <Col md={4}>
              <h5 className="mb-3">Quick Links</h5>
              <div className="d-flex flex-column">
                <a href="#" className="text-white-50 mb-2">
                  About Us
                </a>
                <a href="#" className="text-white-50 mb-2">
                  Privacy Policy
                </a>
                <a href="#" className="text-white-50 mb-2">
                  Terms of Service
                </a>
              </div>
            </Col>
            <Col md={4}>
              <h5 className="mb-3">Help & Support</h5>
              <div className="d-flex flex-column">
                <a href="#" className="text-white-50 mb-2">
                  <HelpCircle size={16} className="me-1" />
                  Help Center
                </a>
                <a href="#" className="text-white-50 mb-2">
                  Contact Support
                </a>
                <a href="#" className="text-white-50 mb-2">
                  Emergency Services
                </a>
              </div>
            </Col>
          </Row>
          <hr className="my-4" />
          <Row>
            <Col>
              <p className="mb-0">
                &copy; 2025 Shifa Hospital. All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default HomeScreen;
