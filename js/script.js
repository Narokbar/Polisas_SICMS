// =======================================
// POLISAS SICMS - COMPLETE SCRIPT.JS
// V8 + SEARCH AUTOCOMPLETE
// =======================================


// =======================================
// LOAD STUDENT INFORMATION
// =======================================

const studentName =
document.getElementById("studentName");

const studentID =
document.getElementById("studentID");

const studentProgramme =
document.getElementById("studentProgramme");


if(studentName){

    studentName.innerHTML =
    localStorage.getItem("studentName") || "";

}


if(studentID){

    studentID.innerHTML =
    "Student ID : " +
    (localStorage.getItem("studentID") || "");

}


if(studentProgramme){

    studentProgramme.innerHTML =
    "Programme : " +
    (localStorage.getItem("programme") || "");

}



// =======================================
// SEARCH ELEMENTS
// =======================================

const searchInput =
document.getElementById("searchInput");

const searchBtn =
document.getElementById("searchBtn");

const result =
document.getElementById("result");

const suggestions =
document.getElementById("suggestions");



// =======================================
// QUICK ACCESS CARDS
// =======================================

const cards =
document.querySelectorAll(".card");


cards.forEach(card => {

    card.addEventListener("click", function(){

        const keyword =
        this.getAttribute("data-search");


        if(!keyword){

            return;

        }


        if(searchInput){

            searchInput.value =
            keyword;

        }


        searchInformation();


        if(result){

            result.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});



// =======================================
// NORMAL SEARCH
// =======================================

function searchInformation(){

    if(!searchInput || !result){

        return;

    }


    const search =
    cleanText(searchInput.value);


    if(search === ""){

        result.innerHTML = `

            <h3>
            🔎 Please enter a search term
            </h3>

        `;

        return;

    }


    // First try exact / keyword matching

    let found =
    informationDatabase.find(item =>

        item.keyword.some(keyword =>

            search.includes(
                keyword.toLowerCase()
            )

        )

    );


    // If not found, use fuzzy matching

    if(!found){

        const intent =
        detectIntentV5(search);


        if(intent){

            found =
            informationDatabase.find(
                item =>
                item.id === intent
            );

        }

    }


    if(found){

        result.innerHTML = `

            <h2>${found.title}</h2>

            ${found.answer}

        `;

    }

    else{

        result.innerHTML = `

            <h3>
            ❌ Information Not Found
            </h3>

            <p>
            Try searching:
            </p>

            <ul>

                <li>Registration</li>
                <li>Fees</li>
                <li>Hostel</li>
                <li>Transcript</li>
                <li>SPMP</li>
                <li>Academic Calendar</li>
                <li>Library</li>

            </ul>

        `;

    }

}



// =======================================
// SEARCH BUTTON
// =======================================

if(searchBtn){

    searchBtn.addEventListener(
        "click",
        function(){

            searchInformation();

            if(suggestions){

                suggestions.innerHTML = "";

                suggestions.style.display =
                "none";

            }

        }
    );

}



// =======================================
// ENTER KEY FOR SEARCH
// =======================================

if(searchInput){

    searchInput.addEventListener(
        "keypress",
        function(e){

            if(e.key === "Enter"){

                searchInformation();

                if(suggestions){

                    suggestions.innerHTML = "";

                    suggestions.style.display =
                    "none";

                }

            }

        }
    );

}



// =======================================
// SEARCH AUTOCOMPLETE / PREDICTION
// =======================================

if(searchInput && suggestions){

    searchInput.addEventListener(
        "input",
        function(){

            const text =
            cleanText(this.value);


            // Empty search

            if(text === ""){

                suggestions.innerHTML = "";

                suggestions.style.display =
                "none";

                return;

            }


            // Find matching database items

            let matches =
            informationDatabase.filter(item => {

                const title =
                item.title
                .toLowerCase();


                const titleMatch =
                title.includes(text);


                const keywordMatch =
                item.keyword.some(keyword =>

                    keyword
                    .toLowerCase()
                    .includes(text)

                );


                return (
                    titleMatch ||
                    keywordMatch
                );

            });


            // If normal matching finds nothing,
            // use fuzzy matching

            if(matches.length === 0){

                matches =
                informationDatabase.filter(
                    item => {

                        return item.keyword.some(
                            keyword => {

                                return (
                                    calculateSimilarity(
                                        text,
                                        keyword.toLowerCase()
                                    ) >= 0.65
                                );

                            }
                        );

                    }
                );

            }


            // Remove duplicates

            matches =
            matches.filter(
                (item,index,self) =>

                index ===
                self.findIndex(
                    x => x.id === item.id
                )

            );


            // No suggestions

            if(matches.length === 0){

                suggestions.innerHTML = "";

                suggestions.style.display =
                "none";

                return;

            }


            // Display suggestions

            suggestions.innerHTML =
            matches
            .slice(0,5)
            .map(item => `

                <div
                    class="suggestion-item"
                    data-search="${item.id}"
                >

                    ${item.title}

                </div>

            `)
            .join("");


            suggestions.style.display =
            "block";

        }
    );

}



// =======================================
// CLICK SEARCH SUGGESTION
// =======================================

if(suggestions){

    suggestions.addEventListener(
        "click",
        function(e){

            const selected =
            e.target.closest(
                ".suggestion-item"
            );


            if(!selected){

                return;

            }


            const id =
            selected.getAttribute(
                "data-search"
            );


            const found =
            informationDatabase.find(
                item => item.id === id
            );


            if(found){

                searchInput.value =
                found.title
                .replace(
                    /^[^\w]+/,
                    ""
                );


                result.innerHTML = `

                    <h2>${found.title}</h2>

                    ${found.answer}

                `;


                suggestions.innerHTML = "";

                suggestions.style.display =
                "none";


                result.scrollIntoView({

                    behavior:"smooth"

                });

            }

        }
    );

}



// =======================================
// HIDE SUGGESTIONS WHEN CLICKING OUTSIDE
// =======================================

document.addEventListener(
    "click",
    function(e){

        if(
            searchInput &&
            suggestions &&
            !searchInput.contains(e.target) &&
            !suggestions.contains(e.target)
        ){

            suggestions.innerHTML = "";

            suggestions.style.display =
            "none";

        }

    }
);



// =======================================
// FAQ SYSTEM
// =======================================

document.addEventListener(
    "click",
    function(e){

        const question =
        e.target.closest(
            ".faq-question"
        );


        if(!question){

            return;

        }


        const faqItem =
        question.closest(
            ".faq-item"
        );


        if(!faqItem){

            return;

        }


        // Close other FAQ items

        document
        .querySelectorAll(".faq-item")
        .forEach(item => {

            if(item !== faqItem){

                item.classList.remove(
                    "active"
                );

            }

        });


        // Toggle selected FAQ

        faqItem.classList.toggle(
            "active"
        );

    }
);



// =======================================
// CHATBOT ELEMENTS
// =======================================

const chatbot =
document.getElementById("chatbot");

const chatWindow =
document.getElementById("chatWindow");

const closeChat =
document.getElementById("closeChat");

const chatBody =
document.getElementById("chatBody");

const chatInput =
document.getElementById("chatInput");

const sendChat =
document.getElementById("sendChat");



// =======================================
// CHAT QUICK QUESTIONS
// =======================================

document.addEventListener(
    "click",
    function(e){

        const button =
        e.target.closest(
            ".chat-suggestion button"
        );


        if(!button){

            return;

        }


        const question =
        button.getAttribute(
            "data-question"
        );


        if(!question){

            return;

        }


        if(chatInput){

            chatInput.value =
            question;

        }


        sendAIMessage();

    }
);



// =======================================
// AI MEMORY
// =======================================

let conversationContext = {

    topic:null,

    lastQuestion:"",

    lastIntent:null

};



// =======================================
// OPEN / CLOSE CHAT
// =======================================

if(chatbot){

    chatbot.onclick = function(){

        if(!chatWindow){

            return;

        }


        // Check whether chat is currently hidden

        if(chatWindow.style.display === "block"){

            // Close chatbot

            chatWindow.style.display = "none";

        }

        else{

            // Open chatbot

            chatWindow.style.display = "block";


            if(chatInput){

                chatInput.focus();

            }

        }

    };

}



// =======================================
// SEND BUTTON
// =======================================

if(sendChat){

    sendChat.onclick = function(){

        sendAIMessage();

    };

}



// =======================================
// ENTER KEY
// =======================================

if(chatInput){

    chatInput.addEventListener(
        "keypress",
        function(e){

            if(e.key === "Enter"){

                sendAIMessage();

            }

        }
    );

}



// =======================================
// SEND AI MESSAGE
// =======================================

function sendAIMessage(){

    if(!chatInput){

        return;

    }


    const question =
    chatInput.value.trim();


    if(question === ""){

        return;

    }


    addUserMessage(question);


    chatInput.value = "";


    showTyping();


    setTimeout(
        function(){

            removeTyping();

            generateSmartAnswer(
                question
            );

        },
        500
    );

}



// =======================================
// ADD USER MESSAGE
// =======================================

function addUserMessage(message){

    if(!chatBody){

        return;

    }


    const div =
    document.createElement("div");


    div.className =
    "user-message";


    div.textContent =
    message;


    chatBody.appendChild(div);


    scrollChat();

}



// =======================================
// ADD AI MESSAGE
// =======================================

function addAIMessage(message){

    if(!chatBody){

        return;

    }


    const div =
    document.createElement("div");


    div.className =
    "bot-message";


    div.innerHTML =
    message;


    chatBody.appendChild(div);


    scrollChat();

}



// =======================================
// CHAT SCROLL
// =======================================

function scrollChat(){

    if(chatBody){

        chatBody.scrollTop =
        chatBody.scrollHeight;

    }

}



// =======================================
// TYPING INDICATOR
// =======================================

function showTyping(){

    if(!chatBody){

        return;

    }


    removeTyping();


    const typing =
    document.createElement("div");


    typing.id =
    "aiTyping";


    typing.className =
    "bot-message";


    typing.innerHTML =
    "🤖 AI is thinking...";


    chatBody.appendChild(typing);


    scrollChat();

}



function removeTyping(){

    const typing =
    document.getElementById(
        "aiTyping"
    );


    if(typing){

        typing.remove();

    }

}



// =======================================
// GET LANGUAGE
// =======================================

function getAILanguage(){

    return localStorage.getItem(
        "selectedLanguage"
    ) || "English";

}



// =======================================
// CLEAN TEXT
// =======================================

function cleanText(text){

    return text
        .toLowerCase()
        .replace(/[?!.,]/g," ")
        .replace(/\s+/g," ")
        .trim();

}



// =======================================
// SIMILARITY
// =======================================

function calculateSimilarity(a,b){

    a =
    a.toLowerCase().trim();

    b =
    b.toLowerCase().trim();


    if(a === b){

        return 1;

    }


    if(
        a.includes(b) ||
        b.includes(a)
    ){

        return 0.85;

    }


    const longer =
    a.length > b.length
    ? a
    : b;


    const shorter =
    a.length > b.length
    ? b
    : a;


    if(longer.length === 0){

        return 1;

    }


    let distance = 0;


    for(
        let i = 0;
        i < longer.length;
        i++
    ){

        if(
            longer[i] !==
            shorter[i]
        ){

            distance++;

        }

    }


    return (
        longer.length -
        distance
    ) /
    longer.length;

}



// =======================================
// FUZZY KEYWORD MATCH
// =======================================

function fuzzyKeywordMatch(
    text,
    keyword
){

    const cleanKeyword =
    keyword
    .toLowerCase()
    .trim();


    if(
        text.includes(
            cleanKeyword
        )
    ){

        return 1;

    }


    const words =
    text.split(/\s+/);


    let bestScore = 0;


    words.forEach(word => {

        const score =
        calculateSimilarity(
            word,
            cleanKeyword
        );


        if(score > bestScore){

            bestScore =
            score;

        }

    });


    return bestScore;

}



// =======================================
// V5 SMART INTENT DETECTION
// =======================================

function detectIntentV5(text){

    const intents = {

        registration:[

            "registration",
            "register",
            "course registration",
            "register course",
            "register subject",
            "subject registration",
            "enroll",
            "enrollment",
            "semester registration",
            "daftar",
            "pendaftaran",
            "daftar subjek",
            "daftar kursus"

        ],


        fees:[

            "fee",
            "fees",
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


        hostel:[

            "hostel",
            "room",
            "accommodation",
            "hostel room",
            "asrama",
            "bilik",
            "penginapan"

        ],


        transcript:[

            "transcript",
            "academic record",
            "result",
            "results",
            "academic result",
            "academic results",
            "grade",
            "grades",
            "mark",
            "marks",
            "transkrip",
            "keputusan",
            "rekod akademik"

        ],


        spmp:[

            "spmp",
            "student portal",
            "student system",
            "portal",
            "portal pelajar",
            "sistem pelajar"

        ],


        calendar:[

            "calendar",
            "academic calendar",
            "schedule",
            "semester date",
            "academic date",
            "kalendar",
            "kalendar akademik",
            "jadual",
            "exam schedule",
            "examination"

        ],


        library:[

            "library",
            "book",
            "books",
            "borrow book",
            "library service",
            "perpustakaan",
            "buku",
            "pinjam buku"

        ]

    };


    let bestIntent = null;

    let highestScore = 0;


    for(
        const intent in intents
    ){

        intents[intent].forEach(
            keyword => {

                const score =
                fuzzyKeywordMatch(
                    text,
                    keyword
                );


                if(
                    score >
                    highestScore
                ){

                    highestScore =
                    score;

                    bestIntent =
                    intent;

                }

            }
        );

    }


    if(
        highestScore >= 0.65
    ){

        return bestIntent;

    }


    return null;

}



// =======================================
// QUESTION TYPE
// =======================================

function detectQuestionType(text){

    if(
        text.includes("how") ||
        text.includes("macam mana") ||
        text.includes("bagaimana")
    ){

        return "how";

    }


    if(
        text.includes("where") ||
        text.includes("di mana") ||
        text === "mana"
    ){

        return "where";

    }


    if(
        text.includes("when") ||
        text.includes("bila") ||
        text.includes("tarikh")
    ){

        return "when";

    }


    if(
        text.includes("what") ||
        text.includes("apa") ||
        text.includes("apakah")
    ){

        return "what";

    }


    if(
        text.includes("who") ||
        text.includes("siapa")
    ){

        return "who";

    }


    return "general";

}



// =======================================
// FOLLOW-UP DETECTION
// =======================================

function detectFollowUpIntent(text){

    if(
        text === "where" ||
        text.includes("where do") ||
        text.includes("where can") ||
        text.includes("where is") ||
        text.includes("di mana") ||
        text === "mana"
    ){

        return "where";

    }


    if(
        text === "when" ||
        text.includes("when is") ||
        text.includes("when can") ||
        text.includes("bila") ||
        text.includes("tarikh")
    ){

        return "when";

    }


    if(
        text.includes("what do i need") ||
        text.includes("what do we need") ||
        text.includes("what is required") ||
        text.includes("requirements") ||
        text.includes("required document") ||
        text.includes("documents needed") ||
        text.includes("apa yang saya perlukan") ||
        text.includes("apa yang diperlukan") ||
        text.includes("dokumen diperlukan") ||
        text.includes("syarat")
    ){

        return "requirements";

    }


    if(
        text === "how" ||
        text.includes("how do") ||
        text.includes("how can") ||
        text.includes("macam mana") ||
        text.includes("bagaimana")
    ){

        return "how";

    }


    if(
        text === "what" ||
        text.includes("what is") ||
        text.includes("what are") ||
        text.includes("apa itu") ||
        text.includes("apakah")
    ){

        return "what";

    }


    return null;

}

// ===============================
// DARK MODE
// ===============================

const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

});

// ===============================
// LOGOUT
// ===============================

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {


            // Remove current login session

            localStorage.removeItem(
                "loggedIn"
            );


            localStorage.removeItem(
                "loggedInUser"
            );


            localStorage.removeItem(
                "studentName"
            );


            localStorage.removeItem(
                "studentID"
            );


            localStorage.removeItem(
                "programme"
            );


            // IMPORTANT:
            // DO NOT remove registeredUsers
            //
            // This keeps the accounts
            // that students registered.


            window.location.href =
                "login.html";

        }
    );

}

