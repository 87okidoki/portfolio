// ---------- add by yongari ----------------- 

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}

console.log("is mobile? => " + isMobile);

if (isMobile && /mobile/.test(document.location) == false) {
    document.location.href = "kmf2018/mobile/main.html";
}

if (!isMobile && /desktop/.test(document.location) == false) {
    document.location.href = "kmf2018/desktop/main.html";
}

var langCookieName = "org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE";

var currentLang = readCookie(langCookieName);
if (currentLang == null) {
    currentLang = navigator.language || navigator.userLanguage;
}

if (currentLang.length > 2) {
    currentLang = currentLang.substr(0, 2);
}

console.log("current language set => " + currentLang);

// ---------- add by yongari -----------------


//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {

    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        if (typeof($($anchor.attr("href")).offset()) != "undefined") {
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo', function () {
                $(".navbar-nav>li").removeClass("active");
                $anchor.parent().addClass("active");
            });
        }

        event.preventDefault();
    });

});

// Tabs	
$("document").ready(function(){
	$(".tab-container .tab-content").hide();
	$(".tab-container .tab-content:first").show();
      
    $(".tab-slider-nav li").click(function() {
        $(".tab-container .tab-content").hide();
        var activeTab = $(this).attr("rel");
        $("#"+activeTab).fadeIn();
            if($(this).attr("rel") == "tab2"){
                $('.tabs-nav').addClass('slide');
            }else{
                $('.tabs-nav').removeClass('slide');
            }
        $(".tab-slider-nav li").removeClass("active");
        $(this).addClass("active");
    });
      
    $(".lang-item>span>a").on("click", function (event) {
        currentLang = $(this).data("lang");
        createCookie(langCookieName, currentLang, 30);
        changeLanguage();

        event.preventDefault();
    });

    var io = new IntersectionObserver(function (sections) {
        for (var i=0; i<sections.length; i++) {
            var section = sections[i];
            var target = section.target;
            var id = target.id;
            if (target.id.length < 2) {
                return;
            }
            
            // console.log("target id => " + id + " / intersection => " + section.isIntersecting + " / intersectRatio => " + section.intersectionRatio);
            
            if (section.isIntersecting) {
                if (section.intersectionRatio < 0.1 || section.intersectionRatio > 0.9) {
                    $(".navbar-nav>li[data-id=" + id + "]").removeClass("active");
                } else {
                    if ($(".navbar-nav>li[data-id=" + id + "]").length > 0) {
                        $(".navbar-nav>li").removeClass("active");
                        $(".navbar-nav>li[data-id=" + id + "]").addClass("active");
                    }
                }
            }
        }
    }, {
        threshold: [0.1, 0.9],
        rootMargin: "-50px 0px 0px 0px"
    });

    var ioTargets = document.querySelectorAll("div.contents-wrap>section");
    for (var i=0; i<ioTargets.length; i++) {
        io.observe(ioTargets[i]);
    }
    
    changeLanguage();

    $("#viewModal").on("hidden.bs.modal", function (e) {
        if (typeof(view_modal) != "undefined") {
            view_modal.content_url = "about:blank";
        }
    });
});

function openLayer(IdName) {
    if (readCookie(IdName + "Blocked") != "on") {
        $("#" + IdName).show();
    }
}

// Layer Popup Close
function closeLayer(IdName){
    var $closeOption = $("#" + IdName + " input:checkbox:checked");
    if ($closeOption.length > 0) {
        createCookie(IdName + "Blocked", "on", $closeOption.val());
    }

    $("#" + IdName).hide();
}

//scrollToTop
$(window).scroll(function(){
	if ($(this).scrollTop() > 100) {
		$('#scrollToTop').fadeIn();
	} else {
		$('#scrollToTop').fadeOut();
	}
});

$('#scrollToTop').click(function(){
	$('html, body').animate({
        scrollTop : 0
    }, 1500, 'easeInOutExpo', function () {
        $(".navbar-nav>li").removeClass("active");
    });
	return false;
});
	
// resources setting by language
function changeLanguage() {
    $(".lang-item>span").removeClass("select");
    $(".lang-item>span>a[data-lang=" + currentLang + "]").parent().addClass("select");

    if (typeof(vueObjects) != "undefined") {
        vueObjects.changeLanguage(currentLang);
    }
}
