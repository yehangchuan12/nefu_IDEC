const PROTOCOL_SLIDE_NUMBER = 1

// Loader
$(window).on('load', function () {
    $('.loader').css('animation', 'none')
    $('.loader-wrapper').fadeOut('slow')
})



// Modals
var modals = document.getElementsByClassName('modal')// Get the modal

// Get the button that opens the modal
var btn1 = document.getElementsByClassName('team-box')
var btn2 = document.getElementsByClassName('profile')

var spans = document.getElementsByClassName('close')// Get the <span> element that closes the modal

// When the user clicks on the button, open the modal
for (var i = 0; i < btn1.length; i++) {
    btn1[i].onclick = function (e) {
        e.preventDefault()
        let modal = document.querySelector(e.currentTarget.getAttribute('href'))
        modal.style.display = 'block'
    }
};
// When the user clicks on the button, open the modal
for (var i = 0; i < btn2.length; i++) {
    btn2[i].onclick = function (e) {
        e.preventDefault()
        let modal = document.querySelector(e.currentTarget.getAttribute('href'))
        modal.style.display = 'block'
    }
};
// When the user clicks on <span> (x), close the modal
for (var i = 0; i < spans.length; i++) {
    spans[i].onclick = function () {
        for (var index in modals) {
            if (typeof modals[index].style !== 'undefined') modals[index].style.display = 'none'
        }
    }
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        for (var index in modals) {
            if (typeof modals[index].style !== 'undefined') modals[index].style.display = 'none'
        }
    }
}

// Create variable for the navbar
var nav1 = $('#normal-nav')
var nav2 = $('#mobile-nav')
// Add an event upon scrolling
window.addEventListener('scroll', function () {
    if (window.pageYOffset > 10) { // if pageYoffset is larger than 10
        nav1.addClass('dark-nav')
        nav2.addClass('dark-nav') // add the dark-nav class
    } else {
        nav1.removeClass('dark-nav')
        nav2.removeClass('dark-nav') // else remove the dark-nav class
    }
})

/* Code for the mobile navbar */
// set the width of the side nav to 75% upon openNav, if the nabar is already open, close the navbar upon clicking the hamburger menu again.

function openNav() {
    if ($('#side-nav').width() == 0) {
        $('#side-nav').css('width', '75%')
    } else {
        $('#side-nav').css('width', '0')
    }
}
// set width to 0 upon closeNav
function closeNav() {
    $('#side-nav').css('width', '0')
};

// Mobile dropdown menu
$('.mobile-dropdown-menu').children('li').on('click', function () {
    $(this).children('ul').slideToggle('slow')
})

// Automatic scroll down
$(document).ready(function () {
    scrollTo(0, 0)
    var myVideo = $('video').first().get(0)
    var arrowDown = $('.arrow-down').first().get(0)
    if (arrowDown == null) {
        return
    }
    setTimeout(function () {
        arrowDown.style.opacity = 1
    }, 3000)
    myVideo.addEventListener('loadeddata', function () {
        setTimeout(function () {
            var jumpPos = $('#home-main-body').offset().top
            if ($(document).scrollTop() <= jumpPos) {
                var mainbody = document.querySelector('#home-main-body')
                var mainbodyTop = mainbody.getBoundingClientRect().top + window.scrollY
                scrollTo(0, mainbodyTop - 79)
            }
        }, 17500)
    }, false)
})

$(window).on("load", function () {
    // Collapsible
    function openFirstCollapsible() {
        let targetElement = document.querySelector('.collapsible.active')
        if (targetElement == null) {
            return
        }
        // console.log(targetElement)
        let content = targetElement.nextElementSibling
        if (content.style.maxHeight) {
            content.style.maxHeight = null
            content.style.boxShadow = '0'
        } else {
            content.style.maxHeight = content.scrollHeight + 'px'
            content.style.boxShadow = 'inset 0 0 0 3px #e5e5e5'
        }
    };
    document.addEventListener('DOMContentLoaded', openFirstCollapsible())
});

function onCollapsibleClick(event) {
    if (event.type === 'keypress' && e.key != 'Enter') {
        return
    }
    let targetElement = event.currentTarget
    let content = targetElement.nextElementSibling
    let otherActiveColl = document.querySelector('.collapsible.active')
    // console.log(otherActiveColl)
    if (targetElement != otherActiveColl && otherActiveColl != null) {
        let content = otherActiveColl.nextElementSibling
        content.style.maxHeight = null
        content.style.boxShadow = '0'
        otherActiveColl.classList.remove('active')
    }
    targetElement.classList.toggle('active')
    if (content.style.maxHeight) {
        content.style.maxHeight = null
        content.style.boxShadow = '0'
    } else {
        content.style.maxHeight = content.scrollHeight + 'px'
        // content.style.boxShadow = 'inset 0 0 0 3px #e5e5e5'
    }
};