// =======================================
// ANSWER FOLLOW-UP
// =======================================

function answerFollowUp(
    intent,
    followUpType,
    language
){

    if(language === "English"){

        // REGISTRATION

        if(intent === "registration"){

            if(followUpType === "where"){

                addAIMessage(`

                    <h3>📍 Where to Register</h3>

                    <p>
                    You can complete your semester
                    course registration through the
                    <b>SPMP Portal</b>.
                    </p>

                `);

                return true;

            }


            if(followUpType === "requirements"){

                addAIMessage(`

                    <h3>📋 Registration Requirements</h3>

                    <ul>

                        <li>Student ID</li>

                        <li>Academic information</li>

                        <li>Course selection</li>

                    </ul>

                `);

                return true;

            }


            if(followUpType === "how"){

                addAIMessage(`

                    <h3>📚 How to Register</h3>

                    <ol>

                        <li>Login to SPMP Portal</li>

                        <li>Select Course Registration</li>

                        <li>Choose available subjects</li>

                        <li>Confirm and submit</li>

                    </ol>

                `);

                return true;

            }


            if(followUpType === "what"){

                addAIMessage(`

                    <h3>📚 Semester Registration</h3>

                    <p>
                    Semester registration allows
                    students to register for their
                    subjects for the semester.
                    </p>

                `);

                return true;

            }

        }



        // FEES

        if(intent === "fees"){

            if(followUpType === "where"){

                addAIMessage(`

                    <h3>📍 Fee Payment</h3>

                    <p>
                    You can check and pay your
                    tuition fees through the
                    official payment system.
                    </p>

                `);

                return true;

            }


            if(followUpType === "requirements"){

                addAIMessage(`

                    <h3>📋 Fee Services</h3>

                    <ul>

                        <li>Fee checking</li>

                        <li>Payment confirmation</li>

                        <li>Receipt download</li>

                    </ul>

                `);

                return true;

            }


            if(followUpType === "how"){

                addAIMessage(`

                    <h3>💰 How to Pay Fees</h3>

                    <ol>

                        <li>Check your tuition fee</li>

                        <li>
                        Proceed to the official
                        payment system
                        </li>

                        <li>Complete the payment</li>

                        <li>Keep your receipt</li>

                    </ol>

                `);

                return true;

            }

        }



        // HOSTEL

        if(intent === "hostel"){

            if(followUpType === "requirements"){

                addAIMessage(`

                    <h3>📋 Hostel Requirements</h3>

                    <ul>

                        <li>Student information</li>

                        <li>Hostel application form</li>

                        <li>Supporting documents</li>

                    </ul>

                `);

                return true;

            }


            if(followUpType === "where"){

                addAIMessage(`

                    <h3>🏠 Hostel Application</h3>

                    <p>
                    Hostel applications are handled
                    through the Student Affairs Department.
                    </p>

                `);

                return true;

            }


            if(followUpType === "how"){

                addAIMessage(`

                    <h3>🏠 How to Apply for Hostel</h3>

                    <ol>

                        <li>
                        Prepare student information
                        </li>

                        <li>
                        Complete the hostel form
                        </li>

                        <li>
                        Prepare supporting documents
                        </li>

                        <li>
                        Submit the application
                        </li>

                    </ol>

                `);

                return true;

            }

        }



        // TRANSCRIPT

        if(intent === "transcript"){

            if(followUpType === "how"){

                addAIMessage(`

                    <h3>📄 How to Apply for Transcript</h3>

                    <ol>

                        <li>Login to student portal</li>

                        <li>
                        Select Transcript Application
                        </li>

                        <li>
                        Fill in required details
                        </li>

                        <li>Submit the request</li>

                    </ol>

                `);

                return true;

            }


            if(followUpType === "where"){

                addAIMessage(`

                    <h3>📍 Transcript Application</h3>

                    <p>
                    You can request your academic
                    transcript through the official
                    student portal.
                    </p>

                `);

                return true;

            }

        }



        // SPMP

        if(intent === "spmp"){

            if(followUpType === "what"){

                addAIMessage(`

                    <h3>💻 SPMP Portal</h3>

                    <p>
                    SPMP provides students access to:
                    </p>

                    <ul>

                        <li>Course registration</li>

                        <li>Academic results</li>

                        <li>Student information</li>

                        <li>Announcements</li>

                    </ul>

                `);

                return true;

            }

        }



        // CALENDAR

        if(intent === "calendar"){

            if(followUpType === "what"){

                addAIMessage(`

                    <h3>📅 Academic Calendar</h3>

                    <p>
                    The Academic Calendar contains
                    important academic dates.
                    </p>

                    <ul>

                        <li>Semester dates</li>

                        <li>Registration period</li>

                        <li>Exam schedule</li>

                        <li>Holiday dates</li>

                    </ul>

                `);

                return true;

            }

        }



        // LIBRARY

        if(intent === "library"){

            if(followUpType === "what"){

                addAIMessage(`

                    <h3>📖 Library Services</h3>

                    <p>
                    POLISAS Library provides students
                    with useful academic resources.
                    </p>

                    <ul>

                        <li>Book borrowing</li>

                        <li>Digital resources</li>

                        <li>Study facilities</li>

                    </ul>

                `);

                return true;

            }

        }

    }



    // ===================================
    // BAHASA MELAYU
    // ===================================

    if(language === "Bahasa Melayu"){

        if(intent === "registration"){

            if(followUpType === "where"){

                addAIMessage(`

                    <h3>📍 Tempat Pendaftaran</h3>

                    <p>
                    Anda boleh membuat pendaftaran
                    kursus melalui <b>Portal SPMP</b>.
                    </p>

                `);

                return true;

            }


            if(followUpType === "requirements"){

                addAIMessage(`

                    <h3>📋 Keperluan Pendaftaran</h3>

                    <ul>

                        <li>ID Pelajar</li>

                        <li>Maklumat akademik</li>

                        <li>Pilihan kursus</li>

                    </ul>

                `);

                return true;

            }


            if(followUpType === "how"){

                addAIMessage(`

                    <h3>📚 Cara Mendaftar</h3>

                    <ol>

                        <li>Log masuk ke Portal SPMP</li>

                        <li>Pilih Pendaftaran Kursus</li>

                        <li>Pilih subjek tersedia</li>

                        <li>Sahkan dan hantar</li>

                    </ol>

                `);

                return true;

            }

        }



        if(intent === "fees"){

            if(followUpType === "where"){

                addAIMessage(`

                    <h3>📍 Pembayaran Yuran</h3>

                    <p>
                    Anda boleh menyemak dan membayar
                    yuran melalui sistem pembayaran rasmi.
                    </p>

                `);

                return true;

            }


            if(followUpType === "how"){

                addAIMessage(`

                    <h3>💰 Cara Membayar Yuran</h3>

                    <ol>

                        <li>Semak jumlah yuran</li>

                        <li>
                        Pergi ke sistem pembayaran rasmi
                        </li>

                        <li>Lengkapkan pembayaran</li>

                        <li>Simpan resit pembayaran</li>

                    </ol>

                `);

                return true;

            }

        }



        if(intent === "hostel"){

            if(followUpType === "requirements"){

                addAIMessage(`

                    <h3>📋 Keperluan Asrama</h3>

                    <ul>

                        <li>Maklumat pelajar</li>

                        <li>Borang permohonan asrama</li>

                        <li>Dokumen sokongan</li>

                    </ul>

                `);

                return true;

            }


            if(followUpType === "where"){

                addAIMessage(`

                    <h3>🏠 Permohonan Asrama</h3>

                    <p>
                    Permohonan asrama dikendalikan
                    melalui Jabatan Hal Ehwal Pelajar.
                    </p>

                `);

                return true;

            }

        }



        if(intent === "transcript"){

            if(followUpType === "how"){

                addAIMessage(`

                    <h3>📄 Cara Memohon Transkrip</h3>

                    <ol>

                        <li>Log masuk ke portal pelajar</li>

                        <li>
                        Pilih Permohonan Transkrip
                        </li>

                        <li>
                        Isi maklumat yang diperlukan
                        </li>

                        <li>Hantar permohonan</li>

                    </ol>

                `);

                return true;

            }


            if(followUpType === "where"){

                addAIMessage(`

                    <h3>📍 Permohonan Transkrip</h3>

                    <p>
                    Anda boleh memohon transkrip
                    melalui portal pelajar rasmi.
                    </p>

                `);

                return true;

            }

        }



        if(intent === "spmp"){

            if(followUpType === "what"){

                addAIMessage(`

                    <h3>💻 Portal SPMP</h3>

                    <p>
                    SPMP menyediakan akses kepada:
                    </p>

                    <ul>

                        <li>Pendaftaran kursus</li>

                        <li>Keputusan akademik</li>

                        <li>Maklumat pelajar</li>

                        <li>Pengumuman</li>

                    </ul>

                `);

                return true;

            }

        }



        if(intent === "calendar"){

            if(followUpType === "what"){

                addAIMessage(`

                    <h3>📅 Kalendar Akademik</h3>

                    <p>
                    Kalendar Akademik mengandungi
                    tarikh-tarikh penting akademik.
                    </p>

                    <ul>

                        <li>Tarikh semester</li>

                        <li>Tempoh pendaftaran</li>

                        <li>Jadual peperiksaan</li>

                        <li>Tarikh cuti</li>

                    </ul>

                `);

                return true;

            }

        }



        if(intent === "library"){

            if(followUpType === "what"){

                addAIMessage(`

                    <h3>📖 Perkhidmatan Perpustakaan</h3>

                    <p>
                    Perpustakaan POLISAS menyediakan
                    sumber pembelajaran untuk pelajar.
                    </p>

                    <ul>

                        <li>Peminjaman buku</li>

                        <li>Sumber digital</li>

                        <li>Kemudahan belajar</li>

                    </ul>

                `);

                return true;

            }

        }

    }


    return false;

}



