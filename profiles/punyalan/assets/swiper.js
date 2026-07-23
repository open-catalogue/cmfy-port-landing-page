
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize all swipers
            const swipers = {
                worksSwiper1: initSwiper('.worksSwiper1', '.worksSwiper1-button-prev', '.worksSwiper1-button-next'),
                worksSwiper2: initSwiper('.worksSwiper2', '.worksSwiper2-button-prev', '.worksSwiper2-button-next'),
                worksSwiper3: initSwiper('.worksSwiper3', '.worksSwiper3-button-prev', '.worksSwiper3-button-next'),
                abstract: initSwiper('.worksSwiper4', '.worksSwiper4-button-prev', '.worksSwiper4-button-next'),
                photographic: initSwiper('.worksSwiper5', '.worksSwiper5-button-prev', '.worksSwiper5-button-next'),
                clientSwiper: initSwiperAutoPlay('.clientSwiper', '.clientSwiper-button-prev', '.clientSwiper-button-next')
            };
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
                button.addEventListener('click', function() {
                    // Remove active class from all buttons and tab contents
                    tabButtons.forEach(btn => btn.classList.remove('active', 'bg-green-400', 'text-white'));
                    document.querySelectorAll('.tab-content').forEach(content => {
                        content.classList.remove('active');
                    });

                    // Add active class to clicked button and corresponding content
                    this.classList.add('active', 'bg-green-400', 'text-white');
                    const tabId = this.getAttribute('data-tab');
                    document.getElementById(tabId).classList.add('active');

                    // Update the swiper when tab changes
                    console.log('Updating swiper for tab:', tabId);
                    swipers[tabId].update();
                });
            });

            // Function to initialize swiper with navigation
            function initSwiper(swiperClass, prevButton, nextButton) {
                return new Swiper(swiperClass, {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    centeredSlides: true,
                    loop: true,
                    observer: true,
                    observeParents: true,
                    speed: 800,
                    // autoplay: {
                    //     delay: 3000,
                    //     disableOnInteraction: false,
                    // },
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
        });
document.addEventListener("DOMContentLoaded", function() {
    
})