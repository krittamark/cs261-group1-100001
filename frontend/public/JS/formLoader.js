const forms = {
    delay_registration: `
        <h1>คำร้องจดทะเบียนล่าช้า</h1>
        <hr> <br>
        <form id="delay-registration">
            <div class="form-row">
                <div>
                    <label for="edit-date" class="required-label">วันที่</label>
                    <input type="date" id="edit-date" name="edit-date" required>
                </div>
                <div>
                    <label for="form-title" class="required-label">เรื่อง</label>
                    <input type="text" id="form-title" name="form-title" value="ขอจดทะเบียนล่าช้า" readonly>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="full-name" class="required-label">ชื่อ-นามสกุล</label>
                    <input type="text" id="full-name" name="full-name" readonly>
                </div>

                <div>
                    <label for="student-id" class="required-label">เลขทะเบียน</label>
                    <input type="number" id="student-id" name="student-id" readonly>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="student-year" class="required-label">ชั้นปี</label>
                    <input type="number" id="student-year" name="student-year" value="1" required>
                </div>

                <div>
                    <label for="faculty" class="required-label">คณะ</label>
                    <input type="text" id="faculty" name="faculty" readonly>
                </div>
                <div>
                    <label for="department" class="required-label">สาขาวิชา</label>
                    <input type="text" id="department" name="department" readonly>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="address" class="required-label">ที่อยู่ที่สามารถติดต่อได้</label>
                    <input type="text" id="address" name="address" 
                    placeholder="บ้านเลขที่ แขวง/ตำบล เขต/อำเภอ จังหวัด" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="student-number" class="required-label">โทรศัพท์ติดต่อนักศึกษา</label>
                    <input type="tel" id="student-number" name="student-number"
                    placeholder="0XXYYYZZZZ" required>
                </div>
                <div>
                    <label for="parent-number" class="required-label">โทรศัพท์ติดต่อผู้ปกครอง</label>
                    <input type="tel" id="parent-number" name="parent-number"
                    placeholder="0XXYYYZZZZ" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="adviser" class="required-label">อาจารย์ที่ปรึกษา</label>
                    <input type="text" id="adviser" name="adviser"
                    placeholder="ชื่ออาจารย์ที่ปรึกษา" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="semester" class="required-label">ภาคการศึกษา</label>
                    <input type="number" id="semester" name="semester" value="1" required>
                </div>

                <div>
                    <label for="academic-year" class="required-label">ปีการศึกษา</label>
                    <input type="number" id="academic-year" name="academic-year" placeholder="25XX" required>
                </div>
            </div>

            <p class="required-label"><strong>มีความประสงค์ขอจดทะเบียนล่าช้าในรายวิชา</strong></p>

            <div class="form-row">
                <table>
                    <thead>
                        <tr>
                            <th>รหัสวิชา</th>
                            <th>ชื่อวิชา</th>
                            <th>Section</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" name="course_code_1" required></td>
                            <td><input type="text" name="course_name_1" required></td>
                            <td><input type="number" name="section_1" required></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="form-row">
                <div>
                    <label for="reason" class="required-label">ชี้แจงเหตุผลเพิ่มเติม</label>
                    <textarea id="reason" name="reason" required></textarea>
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
        <h1>คำร้องถอนรายวิชา (Drop W)</h1>
        <hr> <br>
        <form id="withdraw-course">
            <div class="form-row">
                <div>
                    <label for="edit-date" class="required-label">วันที่</label>
                    <input type="date" id="edit-date" name="edit-date" required>
                </div>
                <div>
                    <label for="form-title" class="required-label">เรื่อง</label>
                    <input type="text" id="form-title" name="form-title" value="ขอถอนรายวิชา" readonly>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="full-name" class="required-label">ชื่อ-นามสกุล</label>
                    <input type="text" id="full-name" name="full-name" readonly>
                </div>

                <div>
                    <label for="student-id" class="required-label">เลขทะเบียน</label>
                    <input type="number" id="student-id" name="student-id" readonly>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="student-year" class="required-label">ชั้นปี</label>
                    <input type="number" id="student-year" name="student-year" value="1" required>
                </div>

                <div>
                    <label for="faculty" class="required-label">คณะ</label>
                    <input type="text" id="faculty" name="faculty" readonly>
                </div>
                <div>
                    <label for="department" class="required-label">สาขาวิชา</label>
                    <input type="text" id="department" name="department" readonly>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="address" class="required-label">ที่อยู่ที่สามารถติดต่อได้</label>
                    <input type="text" id="address" name="address" 
                    placeholder="บ้านเลขที่ แขวง/ตำบล เขต/อำเภอ จังหวัด" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="student-number" class="required-label">โทรศัพท์ติดต่อนักศึกษา</label>
                    <input type="tel" id="student-number" name="student-number"
                    placeholder="0XXYYYZZZZ" required>
                </div>
                <div>
                    <label for="parent-number" class="required-label">โทรศัพท์ติดต่อผู้ปกครอง</label>
                    <input type="tel" id="parent-number" name="parent-number"
                    placeholder="0XXYYYZZZZ" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="adviser" class="required-label">อาจารย์ที่ปรึกษา</label>
                    <input type="text" id="adviser" name="adviser"
                    placeholder="ชื่ออาจารย์ที่ปรึกษา" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="semester" class="required-label">ภาคการศึกษา</label>
                    <input type="number" id="semester" name="semester" value="1" required>
                </div>

                <div>
                    <label for="academic-year" class="required-label">ปีการศึกษา</label>
                    <input type="number" id="academic-year" name="academic-year" placeholder="25XX" required>
                </div>
            </div>

            <p class="required-label"><strong>มีความประสงค์ขอถอนรายวิชา</strong></p>
            <div class="form-row">
                <table>
                    <thead>
                        <tr>
                            <th>รหัสวิชา</th>
                            <th>ชื่อวิชา</th>
                            <th>Section</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" name="course_code_1" required></td>
                            <td><input type="text" name="course_name_1" required></td>
                            <td><input type="number" name="section_1" required></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="form-row">
                <div>
                    <label for="reason" class="required-label">ชี้แจงเหตุผลเพิ่มเติม</label>
                    <textarea id="reason" name="reason" required></textarea>
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
        <form id="reg-request">
            <div class="form-row">
                <div>
                    <label for="edit-date" class="required-label">วันที่</label>
                    <input type="date" id="edit-date" name="edit-date" required>
                </div>
                <div>
                    <label for="form-title" class="required-label">เรื่อง</label>
                    <input type="text" id="form-title" name="form-title" value="ขอจดทะเบียนรายวิชาข้ามหลักสูตร" readonly>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="full-name" class="required-label">ชื่อ-นามสกุล</label>
                    <input type="text" id="full-name" name="full-name" readonly>
                </div>

                <div>
                    <label for="student-id" class="required-label">เลขทะเบียน</label>
                    <input type="number" id="student-id" name="student-id" readonly>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="student-year" class="required-label">ชั้นปี</label>
                    <input type="number" id="student-year" name="student-year" value="1" required>
                </div>

                <div>
                    <label for="faculty" class="required-label">คณะ</label>
                    <input type="text" id="faculty" name="faculty" readonly>
                </div>
                <div>
                    <label for="department" class="required-label">สาขาวิชา</label>
                    <input type="text" id="department" name="department" readonly>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="address" class="required-label">ที่อยู่ที่สามารถติดต่อได้</label>
                    <input type="text" id="address" name="address" 
                    placeholder="บ้านเลขที่ แขวง/ตำบล เขต/อำเภอ จังหวัด" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="student-number" class="required-label">โทรศัพท์ติดต่อนักศึกษา</label>
                    <input type="tel" id="student-number" name="student-number"
                    placeholder="0XXYYYZZZZ" required>
                </div>
                <div>
                    <label for="parent-number" class="required-label">โทรศัพท์ติดต่อผู้ปกครอง</label>
                    <input type="tel" id="parent-number" name="parent-number"
                    placeholder="0XXYYYZZZZ" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="adviser" class="required-label">อาจารย์ที่ปรึกษา</label>
                    <input type="text" id="adviser" name="adviser"
                    placeholder="ชื่ออาจารย์ที่ปรึกษา" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="semester" class="required-label">ภาคการศึกษา</label>
                    <input type="number" id="semester" name="semester" value="1" required>
                </div>

                <div>
                    <label for="academic-year" class="required-label">ปีการศึกษา</label>
                    <input type="number" id="academic-year" name="academic-year" placeholder="25XX" required>
                </div>
            </div>

            <p class="required-label"><strong>มีความประสงค์ขอจดทะเบียนรายวิชาข้ามหลักสูตร</strong></p>
            <div class="form-row">
                <table>
                    <thead>
                        <tr>
                            <th>รหัสวิชา</th>
                            <th>ชื่อวิชา</th>
                            <th>Section</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" name="course_code_1" required></td>
                            <td><input type="text" name="course_name_1" required></td>
                            <td><input type="number" name="section_1" required></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="form-row">
                <div>
                    <label for="reason" class="required-label">ชี้แจงเหตุผลเพิ่มเติม</label>
                    <textarea id="reason" name="reason" required></textarea>
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
                    <label for="edit-date" class="required-label">วันที่</label>
                    <input type="date" id="edit-date" name="edit-date" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="full-name" class="required-label">ชื่อ-นามสกุล</label>
                    <input type="text" id="full-name" name="full-name" readonly>
                </div>

                <div>
                    <label for="student-id" class="required-label">เลขทะเบียน</label>
                    <input type="number" id="student-id" name="student-id" readonly>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="student-year" class="required-label">ชั้นปี</label>
                    <input type="number" id="student-year" name="student-year" value="1" required>
                </div>

                <div>
                    <label for="faculty" class="required-label">คณะ</label>
                    <input type="text" id="faculty" name="faculty" readonly>
                </div>
                <div>
                    <label for="department" class="required-label">สาขาวิชา</label>
                    <input type="text" id="department" name="department" readonly>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="address" class="required-label">ที่อยู่ที่สามารถติดต่อได้</label>
                    <input type="text" id="address" name="address" 
                    placeholder="บ้านเลขที่ แขวง/ตำบล เขต/อำเภอ จังหวัด" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="student-phone" class="required-label">โทรศัพท์ติดต่อนักศึกษา</label>
                    <input type="tel" id="student-phone" name="student-phone"
                    placeholder="0XXYYYZZZZ" required>
                </div>
                <div>
                    <label for="parent-phone" class="required-label">โทรศัพท์ติดต่อผู้ปกครอง</label>
                    <input type="tel" id="parent-phone" name="parent-phone"
                    placeholder="0XXYYYZZZZ" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="adviser" class="required-label">อาจารย์ที่ปรึกษา</label>
                    <input type="text" id="adviser" name="adviser"
                    placeholder="ชื่ออาจารย์ที่ปรึกษา" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="semester" class="required-label">ภาคการศึกษา</label>
                    <input type="number" id="semester" name="semester" value="1" required>
                </div>

                <div>
                    <label for="academic-year" class="required-label">ปีการศึกษา</label>
                    <input type="number" id="academic-year" name="academic-year" placeholder="25XX" required>
                </div>
            </div>

            <div class="form-row">
                <div>
                    <label for="dept">มีภาระหนี้ผูกพันกับมหาวิทยาลัยหรือไม่ โปรดระบุจำนวนเงิน (ถ้าไม่มีไม่ต้องใส่)</label>
                    <input type="text" id="dept" name="dept">
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
        // Fetch the data from the API
        const response = await fetch('http://api.cs261.krittamark.com/api/login');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Mock-up response structure
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

        // Assuming the response contains a 'user' object with the necessary fields:
        const { prefixname, name, username, faculty, department } = data.user;

        // Populate the form fields
        document.getElementById('full-name').value = `${prefixname}${name}`;
        document.getElementById('student-id').value = username;
        document.getElementById('faculty').value = faculty;
        document.getElementById('department').value = department;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