// =======================================
// MAIN SMART AI
// =======================================

function generateSmartAnswer(question){

    const language =
    getAILanguage();


    const text =
    cleanText(question);


    conversationContext.lastQuestion =
    question;

        



    // ===================================
    // GREETING
    // ===================================

    if(

        text === "hi" ||
        text === "hello" ||
        text === "hey" ||
        text === "hai" ||
        text === "helo"

    ){

        if(language === "Bahasa Melayu"){

            addAIMessage(
                "Hai 👋 Saya POLISAS AI Assistant. Apa yang anda ingin tahu?"
            );

        }

        else{

            addAIMessage(
                "Hello 👋 I'm POLISAS AI Assistant. What would you like to know?"
            );

        }

        return;

    }



    // ===================================
    // DETECT INTENT
    // ===================================

    let intent =
    detectIntentV5(text);


    // Use previous topic if this is
    // a follow-up question

    if(!intent){

        intent =
        conversationContext.topic;

    }



    // ===================================
    // FOLLOW-UP QUESTION
    // ===================================

    const followUpType =
    detectFollowUpIntent(text);


    if(
        followUpType &&
        conversationContext.topic
    ){

        const handled =
        answerFollowUp(
            conversationContext.topic,
            followUpType,
            language
        );


        if(handled){

            return;

        }

    }



   
    // ===================================
    // NO INTENT — OFFER STUDENT ENQUIRY
    // ===================================

    if (!intent) {

        const isMalay = language === "Bahasa Melayu";

        const message = isMalay
            ? `Maaf, saya tidak dapat mencari jawapan yang sesuai untuk soalan anda.

               <br><br>
               Anda boleh menghantar pertanyaan kepada staf kaunter POLISAS.`
            : `Sorry, I couldn't find a suitable answer to your question.

               <br><br>
               You can submit an enquiry to POLISAS counter staff for further assistance.`;

        addAIMessage(`
            ${message}

            <br>
            <button
                type="button"
                class="chat-enquiry-btn"
                onclick="openEnquiryForm()">
                <i class="fa-solid fa-file-pen"></i>
                ${isMalay ? "Hantar Pertanyaan" : "Submit an Enquiry"}
            </button>

            <br><br>
            <small>
                ${isMalay
                    ? "Atau cuba tanya tentang pendaftaran, yuran, asrama atau SPMP."
                    : "You can also ask about registration, fees, hostel or SPMP."}
            </small>
        `);

        return;
    


    }



    // ===================================
    // SAVE CONTEXT
    // ===================================

    conversationContext.topic =
    intent;

    conversationContext.lastIntent =
    intent;



    // ===================================
    // FIND DATABASE ITEM
    // ===================================

    const data =
    informationDatabase.find(
        item =>
        item.id === intent
    );


    if(!data){

        genericIntentResponse(
            intent,
            language
        );

        return;

    }



    // ===================================
    // QUESTION TYPE
    // ===================================

    const questionType =
    detectQuestionType(text);



    // ===================================
    // GENERATE ANSWER
    // ===================================

    generateContextualResponse(
        intent,
        questionType,
        data,
        language
    );

}



