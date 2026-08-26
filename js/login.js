// =======================================
// POLISAS SICMS LOGIN SYSTEM
// LOGIN + REGISTRATION + FORGOT PASSWORD
// =======================================


// =======================================
// FORGOT PASSWORD ELEMENTS
// =======================================

const forgotPasswordLink =
    document.getElementById("forgotPasswordLink");

const forgotPasswordSection =
    document.getElementById("forgotPasswordSection");

const forgotPasswordForm =
    document.getElementById("forgotPasswordForm");

const forgotStudentID =
    document.getElementById("forgotStudentID");

const newPassword =
    document.getElementById("newPassword");

const confirmNewPassword =
    document.getElementById("confirmNewPassword");

const newPasswordGroup =
    document.getElementById("newPasswordGroup");

const confirmNewPasswordGroup =
    document.getElementById("confirmNewPasswordGroup");

const forgotPasswordBtn =
    document.getElementById("forgotPasswordBtn");

const forgotPasswordMessage =
    document.getElementById("forgotPasswordMessage");

const backToLogin =
    document.getElementById("backToLogin");


// =======================================
// LOGIN ELEMENTS
// =======================================

const loginForm =
    document.getElementById("loginForm");

const studentIDInput =
    document.getElementById("studentID");

const passwordInput =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

const errorMessage =
    document.getElementById("errorMessage");


// =======================================
// REGISTER ELEMENTS
// =======================================

const registerForm =
    document.getElementById("registerForm");

const registerName =
    document.getElementById("registerName");

const registerStudentID =
    document.getElementById("registerStudentID");

const registerProgramme =
    document.getElementById("registerProgramme");

const registerPassword =
    document.getElementById("registerPassword");

const confirmPassword =
    document.getElementById("confirmPassword");

const registerMessage =
    document.getElementById("registerMessage");


// =======================================
// LOGIN / REGISTER SECTIONS
// =======================================

const loginSection =
    document.getElementById("loginSection");

const registerSection =
    document.getElementById("registerSection");

const showRegister =
    document.getElementById("showRegister");

const showLogin =
    document.getElementById("showLogin");


// =======================================
// FORGOT PASSWORD STATE
// =======================================

let passwordResetUser = null;


// =======================================
// SHOW REGISTER PAGE
// =======================================

if (showRegister) {

    showRegister.addEventListener(
        "click",
        function(e) {

            e.preventDefault();

            loginSection.style.display = "none";

            forgotPasswordSection.style.display = "none";

            registerSection.style.display = "block";

            errorMessage.innerHTML = "";

        }
    );

}


// =======================================
// SHOW LOGIN PAGE
// =======================================

if (showLogin) {

    showLogin.addEventListener(
        "click",
        function(e) {

            e.preventDefault();

            registerSection.style.display = "none";

            forgotPasswordSection.style.display = "none";

            loginSection.style.display = "block";

            registerMessage.innerHTML = "";

        }
    );

}


// =======================================
// SHOW / HIDE LOGIN PASSWORD
// =======================================

if (togglePassword) {

    togglePassword.addEventListener(
        "click",
        function() {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                togglePassword.classList.remove(
                    "fa-eye"
                );

                togglePassword.classList.add(
                    "fa-eye-slash"
                );

            }

            else {

                passwordInput.type = "password";

                togglePassword.classList.remove(
                    "fa-eye-slash"
                );

                togglePassword.classList.add(
                    "fa-eye"
                );

            }

        }
    );

}


// =======================================
// SHOW / HIDE REGISTER PASSWORD
// =======================================

const toggleRegisterPassword =
    document.getElementById(
        "toggleRegisterPassword"
    );


if (toggleRegisterPassword) {

    toggleRegisterPassword.addEventListener(
        "click",
        function() {

            if (registerPassword.type === "password") {

                registerPassword.type = "text";

                toggleRegisterPassword.classList.remove(
                    "fa-eye"
                );

                toggleRegisterPassword.classList.add(
                    "fa-eye-slash"
                );

            }

            else {

                registerPassword.type = "password";

                toggleRegisterPassword.classList.remove(
                    "fa-eye-slash"
                );

                toggleRegisterPassword.classList.add(
                    "fa-eye"
                );

            }

        }
    );

}


