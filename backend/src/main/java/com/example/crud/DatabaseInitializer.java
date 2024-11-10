package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @EventListener(ContextRefreshedEvent.class)
    public void onApplicationEvent() {
        String[] alterStatements = {
                "ALTER TABLE request ALTER COLUMN form_type NVARCHAR(50);",
                "ALTER TABLE request ALTER COLUMN full_name NVARCHAR(100);",
                "ALTER TABLE request ALTER COLUMN year NVARCHAR(50);",
                "ALTER TABLE request ALTER COLUMN registration_number NVARCHAR(20);",
                "ALTER TABLE request ALTER COLUMN faculty NVARCHAR(100);",
                "ALTER TABLE request ALTER COLUMN department NVARCHAR(100);",
                "ALTER TABLE request ALTER COLUMN email NVARCHAR(100);",
                "ALTER TABLE request ALTER COLUMN contact_address NVARCHAR(255);",
                "ALTER TABLE request ALTER COLUMN mobile_phone NVARCHAR(20);",
                "ALTER TABLE request ALTER COLUMN relative_mobile_phone NVARCHAR(20);",
                "ALTER TABLE request ALTER COLUMN advisor NVARCHAR(100);",
                "ALTER TABLE request ALTER COLUMN academic_year NVARCHAR(50);",
                "ALTER TABLE request ALTER COLUMN semester NVARCHAR(10);",
                "ALTER TABLE request ALTER COLUMN course_code NVARCHAR(20);",
                "ALTER TABLE request ALTER COLUMN course_name NVARCHAR(255);",
                "ALTER TABLE request ALTER COLUMN course_section NVARCHAR(10);",
                "ALTER TABLE request ALTER COLUMN additional_explanation NVARCHAR(255);",
                "ALTER TABLE request ALTER COLUMN form_status NVARCHAR(50);",
                "ALTER TABLE request ALTER COLUMN resign_year NVARCHAR(50);",
                "ALTER TABLE request ALTER COLUMN semester NVARCHAR(50);",
                "ALTER TABLE request ALTER COLUMN debt NVARCHAR(255);",
                "ALTER TABLE request ALTER COLUMN grade_request NVARCHAR(50);"
        };

        for (String sql : alterStatements) {
            try {
                jdbcTemplate.execute(sql);
            } catch (Exception e) {
                System.out.println("Error executing SQL: " + sql + " - " + e.getMessage());
            }
        }
    }
}
