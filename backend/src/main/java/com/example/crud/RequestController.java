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

    // Update a status by ID
    @PutMapping("/status/{id}")
    public ResponseEntity<Request> updateRequestStatus(@PathVariable Long id, @RequestBody String status) {
        Optional<Request> requestData = requestService.getRequestById(id);

        if (requestData.isPresent()) {
            Request request = requestData.get();

            if (status != null) {
                request.setStatus(status);
                Request updatedRequest = requestService.saveRequest(request);
                return new ResponseEntity<>(updatedRequest, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // If status is missing
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Request> updateRequest(@PathVariable Long id, @RequestBody Request requestDetails) {
        Optional<Request> requestData = requestService.getRequestById(id);

        if (requestData.isPresent()) {
            Request request = requestData.get();

            if (requestDetails.getStatus() != null) {
                request.setStatus(requestDetails.getStatus());
            }
            if (requestDetails.getSubject() != null) {
                request.setSubject(requestDetails.getSubject());
            }
            if (requestDetails.getRecipient() != null) {
                request.setRecipient(requestDetails.getRecipient());
            }
            if (requestDetails.getFirstName() != null) {
                request.setFirstName(requestDetails.getFirstName());
            }
            if (requestDetails.getLastName() != null) {
                request.setLastName(requestDetails.getLastName());
            }
            if (requestDetails.getStudentId() != null) {
                request.setStudentId(requestDetails.getStudentId());
            }
            if (requestDetails.getMajor() != null) {
                request.setMajor(requestDetails.getMajor());
            }
            if (requestDetails.getAddressNumber() != null) {
                request.setAddressNumber(requestDetails.getAddressNumber());
            }
            if (requestDetails.getSubDistrict() != null) {
                request.setSubDistrict(requestDetails.getSubDistrict());
            }
            if (requestDetails.getDistrict() != null) {
                request.setDistrict(requestDetails.getDistrict());
            }
            if (requestDetails.getProvince() != null) {
                request.setProvince(requestDetails.getProvince());
            }
            if (requestDetails.getStudentPhone() != null) {
                request.setStudentPhone(requestDetails.getStudentPhone());
            }
            if (requestDetails.getParentPhone() != null) {
                request.setParentPhone(requestDetails.getParentPhone());
            }
            if (requestDetails.getAdvisor() != null) {
                request.setAdvisor(requestDetails.getAdvisor());
            }
            if (requestDetails.getRequestType() != null) {
                request.setRequestType(requestDetails.getRequestType());
            }
            if (requestDetails.getSemester() != null) {
                request.setSemester(requestDetails.getSemester());
            }
            if (requestDetails.getAcademicYear() != null) {
                request.setAcademicYear(requestDetails.getAcademicYear());
            }
            if (requestDetails.getCourseCode() != null) {
                request.setCourseCode(requestDetails.getCourseCode());
            }
            if (requestDetails.getCourseName() != null) {
                request.setCourseName(requestDetails.getCourseName());
            }
            if (requestDetails.getSection() != null) {
                request.setSection(requestDetails.getSection());
            }
            if (requestDetails.getStartSemester() != null) {
                request.setStartSemester(requestDetails.getStartSemester());
            }
            if (requestDetails.getStartAcademicYear() != null) {
                request.setStartAcademicYear(requestDetails.getStartAcademicYear());
            }
            if (requestDetails.getDebtStatus() != null) {
                request.setDebtStatus(requestDetails.getDebtStatus());
            }
            if (requestDetails.getDebtAmount() != null) {
                request.setDebtAmount(requestDetails.getDebtAmount());
            }
            if (requestDetails.getComment() != null) {
                request.setComment(requestDetails.getComment());
            }

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
