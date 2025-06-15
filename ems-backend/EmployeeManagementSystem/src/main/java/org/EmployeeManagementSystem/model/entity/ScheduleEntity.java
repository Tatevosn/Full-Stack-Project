package org.EmployeeManagementSystem.model.entity;

import jakarta.persistence.*;
import org.EmployeeManagementSystem.model.enums.ShiftType;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "schedules")
public class ScheduleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private ShiftType shiftType;

    @ManyToMany
    @JoinTable(
            name = "employee_schedule",
            joinColumns = @JoinColumn(name = "schedule_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id")
    )
    private Set<EmployeeEntity> employees;

    public ScheduleEntity() {}

    public ScheduleEntity(LocalDate date, ShiftType shiftType, Set<EmployeeEntity> employees) {
        this.date = date;
        this.shiftType = shiftType;
        this.employees = employees;
    }

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public ShiftType getShiftType() { return shiftType; }
    public void setShiftType(ShiftType shiftType) { this.shiftType = shiftType; }

    public Set<EmployeeEntity> getEmployees() { return employees; }
    public void setEmployees(Set<EmployeeEntity> employees) { this.employees = employees; }




}
