import React from 'react';
import { useNavigate } from 'react-router-dom';

function ScheduleButton() {
    const navigate = useNavigate();
    return (
        <button className="btn btn-primary" onClick={() => navigate('/schedule')}>
            Schedule
        </button>
    );
}

export default ScheduleButton;