var coll = document.getElementsByClassName('collapsible')
for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener('click', onCollapsibleClick)
    coll[i].addEventListener('keypress', onCollapsibleClick)
};

function onExperimentClick(event) {
    let clickedExperiment = event.currentTarget
    // id of popout containing button and content
    let protocolId = clickedExperiment.getAttribute('linkedid')
    showProtocol(protocolId)
};

function showProtocol(protocolId) {
    showDivs(PROTOCOL_SLIDE_NUMBER)
    let protocolElement = document.getElementById(protocolId)
    let protocolButtonElement = protocolElement.firstElementChild
    let opened = protocolButtonElement.classList.contains('active')
    if (!opened) {
        protocolButtonElement.dispatchEvent(new Event('click'))
    }
    // scroll to protocol height
    setTimeout(function () {
        let protocolElementTop = protocolElement.getBoundingClientRect().top
        window.scrollTo(0, protocolElementTop + window.scrollY - 80)
    }, 400)
};

var experiments = document.getElementsByClassName('experiments')
for (var i = 0; i < experiments.length; i++) {
    experiments[i].addEventListener('click', onExperimentClick)
};

function onMainNavLinkClick(event) {
    let clickedMainNavLink = event.currentTarget
    let collapsibleId = clickedMainNavLink.getAttribute('linkedid')
    // console.log(collapsibleId)
    let chapterId = clickedMainNavLink.getAttribute('linkedidchapter')
    let chapterIdElement = document.getElementById(chapterId)
    // console.log(chapterId)
    if (chapterId == 'undefined' || chapterId == null) {
        return
    }
    showCollapsible(collapsibleId)
    setTimeout(function () {
        let chapterIdElementTop = chapterIdElement.getBoundingClientRect().top + window.scrollY
        scrollTo(0, chapterIdElementTop - 79)
    }, 300)
}

let mainNavLink = document.getElementsByClassName('main-nav-link')
for (var i = 0; i < mainNavLink.length; i++) {
    mainNavLink[i].addEventListener('click', onMainNavLinkClick)
}
function showCollapsible(collapsibleId) {
    if (collapsibleId == 'undefined' || collapsibleId == null) {
        return
    }
    let collapsibleElement = document.getElementById(collapsibleId)
    let opened = collapsibleElement.classList.contains('active')
    if (!opened) {
        collapsibleElement.dispatchEvent(new Event('click'))
    }
}
// Collapsible for results
var readmoreButton = document.getElementsByClassName('readmore-button')

for (var i = 0; i < readmoreButton.length; i++) {
    readmoreButton[i].addEventListener('click', function () {
        var content = this.nextElementSibling
        var buttonText = this.children[0]
        var moreLess = buttonText.children[1]
        console.log(buttonText)
        if (content == null) {
            return
        }
        if (content.style.maxHeight) {
            content.style.maxHeight = null
            content.style.opacity = null
            moreLess.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+'
        } else {
            content.style.maxHeight = content.scrollHeight + 'px'
            content.style.opacity = '1'
            moreLess.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-'
        }
    })
};

// Detecting whether the user uses Safari
var user = detect.parse(navigator.userAgent)
if (user.browser.family === 'Safari') {
    // Scroll code, that ideally only executes for Safari.
    $('a').on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== '') {
            // Prevent default anchor click behavior
            event.preventDefault()
            // Store hash
            var hash = this.hash
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash
            })
        }
    })
};


// This code moves the arrow to indicate which chapter we are looking at.
// Give the marker a style of left of the offsetLeft of the event of the indicator
function indicator(e) {
    var marker = document.querySelector('#marker') // select the marker
    marker.style.left = e.offsetLeft + ((e.offsetWidth / 2) - (marker.offsetWidth / 2)) + 'px'
};


// Keep track of which slide-section is active

var currentSlideIndex = 0
showDivs(currentSlideIndex)

function plusDivs(n) {
    showDivs(currentSlideIndex + n)
};

