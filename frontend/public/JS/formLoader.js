const forms = {
    delay_registration: `
        <h1>คำร้องจดทะเบียนล่าช้า</h1>
        <hr> <br>
        <form id="delay-registration">
            <div class="form-row">
                <div class="form-group">
                    <label for="date" class="form-label required-label">วันที่</label>
                    <input type="date" id="date" class="form-input" placeholder="DD/MM/YYYY" required />
                </div>
                <div class="form-group">
                    <label for="subject" class="form-label required-label">เรื่อง</label>
                    <input type="text" id="subject" class="form-input" placeholder="เรื่อง" required />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="full-name" class="form-label required-label">ชื่อ-นามสกุล (ใส่คำนำหน้า)</label>
                    <input type="text" id="full-name" class="form-input" placeholder="ชื่อ-นามสกุล" required />
                </div>
                <div class="form-group">
                    <label for="registration-number" class="form-label required-label">เลขทะเบียน</label>
                    <input type="text" id="registration-number" class="form-input" placeholder="เลขทะเบียน" required />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="year" class="form-label required-label">ชั้นปี</label>
                    <input type="text" id="year" class="form-input" placeholder="ชั้นปี" required />
                </div>
                <div class="form-group">
                    <label for="faculty" class="form-label required-label">คณะ</label>
                    <input type="text" id="faculty" class="form-input" required />
                </div>
                <div class="form-group">
                    <label for="department" class="form-label required-label">สาขาวิชา</label>
                    <input type="text" id="department" class="form-input" required />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="contact-address" class="form-label required-label">ที่อยู่ที่สามารถติดต่อได้</label>
                    <input type="text" id="contact-address" class="form-input" placeholder="ที่อยู่" required />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="mobile-phone" class="form-label required-label">โทรศัพท์มือถือ</label>
                    <input type="tel" id="mobile-phone" name="mobile_phone" class="form-input" placeholder="โทรศัพท์มือถือ" pattern="\d{10}" maxlength="10" title="กรุณาใส่เบอร์โทรศัพท์ให้ครบ 10 หลัก" required />
                </div>
                <div class="form-group">
                    <label for="email" class="form-label required-label">Email</label>
                    <input type="email" id="email" name="email" class="form-input" placeholder="email@example.com" required />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="advisor" class="form-label required-label">อาจารย์ที่ปรึกษา</label>
                    <input type="text" id="advisor" class="form-input" placeholder="อาจารย์ที่ปรึกษา" required />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="academic-year" class="form-label required-label">ปีการศึกษา</label>
                    <input type="text" id="academic-year" name="academic_year" class="form-input" placeholder="ปีการศึกษา" required />
                </div>
                <div class="form-group">
                    <label for="semester" class="form-label required-label">ภาคการศึกษา</label>
                    <input type="text" id="semester" name="semester" class="form-input" placeholder="ภาคการศึกษา" required />
                </div>
            </div>

            <div class="form-group">
                <p class="table-label">มีความประสงค์ขอจดทะเบียนล่าช้าในรายวิชา</p>
                <table class="course-table">
                    <thead>
                        <tr>
                            <th>รหัสวิชา</th>
                            <th>ชื่อวิชา</th>
                            <th>Section</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" name="course_code" class="table-input" /></td>
                            <td><input type="text" name="course_name" class="table-input" /></td>
                            <td><input type="text" name="course_section" class="table-input" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="additional-explanation" class="form-label required-label">ชี้แจงเหตุผลเพิ่มเติม</label>
                    <textarea id="additional-explanation" class="form-input explanation-box" required></textarea>
                </div>
            </div>

            <div class="button-row">
                <div class="draft-btn">
                    <input type="submit" value="บันทึกแบบร่าง" onclick="saveDraft(event)">
                </div>
                <div class="send-btn">
                    <input type="submit" value="ส่งคำร้อง">
                </div>
            </div>
        </form>
    `,

    withdraw_course: `
        <h1>คำร้องขอถอนรายวิชา (Drop W)</h1>
        <hr> <br>
        <form id="withdraw-course">
            <div class="form-row">
                <div class="form-group">
                    <label for="date" class="form-label required-label">วันที่</label>
                    <input type="date" id="date" class="form-input" placeholder="DD/MM/YYYY" required />
                </div>
                <div class="form-group">
                    <label for="subject" class="form-label required-label">เรื่อง</label>
                    <input type="text" id="subject" class="form-input" placeholder="เรื่อง" required />
                </div>
            </div>
        
            <div class="form-row">
                <div class="form-group">
                    <label for="full-name" class="form-label required-label">ชื่อ-นามสกุล (ใส่คำนำหน้า)</label>
                    <input type="text" id="full-name" class="form-input" placeholder="ชื่อ-นามสกุล" required />
                </div>
                <div class="form-group">
                    <label for="registration-number" class="form-label required-label">เลขทะเบียน</label>
                    <input type="text" id="registration-number" class="form-input" placeholder="เลขทะเบียน" required />
                </div>
            </div>
        
            <div class="form-row">
                <div class="form-group">
                    <label for="year" class="form-label required-label">ชั้นปี</label>
                    <input type="text" id="year" class="form-input" placeholder="ชั้นปี" required />
                </div>
                <div class="form-group">
                    <label for="faculty" class="form-label required-label">คณะ</label>
                    <input type="text" id="faculty" class="form-input" required />
                </div>
                <div class="form-group">
                    <label for="department" class="form-label required-label">สาขาวิชา</label>
                    <input type="text" id="department" class="form-input" required />
                </div>
            </div>
        
            <div class="form-row">
                <div class="form-group">
                    <label for="contact-address" class="form-label required-label">ที่อยู่ที่สามารถติดต่อได้</label>
                    <input type="text" id="contact-address" class="form-input" placeholder="ที่อยู่" required />
                </div>
            </div>
        
            <div class="form-row">
                <div class="form-group">
                    <label for="mobile-phone" class="form-label required-label">โทรศัพท์มือถือ</label>
                    <input type="tel" id="mobile-phone" name="mobile_phone" class="form-input" placeholder="โทรศัพท์มือถือ" pattern="\d{10}" maxlength="10" title="กรุณาใส่เบอร์โทรศัพท์ให้ครบ 10 หลัก" required />
                </div>
                <div class="form-group">
                    <label for="email" class="form-label required-label">Email</label>
                    <input type="email" id="email" name="email" class="form-input" placeholder="email@example.com" required />
                </div>
            </div>
        
            <div class="form-row">
                <div class="form-group">
                    <label for="advisor" class="form-label required-label">อาจารย์ที่ปรึกษา</label>
                    <input type="text" id="advisor" class="form-input" placeholder="อาจารย์ที่ปรึกษา" required />
                </div>
            </div>
        
            <div class="form-row">
                <div class="form-group">
                    <label for="academic-year" class="form-label required-label">ปีการศึกษา</label>
                    <input type="text" id="academic-year" name="academic_year" class="form-input" placeholder="ปีการศึกษา" required />
                </div>
                <div class="form-group">
                    <label for="semester" class="form-label required-label">ภาคการศึกษา</label>
                    <input type="text" id="semester" name="semester" class="form-input" placeholder="ภาคการศึกษา" required />
                </div>
            </div>
        
            <div class="form-group">
                <p class="table-label">มีความประสงค์ขอถอนรายวิชา (Drop W)</p>
                <table class="course-table">
                    <thead>
                        <tr>
                            <th>รหัสวิชา</th>
                            <th>ชื่อวิชา</th>
                            <th>Section</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" name="course_code" class="table-input" /></td>
                            <td><input type="text" name="course_name" class="table-input" /></td>
                            <td><input type="text" name="course_section" class="table-input" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        
            <div class="form-row">
                <div class="form-group">
                    <label for="additional-explanation" class="form-label required-label">ชี้แจงเหตุผลเพิ่มเติม</label>
                    <textarea id="additional-explanation" class="form-input explanation-box" required></textarea>
                </div>
            </div>
        
            <div class="button-row">
                <div class="draft-btn">
                    <input type="submit" value="บันทึกแบบร่าง" onclick="saveDraft(event)">
                </div>
                <div class="send-btn">
                    <input type="submit" value="ส่งคำร้อง">
                </div>
            </div>
        </form>
    `,
    
    reg_request: `
        <h1>คำร้องขอจดทะเบียนรายวิชาข้ามหลักสูตร</h1>
        <hr> <br>
        <form id="course-registration">
            <div class="form-row">
                <div class="form-group">
                    <label for="date" class="form-label required-label">วันที่</label>
                    <input type="date" id="date" class="form-input" placeholder="DD/MM/YYYY" required />
                </div>
                <div class="form-group">
                    <label for="subject" class="form-label required-label">เรื่อง</label>
                    <input type="text" id="subject" class="form-input" placeholder="เรื่อง" required />
                </div>
            </div>
        
            <div class="form-row">
                <div class="form-group">
                    <label for="full-name" class="form-label required-label">ชื่อ-นามสกุล (ใส่คำนำหน้า)</label>
                    <input type="text" id="full-name" class="form-input" placeholder="ชื่อ-นามสกุล" required />
                </div>
                <div class="form-group">
                    <label for="registration-number" class="form-label required-label">เลขทะเบียน</label>
                    <input type="text" id="registration-number" class="form-input" placeholder="เลขทะเบียน" required />
                </div>
            </div>
        
            <div class="form-row">
                <div class="form-group">
                    <label for="year" class="form-label required-label">ชั้นปี</label>
                    <input type="text" id="year" class="form-input" placeholder="ชั้นปี" required />
                </div>
                <div class="form-group">
                    <label for="faculty" class="form-label required-label">คณะ</label>
                    <input type="text" id="faculty" class="form-input" required />
                </div>
                <div class="form-group">
                    <label for="department" class="form-label required-label">สาขาวิชา</label>
                    <input type="text" id="department" class="form-input" required />
                </div>
            </div>
        
            <div class="form-row">
                <div class="form-group">
                    <label for="contact-address" class="form-label required-label">ที่อยู่ที่สามารถติดต่อได้</label>
                    <input type="text" id="contact-address" class="form-input" placeholder="ที่อยู่" required />
                </div>
            </div>
        
            <div class="form-row">
                <div class="form-group">
                    <label for="mobile-phone" class="form-label required-label">โทรศัพท์มือถือ</label>
                    <input type="tel" id="mobile-phone" name="mobile_phone" class="form-input" placeholder="โทรศัพท์มือถือ" pattern="\d{10}" maxlength="10" title="กรุณาใส่เบอร์โทรศัพท์ให้ครบ 10 หลัก" required />
                </div>
                <div class="form-group">
                    <label for="email" class="form-label required-label">Email</label>
                    <input type="email" id="email" name="email" class="form-input" placeholder="email@example.com" required />
                </div>
            </div>
        
            <div class="form-row">
                <div class="form-group">
                    <label for="advisor" class="form-label required-label">อาจารย์ที่ปรึกษา</label>
                    <input type="text" id="advisor" class="form-input" placeholder="อาจารย์ที่ปรึกษา" required />
                </div>
            </div>
        
            <div class="form-row">
                <div class="form-group">
                    <label for="academic-year" class="form-label required-label">ปีการศึกษา</label>
                    <input type="text" id="academic-year" name="academic_year" class="form-input" placeholder="ปีการศึกษา" required />
                </div>
                <div class="form-group">
                    <label for="semester" class="form-label required-label">ภาคการศึกษา</label>
                    <input type="text" id="semester" name="semester" class="form-input" placeholder="ภาคการศึกษา" required />
                </div>
            </div>
        
            <div class="form-group">
                <p class="table-label">มีความประสงค์ขอจดทะเบียนรายวิชาข้ามหลักสูตร</p>
                <table class="course-table">
                    <thead>
                        <tr>
                            <th>รหัสวิชา</th>
                            <th>ชื่อวิชา</th>
                            <th>Section</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" name="course_code" class="table-input" /></td>
                            <td><input type="text" name="course_name" class="table-input" /></td>
                            <td><input type="text" name="course_section" class="table-input" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        
            <div class="form-row">
                <div class="form-group">
                    <label for="additional-explanation" class="form-label required-label">ชี้แจงเหตุผลเพิ่มเติม</label>
                    <textarea id="additional-explanation" class="form-input explanation-box" required></textarea>
                </div>
            </div>
        
            <div class="button-row">
                <div class="draft-btn">
                    <input type="submit" value="บันทึกแบบร่าง" onclick="saveDraft(event)">
                </div>
                <div class="send-btn">
                    <input type="submit" value="ส่งคำร้อง">
                </div>
            </div>
        </form>
    `,

    resign: `
        <h1>คำร้องลาออก</h1>
        <hr> <br>
        <form id="resign">
            <div class="form-row">
                <div>
                    <label for="date" class="required-label">วันที่</label>
                    <input type="date" id="date" name="date" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="full-name" class="required-label">ชื่อ-นามสกุล (ใส่คำนำหน้า)</label>
                    <input type="text" id="full-name" name="full-name" placeholder="ชื่อ-นามสกุล" required>
                </div>

                <div>
                    <label for="registration-number" class="required-label">เลขทะเบียน</label>
                    <input type="text" id="registration-number" name="registration-number" placeholder="เลขทะเบียน" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="year" class="required-label">ชั้นปี</label>
                    <input type="text" id="year" name="year" placeholder="ชั้นปี" required>
                </div>

                <div>
                    <label for="faculty" class="required-label">คณะ</label>
                    <input type="text" id="faculty" name="faculty" placeholder="คณะ" required>
                </div>

                <div>
                    <label for="department" class="required-label">สาขาวิชา</label>
                    <input type="text" id="department" name="department" placeholder="สาขาวิชา" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="mobile-phone" class="required-label">โทรศัพท์มือถือ</label>
                    <input type="tel" id="mobile-phone" name="mobile-phone" placeholder="โทรศัพท์มือถือ" pattern="\d{10}" maxlength="10" title="กรุณาใส่เบอร์โทรศัพท์ให้ครบ 10 หลัก" required>
                </div>

                <div>
                    <label for="email" class="required-label">Email</label>
                    <input type="email" id="email" name="email" placeholder="email@example.com" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="contact-address" class="required-label">ที่อยู่ที่สามารถติดต่อได้</label>
                    <input type="text" id="contact-address" name="contact-address" placeholder="ที่อยู่" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="academic-year" class="required-label">ขอลาออกตั้งแต่ปีการศึกษา</label>
                    <input type="text" id="academic-year" name="academic-year" placeholder="ปีการศึกษา" required>
                </div>

                <div>
                    <label for="semester" class="required-label">ภาคการศึกษา</label>
                    <input type="text" id="semester" name="semester" placeholder="ภาคการศึกษา" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="debt">มีหนี้ค้างหรือไม่ โปรดระบุ (ถ้าไม่มีไม่ต้องใส่)</label>
                    <input type="text" id="debt" name="debt" placeholder="รายละเอียดหนี้ (ถ้ามี)">
                </div>
            </div>

            <div class="radio-group">
                <label class="form-label required-label"><strong>ต้องการเกรดในภาคเรียนที่ยื่นคำร้องลาออกหรือไม่</strong></label>
                <div class="radio-type">
                    <div class="radio-inline">
                        <input type="radio" id="want-grade" name="grade_request" value="want" class="radio-input">
                        <label for="want-grade" class="radio-label">ต้องการ</label>
                    </div>
                    <div class="radio-inline">
                        <input type="radio" id="dont-want-grade" name="grade_request" value="dont-want" class="radio-input">
                        <label for="dont-want-grade" class="radio-label">ไม่ต้องการ</label>
                    </div>
                </div>
            </div>

            <div class="button-row">
                <div class="draft-btn">
                    <input type="submit" value="บันทึกแบบร่าง" onclick="saveDraft(event)">
                </div>
                <div class="send-btn">
                    <input type="submit" value="ส่งคำร้อง">
                </div>
            </div>
        </form>
    `,
};

