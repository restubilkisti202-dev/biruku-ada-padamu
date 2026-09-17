/* =========================================
   ELEMENT
========================================= */

const nextButton =
    document.getElementById("nextButton");

const opening =
    document.getElementById("opening");

const bookTransition =
    document.getElementById("bookTransition");

const poemPage =
    document.getElementById("poemPage");

const bgMusic =
    document.getElementById("bgMusic");

const musicButton =
    document.getElementById("musicButton");


/* =========================================
   LOCK SCROLL SAAT OPENING
========================================= */

document.body.classList.add("locked");


/* =========================================
   NEXT BUTTON
========================================= */

nextButton.addEventListener("click", async function () {

    /*
        MUSIK DIMULAI DI SINI.

        Karena user baru saja menekan tombol,
        browser HP mengizinkan audio dimainkan.
    */

    bgMusic.volume = 0.55;

    try {

        await bgMusic.play();

        musicButton.classList.add("active");

    } catch (error) {

        console.log(
            "Musik tidak dapat dimainkan:",
            error
        );

        musicButton.classList.add("active");
        musicButton.classList.add("muted");

    }


    /*
        HILANGKAN OPENING
    */

    opening.classList.add("hide");


    /*
        JALANKAN ANIMASI BUKU
    */

    bookTransition.classList.add("active");


    /*
        SETELAH ANIMASI SELESAI,
        TAMPILKAN PUISI
    */

    setTimeout(function () {

        bookTransition.classList.remove("active");

        poemPage.classList.add("visible");

        document.body.classList.remove("locked");

        window.scrollTo(0, 0);

    }, 1700);

});


/* =========================================
   TOMBOL MUSIK
========================================= */

musicButton.addEventListener("click", async function () {

    if (bgMusic.paused) {

        try {

            await bgMusic.play();

            musicButton.classList.remove("muted");

        } catch (error) {

            console.log(
                "Musik tidak dapat dimainkan:",
                error
            );

        }

    } else {

        bgMusic.pause();

        musicButton.classList.add("muted");

    }

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".poem p, .memory"
    );


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "revealed"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(function (element) {

    observer.observe(element);

});