// =======================================
// CONTEXTUAL RESPONSE
// =======================================

function generateContextualResponse(
    intent,
    questionType,
    data,
    language
){

    if(language === "English"){

        // REGISTRATION

        if(intent === "registration"){

            addAIMessage(`

                <h3>📚 Semester Registration</h3>

                <p>
                Students must complete semester
                registration through the SPMP Portal.
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

            `);

            return;

        }



        // FEES

        if(intent === "fees"){

            addAIMessage(`

                <h3>💰 Student Fees</h3>

                <p>
                Students can check and pay tuition
                fees through the official payment system.
                </p>

                <br>

                <b>Available Services:</b>

                <ul>

                    <li>Fee checking</li>

                    <li>Payment confirmation</li>

                    <li>Receipt download</li>

                </ul>

            `);

            return;

        }



        // HOSTEL

        if(intent === "hostel"){

            addAIMessage(`

                <h3>🏠 Hostel</h3>

                <p>
                Students can apply for hostel
                accommodation through the
                Student Affairs Department.
                </p>

                <br>

                <b>Required Documents:</b>

                <ul>

                    <li>Student information</li>

                    <li>Hostel application form</li>

                    <li>Supporting documents</li>

                </ul>

            `);

            return;

        }



        // TRANSCRIPT

        if(intent === "transcript"){

            addAIMessage(`

                <h3>📄 Academic Transcript</h3>

                <p>
                Students can request an academic
                transcript through the official
                student portal.
                </p>

                <br>

                <b>Process:</b>

                <ol>

                    <li>Login to student portal</li>

                    <li>
                    Select Transcript Application
                    </li>

                    <li>
                    Fill in the required details
                    </li>

                    <li>Submit the request</li>

                </ol>

            `);

            return;

        }



        // OTHER TOPICS

        addAIMessage(`

            <h3>${data.title}</h3>

            ${data.answer}

            <br>

            <small>
            💡 You can ask a follow-up question
            such as "What?", "How?", or "Where?"
            </small>

        `);

        return;

    }



    // ===================================
    // BAHASA MELAYU
    // ===================================

    if(language === "Bahasa Melayu"){

        if(intent === "registration"){

            addAIMessage(`

                <h3>📚 Pendaftaran Semester</h3>

                <p>
                Pelajar perlu melengkapkan pendaftaran
                semester melalui Portal SPMP.
                </p>

                <br>

                <b>Langkah-langkah:</b>

                <ol>

                    <li>Log masuk ke Portal SPMP</li>

                    <li>Pilih Pendaftaran Kursus</li>

                    <li>Pilih subjek yang tersedia</li>

                    <li>Sahkan dan hantar</li>

                </ol>

            `);

            return;

        }



        if(intent === "fees"){

            addAIMessage(`

                <h3>💰 Yuran Pelajar</h3>

                <p>
                Pelajar boleh menyemak dan membayar
                yuran pengajian melalui sistem
                pembayaran rasmi.
                </p>

                <br>

                <b>Perkhidmatan:</b>

                <ul>

                    <li>Semakan yuran</li>

                    <li>Pengesahan pembayaran</li>

                    <li>Muat turun resit</li>

                </ul>

            `);

            return;

        }



        if(intent === "hostel"){

            addAIMessage(`

                <h3>🏠 Asrama</h3>

                <p>
                Pelajar boleh memohon penginapan
                asrama melalui Jabatan Hal Ehwal Pelajar.
                </p>

                <br>

                <b>Dokumen diperlukan:</b>

                <ul>

                    <li>Maklumat pelajar</li>

                    <li>Borang permohonan asrama</li>

                    <li>Dokumen sokongan</li>

                </ul>

            `);

            return;

        }



        if(intent === "transcript"){

            addAIMessage(`

                <h3>📄 Transkrip Akademik</h3>

                <p>
                Pelajar boleh memohon transkrip akademik
                melalui portal pelajar rasmi.
                </p>

                <br>

                <b>Proses:</b>

                <ol>

                    <li>Log masuk ke portal pelajar</li>

                    <li>
                    Pilih Permohonan Transkrip
                    </li>

                    <li>
                    Isi maklumat yang diperlukan
                    </li>

                    <li>Hantar permohonan</li>

                </ol>

            `);

            return;

        }



        // OTHER TOPICS

        addAIMessage(`

            <h3>${data.title}</h3>

            ${data.answer}

            <br>

            <small>
            💡 Anda boleh bertanya soalan susulan.
            </small>

        `);

    }

}



