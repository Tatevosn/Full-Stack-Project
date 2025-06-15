package org.EmployeeManagementSystem.controller;


import org.EmployeeManagementSystem.model.dto.ScheduleRequestDto;
import org.EmployeeManagementSystem.model.entity.EmployeeEntity;
import org.EmployeeManagementSystem.model.entity.ScheduleEntity;
import org.EmployeeManagementSystem.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @GetMapping("/schedules")
    public List<ScheduleEntity> getAllSchedules() {
        return scheduleService.getAllSchedules();
    }

    @GetMapping("/schedules/{id}")
    public ResponseEntity<ScheduleEntity> getScheduleById(@PathVariable Long id) {
        ScheduleEntity schedule = scheduleService.getScheduleById(id);
        return ResponseEntity.ok(schedule);
    }

    @GetMapping("/employees/{employeeId}/schedules")
    public List<ScheduleEntity> getSchedulesByEmployeeId(@PathVariable Long employeeId) {
        return scheduleService.getSchedulesByEmployeeId(employeeId);
    }

//    @PostMapping("/schedules")
//    public ScheduleEntity createSchedule(@RequestBody ScheduleEntity schedule) {
//        return scheduleService.createSchedule(schedule);
//    }

    @PostMapping("/schedules")
    public ScheduleEntity createSchedule(@RequestBody ScheduleRequestDto request) {
        return scheduleService.createSchedule(request);
    }

    @PutMapping("/schedules/{id}")
    public ResponseEntity<ScheduleEntity> updateSchedule(@PathVariable Long id, @RequestBody ScheduleEntity scheduleDetails) {
        ScheduleEntity updatedSchedule = scheduleService.updateSchedule(id, scheduleDetails);
        return ResponseEntity.ok(updatedSchedule);
    }

    @DeleteMapping("/schedules/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return ResponseEntity.noContent().build();
    }
}