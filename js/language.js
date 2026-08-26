// =======================================
// POLISAS SICMS LANGUAGE SYSTEM
// English ↔ Bahasa Melayu
// =======================================


// =======================================
// TRANSLATION DATABASE
// =======================================

const translations = {

    English: {

        welcomeTitle: "Welcome Back 👋",
        searchTitle: "Search Information",
        searchPlaceholder: "Search anything...",
        quickAccessTitle: "Quick Access",
        announcementTitle: "Latest Announcement",

        registration: "Registration",
        transcript: "Transcript",
        hostel: "Hostel",
        fees: "Fees",
        calendar: "Academic Calendar",
        library: "Library",

        announcement:
        `
        📢 Registration opens on 5 August
        <br>
        🎓 Convocation registration is now available
        <br>
        💰 Scholarship application is open
        `,

        searchStart:
        "Start searching information..."

    },


    "Bahasa Melayu": {

        welcomeTitle: "Selamat Datang 👋",
        searchTitle: "Cari Maklumat",
        searchPlaceholder: "Cari apa sahaja...",
        quickAccessTitle: "Akses Pantas",
        announcementTitle: "Pengumuman Terkini",

        registration: "Pendaftaran",
        transcript: "Transkrip",
        hostel: "Asrama",
        fees: "Yuran",
        calendar: "Kalendar Akademik",
        library: "Perpustakaan",

        announcement:
        `
        📢 Pendaftaran dibuka pada 5 Ogos
        <br>
        🎓 Pendaftaran konvokesyen kini dibuka
        <br>
        💰 Permohonan biasiswa kini dibuka
        `,

        searchStart:
        "Mula mencari maklumat..."

    }

};



// =======================================
// LANGUAGE SELECTOR
// =======================================

const languageSelector =
document.getElementById("language");



// =======================================
// CHANGE LANGUAGE
// =======================================

function changeLanguage(language) {


    const selected =
    translations[language];


    if(!selected) return;



    // Welcome

    const welcomeTitle =
    document.getElementById("welcomeTitle");

    if(welcomeTitle){

        welcomeTitle.innerHTML =
        selected.welcomeTitle;

    }



    // Search title

    const searchTitle =
    document.getElementById("searchTitle");

    if(searchTitle){

        searchTitle.innerHTML =
        selected.searchTitle;

    }



    // Search placeholder

    const searchInput =
    document.getElementById("searchInput");

    if(searchInput){

        searchInput.placeholder =
        selected.searchPlaceholder;

    }



    // Quick Access

    const quickAccessTitle =
    document.getElementById("quickAccessTitle");

    if(quickAccessTitle){

        quickAccessTitle.innerHTML =
        selected.quickAccessTitle;

    }



    // Announcement title

    const announcementTitle =
    document.getElementById("announcementTitle");

    if(announcementTitle){

        announcementTitle.innerHTML =
        selected.announcementTitle;

    }



    // Quick Access cards

    const cards =
    document.querySelectorAll(".card");


    cards.forEach(card => {

        const keyword =
        card.getAttribute("data-search");


        const heading =
        card.querySelector("h3");


        if(!heading) return;



        if(keyword === "registration"){

            heading.innerHTML =
            selected.registration;

        }


        else if(keyword === "transcript"){

            heading.innerHTML =
            selected.transcript;

        }


        else if(keyword === "hostel"){

            heading.innerHTML =
            selected.hostel;

        }


        else if(keyword === "fees"){

            heading.innerHTML =
            selected.fees;

        }


        else if(keyword === "calendar"){

            heading.innerHTML =
            selected.calendar;

        }


        else if(keyword === "library"){

            heading.innerHTML =
            selected.library;

        }

    });



    // Announcement

    const announcementContent =
    document.getElementById("announcementContent");


    if(announcementContent){

        announcementContent.innerHTML =
        selected.announcement;

    }



    // Save language

    localStorage.setItem(
        "selectedLanguage",
        language
    );

}



// =======================================
// LANGUAGE DROPDOWN EVENT
// =======================================

if(languageSelector){

    languageSelector.addEventListener(
        "change",
        function(){

            changeLanguage(
                this.value
            );

        }
    );

}



// =======================================
// LOAD SAVED LANGUAGE
// =======================================

const savedLanguage =
localStorage.getItem(
    "selectedLanguage"
);


if(savedLanguage && languageSelector){

    languageSelector.value =
    savedLanguage;

    changeLanguage(
        savedLanguage
    );


    // =======================================
// GET CURRENT LANGUAGE
// =======================================

function getCurrentLanguage(){

    return localStorage.getItem(
        "selectedLanguage"
    ) || "English";

}

}