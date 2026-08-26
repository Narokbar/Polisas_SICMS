// ===========================================
// POLISAS SICMS
// STUDENT DATABASE
// ===========================================

const defaultUsers = [];


// ===========================================
// RESET REGISTERED ACCOUNTS
// ===========================================

//localStorage.removeItem("registeredUsers");


// ===========================================
// LOAD USERS
// ===========================================

let users =
    JSON.parse(
        localStorage.getItem("registeredUsers")
    ) || defaultUsers;


// ===========================================
// SAVE NEW USER
// ===========================================

function saveNewUser(user) {

    users.push(user);

    localStorage.setItem(
        "registeredUsers",
        JSON.stringify(users)
    );

}


// ===========================================
// CHECK STUDENT ID
// ===========================================

function studentExists(studentID) {

    return users.some(function(user) {

        return (
            user.studentID.toLowerCase() ===
            studentID.toLowerCase()
        );

    });

}