package org.EmployeeManagementSystem.model.dto;

import org.EmployeeManagementSystem.model.enums.ShiftType;

import java.time.LocalDate;
import java.util.List;

public class ScheduleRequestDto {
    private LocalDate date;
    private ShiftType shiftType; // Use the enum type directly
    private List<Long> employeeIds;

    // Getters and setters
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public ShiftType getShiftType() { return shiftType; }
    public void setShiftType(ShiftType shiftType) { this.shiftType = shiftType; }

    public List<Long> getEmployeeIds() { return employeeIds; }
    public void setEmployeeIds(List<Long> employeeIds) { this.employeeIds = employeeIds; }
}
