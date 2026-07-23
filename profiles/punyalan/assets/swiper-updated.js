
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize all swipers
            const swipers = {};

function initIfNeeded(tabId) {
    if (swipers[tabId]) return;

    if (tabId === 'worksSwiper1') {
        swipers[tabId] = initSwiper('.worksSwiper1', '.worksSwiper1-button-prev', '.worksSwiper1-button-next');
    }
    if (tabId === 'worksSwiper2') {
        swipers[tabId] = initSwiper('.worksSwiper2', '.worksSwiper2-button-prev', '.worksSwiper2-button-next');
    }
    if (tabId === 'worksSwiper3') {
        swipers[tabId] = initSwiper('.worksSwiper3', '.worksSwiper3-button-prev', '.worksSwiper3-button-next');
    }
}
            // const swipers = {
            //     minimalist: initSwiper('.workstSwiper1', '.worksSwiper-button-prev', '.worksSwiper-button-next'),
            //     typography: initSwiper('.typographySwiper', '.typographySwiper-button-prev', '.typographySwiper-button-next'),
            //     vintage: initSwiper('.vintageSwiper', '.vintageSwiper-button-prev', '.vintageSwiper-button-next'),
            //     abstract: initSwiper('.abstractSwiper', '.abstractSwiper-button-prev', '.abstractSwiper-button-next'),
            //     photographic: initSwiper('.photographicSwiper', '.photographicSwiper-button-prev', '.photographicSwiper-button-next'),
            //     clientSwiper: initSwiperAutoPlay('.clientSwiper', '.clientSwiper-button-prev', '.clientSwiper-button-next')
            // };

            // Tab functionality
            const tabButtons = document.querySelectorAll('.tab-btn');
            tabButtons.forEach(button => {
                button.addEventListener('click', function () {
    tabButtons.forEach(btn => btn.classList.remove('active', 'bg-green-600', 'text-white'));
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    this.classList.add('active', 'bg-green-600', 'text-white');
    const tabId = this.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');

    // INIT ONLY WHEN NEEDED
    initIfNeeded(tabId);

    // FIX POSITION AFTER SHOW
    setTimeout(() => {
        swipers[tabId].update();
        swipers[tabId].slideToLoop(0, 0); // 🔥 important fix
    }, 100);
});
            });

            // Function to initialize swiper with navigation
            function initSwiper(swiperClass, prevButton, nextButton) {
    return new Swiper(swiperClass, {
        slidesPerView: 1,
        spaceBetween: 20,
        // centeredSlides: false, // ❌ change this
        centeredSlides: false, // ❌ change this
        loop: true,
        loopAdditionalSlides: 3, // ✅ improves loop stability
        observer: true,
        observeParents: true,
        speed: 800,

        navigation: {
            nextEl: nextButton,
            prevEl: prevButton,
        },

        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });
}
            // slies per view 3 swiper auto play, pagination
            function initSwiperAutoPlay(swiperClass, prevButton, nextButton) {
                return new Swiper(swiperClass, {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    centeredSlides: false,
                    loop: true,
                    speed: 800,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                    navigation: {
                        nextEl: nextButton,
                        prevEl: prevButton,
                    },
                    breakpoints: {
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        }
                    }
                });
            }
            // swipers.forEach(swiper => {
            //     swiper.update();
            // }); 
            // Object.keys(swipers).forEach(key => {
            //     const value = swipers[key];
            //     value();
            // });
            // initSwiper('.worksSwiper1', '.worksSwiper1-button-prev', '.worksSwiper1-button-next');
            // initSwiper('.worksSwiper2', '.worksSwiper2-button-prev', '.worksSwiper2-button-next');
            // initSwiper('.worksSwiper3', '.worksSwiper3-button-prev', '.worksSwiper3-button-next');
            initIfNeeded('worksSwiper1');
        });
document.addEventListener("DOMContentLoaded", function() {
    
})