function showDivs(slideIndex) {
    var i
    var sections = $('.slide-sections') // get the sections
    var asides = $('aside') // get the asides
    var buttons = $('.button-name') // get buttons
    var slider = $('.slider') // get slider
    // console.log(buttons)

    if (asides.length == 0) {
        // Do not do anything as there are no asides.
    } else if ($(window).width() >= 800) { // if we're on big screens
        for (i = 0; i < sections.length; i++) {
            asides[i].style.display = 'none' // don't display the sections.
        }
        asides[slideIndex].style.display = 'block'
    } else {
        for (i = 0; i < sections.length; i++) {
            asides[i].style.display = 'none' // don't display the sections.
        }
    }
    if (buttons.length == 0) {

    } else {
        indicator(buttons[slideIndex])
        buttons[currentSlideIndex].classList.remove('active')
        buttons[slideIndex].classList.add('active')
    }

    if (asides.length == 0) {
    } else {
        let mainNavLinks = document.querySelectorAll('aside')[slideIndex].querySelectorAll('div .sub-navigation-chapter a') // get a list of all the nav links
        window.addEventListener('scroll', function () {
            mainNavLinks.forEach(function (link) {
                let chapterId = link.getAttribute('linkedidchapter')
                let chapterIdElement = document.getElementById(chapterId)
                if (
                    chapterIdElement.getBoundingClientRect().top <= 80 &&
                    chapterIdElement.getBoundingClientRect().bottom >= 80
                ) {
                    link.classList.add('active')
                } else {
                    link.classList.remove('active')
                }
            })
        })
    }
    for (var i = 0; i < sections.length; i++) {
        if (i == slideIndex) {
            sections[i].style.height = '100%'
            slider.css({
                '-webkit-transform': 'translateX(-' + (i * 25) + '%)',
                '-ms-transform': 'translateX(-' + (i * 25) + '%)',
                'transform': 'translateX(-' + (i * 25) + '%)'
            })
        } else {
            sections[i].style.height = '0'
        }
    }
    currentSlideIndex = slideIndex
};



// Function for whenever the window gets resized
var resizeId

$(window).resize(function () {
    clearTimeout(resizeId)
    resizeId = setTimeout(function () {
        showDivs(currentSlideIndex)
        toggleWidth()
            , 1700

    })
})



// Mobile to top arrow
window.addEventListener('scroll', function () {
    if (window.pageYOffset > 100) {
        document.getElementById('mobile-to-top-arrow').classList.add('active1')
    } else {
        document.getElementById('mobile-to-top-arrow').classList.remove('active1')
    }
})
// Intersection observer
const sliders = document.querySelectorAll('.slide-in')

const appearOptions = {
    threshold: 0,
    rootMargin: '0px 0px 0px 0px'
}

const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
) {
    entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
            return
        } else {
            entry.target.classList.add('appear')
            appearOnScroll.unobserve(entry.target)
        }
    })
},
    appearOptions)

sliders.forEach(function (slider) {
    appearOnScroll.observe(slider)
})

// Color blindness slider
function initComparisons() {
    var x, i;
    /*find all elements with an "overlay" class:*/
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
        /*once for each "overlay" element:
        pass the "overlay" element as a parameter when executing the compareImages function:*/
        compareImages(x[i]);
        //console.log(x)
    }
    function compareImages(img) {
        var slider, img, clicked = 0, w, h;
        /* get the width and height of the img element */
        w = img.offsetWidth;
        //console.log(w)
        h = img.offsetHeight;
        /*set the width of the img element to 50%:*/
        img.style.width = (w / 2) + "px";
        /*create slider:*/
        slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");
        /*insert slider*/
        img.parentElement.insertBefore(slider, img);
        /*position the slider in the middle:*/
        slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
        slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
        /*execute a function when the mouse button is pressed:*/
        slider.addEventListener("mousedown", slideReady);
        /*and another function when the mouse button is released:*/
        window.addEventListener("mouseup", slideFinish);
        /*or touched (for touch screens:*/
        slider.addEventListener("touchstart", slideReady);
        /*and released (for touch screens:*/
        window.addEventListener("touchend", slideFinish);
        function slideReady(e) {
            /*prevent any other actions that may occur when moving over the image:*/
            e.preventDefault();
            /*the slider is now clicked and ready to move:*/
            clicked = 1;
            /*execute a function when the slider is moved:*/
            window.addEventListener("mousemove", slideMove);
            window.addEventListener("touchmove", slideMove);
        }
        function slideFinish() {
            /*the slider is no longer clicked:*/
            clicked = 0;
        }
        function slideMove(e) {
            var pos;
            /*if the slider is no longer clicked, exit this function:*/
            if (clicked == 0) return false;
            /*get the cursor's x position:*/
            pos = getCursorPos(e)
            /*prevent the slider from being positioned outside the image:*/
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            /*execute a function that will resize the overlay image according to the cursor:*/
            slide(pos);
        }
        function getCursorPos(e) {
            var a, x = 0;
            e = e || window.event;
            /*get the x positions of the image:*/
            a = img.getBoundingClientRect();
            /*calculate the cursor's x coordinate, relative to the image:*/
            x = e.pageX - a.left;
            /*consider any page scrolling:*/
            x = x - window.pageXOffset;
            return x;
        }
        function slide(x) {
            /*resize the image:*/
            img.style.width = x + "px";
            /*position the slider:*/
            slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
        }
    }
}



