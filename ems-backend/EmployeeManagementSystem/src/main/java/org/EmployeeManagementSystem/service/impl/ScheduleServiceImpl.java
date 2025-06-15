package org.EmployeeManagementSystem.service.impl;

import org.EmployeeManagementSystem.exception.ResourceNotFoundException;
import org.EmployeeManagementSystem.model.dto.ScheduleRequestDto;
import org.EmployeeManagementSystem.model.entity.EmployeeEntity;
import org.EmployeeManagementSystem.model.entity.ScheduleEntity;
import org.EmployeeManagementSystem.repository.EmployeeRepository;
import org.EmployeeManagementSystem.repository.ScheduleRepository;
import org.EmployeeManagementSystem.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ScheduleServiceImpl implements ScheduleService {


    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public ScheduleEntity createSchedule(ScheduleRequestDto request) {
        ScheduleEntity schedule = new ScheduleEntity();
        schedule.setDate(request.getDate());
        schedule.setShiftType(request.getShiftType());

        Set<EmployeeEntity> employees = new HashSet<>(employeeRepository.findAllById(request.getEmployeeIds()));
        schedule.setEmployees(employees);

        // Maintain bidirectional relationship
        for (EmployeeEntity emp : employees) {
            if (emp.getSchedules() == null) {
                emp.setSchedules(new HashSet<>());
            }
            emp.getSchedules().add(schedule);
        }

        return scheduleRepository.save(schedule);
    }

    @Override
    public List<ScheduleEntity> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    @Override
    public ScheduleEntity getScheduleById(Long id) {
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule not found with id: " + id));
    }

    @Override
    public ScheduleEntity getScheduleByDate(LocalDate date) {
        return scheduleRepository.findByDate(date)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule not found for date: " + date));
    }

    @Override
    public List<ScheduleEntity> getSchedulesByEmployeeId(Long employeeId) {
        return scheduleRepository.findByEmployees_Id(employeeId);
    }

    @Override
    public ScheduleEntity updateSchedule(Long id, ScheduleEntity scheduleDetails) {
        ScheduleEntity schedule = getScheduleById(id);
        schedule.setDate(scheduleDetails.getDate());
        schedule.setShiftType(scheduleDetails.getShiftType());
        schedule.setEmployees(scheduleDetails.getEmployees());
        return scheduleRepository.save(schedule);
    }

    @Override
    public void deleteSchedule(Long id) {
        ScheduleEntity schedule = getScheduleById(id);
        scheduleRepository.delete(schedule);
    }



}