// =======================================
// GENERIC INTENT RESPONSE
// =======================================

function genericIntentResponse(
    intent,
    language
){

    const messages = {

        English:{

            registration:
            "I can help you with semester registration through the SPMP Portal.",

            fees:
            "I can help you with student fees and payment information.",

            hostel:
            "I can help you with hostel application information.",

            transcript:
            "I can help you with academic transcript information.",

            spmp:
            "I can help you with information about the SPMP Portal.",

            calendar:
            "I can help you with the Academic Calendar.",

            library:
            "I can help you with POLISAS Library services."

        },


        "Bahasa Melayu":{

            registration:
            "Saya boleh membantu anda dengan maklumat pendaftaran semester melalui Portal SPMP.",

            fees:
            "Saya boleh membantu anda dengan maklumat yuran dan pembayaran.",

            hostel:
            "Saya boleh membantu anda dengan maklumat permohonan asrama.",

            transcript:
            "Saya boleh membantu anda dengan maklumat transkrip akademik.",

            spmp:
            "Saya boleh membantu anda dengan maklumat Portal SPMP.",

            calendar:
            "Saya boleh membantu anda dengan Kalendar Akademik.",

            library:
            "Saya boleh membantu anda dengan perkhidmatan Perpustakaan POLISAS."

        }

    };


    if(
        messages[language] &&
        messages[language][intent]
    ){

        addAIMessage(
            messages[language][intent]
        );
        

    }

}

    // =======================================
