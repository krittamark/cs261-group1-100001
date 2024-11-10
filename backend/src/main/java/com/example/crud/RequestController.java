package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/requests", produces = "application/json; charset=UTF-8")
@CrossOrigin(origins = "http://localhost:3000")
public class RequestController {

    private final RequestService requestService;

    @Autowired
    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    // Create a new request
    @PostMapping
    public ResponseEntity<Request> createRequest(@Valid @RequestBody Request request) {
        Request savedRequest = requestService.saveRequest(request);
        return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
    }

    // Get all requests
    @GetMapping
    public ResponseEntity<List<Request>> getAllRequests() {
        List<Request> requests = requestService.getAllRequests();
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Get a request by ID
    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequestById(@PathVariable Long id) {
        Optional<Request> request = requestService.getRequestById(id);
        return request.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update a request by ID
    @PutMapping("/{id}")
    public ResponseEntity<Request> updateRequest(@PathVariable Long id, @RequestBody Request requestDetails) {
        Optional<Request> requestData = requestService.getRequestById(id);

        if (requestData.isPresent()) {
            Request request = requestData.get();

            // Update fields if present
            if (requestDetails.getFormType() != null) request.setFormType(requestDetails.getFormType());
            if (requestDetails.getFullName() != null) request.setFullName(requestDetails.getFullName());
            if (requestDetails.getRegistrationNumber() != null) request.setRegistrationNumber(requestDetails.getRegistrationNumber());
            if (requestDetails.getFaculty() != null) request.setFaculty(requestDetails.getFaculty());
            if (requestDetails.getDepartment() != null) request.setDepartment(requestDetails.getDepartment());
            if (requestDetails.getEmail() != null) request.setEmail(requestDetails.getEmail());
            if (requestDetails.getContactAddress() != null) request.setContactAddress(requestDetails.getContactAddress());
            if (requestDetails.getMobilePhone() != null) request.setMobilePhone(requestDetails.getMobilePhone());
            if (requestDetails.getRelativeMobilePhone() != null) request.setRelativeMobilePhone(requestDetails.getRelativeMobilePhone());
            if (requestDetails.getAdvisor() != null) request.setAdvisor(requestDetails.getAdvisor());
            if (requestDetails.getAcademicYear() != null) request.setAcademicYear(requestDetails.getAcademicYear());
            if (requestDetails.getSemester() != null) request.setSemester(requestDetails.getSemester());
            if (requestDetails.getCourseCode() != null) request.setCourseCode(requestDetails.getCourseCode());
            if (requestDetails.getCourseName() != null) request.setCourseName(requestDetails.getCourseName());
            if (requestDetails.getCourseSection() != null) request.setCourseSection(requestDetails.getCourseSection());
            if (requestDetails.getAdditionalExplanation() != null) request.setAdditionalExplanation(requestDetails.getAdditionalExplanation());
            if (requestDetails.getFormStatus() != null) request.setFormStatus(requestDetails.getFormStatus());
            if (requestDetails.getYear() != null) request.setYear(requestDetails.getFormStatus());
            if (requestDetails.getResignYear() != null) request.setResignYear(requestDetails.getResignYear());
            if (requestDetails.getDebt() != null) request.setDebt(requestDetails.getDebt());
            if (requestDetails.getGradeRequest() != null) request.setGradeRequest(requestDetails.getGradeRequest());

            Request updatedRequest = requestService.saveRequest(request);
            return new ResponseEntity<>(updatedRequest, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a request by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        boolean isDeleted = requestService.deleteRequest(id);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
