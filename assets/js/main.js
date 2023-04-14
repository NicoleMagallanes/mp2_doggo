var element;

//Detect onclick event
if (window.matchMedia("(max-width: 920px)").matches === false) {
    $(".ham").on("click", function(){
        $("menu").css("right", "0px");
        $(".overlay").css("opacity","1");
        $(".overlay").css("z-index","99");
    });

    $(".close").on("click", function(){
        $(".contact").css("top") >= "10%" ? $(".contact").hide().css("top","-100%").fadeOut('100') : $("menu").css("right", "-500px");
        $(".overlay").css("opacity","0");
        $(".overlay").css("z-index","-1");
    });

    $(".overlay").on("click", function(){
        $(".contact").css("top") >= "10%" ? $(".contact").hide().css("top","-100%").fadeOut('100') : $("menu").css("right", "-500px");
        $(".overlay").css("opacity","0");
        $(".overlay").css("z-index","-1");
    });
} else {
    $(".ham").on("click", function(){
        $("menu").css("right", "0px");
        $(".overlay").css("opacity","1");
        $(".overlay").css("z-index","9");
    });
    
    $(".close").on("click", function(){
        $(".contact").css("top") >= "10%" ? $(".contact").hide().css("top","-100%").fadeOut('100') : $("menu").css("right", "-120%");
        $(".overlay").css("opacity","0");
        $(".overlay").css("z-index","-1");
    });
    
    $(".overlay").on("click", function(){
        $(".contact").css("top") >= "10%" ? $(".contact").hide().css("top","-100%").fadeOut('100') : $("menu").css("right", "-120%");
        $(".overlay").css("opacity","0");
        $(".overlay").css("z-index","-1");
    });
}


//Scroller Nav
window.onscroll = function() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        $("nav").css("background-color","var(--primary)") ;
        $("nav").css("box-shadow","0px 6px 16px -6px var(--dark)") ;
        $(".social_icons").addClass("social_icon");
        $(".social_icons").removeClass("social_icons");
        $(".google_play").children("strong").hide("slow");
        $(".google_play").children("img").css("margin-right","0px");
    } else {
        $("nav").css("background-color","transparent") ;
        $("nav").css("box-shadow","0px 0px 0px 0px var(--dark)") ;
        $(".social_icon").addClass("social_icons");
        $(".social_icon").removeClass("social_icon");
        $(".google_play").children("strong").show("slow");
        $(".google_play").children("img").css("margin-right","10px");
    }
}


//DETECT ESC KEY PRESSED
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        if ($(".overlay").css("opacity") == "1"){
            $(".overlay").css("opacity","0");
            $(".overlay").css("z-index","-1");
        }
    }
};



//Dropdown
$(".dropdown").click(function(){
    if ($(this).children("aside").is(":hidden")){
        $(this).children("aside").show("slow");
        $(this).children("a").css("color","var(--white)");
    } else {
        $(this).children("aside").hide("slow");
        $(this).children("a").css("color","var(--lite)");
    }
});


//Swiper for menu bar
var direction = "";
var oldx = 0;
var oldy = 0;
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
    let touchstartX = 0
    let touchendX = 0
        
    function checkDirection() {
        if (touchendX < touchstartX){
            $("menu").css("right", "0px");
            $(".overlay").css("opacity","1");
            $(".overlay").css("z-index","99");
        }
        if (touchendX > touchstartX){
            $(".contact").css("top") >= "10%" ? $(".contact").hide().css("top","-100%").fadeOut('100') : $("menu").css("right", "-500px");
            $(".overlay").css("opacity","0");
            $(".overlay").css("z-index","-1");
        }
    }

    document.addEventListener('touchstart', e => {
      touchstartX = e.changedTouches[0].screenX
    });

    document.addEventListener('touchend', e => {
      touchendX = e.changedTouches[0].screenX
      checkDirection()
    });
}