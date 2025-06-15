package org.EmployeeManagementSystem.service;

import org.EmployeeManagementSystem.model.entity.EmployeeEntity;

import java.util.List;

public interface EmployeeService {

    List<EmployeeEntity> getAllEmployees();
    EmployeeEntity createEmployee(EmployeeEntity employee);
    EmployeeEntity getEmployeeById(Long id);
    EmployeeEntity updateEmployee(Long id, EmployeeEntity employeeDetails);
    void deleteEmployee(Long id);

}
