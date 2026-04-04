import { useState, useEffect } from 'react';
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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [feedback, setFeedback] = useState({ email: '', message: '' });
    const [feedbackStatus, setFeedbackStatus] = useState('');

    useEffect(() => {
        // Remove the automatic reload on mount - this can cause issues
        // if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        //     console.log('Page was reloaded');
        // } else {
        //     window.location.reload();
        // }
    }, []);

    useEffect(() => {
        AOS.init({ 
            duration: 1000,
            once: true, // Animation happens only once
            offset: 100 // Start animation 100px before element is in view
        });
    }, []);

    useEffect(() => {
        const fetchParkingPlaces = async () => {
            setIsLoading(true);
            setError('');
            try {
                const response = await axios.get('https://parking-0wap.onrender.com/api/parking-places');
                setParkingPlaces(response.data);
            } catch (error) {
                console.error('There was an error fetching the parking places!', error);
                setError('Unable to load parking places. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchParkingPlaces();
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
        setSelectedCapacity({ tcapacity, fcapacity, placeName });
        setIsModalOpen(true);
    };

    const handleFeedbackChange = (e) => {
        const { name, value } = e.target;
        setFeedback(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        setFeedbackStatus('sending');

        try {
            // Replace with your actual feedback endpoint
            await axios.post('https://parking-0wap.onrender.com/api/feedback', feedback);
            setFeedbackStatus('success');
            setFeedback({ email: '', message: '' });
            setTimeout(() => setFeedbackStatus(''), 3000);
        } catch (error) {
            console.error('Error sending feedback:', error);
            setFeedbackStatus('error');
            setTimeout(() => setFeedbackStatus(''), 3000);
        }
    };

    const filterParkingPlaces = () => {
        if (!city || !region) return [];
        return parkingPlaces.filter(place => place.city === city && place.region === region);
    };

    const renderParkingPlaces = (places) => {
        return places.map((place, index) => (
            <div
                key={`${place.name}-${index}`}
                className={`${styles.parkingItem} ${index % 2 === 0 ? styles.left : styles.right}`}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                data-aos-delay={index * 100}
            >
                <h3>Parking name: {place.name}</h3>
                <p><strong>Address:</strong> {place.address}</p>
                <p><strong>Two wheeler Capacity:</strong> {place.tcapacity} slots</p>
                <p><strong>Four wheeler Capacity:</strong> {place.fcapacity} slots</p>
                <p><strong>Features:</strong> {place.features}</p>
                <p><strong>Available Two Wheeler:</strong> {place.atcapacity || 0} slots</p>
                <p><strong>Available Four Wheeler:</strong> {place.afcapacity || 0} slots</p>
                <button 
                    className={styles.bookButton} 
                    onClick={() => handleBookClick(place.tcapacity, place.fcapacity, place.name)}
                    aria-label={`Book parking at ${place.name}`}
                >
                    Book Now
                </button>
            </div>
        ));
    };

    const filteredPlaces = filterParkingPlaces();

    return (
        <div className={`${styles.wrapper} pb-12`}>
            <div className={`${styles.container} py-8`}>
                <div className={styles.imageAndFormContainer}>
                    <div className={styles.imageContainer}>
                        <img 
                            src={C} 
                            alt="Parking illustration" 
                            className={styles.image}
                            loading="lazy"
                        />
                    </div>
                    <div className={styles.formContainer}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>Book Your Parking Slot</h1>
                            <div className={styles.dropdownContainer}>
                                <div className={styles.dropdown}>
                                    <label htmlFor="city">Select your city:</label>
                                    <select 
                                        id="city" 
                                        value={city} 
                                        onChange={handleCityChange}
                                        aria-label="Select city"
                                    >
                                        <option value="">Choose a city</option>
                                        <option value="Chennai">Chennai</option>
                                        <option value="Madurai">Madurai</option>
                                        <option value="Coimbatore">Coimbatore</option>
                                    </select>
                                </div>
                                {city && (
                                    <div className={styles.dropdown}>
                                        <label htmlFor="region">Select your region:</label>
                                        <select 
                                            id="region" 
                                            value={region} 
                                            onChange={handleRegionChange}
                                            aria-label="Select region"
                                        >
                                            <option value="">Choose a region</option>
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
                        </div>

                        {isLoading && (
                            <div className={styles.results}>
                                Loading parking places...
                            </div>
                        )}

                        {error && (
                            <div className={styles.results} style={{backgroundColor: '#fee', color: '#c33'}}>
                                {error}
                            </div>
                        )}

                        {city && !region && !isLoading && (
                            <div className={styles.results}>
                                Please select a region to see available parking spaces.
                            </div>
                        )}

                        {!city && !isLoading && (
                            <div className={styles.results}>
                                Select a city to get started.
                            </div>
                        )}

                        {region && filteredPlaces.length === 0 && !isLoading && (
                            <div className={styles.results}>
                                No parking spaces available in {region}. Please try another region.
                            </div>
                        )}

                        {region && filteredPlaces.length > 0 && (
                            <div className={styles.details}>
                                <h2 id="align">Available Parking in {region}</h2>
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
                    placeName={selectedCapacity.placeName}
                />
            </div>
            
            {/* Feedback Section - Mobile Optimized */}
            <div className="mx-auto lg:w-3/4  p-4 sm:p-6 flex flex-wrap" id="full">
                <div className="w-full lg:w-7/12 pr-0 lg:pr-4 mb-6 lg:mb-0">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center lg:text-left" data-aos="zoom-out" data-aos-duration="1500">
                        Your Opinion Matters
                    </h1>
                    
                    <div className="bg-gray-800 text-white p-4 sm:p-6 rounded-lg relative" data-aos="fade-right" data-aos-duration="1500">
                        <img 
                            src={feedbackimg} 
                            alt="Feedback illustration" 
                            className="mb-4 mx-auto max-w-full h-auto rounded"
                            loading="lazy"
                        />
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Parking Space Seekers</h2>
                        <p className="text-sm sm:text-lg mb-6">
                            Find parking immediately or schedule it for later. Your feedback helps us improve our service.
                        </p>
                        
                        <div className="max-w-lg mx-auto p-4 sm:p-6 bg-gray-900 rounded-lg">
                            <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-300 mb-4">
                                We Value Your Feedback
                            </h2>
                            <form className="space-y-4 sm:space-y-6" onSubmit={handleFeedbackSubmit}>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={feedback.email}
                                        onChange={handleFeedbackChange}
                                        className="w-full p-3 border border-gray-600 rounded-md bg-gray-800 text-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                                        placeholder="your-email@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-300 mb-2">
                                        Your Feedback
                                    </label>
                                    <textarea
                                        id="feedback"
                                        name="message"
                                        value={feedback.message}
                                        onChange={handleFeedbackChange}
                                        rows="4"
                                        className="w-full p-3 border border-gray-600 rounded-md bg-gray-800 text-gray-300 focus:border-blue-500 focus:outline-none transition-colors resize-vertical"
                                        placeholder="Share your experience with us..."
                                        required
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={feedbackStatus === 'sending'}
                                        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                                    >
                                        {feedbackStatus === 'sending' ? 'Sending...' : 'Send Feedback'}
                                    </button>
                                    {feedbackStatus === 'success' && (
                                        <p className="text-green-400 text-sm mt-2 text-center">
                                            Thank you! Your feedback has been sent.
                                        </p>
                                    )}
                                    {feedbackStatus === 'error' && (
                                        <p className="text-red-400 text-sm mt-2 text-center">
                                            Sorry, there was an error. Please try again.
                                        </p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div className="w-full lg:mt-80 lg:h-1/2 lg:w-5/12 bg-sky-500 text-center p-4 sm:p-6 rounded-lg" data-aos="zoom-out" data-aos-duration="1500">
                    <img 
                        src={ppimg} 
                        alt="Parking provider illustration" 
                        className="mb-4 mx-auto max-w-full h-auto"
                        loading="lazy"
                    />
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4">Parking Space Providers</h2>
                    <p className="text-sm sm:text-lg text-gray-700 mb-6">
                        Be both a space provider and a parking seeker. Join our platform to maximize your parking assets.
                    </p>
                    <button className="bg-green-400 text-black font-semibold py-3 px-6 rounded-full hover:bg-green-500 hover:text-white transition duration-300 text-sm sm:text-base">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DistrictRegionSelector;