
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Resources/styles/DistrictRegion.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PaymentModal from './Paymentmodel.jsx';

const DistrictRegionSelector = () => {
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [parkingPlaces, setParkingPlaces] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCapacity, setSelectedCapacity] = useState({ tcapacity: 0, fcapacity: 0 });

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/api/parking-places')
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
        setRegion(''); // Clear region when city is changed
    };

    const handleRegionChange = (event) => {
        const selectedRegion = event.target.value;
        setRegion(selectedRegion);
    };

    // Updated to pass the correct values
    const handleBookClick = (tcapacity, fcapacity) => {
        setIsModalOpen(true);
        setSelectedCapacity({ tcapacity, fcapacity });
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
                <h3>{place.name}</h3>
                <p>Address: {place.address}</p>
                <p>Two wheeler Capacity: {place.tcapacity} slots</p>
                <p>Four wheeler Capacity: {place.fcapacity} slots</p>
                <p>Features: {place.features}</p>
                {/* Pass the tcapacity and fcapacity values to handleBookClick */}
                <button 
                    className={styles.bookButton} 
                    onClick={() => handleBookClick(place.tcapacity, place.fcapacity)}
                >
                    Book
                </button>
            </div>
        ));
    };

    return (
        <div id="bgimg">
            <div className={styles.container}>
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
                        No results
                    </div>
                )}

                {region && (
                    <div className={styles.details}>
                        <h2>Parking Places in {region}</h2>
                        <div className={styles.parkingDetails}>
                            {renderParkingPlaces(filterParkingPlaces())}
                        </div>
                    </div>
                )}
            </div>
            {/* Pass the correct tcapacity and fcapacity values to the PaymentModal */}
            <PaymentModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                tcapacitys={selectedCapacity.tcapacity} 
                fcapacitys={selectedCapacity.fcapacity}  
            />
        </div>
    );
};

export default DistrictRegionSelector;