// V10 — COUNTER QUEUE / BOOKING SYSTEM
// =======================================

function initializeBookingSystem() {

    const bookBtn =
        document.getElementById("bookCounterBtn");

    const bookingService =
        document.getElementById("bookingService");

    const bookingDate =
        document.getElementById("bookingDate");

    const bookingTime =
        document.getElementById("bookingTime");

    const bookingResult =
        document.getElementById("bookingResult");

    const bookingError =
        document.getElementById("bookingError");


    // Load existing booking
    loadBooking();


    // Book appointment
    if (bookBtn) {

        bookBtn.addEventListener("click", function () {

            const service =
                bookingService.value;

            const date =
                bookingDate.value;

            const time =
                bookingTime.value;


            // Validation
            if (!service || !date || !time) {

                bookingError.textContent =
                    "⚠️ Please select a service, date and time.";

                return;

            }


            bookingError.textContent = "";


            // Generate queue number
            const queueNumber =
                generateQueueNumber();


            // Create booking
            const booking = {

                queueNumber: queueNumber,

                service: service,

                date: date,

                time: time,

                status: "Confirmed",

                position:
                    Math.floor(Math.random() * 5) + 1

            };


            // Save booking
            localStorage.setItem(
                "polisasBooking",
                JSON.stringify(booking)
            );


            // Display booking
            displayBooking(booking);

        });

    }

}