// =======================================
// LOGIN
// =======================================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(e) {

            e.preventDefault();

            const id =
                studentIDInput.value.trim();

            const pass =
                passwordInput.value.trim();


            // =================================
            // EMPTY FIELDS
            // =================================

            if (
                id === "" ||
                pass === ""
            ) {

                errorMessage.style.color = "red";

                errorMessage.innerHTML =
                    "Please enter Student ID and Password";

                return;

            }


            // =================================
            // REFRESH USERS FROM LOCAL STORAGE
            // =================================

            users =
                JSON.parse(
                    localStorage.getItem(
                        "registeredUsers"
                    )
                ) || defaultUsers;


            // =================================
            // FIND USER
            // =================================

            const user =
                users.find(
                    function(student) {

                        return (
                            student.studentID.toLowerCase() ===
                            id.toLowerCase() &&

                            student.password ===
                            pass
                        );

                    }
                );


            // =================================
            // LOGIN SUCCESS
            // =================================

            if (user) {

                errorMessage.style.color = "green";

                errorMessage.innerHTML =
                    "Login successful! Redirecting...";


                // Save login information

                localStorage.setItem(
                    "loggedIn",
                    "true"
                );

                localStorage.setItem(
                    "loggedInUser",
                    user.studentID
                );

                localStorage.setItem(
                    "studentName",
                    user.name
                );

                localStorage.setItem(
                    "studentID",
                    user.studentID
                );

                localStorage.setItem(
                    "programme",
                    user.programme
                );


                // Redirect

                setTimeout(
                    function() {

                        window.location.href =
                            "index.html";

                    },
                    800
                );

            }


            // =================================
            // LOGIN FAILED
            // =================================

            else {

                errorMessage.style.color = "red";

                errorMessage.innerHTML =
                    "Invalid Student ID or Password";

            }

        }
    );

}


// =======================================
// REGISTRATION
// =======================================

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(e) {

            e.preventDefault();


            const name =
                registerName.value.trim();

            const id =
                registerStudentID.value.trim();

            const programme =
                registerProgramme.value.trim();

            const password =
                registerPassword.value;

            const confirm =
                confirmPassword.value;


            // =================================
            // EMPTY FIELD CHECK
            // =================================

            if (
                name === "" ||
                id === "" ||
                programme === "" ||
                password === "" ||
                confirm === ""
            ) {

                registerMessage.style.color = "red";

                registerMessage.innerHTML =
                    "Please complete all fields.";

                return;

            }


            // =================================
            // PASSWORD LENGTH
            // =================================

            if (password.length < 6) {

                registerMessage.style.color = "red";

                registerMessage.innerHTML =
                    "Password must contain at least 6 characters.";

                return;

            }


            // =================================
            // PASSWORD MATCH
            // =================================

            if (password !== confirm) {

                registerMessage.style.color = "red";

                registerMessage.innerHTML =
                    "Passwords do not match.";

                return;

            }


            // =================================
            // REFRESH USERS
            // =================================

            users =
                JSON.parse(
                    localStorage.getItem(
                        "registeredUsers"
                    )
                ) || defaultUsers;


            // =================================
            // CHECK DUPLICATE STUDENT ID
            // =================================

            if (studentExists(id)) {

                registerMessage.style.color = "red";

                registerMessage.innerHTML =
                    "This Student ID is already registered.";

                return;

            }


            // =================================
            // CREATE NEW USER
            // =================================

            const newUser = {

                studentID: id,

                password: password,

                name: name,

                programme: programme

            };


            // =================================
            // SAVE ACCOUNT
            // =================================

            saveNewUser(newUser);


            // =================================
            // REGISTRATION SUCCESS
            // =================================

            registerMessage.style.color = "green";

            registerMessage.innerHTML =
                "Account created successfully! You can now login.";


            // Clear registration form

            registerForm.reset();


            // Automatically return to login

            setTimeout(
                function() {

                    registerSection.style.display =
                        "none";

                    loginSection.style.display =
                        "block";

                    forgotPasswordSection.style.display =
                        "none";

                    studentIDInput.value =
                        id;

                    passwordInput.value =
                        "";

                    registerMessage.innerHTML =
                        "";

                },
                1200
            );

        }
    );

}


// =======================================
// FORGOT PASSWORD
// =======================================


// =======================================
// OPEN FORGOT PASSWORD
// =======================================

if (forgotPasswordLink) {

    forgotPasswordLink.addEventListener(
        "click",
        function(e) {

            e.preventDefault();


            // Hide other sections

            loginSection.style.display =
                "none";

            registerSection.style.display =
                "none";


            // Show forgot password

            forgotPasswordSection.style.display =
                "block";


            // Reset form

            forgotStudentID.value =
                "";

            newPassword.value =
                "";

            confirmNewPassword.value =
                "";


            newPasswordGroup.style.display =
                "none";

            confirmNewPasswordGroup.style.display =
                "none";


            forgotPasswordBtn.textContent =
                "Find Account";


            forgotPasswordMessage.innerHTML =
                "";


            passwordResetUser =
                null;

        }
    );

}


// =======================================
// BACK TO LOGIN
// =======================================

