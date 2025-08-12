import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import image from '../../assets/images/task-force.jpg';


const LandingPage = () => {
    const { user } = useContext(UserContext);
    return (
        <main className="container-fluid bg-secondary min-vh-100 py-4">
            <div className="container" style={{ maxWidth: '1200px' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="h1 text-white">National IT Task-Force</h1>
                </div>
                <div>
                    <p className="text-white fs-5" style={{ textAlign: 'justify' }}>
                        The Kingdom of Bahrain stands at a pivotal point in its digital transformation journey,
                        where technology is no longer a supporting function but a critical enabler of national development.
                        Recognizing the growing demand for secure, efficient, and innovative digital solutions across all
                        ministries and public entities, the establishment of a National IT Task Force becomes a strategic necessity.
                        This specialized body will serve as a centralized authority to design, implement, and oversee
                        technology initiatives of national importance. By consolidating expertise in cybersecurity, artificial intelligence,
                        cloud computing, data management, and digital service delivery, the Task Force will ensure that all
                        government sectors benefit from consistent standards, enhanced security, cost efficiency, and cutting-edge innovation.
                    </p>
                    <div className="d-flex justify-content-center">
                        <img
                        src={image}
                        alt="Home"
                        width="700"
                        height="300"
                        className="d-inline-block align-top me-2"
                    />
                    </div>
                    <p className="text-white fs-5" style={{ textAlign: 'justify' }}>
                        The National IT Task Force will operate as a collaborative partner to ministries, reducing reliance
                        on private contractors, improving knowledge retention within the public sector, and accelerating
                        the deployment of advanced digital services for citizens and residents. Through this coordinated approach,
                        Bahrain will strengthen its position as a regional leader in digital governance, fostering sustainable
                        growth, economic diversification, and citizen satisfaction.
                    </p>
                </div>
            </div>
        </main>
    )
}

export default LandingPage
