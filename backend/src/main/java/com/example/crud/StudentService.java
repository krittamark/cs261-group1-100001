package com.example.crud;

import org.springframework.stereotype.Service;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    // Constructor injection
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student saveStudent(Student student) {
        // Optional: Add custom validation or checks if needed
        return studentRepository.save(student);
    }
}
