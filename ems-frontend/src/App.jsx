import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
import SchedulePage from './components/SchedulePage';
import CreateScheduleComponent from './components/CreateScheduleComponent';
import ScheduleComponent from './components/ScheduleComponent';

function App() {
    return (
        <Router>
            <div>
                <HeaderComponent />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<ListEmployeeComponent />} />
                        <Route path="/employees" element={<ListEmployeeComponent />} />
                        <Route path="/add-employee" element={<CreateEmployeeComponent />} />
                        <Route path="/update-employee/:id" element={<UpdateEmployeeComponent />} />
                        <Route path="/view-employee/:id" element={<ViewEmployeeComponent />} />
                        <Route path="/schedule" element={<SchedulePage />} />
                        <Route path="/add-schedule" element={<CreateScheduleComponent />} />
                        <Route path="/schedule" element={<ScheduleComponent />} />
                    </Routes>
                </div>
                <FooterComponent />
            </div>
        </Router>
    );
}

export default App;