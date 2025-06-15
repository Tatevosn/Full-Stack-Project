package org.EmployeeManagementSystem.repository;

import org.EmployeeManagementSystem.model.entity.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Long> {

    List<ScheduleEntity> findByEmployees_Id(Long employeeId);

   Optional <ScheduleEntity> findByDate(LocalDate date);


}