import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css';

const Blogs = () => {
    const navigate = useNavigate();

    

    const handleMenuClick = () => {
    // Local storage se check karein ke kya user logged in hai
    const userStatus = localStorage.getItem('isLoggedIn'); 

    if (userStatus === 'true') {
        // Agar login hai to seedha menu/home par jaye
        navigate('/home'); 
    } else {
        // Agar login nahi hai to alert de aur login page par bhej de
        alert("Please login to your Dastr_khwan account to place an order!");
        navigate('/login');
    }
};
    return (
        <div className="about-container">
            {/* Header Section */}
            <div className="about-header">
                <h1 className="main-title">Dastr_khwan – A Legacy of Pure Taste Since 1984</h1>
                <div className="title-underline"></div>
            </div>
            <div className="image-side hero-image-wrapper">
    <img src="a1.jpeg" alt="Healthy Food" className="framed-image hero-image" />
</div>

            {/* Introduction Section */}
            <div className="content-section">
                <div className="text-side">
                    <h2 className="section-subtitle">Food is not about just filling the stomach__ it’s about taste and trust. This is exactly what the Dastr-Khwan has been providing for many years</h2>
                    <h2>Introduction</h2>
                    <p className="description-text">
                        Dastr_khwan is a well-known name as it delivers authentic Punjabi and Pakistani cuisine since 1984. Over the years, Dastr_khwan always earned the trust of its customers in taste and authenticity. Generations have enjoyed its food. One of the most appreciated aspects is that even people with health concerns, such as diabetes or heart conditions, feel comfortable eating here. The use of natural spices and balanced cooking makes the food lighter and healthier compared to typical restaurant meals.
Dastr_khwan always have rely on a moto:
                    </p>
                    <p className="moto-text">Dastr-khwan – Feel Like Home</p>
                </div>
            </div>

            {/* Our Journey Section (Image 2 style) */}
            <div className="content-section reverse">
                <div className="image-side">
                    <img src="uncle.jpeg" alt="Malik Muhammad Ramzan" className="framed-image" />
                </div>
                <div className="text-side">
                    <h2 className="section-subtitle">Our Journey</h2>
                    <p className="description-text">
                        It is established in 1984, by Malik Muhammad Ramzan. From beginning, Datsr_khwan has an aim of providing homemade authentic Pakistani and Punjabi cuisine with real taste. With over 42 years of Experience, it earns trust and love from all customers of all age groups. One of the key reasons behind Dastarkhwan long-term success is customer satisfaction. For decades, customers have trusted and appreciated the consistent taste and quality. Even individuals with health conditions such as diabetes or heart issues feel comfortable in eating here, as the food is prepared using balanced, natural ingredients instead of heavy or artificial spices.
                    </p>
                </div>
            </div>

            {/* NEW: Authenticity In Every Bite Section (Image 4 style) */}
            <div className="full-width-section">
                <h2 className="section-subtitle">Authenticity In Every Bite</h2>
                <p className="description-text">
                    What makes Dastr-Khwan unique is its commitment to always provide original. Instead of using artificial or ready-made spices, all dishes are prepared with traditional, homemade spices. This ensures that every meal have a natural and rich flavor, just like home-made food. From selecting meat to cooking, everything is done under careful supervision. Whether it’s chicken, beef, or mutton, ingredients are handled with care and prepared hygienically. Another important aspect is the careful preparation of ingredients There is absolutely no compromise when it comes to taste. Over the years, customer satisfaction has remained the biggest strength of Dastr-Khwan. People have been enjoying its food for generations, and the trust continues to grow. Even those with health concerns like diabetes or heart conditions feel comfortable eating here, as the food is not overloaded with artificial or heavy spice.
                </p>

                <div className="image-grid-container">
                    <img src="chikenkorma.jpeg" alt="Dish 1" className="grid-item-img" />
                    <img src="biryani.jpeg" alt="Dish 2" className="grid-item-img" />
                    <img src="paya.jpeg" alt="Dish 3" className="grid-item-img rounded-img" />
                </div>
            </div>

            {/* NEW: Online Services Section (Image 4 style) */}
            <div className="full-width-section">
                <h2 className="section-subtitle">Online Services</h2>
                <p className="description-text">
                    In this digital world, Dastr-Khwan has decided to extend its range towards people through online food ordering system with same taste and rich flavor. If you want to enjoy the same taste at your door step just visit the 
                    <span className="menu-link-red" onClick={handleMenuClick}> Menu </span> 
                    and order quickly. Authentic meal will be in your hands without any delaying issue.
                </p>
            </div>

            {/* Order Now Button (Image 5 style) */}
            <div className="cta-section">
                <button className="order-now-btn" onClick={handleMenuClick}>
                    Order Now
                </button>
            </div>
        </div>
    );
};

export default Blogs;