function toggleWidth() {
    let sectionsContainer = $(".sections-container")
    let asides = $("aside")
    if (asides.length < 1) {
        let mainBody = $(".main-body")
        mainBody.addClass("margin-normal")
        return
    }
    if ($(window).width() > 1240 && asides.parents().is(".new")) {
        sectionsContainer.addClass("grid-normal")
        let newWrapper = $('.new')
        console.log(newWrapper)
        newWrapper.addClass("grid-aside")
    } else if ($(window).width() > 1240) {
        sectionsContainer.addClass("grid-normal")
        asides.wrap("<div class='new'></div>")
        let newWrapper = $('.new')
        console.log(newWrapper)
        newWrapper.addClass("grid-aside")
    } else if (asides.parents().is(".new")) {
        sectionsContainer.removeClass("grid-normal")
        asides.unwrap()
    } else {
        sectionsContainer.removeClass("grid-normal")
    }
}
document.addEventListener('DOMContentLoaded', toggleWidth())
window.onload = function () {
    //定义body的margin由默认值8px->0px
    document.body.style.margin = "0";
    document.body.style.background = "#30333F";
    //创建canvas画布
    document.body.appendChild(document.createElement('canvas'));
    var canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d') //ctx返回一个在canvas上画图的api/dom
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    ctx.lineWidth = .3;
    ctx.strokeStyle = (new Color(150)).style;
    //定义鼠标覆盖范围
    var mousePosition = {
        x: 30 * canvas.width / 100,
        y: 30 * canvas.height / 100
    };
    var dots = {
        nb: 1000,//Dot的总数
        distance: 50,
        d_radius: 100,
        array: []
    };
    //创建颜色类，Color类返回字符串型rgba（*,*,*,.8）
    function mixComponents(comp1, weight1, comp2, weight2) {
        return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
    }
    function averageColorStyles(dot1, dot2) {
        var color1 = dot1.color,
            color2 = dot2.color;

        var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
            g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
            b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
        return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
    }
    function colorValue(min) {
        return Math.floor(Math.random() * 255 + min);
    }
    function createColorStyle(r, g, b) {
        return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
    }
    function Color(min) {
        min = min || 0;
        this.r = colorValue(min);
        this.g = colorValue(min);
        this.b = colorValue(min);
        this.style = createColorStyle(this.r, this.g, this.b);
    }
    //创建Dot类以及一系列方法
    function Dot() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = -.5 + Math.random();
        this.vy = -.5 + Math.random();

        this.radius = Math.random() * 2;

        this.color = new Color();
    }

    Dot.prototype = {
        draw: function () {
            ctx.beginPath();
            ctx.fillStyle = this.color.style;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
        }
    };
    function moveDots() {//Dot对象的移动
        for (i = 0; i < dots.nb; i++) {

            var dot = dots.array[i];

            if (dot.y < 0 || dot.y > canvas.height) {
                dot.vx = dot.vx;
                dot.vy = - dot.vy;
            }
            else if (dot.x < 0 || dot.x > canvas.width) {
                dot.vx = - dot.vx;
                dot.vy = dot.vy;
            }
            dot.x += dot.vx;
            dot.y += dot.vy;
        }
    }
    function connectDots() {//DOt对象的连接
        for (i = 0; i < dots.nb; i++) {
            for (j = i; j < dots.nb; j++) {
                i_dot = dots.array[i];
                j_dot = dots.array[j];

                if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance) {
                    if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius) {
                        ctx.beginPath();
                        ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
                        ctx.moveTo(i_dot.x, i_dot.y);
                        ctx.lineTo(j_dot.x, j_dot.y);
                        ctx.stroke();//绘制定义的路线
                        ctx.closePath();//创建从当前点回到起始点的路径
                    }
                }
            }
        }
    }
    function createDots() {//创建nb个Dot对象
        for (i = 0; i < dots.nb; i++) {
            dots.array.push(new Dot());
        }
    }
    function drawDots() {//引用Dot原型链，使用draw方法，在canvas上画出Dot对象
        for (i = 0; i < dots.nb; i++) {
            var dot = dots.array[i];
            dot.draw();
        }
    }
    function animateDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);//清除画布，否则线条会连在一起
        moveDots();
        connectDots();
        drawDots();
        requestAnimationFrame(animateDots);
    }
    createDots();//使用创建Dot类函数
    requestAnimationFrame(animateDots);//使用canvas独有的60Hz刷新屏幕画布的方法

    document.querySelector('canvas').addEventListener('mousemove', function (e) {
        mousePosition.x = e.pageX;
        mousePosition.y = e.pageY;
    })

    document.querySelector('canvas').addEventListener('mouseleave', function (e) {//鼠标离开时，连接自动返回到画布中心
        mousePosition.x = canvas.width / 2;
        mousePosition.y = canvas.height / 2;
    })

}