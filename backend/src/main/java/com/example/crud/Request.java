package com.example.crud;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String formType;
    private String fullName;
    private String registrationNumber;
    private String faculty;
    private String department;
    private String email;
    private String contactAddress;
    private String mobilePhone;
    private String relativeMobilePhone;
    private String advisor;
    private String academicYear;
    private String semester;
    private String courseCode;
    private String courseName;
    private String courseSection;
    private String additionalExplanation;
    private String formStatus;

    // Constructors
    public Request() {}

    public Request(String formType, String fullName, String registrationNumber, String faculty, String department,
                   String email, String contactAddress, String mobilePhone, String relativeMobilePhone,
                   String advisor, String academicYear, String semester, String courseCode, String courseName,
                   String courseSection, String additionalExplanation, String formStatus) {
        this.formType = formType;
        this.fullName = fullName;
        this.registrationNumber = registrationNumber;
        this.faculty = faculty;
        this.department = department;
        this.email = email;
        this.contactAddress = contactAddress;
        this.mobilePhone = mobilePhone;
        this.relativeMobilePhone = relativeMobilePhone;
        this.advisor = advisor;
        this.academicYear = academicYear;
        this.semester = semester;
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.courseSection = courseSection;
        this.additionalExplanation = additionalExplanation;
        this.formStatus = formStatus;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFormType() {
        return formType;
    }

    public void setFormType(String formType) {
        this.formType = formType;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactAddress() {
        return contactAddress;
    }

    public void setContactAddress(String contactAddress) {
        this.contactAddress = contactAddress;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getRelativeMobilePhone() {
        return relativeMobilePhone;
    }

    public void setRelativeMobilePhone(String relativeMobilePhone) {
        this.relativeMobilePhone = relativeMobilePhone;
    }

    public String getAdvisor() {
        return advisor;
    }

    public void setAdvisor(String advisor) {
        this.advisor = advisor;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseSection() {
        return courseSection;
    }

    public void setCourseSection(String courseSection) {
        this.courseSection = courseSection;
    }

    public String getAdditionalExplanation() {
        return additionalExplanation;
    }

    public void setAdditionalExplanation(String additionalExplanation) {
        this.additionalExplanation = additionalExplanation;
    }

    public String getFormStatus() {
        return formStatus;
    }

    public void setFormStatus(String formStatus) {
        this.formStatus = formStatus;
    }
}