function loadForm(formType) {
    const container = document.getElementById('form-container'); // Ensure this container exists
    if (forms[formType]) {
        container.innerHTML = forms[formType]; // Dynamically inject the form HTML
    } else {
        container.innerHTML = `<p>Error: Form type "${formType}" not found.</p>`;
    }
}

window.onload = async function() {
    try {
        // Fetch the data from the API (Uncomment this if using a real API)
        const response = await fetch('http://api.cs261.krittamark.com/api/login');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Mock-up response structure for testing (Uncomment the next line if fetching from an actual API)
        // const data = {
        //     "success": true,
        //     "user": {
        //         "name": "สมมติ เรียนดี",
        //         "type": "Student",
        //         "prefixname": " นาย",
        //         "username": "6609611111",
        //         "faculty": "วิทยาศาสตร์และเทคโนโลยี",
        //         "department": "วิทยาการคอมพิวเตอร์",
        //         "organization": "XYZ University"
        //     }
        // };

        // Check if the response is successful and contains user data
        if (data.success && data.user) {
            const { prefixname, name, username, faculty, department } = data.user;

            // Populate the form fields
            if (prefixname && name) {
                document.getElementById('full-name').value = `${prefixname}${name}`;
            }
            if (username) {
                document.getElementById('registration-number').value = username;
            }
            if (faculty) {
                document.getElementById('faculty').value = faculty;
            }
            if (department) {
                document.getElementById('department').value = department;
            }
        } else {
            console.error('Invalid response structure or unsuccessful response.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

