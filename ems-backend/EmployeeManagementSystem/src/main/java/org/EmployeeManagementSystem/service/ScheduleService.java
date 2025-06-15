package org.EmployeeManagementSystem.service;

import org.EmployeeManagementSystem.model.dto.ScheduleRequestDto;
import org.EmployeeManagementSystem.model.entity.ScheduleEntity;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleService  {


    ScheduleEntity createSchedule(ScheduleRequestDto requestDto);
    List<ScheduleEntity> getAllSchedules();
    ScheduleEntity getScheduleById(Long id);
    ScheduleEntity getScheduleByDate(LocalDate date);
    List<ScheduleEntity> getSchedulesByEmployeeId(Long employeeId);
    ScheduleEntity updateSchedule(Long id, ScheduleEntity scheduleDetails);
    void deleteSchedule(Long id);
}