// Run booking system
if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeBookingSystem
    );

}
else {

    initializeBookingSystem();

}

// =======================================
// GENERATE QUEUE NUMBER
// =======================================

function generateQueueNumber(){

    let queueNumber;

    do{

        const randomNumber =
            Math.floor(
                Math.random() * 900
            ) + 100;

        queueNumber =
            "A" + randomNumber;

    }
    while(
        localStorage.getItem("lastQueueNumber")
        === queueNumber
    );


    localStorage.setItem(
        "lastQueueNumber",
        queueNumber
    );


    return queueNumber;

}


// =======================================
// DISPLAY BOOKING
// =======================================

function displayBooking(booking) {

    const bookingResult =
        document.getElementById(
            "bookingResult"
        );


    if (!bookingResult) {

        return;

    }


    bookingResult.innerHTML = `

        <div class="active-booking">

            <div class="booking-icon">
                🎫
            </div>


            <h3>
                YOUR BOOKING
            </h3>


            <div class="queue-number">

                ${booking.queueNumber}

                <span>
                    Queue Number
                </span>

            </div>


            <div class="booking-details">

                <p>
                    📚
                    <b>Service:</b>
                    ${booking.service}
                </p>


                <p>
                    📅
                    <b>Date:</b>
                    ${formatBookingDate(
                        booking.date
                    )}
                </p>


                <p>
                    🕐
                    <b>Time:</b>
                    ${booking.time}
                </p>


                <p>
                    📍
                    <b>Position:</b>
                    ${booking.position}
                </p>

            </div>


            <div class="booking-status">

                🟢
                Status:
                <b>${booking.status}</b>

            </div>


            <button
                class="cancel-booking-btn"
                onclick="cancelBooking()"
            >

                ❌ Cancel Booking

            </button>

        </div>

    `;

}


// =======================================
// LOAD BOOKING
// =======================================

function loadBooking() {

    const savedBooking =
        localStorage.getItem(
            "polisasBooking"
        );


    if (!savedBooking) {

        return;

    }


    try {

        const booking =
            JSON.parse(savedBooking);


        displayBooking(booking);

    }

    catch (error) {

        console.log(
            "Unable to load booking."
        );

    }

}


// =======================================
// CANCEL BOOKING
// =======================================

function cancelBooking() {

    const confirmCancel =
        confirm(
            "Are you sure you want to cancel your booking?"
        );


    if (!confirmCancel) {

        return;

    }


    localStorage.removeItem(
        "polisasBooking"
    );


    const bookingResult =
        document.getElementById(
            "bookingResult"
        );


    if (bookingResult) {

        bookingResult.innerHTML = `

            <div class="booking-placeholder">

                <span>
                    🎫
                </span>

                <h3>
                    No Active Booking
                </h3>

                <p>
                    Your booking information
                    will appear here.
                </p>

            </div>

        `;

    }

}


