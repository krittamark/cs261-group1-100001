package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequestService {

    private final RequestRepository requestRepository;

    @Autowired
    public RequestService(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    public Request saveRequest(Request request) {
        return requestRepository.save(request);
    }

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public Optional<Request> getRequestById(Long id) {
        return requestRepository.findById(id);
    }

    public Optional<Request> updateRequest(Long id, Request requestDetails) {
        return requestRepository.findById(id).map(request -> {
            // Update fields based on Request.java
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
            return requestRepository.save(request);
        });
    }

    public boolean deleteRequest(Long id) {
        if (requestRepository.existsById(id)) {
            requestRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
