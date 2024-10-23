import React, { useState } from 'react';
//import { Link } from "react-router-dom";
import "../src/Resources/styles/help.css";

const Help = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('findParking');

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questionsData = {
    findParking: [
      {
        question: "How to locate available parking spots?",
        answer: "You can locate available parking spots using our mobile app or website. Simply enter your desired location, and you'll see all nearby parking options.",
      },
      {
        question: "What are the charges for different parking slots?",
        answer: "Parking charges vary based on location and time. Peak hours may incur higher rates. Check the pricing page for specific details.",
      },
      {
        question: "Can I reserve a parking spot in advance?",
        answer: "Yes, you can reserve a parking spot in advance through our app or website. Just select the date and time, and confirm your booking.",
      },
    ],
    pricingPlans: [
      {
        question: "What are the pricing plans available?",
        answer: "We offer hourly, daily, and monthly parking plans. Visit our pricing page for detailed information.",
      },
      {
        question: "Are there discounts for long-term parking?",
        answer: "Yes, we offer discounts for weekly and monthly parking plans. Contact our support for more details.",
      },
    ],
    faqs: [
      {
        question: "Is there a refund policy for canceled bookings?",
        answer: "Yes, you can cancel your booking up to 30 minutes before the scheduled time for a full refund. Cancellations made after this time may incur a fee.",
      },
      {
        question: "How secure are the parking spots?",
        answer: "Our parking spots are monitored with 24/7 surveillance and security personnel to ensure the safety of your vehicle.",
      },
    ],
    contactSupport: [
      {
        question: "How can I contact support?",
        answer: "You can reach our support team via email, phone, or live chat. Visit our contact page for more information.",
      },
    ]
  };

  const questions = questionsData[activeCategory];

  return (
    <div className="min-h-screen font-sans bg-gray-100">
      {/* Top Blue Header */}
      <div className="bg-blue-800 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold animate-bounce">Parking Help & Support</h1>
        <p className="text-sm italic text-gray-200 animate-pulse">
          Let's help you find a spot and manage your parking needs better.
        </p>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-6 border-r border-gray-300 shadow-md">
          <ul className="space-y-4">
            <li 
              className={`cursor-pointer text-xl-gray-800 hover:text-blue-500  ${activeCategory === 'findParking' ? 'font-bold' : ''}`} 
              onClick={() => setActiveCategory('findParking')}
            >
              Find a Parking Spot
            </li>
            <li 
              className={`cursor-pointer text-gray-800 hover:text-blue-500 ${activeCategory === 'pricingPlans' ? 'font-bold' : ''}`} 
              onClick={() => setActiveCategory('pricingPlans')}
            >
              Pricing and Plans
            </li>
            <li 
              className={`cursor-pointer text-gray-800 hover:text-blue-500 ${activeCategory === 'faqs' ? 'font-bold' : ''}`} 
              onClick={() => setActiveCategory('faqs')}
            >
              FAQs
            </li>
            <li 
              className={`cursor-pointer text-gray-800 hover:text-blue-500 ${activeCategory === 'contactSupport' ? 'font-bold' : ''}`} 
              onClick={() => setActiveCategory('contactSupport')}
            >
              Contact Support
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{activeCategory === 'findParking' ? 'Find a Parking Spot' : activeCategory === 'pricingPlans' ? 'Pricing and Plans' : activeCategory === 'faqs' ? 'FAQs' : 'Contact Support'}</h2>
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            {questions.map((item, index) => (
              <div key={index} className="border-b border-gray-300">
                <div 
                  className="cursor-pointer text-gray-700 flex justify-between items-center py-4 hover:text-blue-500"
                  onClick={() => toggleAnswer(index)}
                >
                  <span className='text-xl' >{item.question}</span>
                  <span className={activeIndex === index ? "transform rotate-180" : ""}>
                    ▼
                  </span>
                </div>
                {activeIndex === index && (
                  <div className="text-gray-600 pb-4 transition-opacity duration-500 ease-in-out transform opacity-0 fade-up">{/* Added fade-up class */}
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
