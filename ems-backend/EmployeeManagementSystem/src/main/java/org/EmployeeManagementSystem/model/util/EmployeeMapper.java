package org.EmployeeManagementSystem.model.util;

import org.EmployeeManagementSystem.model.dto.EmployeeDto;
import org.EmployeeManagementSystem.model.entity.EmployeeEntity;

public class EmployeeMapper {
    public static EmployeeDto toDto(EmployeeEntity entity) {
        if (entity == null) return null;
        return new EmployeeDto(
                entity.getId(),
                entity.getFirstName(),
                entity.getLastName(),
                entity.getEmail()
        );
    }
}