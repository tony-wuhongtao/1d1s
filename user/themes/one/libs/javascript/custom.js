(function ($) {
    "use strict";

    jQuery(document).on('ready', function () {


        function initNav() {
            /***MENU TOGGLE ANIMATION***/
            $('div.toggle-normal').on('click', function () {
                $('i.top-bar').toggleClass('top-transform');
                $('i.middle-bar').toggleClass('middle-transform');
                $('i.bottom-bar').toggleClass('bottom-transform');
            });


            /***MENU CLOSE***/
            $('.section,div#menu-options a').on('click', function () {
                $('nav#theMenu').removeClass('menu-open');
                $('i.top-bar').removeClass('top-transform');
                $('i.middle-bar').removeClass('middle-transform');
                $('i.bottom-bar').removeClass('bottom-transform');
            });

            /***MENU OPEN***/
            $('div#menuToggle').on('click', function () {
                $('div#menuToggle').toggleClass('active');
                $('body').toggleClass('body-push-toright');
                $('nav#theMenu').toggleClass('menu-open');
            });
        }

        function initSmoothScroll() {
            /***SMOOTH SCROLL***/
            $('div#menu-options,div#about-btn').find('a[href*=#]:not([href=#])').on('click', function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 900, "swing");
                        return false;
                    }
                }
            });
        }


        function initScrollToTop() {
            /***SCROLL TO TOP***/
            $(window).on('scroll', function () {
                if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
                    $('div#scrollup').addClass('animated flipInY').fadeIn(200);    // Fade in the arrow
                } else {
                    $('div#scrollup').fadeOut(200);
                }
            });

            $('div#scrollup').on('click', function () {
                $("html,body").animate({
                    scrollTop: 0
                }, 600);

                return false;
            });
        }

        function initPortfolio() {

            /***PORTFOLIO GALLERY***/
            var all = '#a,#b,#c';
            var afterFirst = '#b,#c';
            var addButton = '#add-more';
            var addButtonIcon = '#port-add-icon';
            var otherOption = 'a.cate';
            var allOption = 'a#all-sample';

            $(afterFirst).addClass('hide');
            $(addButton).addClass('x');

            $(allOption).on('click', function () {
                $(addButton).removeClass('hide').addClass('x');
                $(all).removeClass('tab-pane');
                $(afterFirst).addClass('hide');
                $(addButtonIcon).addClass('fa-plus').removeClass('fa-arrow-up');
            });
            $(otherOption).on('click', function () {
                $(addButton).addClass('hide x');
                $(afterFirst).removeClass('hide');
                $(all).addClass('tab-pane');
                $(addButtonIcon).addClass('fa-plus').removeClass('fa-arrow-up');
            });
            $(addButton).on('click', function () {
                if ($(addButton).hasClass('x')) {
                    $(all).removeClass('tab-pane hide');
                    $(addButton).removeClass('x');
                    $(addButtonIcon).removeClass('fa-plus').addClass('fa-arrow-up');
                } else {
                    $(afterFirst).addClass('hide');
                    $(addButton).addClass('x');
                    $(addButtonIcon).addClass('fa-plus').removeClass('fa-arrow-up');
                }
            });

            /***PORTFOLIO ANIMATION***/
            $('li.list-shuffle,#add-more').on('click', function () {
                $("div.inLeft")
                    .removeClass('InLeft')
                    .hide()
                    .addClass('InLeft')
                    .show();
                $("div.inRight")
                    .removeClass('InRight')
                    .hide()
                    .addClass('InRight')
                    .show();
            });

            /***MAGNIFIC POPUP***/
            $('.popup-image').magnificPopup({
                type: 'image',
                removalDelay: 160, //delay removal by X to allow out-animation
                callbacks: {
                    beforeOpen: function () {
                        // just a hack that adds mfp-anim class to markup
                        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                        this.st.mainClass = this.st.el.attr('data-effect');
                    }
                },
                closeOnContentClick: true,
                midClick: true
            });
            /***MAGNIFICENT POPUP VIDEO***/
            $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        }

        function initSkills() {
            /***SKILLS***/
            $('div.skillbar').each(function () {
                $(this).find('div.skillbar-bar').css({
                    width: $(this).attr('data-percent')
                });
            });
        }

        function initClientsSliders() {

            /***CLIENTS LOGO SLIDER***/
            var $clientcarousel = $('ul#clients-list');
            var clients = $clientcarousel.children().length;
            var clientwidth = (clients * 140); // 140px width for each client item
            $clientcarousel.css('width', clientwidth);

            var rotating = true;
            var clientspeed = 1800;
            setInterval(rotateClients, clientspeed);

            $(document).on({
                mouseenter: function () {
                    rotating = false;
                    // Turn off rotation when hovering
                },
                mouseleave: function () {
                    rotating = true;
                }
            }, '#clients');

            function rotateClients() {
                if (rotating !== false) {
                    var $first = $('ul#clients-list').find('li:first');
                    $first.animate({'margin-left': '-140px'}, 2000, function () {
                        $first.remove().css({'margin-left': '0px'});
                        $('ul#clients-list').find('li:last').after($first);
                    });
                }
            }


            /***CLIENTS QUOTE SLIDER***/
            var swiper =  new Swiper('.swiper-container-clients', {
                pagination: '.swiper-pagination-clients',
                a11y: true,
                keyboardControl: true,
                autoHeight: true,
                speed: 800,
                paginationClickable: true
            });

        }


        function initVideoPlayAndClose() {
            /***VIDEO PLAY BUTTON***/
            $('#html-video').addClass('hidden');

            
            // var isMobile = false;
            // if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
            //     || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

            $('#play-btn').on('click', function () {
                //var htmlVideo = '#html-video';
                var vCard = '#v-card';
                var playButtonHolder = '#button-holder';
                var playIcon = '#icon-play';
                $(playButtonHolder).addClass('middle');
                setTimeout(function () {
                    $(vCard).addClass('hide-overflow');
                    $('body').addClass('scale-effect');
                    $(vCard).addClass('height-change');
                }, 600);
                setTimeout(function () {
                    $(playIcon).hide();
                    $('#html-video').removeClass('hidden');
                    // htmlVideoEmbed.j2s_resumeVideo();
                    $('#play-btn').addClass('black');
                }, 1000);
                setTimeout(function () {
                    var vcardHeight = $('#v-card').height();
                    var videoHeight = $('#html-video').height();

                    var marginTop = 0;
                    if(vcardHeight > videoHeight)
                    {
                        var marginTop = (vcardHeight-videoHeight)/2;
                    }
                    $('#html-video').css({ top: marginTop+'px'});
                }, 2000);
                setTimeout(function () {
                    resume();
                }, 3000);

            });

            /***VIDEO CLOSE BUTTON***/
            $('#close-btn').on('click', function () {
                // var htmlVideo = $('#html-video');
                var vCard = '#v-card';
                var playButtonHolder = '#button-holder';
                var playIcon = '#icon-play';
                $('body').removeClass('scale-effect');
                pause();
                setTimeout(function () {
                    $(playIcon).show();
                    $(playButtonHolder).removeClass('middle');
                    $(vCard).removeClass('hide-overflow');
                }, 1000);
                $(vCard).removeClass('height-change');
                $('#html-video').addClass('hidden');
                //$(htmlVideo)[0].pause();
                $('#play-btn').removeClass('black');
            });
        }

        function initMapsNormal() {
            var mapOptions = {
                zoom: 17,
                center: new google.maps.LatLng(51.5287352, -0.3817831),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                disableDefaultUI: false
            };

            var myMap = new google.maps.Map(document.getElementById('myMap'), mapOptions);

            var normal = new MarkerWithLabel({
                position: myMap.getCenter(),
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 0
                },
                map: myMap,
                labelAnchor: new google.maps.Point(10, 10),
                labelClass: "map-label", // The CSS class for the label
                draggable: false

            });
        }

        function initMapsDark() {
            var styles = [{
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{"saturation": 36}, {"color": "#000000"}, {"lightness": 40}]
            }, {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{"visibility": "on"}, {"color": "#000000"}, {"lightness": 16}]
            }, {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{"visibility": "off"}]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#000000"}, {"lightness": 20}]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#000000"}, {"lightness": 17}, {"weight": 1.2}]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{"color": "#000000"}, {"lightness": 20}]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{"color": "#000000"}, {"lightness": 21}]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#000000"}, {"lightness": 17}]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#000000"}, {"lightness": 29}, {"weight": 0.2}]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{"color": "#000000"}, {"lightness": 18}]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{"color": "#000000"}, {"lightness": 16}]
            }, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{"color": "#000000"}, {"lightness": 19}]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#000000"}, {"lightness": 17}]
            }];
            var mapOptions = {
                zoom: 17,
                center: new google.maps.LatLng(51.5287352, -0.3817831),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                disableDefaultUI: false,
                styles: styles //black n white
            };

            var myMap = new google.maps.Map(document.getElementById('myMap'), mapOptions);

            var dark = new MarkerWithLabel({
                position: myMap.getCenter(),
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 0
                },
                map: myMap,
                labelAnchor: new google.maps.Point(10, 10),
                labelClass: "map-label", // The CSS class for the label
                draggable: false

            });
        }

        function initMail() {
            /***MAIL SCRIPT***/
            $('form#contact-form').on('submit', function (e) {
                e.preventDefault(); //Prevents default submit
                var form = $(this);
                $("#submit").attr('disabled', 'disabled'); //Disable the submit button on click
                var post_data = form.serialize(); //Serialized the form data
                $('div#form-loader').removeClass('is-hidden').fadeIn(500);
                $.ajax({
                    type: 'POST',
                    url: 'php/mail_handler.php', // Form script
                    data: post_data
                })
                    .done(function () {
                        $('div#form-loader').fadeOut(500);
                        Materialize.toast('Message Sent! I will contact you shortly, Thanks', 4000);
                        $("form#contact-form")[0].reset();
                        Materialize.updateTextFields(); // Rest floating labels
                        $("#submit").removeAttr('disabled', 'disabled'); // Enable submit button

                    })
                    .fail(function () {
                        $('div#form-loader').fadeOut(500);
                        Materialize.toast('Sorry! Something Wrong, Try Again', 4000);
                        $("#submit").removeAttr('disabled', 'disabled'); // Enable submit button
                    });
            });
        }

        /* ---------------------------------------------
         INITIALIZING ALL FUNCTIONS
         --------------------------------------------- */
        initNav();               //for main NAV
        initSmoothScroll();      // enables SmoothScroll
        initScrollToTop();       // Smooth Scroll To Top
        initPortfolio();         // Initializes Portfolios Gallery
        initSkills();            // Sets Skills Bar Width
        initClientsSliders();    // Initializes Clients Sliders
        initVideoPlayAndClose(); // Video Play and Close Functionality
        initMail();              // Mail Initialization
        initMapsNormal();        // Enable For Normal Map
        //initMapsDark();          // Enable For Dark Map

    });


    jQuery(window).on('load', function () {

        /***FADES OUT PRE-LOADER***/
        $('div#loading').fadeOut(500);

        /***SCROLL ANIMATION***/
        window.sr = ScrollReveal({reset: false}); // reset false stops repetition of animation
        var commonCards = '#port-add-icon,#map-card,.interest-icon-even,.interest-icon,' +
            '.timeline-dot,.timeline-content,#add-more,#skills-card,#testimonials-card,' +
            '#portfolios-card,#interest-card,#p-one,#p-two,#p-three,#contact-card,#clients,.section-title img';
        // Customizing a reveal set
        sr.reveal(commonCards, {duration: 1100});
        sr.reveal('#about-card,.map-label', {duration: 1400, delay: 500});
        sr.reveal('#v-card-holder', {duration: 1400, distance: '150px'});
        sr.reveal('.skillbar-bar', {duration: 1800, delay: 300, distance: '0'});
        
        $('#blog-card').hide();
        setTimeout("$('#blog-card').fadeIn('1800')", 500);
    });


})(jQuery);