// =======================================
// FORMAT DATE
// =======================================

function formatBookingDate(date) {

    if (!date) {

        return "";

    }


    const dateObject =
        new Date(
            date + "T00:00:00"
        );


    return dateObject.toLocaleDateString(
        "en-MY",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

    
}

// =======================================
// LATEST ANNOUNCEMENT MARQUEE
// CONTINUOUS RIGHT → LEFT
// =======================================

function initializeAnnouncement() {

    const announcement =
        document.querySelector(".announcement");

    if (!announcement) {
        return;
    }

    // Prevent duplicate initialization
    if (announcement.querySelector(".announcement-track")) {
        return;
    }

    const originalContent = announcement.innerHTML;

    const track = document.createElement("div");
    track.className = "announcement-track";

    const content1 = document.createElement("div");
    content1.className = "announcement-content";
    content1.innerHTML = originalContent;

    const content2 = document.createElement("div");
    content2.className = "announcement-content";
    content2.innerHTML = originalContent;

    track.appendChild(content1);
    track.appendChild(content2);

    announcement.innerHTML = "";
    announcement.appendChild(track);
}


// =======================================
// START ANNOUNCEMENT
// =======================================

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeAnnouncement
    );

} else {

    initializeAnnouncement();

}


// =======================================
// STUDENT ENQUIRY FORM
// =======================================

// Replace this with your deployed Google Apps Script URL.
const ENQUIRY_SCRIPT_URL =
    "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";


// =======================================
// OPEN STUDENT ENQUIRY FORM
// =======================================

function openEnquiryForm() {

    const panel =
        document.getElementById("enquiryPanel");

    const questionField =
        document.getElementById("enquiryQuestion");

    const form =
        document.getElementById("enquiryForm");

    const confirmation =
        document.getElementById("enquiryConfirmation");

    if (!panel) {
        alert("Enquiry form not found. Please check your HTML.");
        return;
    }

    // Automatically fill in the student's latest question
    if (questionField) {
        questionField.value =
            conversationContext.lastQuestion || "";
    }

    if (form) {
        form.hidden = false;
    }

    if (confirmation) {
        confirmation.hidden = true;
    }

    panel.hidden = false;

    panel.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// =======================================
// RETURN TO CHAT
// =======================================

function returnToChat() {

    const panel =
        document.getElementById("enquiryPanel");

    if (panel) {
        panel.hidden = true;
    }

    if (chatWindow) {
        chatWindow.style.display = "block";
    }

    if (chatInput) {
        chatInput.focus();
    }
}


// =======================================
// CANCEL ENQUIRY
// =======================================

const cancelEnquiry =
    document.getElementById("cancelEnquiry");

if (cancelEnquiry) {

    cancelEnquiry.addEventListener(
        "click",
        returnToChat
    );

}


// =======================================
// SUBMIT ANOTHER ENQUIRY
// =======================================

const newEnquiry =
    document.getElementById("newEnquiry");

if (newEnquiry) {

    newEnquiry.addEventListener("click", function () {

        const form =
            document.getElementById("enquiryForm");

        const confirmation =
            document.getElementById("enquiryConfirmation");

        if (form) {
            form.reset();
            form.hidden = false;
        }

        if (confirmation) {
            confirmation.hidden = true;
        }

    });

}



 // =======================================
 // SUBMIT ENQUIRY FORM — DEMO ONLY
 // =======================================

const enquiryForm =
    document.getElementById("enquiryForm");

if (enquiryForm) {

    enquiryForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document.getElementById("enquiryName").value.trim();

            const id =
                document.getElementById("enquiryStudentID").value.trim();

            const topic =
                document.getElementById("enquiryTopic").value;

            const question =
                document.getElementById("enquiryQuestion").value.trim();

            const submitButton =
                enquiryForm.querySelector('[type="submit"]');

            const enquiryStatus = document.getElementById("enquiryStatus");

if (enquiryStatus) {
    enquiryStatus.dataset.messageType = "required";
    enquiryStatus.textContent =
        translations[getCurrentLanguage()].enquiryRequired;
}

            // CHECK REQUIRED FIELDS
            if (!name || !id || !topic || !question) {
                alert("Please complete all required fields.");
                return;
            }

            // SHOW SUBMITTING STATUS
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Submitting...";
            }

            // DEMO SUBMISSION
            setTimeout(function () {

                if (status) {
                    status.textContent =
                        "Thank you, " + name +
                        "! Your enquiry has been submitted successfully " +
                        "It has been sent to POLISAS staff.";
                } else {
                    alert(
                        "Thank you, " + name +
                        "! Your enquiry has been submitted ."
                    );
                }

                // RESET BUTTON
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = "Submit Enquiry";
                }

                // OPTIONAL: CLEAR FORM AFTER DEMO SUBMISSION
                enquiryForm.reset();

            }, 700);

        }
    );

}



// =======================================
// STUDENT ENQUIRY QUICK ACCESS CARD
// =======================================

const studentEnquiryCard =
    document.getElementById("studentEnquiryCard");

if (studentEnquiryCard) {

    studentEnquiryCard.addEventListener(
        "click",
        function (event) {

            // Prevent the normal Quick Access search handler
            // from handling this card.
            event.stopPropagation();

            openEnquiryForm();

        }
    );

    
// =======================================
// CLOSE AI CHATBOT USING X BUTTON
// =======================================

const closeChatButton = document.getElementById("closeChat");
const chatWindow = document.getElementById("chatWindow");

if (closeChatButton && chatWindow) {

    closeChatButton.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        chatWindow.classList.remove("active");
        chatWindow.style.display = "none";

    });

}


}


