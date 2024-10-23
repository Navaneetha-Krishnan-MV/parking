import React, { useState } from 'react';
//import { Link } from "react-router-dom";
import "../src/Resources/styles/help.css";

const TermsandServices = () => {
  const [activeIndex, setActiveIndex] = useState('');
  const [activeCategory, setActiveCategory] = useState('termsofuse'); // Default category to 'termsofuse'

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? '' : index);
  };

  const questionsData = {
    termsofuse: [
      {
        question: "User Responsibilities",
        answer: "Users are expected to use the parking slot booking service in accordance with the law and respect the rights of others. Misuse of the service, such as fraudulent bookings or unauthorized access to the system, may result in account termination. Users must not engage in any activities that could disrupt the service or negatively impact other users. Repeated violations may lead to legal action.",
      },
      {
        question: "Intellectual Property",
        answer: "All content on the parking website, including the booking interface, graphics, and logos, is the intellectual property of the company and protected by copyright laws. Users are prohibited from copying, distributing, or using any content without explicit permission. Unauthorized use may lead to legal consequences. We reserve the right to remove any content that infringes on intellectual property rights.",
      },
      {
        question: "Limitation of Liability",
        answer: "The company is not responsible for any damages or losses resulting from the use of the parking slot booking service. Users book and use parking slots at their own risk. We do not guarantee the availability or security of parking slots. In no event shall the company be liable for any indirect, incidental, or consequential damages arising from the use of the service.",
      },
    ],
    privacypolicy: [
      {
        question: "Data Collection",
        answer: "We collect personal information to enhance your experience with our parking slot booking service. This includes data provided during booking and information automatically collected through the website. We may also use cookies and similar technologies to understand user preferences and optimize the booking process. Users have the option to control cookie settings and limit data collection.",
      },
      {
        question: "Data Usage",
        answer: "Your data is used to manage bookings, improve services, and communicate with you regarding your parking reservations. We do not sell your personal information to third parties. Your data may be shared with trusted partners to facilitate parking services or comply with legal obligations. We ensure that all third-party partners adhere to strict data protection standards.",
      },
      {
        question: "Data Security",
        answer: "We implement robust security measures to protect your data from unauthorized access, especially in relation to parking slot bookings. However, no system is entirely secure, and users should be aware of potential risks. We regularly update our security protocols to safeguard your information. In case of a data breach, we will promptly notify affected users and take appropriate action.",
      },
    ],
    cancellation: [
      {
        question: "Cancellation Policy",
        answer: "Users may cancel their parking slot bookings within a specified period for a full or partial refund, depending on the booking type and usage. Cancellations made after the specified period may not be eligible for a refund. Users must follow the cancellation procedures outlined on the website. Exceptions to the policy will be reviewed on a case-by-case basis.",
      },
      {
        question: "Refund Process",
        answer: "Refunds for canceled parking slot bookings are processed within 7-10 business days after the cancellation request is approved. The refund amount will be credited to the original payment method. Users will receive a confirmation email once the refund is initiated. In case of any delays, users are advised to contact customer support for assistance.",
      },
      {
        question: "Non-Refundable Services",
        answer: "Certain parking slots or special reservations may be non-refundable, such as prepaid bookings or special event parking. These exceptions will be clearly stated at the time of booking. Users should carefully review the terms before making a reservation to understand refund eligibility. We strive to ensure transparency in all transactions to avoid any misunderstandings.",
      },
    ]
  };

  const questions = questionsData[activeCategory] || []; // Ensure questions is an array

  return (
    <div className="min-h-screen font-sans bg-gray-100">
      {/* Top Blue Header */}
      <div className="bg-blue-800 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold animate-bounce">Parking Terms and Services</h1>
        <p className="text-sm italic text-gray-200 animate-pulse">
          Let you know about our terms and services better.
        </p>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-6 border-r border-gray-300 shadow-md">
          <ul className="space-y-4">
            <li 
              className={`cursor-pointer text-gray-800 hover:text-blue-500 ${activeCategory === 'termsofuse' ? 'font-bold' : ''}`} 
              onClick={() => setActiveCategory('termsofuse')}
            >
              Terms of use
            </li>
            <li 
              className={`cursor-pointer text-gray-800 hover:text-blue-500 ${activeCategory === 'privacypolicy' ? 'font-bold' : ''}`} 
              onClick={() => setActiveCategory('privacypolicy')}
            >
              Privacy Policy
            </li>
            <li 
              className={`cursor-pointer text-gray-800 hover:text-blue-500 ${activeCategory === 'cancellation' ? 'font-bold' : ''}`} 
              onClick={() => setActiveCategory('cancellation')}
            >
              Cancellations and Refunds
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {activeCategory === 'termsofuse' ? 'Terms of Use' : 
             activeCategory === 'privacypolicy' ? 'Privacy Policy' : 
             activeCategory === 'cancellation' ? 'Cancellations and Refunds' : 'No Category Selected'}
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            {questions.map((item, index) => (
              <div key={index} className="border-b border-gray-300">
                <div 
                  className="cursor-pointer text-gray-700 flex justify-between items-center py-4 hover:text-blue-500"
                  onClick={() => toggleAnswer(index)}
                >
                  <span className='text-xl'>{item.question}</span>
                  <span className={activeIndex === index ? "transform rotate-180" : ""}>
                    ▼
                  </span>
                </div>
                {activeIndex === index && (
                  <div className="text-gray-600 pb-4 transition-opacity duration-500 ease-in-out">
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

export default TermsandServices;
