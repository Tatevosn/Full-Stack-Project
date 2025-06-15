import axios from 'axios';

const SCHEDULE_API_BASE_URL = "http://localhost:8080/api/v1/schedules";

class ScheduleService {
    getSchedules() {
        return axios.get(SCHEDULE_API_BASE_URL);
    }

    createSchedule(schedule) {
        return axios.post(SCHEDULE_API_BASE_URL, schedule);
    }

    getScheduleById(id) {
        return axios.get(`${SCHEDULE_API_BASE_URL}/${id}`);
    }

    updateSchedule(id, schedule) {
        return axios.put(`${SCHEDULE_API_BASE_URL}/${id}`, schedule);
    }

    deleteSchedule(id) {
        return axios.delete(`${SCHEDULE_API_BASE_URL}/${id}`);
    }
}

export default new ScheduleService();