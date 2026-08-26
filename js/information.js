// =======================================
// POLISAS SICMS INFORMATION DATABASE
// =======================================


const informationDatabase = [

    {
    id: "registration",

    keyword: [
        "registration",
        "register",
        "semester",
        "course registration",
        "course registration",
        "register course",
        "register subject",
        "enroll",
        "enrollment",
        "daftar",
        "pendaftaran",
        "daftar subjek",
        "daftar kursus"
    ],

    title:
    "📚 Semester Registration",

    description:
    `
    Semester registration allows students
    to register for their subjects for the
    current semester.
    `,

    how:
    `
    <h3>📚 How to Register</h3>

    <ol>
        <li>Login to SPMP Portal</li>
        <li>Select Course Registration</li>
        <li>Choose available subjects</li>
        <li>Confirm and submit</li>
    </ol>
    `,

    where:
    `
    <h3>📍 Where to Register</h3>

    <p>
    You can complete your semester
    registration through the
    <b>SPMP Portal</b>.
    </p>
    `,

    requirements:
    `
    <h3>📋 Registration Requirements</h3>

    <ul>
        <li>Student ID</li>
        <li>Academic information</li>
        <li>Course selection</li>
    </ul>
    `,

    related: [
        "spmp",
        "calendar",
        "fees"
    ],

    answer:
    `
    <h3>Semester Registration Guide</h3>

    <p>
    Students must complete semester registration
    through the SPMP Portal.
    </p>

    <br>

    <b>Steps:</b>

    <ol>
        <li>Login to SPMP Portal</li>
        <li>Select Course Registration</li>
        <li>Choose available subjects</li>
        <li>Confirm and submit</li>
    </ol>

    <br>

    <b>Required:</b>

    <ul>
        <li>Student ID</li>
        <li>Academic information</li>
        <li>Course selection</li>
    </ul>
    `
    },


    {
    id: "transcript",

    keyword: [
        "transcript",
        "result",
        "academic record",
        "academic results",
        "results",
        "transkrip",
        "keputusan",
        "rekod akademik"
    ],

    title:
    "📄 Academic Transcript",

    description:
    `
    An academic transcript contains a student's
    academic records and results.
    `,

    how:
    `
    <h3>📄 How to Apply for a Transcript</h3>

    <ol>
        <li>Login to the student portal</li>
        <li>Select Transcript Application</li>
        <li>Fill in the required details</li>
        <li>Submit the request</li>
    </ol>
    `,

    where:
    `
    <h3>📍 Where to Apply</h3>

    <p>
    You can request your academic transcript
    through the official student portal.
    </p>
    `,

    requirements:
    `
    <h3>📋 Transcript Information</h3>

    <p>
    The transcript application requires
    the necessary student and academic details.
    </p>
    `,

    related: [
        "spmp",
        "registration"
    ],

    answer:
    `
    <h3>Transcript Application</h3>

    <p>
    Students can request academic transcripts
    through the official student portal.
    </p>

    <br>

    <b>Process:</b>

    <ol>
        <li>Login to student portal</li>
        <li>Select Transcript Application</li>
        <li>Fill in required details</li>
        <li>Submit request</li>
    </ol>
    `
  },



    {
    id: "hostel",

    keyword: [
        "hostel",
        "room",
        "accommodation",
        "hostel room",
        "asrama",
        "bilik",
        "penginapan",
        "hostel application",
        "apply hostel"
    ],

    title:
    "🏠 Hostel Application",

    description:
    `
    Students can apply for hostel accommodation
    through the Student Affairs Department.
    `,

    how:
    `
    <h3>🏠 How to Apply for Hostel</h3>

    <ol>
        <li>Prepare your student information</li>
        <li>Complete the hostel application form</li>
        <li>Prepare the required supporting documents</li>
        <li>Submit the hostel application</li>
    </ol>
    `,

    where:
    `
    <h3>📍 Where to Apply</h3>

    <p>
    Hostel applications are handled through
    the <b>Student Affairs Department</b>.
    </p>
    `,

    requirements:
    `
    <h3>📋 Hostel Requirements</h3>

    <ul>
        <li>Student information</li>
        <li>Hostel application form</li>
        <li>Supporting documents</li>
    </ul>
    `,

    related: [
        "registration",
        "spmp"
    ],

    answer:
    `
    <h3>Hostel Information</h3>

    <p>
    Students can apply for hostel accommodation
    through Student Affairs Department.
    </p>

    <br>

    <b>Required Documents:</b>

    <ul>
        <li>Student information</li>
        <li>Hostel application form</li>
        <li>Supporting documents</li>
    </ul>
    `
   },



    {
    id: "fees",

    keyword: [
        "fees",
        "fee",
        "payment",
        "pay",
        "tuition",
        "tuition fee",
        "student fees",
        "yuran",
        "bayar",
        "bayaran",
        "pembayaran"
    ],

    title:
    "💰 Student Fees",

    description:
    `
    Students can check and pay tuition fees
    through the official payment system.
    `,

    how:
    `
    <h3>💰 How to Pay Fees</h3>

    <ol>
        <li>Check your tuition fee amount</li>
        <li>Proceed to the official payment system</li>
        <li>Complete the payment</li>
        <li>Keep your payment receipt</li>
    </ol>
    `,

    where:
    `
    <h3>📍 Where to Pay Fees</h3>

    <p>
    You can check and pay your tuition fees
    through the official payment system.
    </p>
    `,

    requirements:
    `
    <h3>📋 Fee Services</h3>

    <ul>
        <li>Fee checking</li>
        <li>Payment confirmation</li>
        <li>Receipt download</li>
    </ul>
    `,

    related: [
        "registration",
        "spmp"
    ],

    answer:
    `
    <h3>Fee Payment Information</h3>

    <p>
    Students can check and pay tuition fees
    through the official payment system.
    </p>

    <br>

    <b>Available Services:</b>

    <ul>
        <li>Fee checking</li>
        <li>Payment confirmation</li>
        <li>Receipt download</li>
    </ul>
    `
    },



    {
    id: "spmp",

    keyword: [
        "spmp",
        "portal",
        "student portal",
        "student system",
        "portal pelajar",
        "sistem pelajar",
        "spmp portal"
    ],

    title:
    "💻 SPMP Portal",

    description:
    `
    The SPMP Portal provides students with
    access to important academic and student services.
    `,

    how:
    `
    <h3>💻 How to Use SPMP</h3>

    <ol>
        <li>Open the SPMP Portal</li>
        <li>Login using your student account</li>
        <li>Select the service you need</li>
        <li>Complete the required process</li>
    </ol>
    `,

    where:
    `
    <h3>📍 SPMP Portal</h3>

    <p>
    Student services can be accessed through
    the official SPMP Portal.
    </p>
    `,

    requirements:
    `
    <h3>📋 SPMP Access</h3>

    <ul>
        <li>Student ID</li>
        <li>Student account</li>
        <li>Login credentials</li>
    </ul>
    `,

    related: [
        "registration",
        "transcript",
        "fees",
        "calendar"
    ],

    answer:
    `
    <h3>SPMP Portal Information</h3>

    <p>
    SPMP Portal provides students access to:
    </p>

    <ul>
        <li>Course registration</li>
        <li>Academic results</li>
        <li>Student information</li>
        <li>Announcements</li>
    </ul>
    `
   },

    

{
    id: "calendar",

    keyword: [
        "calendar",
        "academic calendar",
        "schedule",
        "semester date",
        "academic date",
        "kalendar",
        "kalendar akademik",
        "jadual",
        "exam schedule",
        "examination",
        "exam",
        "exams",
        "examination",
        "examinations",
        "exam date",
        "exam dates",
        "when is exam",
        "when are exams",
        "semester break",
        "holiday",
        "holidays"
           
    ],

    title:
    "📅 Academic Calendar",

    description:
    `
    The Academic Calendar contains important
    academic dates including registration,
    examinations and semester breaks.
    `,

    how:
    `
    <h3>📅 How to Use the Academic Calendar</h3>

    <p>
    Check the academic calendar to find
    important dates for your semester.
    </p>

    <ul>
        <li>Registration dates</li>
        <li>Examination dates</li>
        <li>Semester dates</li>
        <li>Holiday dates</li>
    </ul>
    `,

    where:
    `
    <h3>📍 Academic Calendar</h3>

    <p>
    Students can view the academic calendar
    through the available student information
    system or official POLISAS resources.
    </p>
    `,

    requirements:
    `
    <h3>📋 Academic Calendar Information</h3>

    <p>
    No special documents are required to
    view the academic calendar.
    </p>
    `,

    related: [
        "registration",
        "spmp"
    ],

    answer:
    `
    <h3>Academic Calendar Information</h3>

    <p>
    Students can view important academic dates
    including registration, examination and
    semester breaks.
    </p>

    <br>

    <b>Includes:</b>

    <ul>
        <li>Semester dates</li>
        <li>Registration period</li>
        <li>Exam schedule</li>
        <li>Holiday dates</li>
    </ul>
    `
},


{
    id: "library",

    keyword: [
        "library",
        "book",
        "books",
        "resource",
        "borrow book",
        "library service",
        "perpustakaan",
        "buku",
        "pinjam buku",
        "sumber",
        "borrow",
        "borrowing",
        "borrow books",
        "borrow a book",
        "library books",
        "study",
        "study room",
        "learning resources",
        "academic resources"
    ],

    title:
    "📖 Library Services",

    description:
    `
    Students can access academic resources
    and borrow learning materials from the library.
    `,

    how:
    `
    <h3>📖 How to Use Library Services</h3>

    <ul>
        <li>Search for available books</li>
        <li>Borrow learning materials</li>
        <li>Access digital resources</li>
        <li>Use study facilities</li>
    </ul>
    `,

    where:
    `
    <h3>📍 Library</h3>

    <p>
    Students can access the POLISAS Library
    for academic resources and learning materials.
    </p>
    `,

    requirements:
    `
    <h3>📋 Library Services</h3>

    <ul>
        <li>Book borrowing</li>
        <li>Digital resources</li>
        <li>Study facilities</li>
    </ul>
    `,

    related: [
        "spmp"
    ],

    answer:
    `
    <h3>POLISAS Library Information</h3>

    <p>
    Students can access academic resources
    and borrow learning materials.
    </p>

    <br>

    <b>Services:</b>

    <ul>
        <li>Book borrowing</li>
        <li>Digital resources</li>
        <li>Study facilities</li>
    </ul>
    `
}

];