package org.EmployeeManagementSystem.controller;

import org.EmployeeManagementSystem.model.dto.EmployeeDto;
import org.EmployeeManagementSystem.model.entity.EmployeeEntity;
import org.EmployeeManagementSystem.model.util.EmployeeMapper;
import org.EmployeeManagementSystem.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeService serviceEmployee;

    // get all employees
    @GetMapping("/employees")
    public List<EmployeeDto> getAllEmployees(){
               return serviceEmployee.getAllEmployees()
                              .stream()
                             .map(EmployeeMapper::toDto)
                            .collect(Collectors.toList());
          }

    // create employee rest api
    @PostMapping("/employees")
    public EmployeeEntity createEmployee(@RequestBody EmployeeEntity employee) {
        return serviceEmployee.createEmployee(employee);
    }

    // get employee by id rest api
//    @GetMapping("/employees/{id}")
//    public ResponseEntity<EmployeeEntity> getEmployeeById(@PathVariable Long id) {
//        EmployeeEntity employee = serviceEmployee.getEmployeeById(id);
//        return ResponseEntity.ok(employee);
//    }

    @GetMapping("/employees/{id}")
   public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Long id) {
              EmployeeEntity employee = serviceEmployee.getEmployeeById(id);
              return ResponseEntity.ok(EmployeeMapper.toDto(employee));
   }

    // update employee rest api
    @PutMapping("/employees/{id}")
    public ResponseEntity<EmployeeEntity> updateEmployee(@PathVariable Long id, @RequestBody EmployeeEntity employeeDetails){
        EmployeeEntity updatedEmployee = serviceEmployee.updateEmployee(id, employeeDetails);
        return ResponseEntity.ok(updatedEmployee);
    }

    // delete employee rest api
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
        serviceEmployee.deleteEmployee(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