if (backToLogin) {

    backToLogin.addEventListener(
        "click",
        function(e) {

            e.preventDefault();


            forgotPasswordSection.style.display =
                "none";

            registerSection.style.display =
                "none";

            loginSection.style.display =
                "block";


            forgotPasswordMessage.innerHTML =
                "";


            forgotStudentID.value =
                "";

            newPassword.value =
                "";

            confirmNewPassword.value =
                "";


            newPasswordGroup.style.display =
                "none";

            confirmNewPasswordGroup.style.display =
                "none";


            forgotPasswordBtn.textContent =
                "Find Account";


            passwordResetUser =
                null;

        }
    );

}


// =======================================
// FORGOT PASSWORD FORM
// =======================================

if (forgotPasswordForm) {

    forgotPasswordForm.addEventListener(
        "submit",
        function(e) {

            e.preventDefault();


            const id =
                forgotStudentID.value.trim();


            // =================================
            // STEP 1 — FIND ACCOUNT
            // =================================

            if (!passwordResetUser) {


                // Empty Student ID

                if (id === "") {

                    forgotPasswordMessage.style.color =
                        "red";

                    forgotPasswordMessage.innerHTML =
                        "Please enter your Student ID.";

                    return;

                }


                // =================================
                // REFRESH USERS FROM LOCAL STORAGE
                // =================================

                users =
                    JSON.parse(
                        localStorage.getItem(
                            "registeredUsers"
                        )
                    ) || defaultUsers;


                // =================================
                // SEARCH USER
                // =================================

                const user =
                    users.find(
                        function(student) {

                            return (
                                student.studentID.toLowerCase() ===
                                id.toLowerCase()
                            );

                        }
                    );


                // =================================
                // ACCOUNT NOT FOUND
                // =================================

                if (!user) {

                    forgotPasswordMessage.style.color =
                        "red";

                    forgotPasswordMessage.innerHTML =
                        "Student ID not found.";

                    return;

                }


                // =================================
                // ACCOUNT FOUND
                // =================================

                passwordResetUser =
                    user;


                forgotPasswordMessage.style.color =
                    "green";

                forgotPasswordMessage.innerHTML =
                    "Account found. Please enter your new password.";


                // Show password fields

                newPasswordGroup.style.display =
                    "block";

                confirmNewPasswordGroup.style.display =
                    "block";


                forgotPasswordBtn.textContent =
                    "Reset Password";


                return;

            }


            // =================================
            // STEP 2 — RESET PASSWORD
            // =================================

            const password =
                newPassword.value;

            const confirm =
                confirmNewPassword.value;


            // =================================
            // EMPTY PASSWORD
            // =================================

            if (
                password === "" ||
                confirm === ""
            ) {

                forgotPasswordMessage.style.color =
                    "red";

                forgotPasswordMessage.innerHTML =
                    "Please enter and confirm your new password.";

                return;

            }


            // =================================
            // PASSWORD LENGTH
            // =================================

            if (password.length < 6) {

                forgotPasswordMessage.style.color =
                    "red";

                forgotPasswordMessage.innerHTML =
                    "Password must contain at least 6 characters.";

                return;

            }


            // =================================
            // PASSWORD MATCH
            // =================================

            if (password !== confirm) {

                forgotPasswordMessage.style.color =
                    "red";

                forgotPasswordMessage.innerHTML =
                    "Passwords do not match.";

                return;

            }


            // =================================
            // FIND USER IN CURRENT ARRAY
            // =================================

            const userIndex =
                users.findIndex(
                    function(student) {

                        return (
                            student.studentID.toLowerCase() ===
                            passwordResetUser.studentID.toLowerCase()
                        );

                    }
                );


            // =================================
            // UPDATE PASSWORD
            // =================================

            if (userIndex !== -1) {

                users[userIndex].password =
                    password;


                // Save updated users

                localStorage.setItem(
                    "registeredUsers",
                    JSON.stringify(users)
                );


                // Update reference

                passwordResetUser =
                    users[userIndex];

            }


            // =================================
            // SUCCESS
            // =================================

            forgotPasswordMessage.style.color =
                "green";

            forgotPasswordMessage.innerHTML =
                "Password reset successfully! You can now login.";


            // =================================
            // RETURN TO LOGIN
            // =================================

            setTimeout(
                function() {

                    forgotPasswordSection.style.display =
                        "none";

                    registerSection.style.display =
                        "none";

                    loginSection.style.display =
                        "block";


                    studentIDInput.value =
                        passwordResetUser.studentID;

                    passwordInput.value =
                        "";


                    forgotPasswordMessage.innerHTML =
                        "";


                    forgotStudentID.value =
                        "";

                    newPassword.value =
                        "";

                    confirmNewPassword.value =
                        "";


                    newPasswordGroup.style.display =
                        "none";

                    confirmNewPasswordGroup.style.display =
                        "none";


                    forgotPasswordBtn.textContent =
                        "Find Account";


                    passwordResetUser =
                        null;

                },
                1500
            );

        }
    );

}
