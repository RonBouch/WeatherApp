import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './Header.css'
const Header = () => {
    const [activeTab, setActiveTab] = useState("HomePage");
    const location = useLocation();

    useEffect(() => {
        if (location.pathname == '/favorite') {
            setActiveTab("Favorite");
        } else {
            setActiveTab('HomePage');
        }
    }, [location])


    return (
        <div className='header'>
            <div className='header-left'>
                <p className='logo'>WeatherApp</p>
                <Link to='/'>
                    <p className={`${activeTab === "HomePage" ? "active" : ""}`} onClick={() => setActiveTab("HomePage")}>List</p>
                </Link>
                <Link to='/favorite'>
                    <p className={`${activeTab === "Favorite" ? "active" : ""}`} onClick={() => setActiveTab("Favorite")}>Favorite</p>
                </Link>
            </div>
        </div>
    )
}

export default Header
