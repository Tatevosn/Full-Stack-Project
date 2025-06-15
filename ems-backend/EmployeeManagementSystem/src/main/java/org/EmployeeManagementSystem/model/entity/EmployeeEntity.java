package org.EmployeeManagementSystem.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "employees")
public class EmployeeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @ManyToMany(mappedBy = "employees")
    private Set<ScheduleEntity> schedules;



    public EmployeeEntity() {

    }

    public EmployeeEntity(long id, String firstName, String lastName, String email, Set<ScheduleEntity> schedules) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.schedules = schedules;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public Set<ScheduleEntity> getSchedules() {
        return schedules;
    }

    public void setSchedules(Set<ScheduleEntity> schedules) {
        this.schedules = schedules;
    }
}
