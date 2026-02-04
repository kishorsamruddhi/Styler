import React, { useState } from "react";
import {
  Zap,
  Flame,
  Wind,
  Settings,
  Droplets,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const nagivate = useNavigate();

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleViewDetails = (href) => {
    nagivate(href);
  };

  return <section id="services" className="section-padding bg-white"></section>;
};

export default Services;
