import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleButton from './ScheduleButton';

function HeaderComponent() {
    const navigate = useNavigate();

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="container">
                        <ScheduleButton />
                        <a 
                            onClick={() => navigate('/employees')} // Navigate to employees
                            className="navbar-brand text-center w-100" 
                            style={{ cursor: 'pointer' }}
                        >
                            Employee Management App
                        </a>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default HeaderComponent;