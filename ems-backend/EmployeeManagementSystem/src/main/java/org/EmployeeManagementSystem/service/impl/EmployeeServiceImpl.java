package org.EmployeeManagementSystem.service.impl;

import org.EmployeeManagementSystem.exception.ResourceNotFoundException;
import org.EmployeeManagementSystem.model.entity.EmployeeEntity;
import org.EmployeeManagementSystem.model.entity.ScheduleEntity;
import org.EmployeeManagementSystem.repository.EmployeeRepository;
import org.EmployeeManagementSystem.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<EmployeeEntity> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public EmployeeEntity createEmployee(EmployeeEntity employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public EmployeeEntity getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
    }

    @Override
    public EmployeeEntity updateEmployee(Long id, EmployeeEntity employeeDetails) {
        EmployeeEntity employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmail(employeeDetails.getEmail());

        return employeeRepository.save(employee);
    }

    @Override
    public void deleteEmployee(Long id) {
        EmployeeEntity employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        
        // Remove employee from all schedules
        Set<ScheduleEntity> schedules = employee.getSchedules();
        if (schedules != null) {
            for (ScheduleEntity schedule : schedules) {
                schedule.getEmployees().remove(employee);
            }
        }
        
        employeeRepository.delete(employee);
    }
}