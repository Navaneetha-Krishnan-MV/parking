import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Resources/styles/DistrictRegion.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ppimg from "./Resources/Aboutimages/Untitled design.png";
import PaymentModal from './PaymentModal.jsx';
import feedbackimg from "./Resources/Aboutimages/feedbackimage (1).jpg";
import C from "./Resources/Aboutimages/aboutright.webp";

const DistrictRegionSelector = () => {
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [parkingPlaces, setParkingPlaces] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCapacity, setSelectedCapacity] = useState({ tcapacity: 0, fcapacity: 0 });

    useEffect(() => {
        if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
            console.log('Page was reloaded');
        } else {
            window.location.reload();
        }
    }, []);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        axios.get('https://parking-0wap.onrender.com/api/parking-places')
            .then(response => {
                setParkingPlaces(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the parking places!', error);
            });
    }, []);

    const handleCityChange = (event) => {
        const selectedCity = event.target.value;
        setCity(selectedCity);
        setRegion('');
    };

    const handleRegionChange = (event) => {
        const selectedRegion = event.target.value;
        setRegion(selectedRegion);
    };

    const handleBookClick = (tcapacity, fcapacity, placeName) => {
        localStorage.setItem('placeName', placeName); // Store place name in localStorage
        setIsModalOpen(true);
        setSelectedCapacity({ tcapacity, fcapacity });

        const userEmail = 'user-email@gmail.com'; // Replace with actual user email

        axios.post('https://parking-0wap.onrender.com/send-booking-email', {
            placeName,
            tcapacity,
            fcapacity,
            userEmail
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error sending the email!', error);
        });
    };

    const filterParkingPlaces = () => {
        if (!city || !region) return [];

        return parkingPlaces.filter(place => place.city === city && place.region === region);
    };

    const renderParkingPlaces = (places) => {
        return places.map((place, index) => (
            <div
                key={index}
                className={`${styles.parkingItem} ${index % 2 === 0 ? styles.left : styles.right}`}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
                <h3>Parking name : {place.name}</h3>
                <p>Address: {place.address}</p>
                <p>Two wheeler Capacity: {place.tcapacity} slots</p>
                <p>Four wheeler Capacity: {place.fcapacity} slots</p>
                <p>Features: {place.features}</p>
                <p>Available Two Wheeler Capacity : {place.atcapacity} slots</p>
                <p>Available Four Wheeler Capacity : {place.afcapacity} slots</p>
                <button 
                    className={styles.bookButton} 
                    onClick={() => handleBookClick(place.tcapacity, place.fcapacity, place.name)} // Pass place.name
                >
                    Book
                </button>
            </div>
        ));
    };

    const filteredPlaces = filterParkingPlaces();

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.imageAndFormContainer}>
                    <div className={styles.imageContainer}>
                        <img src={C} alt="Car Icon" className={styles.image} />
                    </div>
                    <div className={styles.formContainer}>
                        <div className={styles.header}>
                            <div className={styles.dropdownContainer}>
                                <div className={styles.dropdown}>
                                    <label htmlFor="city">Select your city:</label>
                                    <select id="city" value={city} onChange={handleCityChange}>
                                        <option value="">None</option>
                                        <option value="Chennai">Chennai</option>
                                        <option value="Madurai">Madurai</option>
                                        <option value="Coimbatore">Coimbatore</option>
                                    </select>
                                </div>
                                {city && (
                                    <div className={styles.dropdown}>
                                        <label htmlFor="region">Select your region:</label>
                                        <select id="region" value={region} onChange={handleRegionChange}>
                                            <option value="">None</option>
                                            {city === 'Chennai' && (
                                                <>
                                                    <option value="Chennai North">Chennai North</option>
                                                    <option value="Chennai East">Chennai East</option>
                                                    <option value="Chennai South">Chennai South</option>
                                                    <option value="Chennai West">Chennai West</option>
                                                </>
                                            )}
                                            {city === 'Madurai' && (
                                                <>
                                                    <option value="Madurai North">Madurai North</option>
                                                    <option value="Madurai East">Madurai East</option>
                                                    <option value="Madurai South">Madurai South</option>
                                                    <option value="Madurai West">Madurai West</option>
                                                </>
                                            )}
                                            {city === 'Coimbatore' && (
                                                <>
                                                    <option value="Coimbatore North">Coimbatore North</option>
                                                    <option value="Coimbatore South">Coimbatore South</option>
                                                    <option value="Coimbatore East">Coimbatore East</option>
                                                    <option value="Coimbatore West">Coimbatore West</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                )}
                            </div>
                            <h1 className={styles.title}>Book your slots</h1>
                        </div>
                        {city && !region && (
                            <div className={styles.results}>
                                Select a region to see results.
                            </div>
                        )}
                        {!city && (
                            <div className={styles.results}>
                                No results
                            </div>
                        )}
                        {region && filteredPlaces.length > 0 && (
                            <div className={styles.details}>
                                <h2 id="align">Parking Places in {region}</h2>
                                <div className={styles.parkingDetails}>
                                    {renderParkingPlaces(filteredPlaces)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <PaymentModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    tcapacitys={selectedCapacity.tcapacity} 
                    fcapacitys={selectedCapacity.fcapacity}  
                />
            </div>
            
            {/* Feedback Section */}
            <div className="container mx-auto p-6 flex flex-wrap" id="full">
                <div className="left-section w-full md:w-7/12 pr-4">
                    <h1 className="text-5xl font-bold mb-6" data-aos="zoom-out" data-aos-duration="1500">Your Opinion</h1>
                    <div className="black-box bg-gray-800 text-white p-6 rounded-lg mt-6 relative" data-aos="fade-right" data-aos-duration="1500">
                        <img src={feedbackimg} alt="Car Icon" className="mb-4 mx-auto" />
                        <h2 className="text-2xl font-semibold mb-4">Parking space seekers</h2>
                        <p className="text-lg">
                            A parking space seeker can find parking immediately or schedule it for later...
                        </p>
                        <div className="max-w-lg mx-auto p-6 bg-gray-900 rounded-lg mt-10">
                            <h2 className="text-2xl font-bold text-center text-gray-300 mb-4">We Value Your Feedback</h2>
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="mt-1 p-2 w-full border border-gray-600 rounded-md bg-gray-800 text-gray-300"
                                        placeholder="your-email"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-300">Your Feedback</label>
                                    <textarea
                                        id="feedback"
                                        name="feedback"
                                        rows="4"
                                        className="mt-1 p-2 w-full border border-gray-600 rounded-md bg-gray-800 text-gray-300"
                                        placeholder="Your feedback message"
                                        required
                                    />
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
                                    >
                                        Send Feedback
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="grey-box bg-sky-500 text-center p-6 rounded-lg w-full md:w-5/12 mt-6 md:mt-0" data-aos="zoom-out" data-aos-duration="1500">
                    <img src={ppimg} alt="Parking Icon" className="mb-4 mx-auto" />
                    <h2 className="text-2xl font-semibold mb-4">Parking space providers</h2>
                    <p className="text-lg text-gray-700 mb-6">A person can be both a space provider and a parking seeker...</p>
                    <button className="bg-green-400 text-black font-semibold py-2 px-4 rounded-full hover:bg-blue-600 hover:text-white transition duration-300">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default DistrictRegionSelector;

