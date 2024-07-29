
/*google map*/
function customMap_data() {
	$('.google-map').each(function(index, element) {
		
	var map_default={
		address:"",
		content:"",
		icon:"",
		zoom:10,
		scrollwheel:true,
		styles:""
	}
		
	var e=$(this);
		for(i in map_default){
		    if(e.data(i) !=undefined){
				map_default[i]=e.data(i);
			 }else if(e.data(i.toLowerCase()) !=undefined){
				map_default[i]=e.data(i.toLowerCase());
			 }
		}
		
  e.gmap3({
		marker : {
			values : [{
					address : map_default["address"],
					data : map_default["content"],
					options : {
						icon : map_default["icon"]
					}
				}
			],
			options : {
				draggable : false
			},
			events : {
				click : function (marker, event, context) {
					var map = $(this).gmap3("get"),
					infowindow = $(this).gmap3({
							get : {
								name : "infowindow"
							}
						});
					if (infowindow) {
						infowindow.open(map, marker);
						infowindow.setContent(context.data);
					} else {
						$(this).gmap3({
							infowindow : {
								anchor : marker,
								options : {
									content : context.data
								}
							}
						});
					}
				},
				closeclick : function () {
					var infowindow = $(this).gmap3({
							get : {
								name : "infowindow"
							}
						});
					if (infowindow) {
						infowindow.close();
					}
				}
			}
		},
		map : {
			options : {
				mapTypeId : google.maps.MapTypeId.ROADMAP,
				mapTypeControl : true,
				mapTypeControlOptions : {
					style : google.maps.MapTypeControlStyle.DROPDOWN_MENU
				},
				navigationControl : true,
				zoom : map_default["zoom"],
				scrollwheel : map_default["scrollwheel"],
				styles:map_default["styles"]
			}
		}
	});
});
} 

$(document).ready(function () {

	/*imgbg cover*/
	$(".imgbg-cover").each(function (index, element) {
		$(this).css("background-image", "url(\"" + $(this).children("img").eq(0).remove().attr("src") + "\")");
	});

	
	/*min-window-height*/
	$(".min-window-height").each(function(index, element) {
		$(this).css("min-height", $(window).height());
    });
	$(window).resize(function() {
		$(".min-window-height").each(function(index, element) {
			$(this).css("min-height", $(window).height());
		});
    });
    /*window-height*/
	$(".window-height").each(function(index, element) {
		$(this).css("height", $(window).height());
    });
	$(window).resize(function() {
		$(".window-height").each(function(index, element) {
			$(this).css("height", $(window).height());
		});
    });
	

	/*OwlCarousel 2*/
 	if(typeof($(document).owlCarousel) =="function"){
	$(".owl-carousel").each(function () {
		var e = $(this);
		var itme = e.data("items") ? e.data("items") : 4;
		var carousel_default = {
			items : itme,
			loop : true,
			center : false,
			rewind : false,
			mouseDrag : true,
			touchDrag : true,
			pullDrag : true,
			freeDrag : false,
			margin : 0,
			stagePadding : 0,
			merge : false,
			mergeFit : true,
			autoWidth : false,
			startPosition : 0,
			rtl : false,
			smartSpeed : 250,
			fluidSpeed : false,
			dragEndSpeed : false,
			responsiveRefreshRate : 200,
			responsiveBaseElement : window,
			fallbackEasing : 'swing',
			info : false,
			nestedItemSelector : false,
			MobileSmall : 1,
			autoplay : false,
			autoplayTimeout : 3000,
			autoplayHoverPause : true,
			autoHeight : false,
			nav : true,
			animateOut : '',
			animateIn : '',
			navText : ['<', '>'],
			navSpeed : false,
			navElement : 'div',
			navContainer : false,
			slideBy : 1,
			dots : true,
			dotsEach : false,
			dotsData : false,
			dotsSpeed : false,
			dotsContainer : false,
			maxHeight:false,
			model3D:false,
			mobile : Math.max(itme - 3, 1),
			tablet : Math.max(itme - 2, Math.min(2, itme)),
			desktopSmall : Math.max(itme - 1, Math.min(3, itme)),
			desktop : Math.max(itme - 1, Math.min(3, itme))
		};

		for (i in carousel_default) {
			if (e.data(i) != undefined) {
				carousel_default[i] = e.data(i);
			} else if (e.data(i.toLowerCase()) != undefined) {
				carousel_default[i] = e.data(i.toLowerCase());
			}
		};
		carousel_default["responsive"] = {
			0 : {
				items : carousel_default["MobileSmall"]
			},
			321 : {
				items : carousel_default["mobile"]
			},
			481 : {
				items : carousel_default["tablet"]
			},
			769 : {
				items : carousel_default["desktopSmall"]
			},
			993 : {
				items : carousel_default["desktop"]
			},
			1201 : {
				items : carousel_default["items"]
			}
		};
		
		if(carousel_default["model3D"]){
			carousel_default["maxHeight"]=true;
			carousel_default["center"]=true;
			carousel_default["mouseDrag"]=false;
			
			var moves=0,rotate=true;
			e.on("translated.owl.carousel",function(x){
				rotate=true;
			})
			var prev=true,next=true;
			e.on("drag.owl.carousel",function(x){ 
				e.addClass("owl-grab owl-drag")
				moves==0?moves=x.originalEvent.offsetX:"";
				 if(x.originalEvent.offsetX - moves >20 && rotate && prev){
					moves = x.originalEvent.offsetX;
					e.trigger('prev.owl');
					next=false;
				 }
				if(x.originalEvent.offsetX - moves < -20 && rotate && next){
					moves=x.originalEvent.offsetX;
					e.trigger('next.owl');
					prev=false;
				}
				if(x.originalEvent.screenX ==0){
					moves=0;
					prev=true;
					next=true;
					e.removeClass("owl-grab owl-drag");
				}
			})
		}
		
		if(carousel_default["maxHeight"]){
			e.on("refreshed.owl.carousel",function(x){
					var max_height=0;
					e.find(".owl-item.center").addClass("temporary");
					e.find(".owl-item").addClass("center");
					e.find(".owl-item.center").each(function() {
					   max_height=Math.max(max_height,$(this).innerHeight());
					});
					e.find(".owl-item").removeClass("center");
					e.find(".owl-item.temporary").addClass("center").removeClass("temporary");
					e.find(".owl-stage-outer").css("height",max_height)
			})
		}
		
		if(carousel_default["center"]){
			e.on("initialized.owl.carousel translate.owl.carousel",function(x){
				e.find(".owl-item.next").removeClass("next");
				e.find(".owl-item.prev").removeClass("prev");
				e.find(".owl-item").eq(x.item.index).addClass("center");
				e.find(".owl-item").eq(x.item.index+1).addClass("prev");
				e.find(".owl-item").eq(x.item.index-1).addClass("next");
			})
		}
		if(carousel_default["maxHeight"] || e.attr("class").indexOf("dg-testimonial")){
			ImgLoad(function () {
				e.owlCarousel(carousel_default);
			},e)
		}else{
			e.owlCarousel(carousel_default);
		}
		e.removeClass("loading");
		
		 
		 
	})
	
	}
	/*CircleSlider*/
 	if(typeof($(document).content_slider) =="function"){
	$('.circle_slider').each(function () {
		var circle_slider_default = {
			max_shown_items : 3, // number of visible circles
			hv_switch : 0, // 0 = horizontal slider, 1 = vertical
			active_item : 0, // layer that will be shown at start, 0=first, 1=second...
			wrapper_text_max_height : "auto", // height of widget, displayed in pixels
			middle_click : 1, // when main circle is clicked: 1 = slider will go to the previous layer/circle, 2 = to the next
			under_600_max_height : 1200, // if resolution is below 600 px, set max height of content
			automatic_height_resize : 1,
			border_on_off : 1,
			prettyPhoto_width : 42,
			responsive_by_available_space : 1,
			small_pic_width:	100	,
			small_pic_height:	100	,
			big_pic_width:	182,
			big_pic_height:	182	,	
			child_div_width:150	,
			child_div_height:150,
			small_border:4,
			big_border:4,
			border_color:"#FFFFFF",
			arrow_color:"#FFFFFF",
			left_offset:20,
			hide_prettyPhoto:1
		}
		var e = $(this);
		var image_array = new Array();
		for (i in circle_slider_default) {
			if (e.data(i) != undefined) {
				circle_slider_default[i] = e.data(i);
			} else if (e.data(i.toLowerCase()) != undefined) {
				circle_slider_default[i] = e.data(i.toLowerCase());
			}
		}
		e.content_slider(circle_slider_default);
		
	});
	}
	/*isotope*/
 	if(typeof($(document).isotope) =="function"){
	$(".isotope_grid").each(function () {
	var url = window.location.search;
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for (i = 0; i < strs.length; i++) {
				if ($(this).attr("id") == strs[i].split("=")[0]) {
					$(this).find(".isotope_group a").eq(strs[i].split("=")[1] - 1).addClass("active").siblings().removeClass("active");
				}
			}
		}
		var a = $(this),
		e = a.find(".isotope_main"),
		el = e.find(".isotope_item"),
		response = 0,
		itme = a.data("itme") ? a.data("itme") : 4,
		szie = {
			MobileSmall : [itme - 4, 1],
			Mobile : [479, Math.max(itme - 3, 1)],
			Tablet : [768, Math.max(itme - 2, Math.min(2, itme))],
			DesktopSmall : [979, Math.max(itme - 1, Math.min(2, itme))],
			Desktop : [1199, Math.max(itme - 1, Math.min(2, itme))]
		};

		for (i in szie) {
			if (a.data(i) != undefined) {
				szie[i][1] = a.data(i);
			} else if (a.data(i.toLowerCase()) != undefined) {
				szie[i][1] = a.data(i.toLowerCase());
			}
		}

		function responsive(list) {
			w = $(window).width();
			f = response;
			if (w <= szie.MobileSmall[0]) {
				response = szie.MobileSmall[1];
			} else if (w <= szie.Mobile[0]) {
				response = szie.Mobile[1];
			} else if (w <= szie.Tablet[0]) {
				response = szie.Tablet[1];
			} else if (w <= szie.DesktopSmall[0]) {
				response = szie.DesktopSmall[1];
			} else if (w <= szie.Desktop[0]) {
				response = szie.Desktop[1];
			} else {
				response = itme;
			}
			if (f != response) {
				list.each(function () {
					$(this).data("zoom") ? $(this).css("width", Math.min((100 / response) * $(this).data("zoom"), 100) + "%") : $(this).css("width", 100 / response + "%");
				});
			}
		}

		var filterValue = false;
		a.find(".isotope_group").each(function () {
			filterValue += $(this).find(".active").attr('data-filter') != "*" && $(this).find(".active").attr('data-filter') ? $(this).find(".active").attr('data-filter') : false;
		});
		filterValue = filterValue ? filterValue : "*";

		var sortValue = a.find('.sort_box .active').attr('href') ? a.find('.sort_box .active').attr('href').slice(1) : false;

		var ascValue = a.find('.desc_asc .active').attr("data-sort") ? a.find('.desc_asc .active').attr("data-sort") : false;

		ImgLoad(function () {
			responsive(el);
			$(window).resize(function () {
				responsive(el);
			});
			el.each(function (index, element) {
				if (!$(this).data("zoom")) {
					$(this).addClass("standard-size");
					return false;
				}
			});

			e.isotope({
				getSortData : {
					name : function (itemElem) {
						return $(itemElem).find('.name').text().toLowerCase();
					},
					author : function (itemElem) {
						return $(itemElem).find('.author').text().toLowerCase();
					},
					date : function (itemElem) {
						return parseInt($(itemElem).find('.date').attr("data-date"));
					},
					price : function (itemElem) {
						return parseFloat($(itemElem).find('.price').attr("data-price"));
					}
				},
				sortBy : sortValue,
				sortAscending : 'asc' == ascValue,
				filter : filterValue,
				percentPosition : true,
				masonry : {
					columnWidth : '.standard-size'
				}
			});

			a.find("div.isotope_group").on('click', 'a', function () {
				var filterValue = "";
				$(this).addClass("active").siblings().removeClass("active");
				a.find(".isotope_group").each(function (index) { 
					a.find(".isotope_group_select").eq(index).val($(this).find(".active").attr('data-filter'));
					filterValue += $(this).find(".active").attr('data-filter') != "*" ? $(this).find(".active").attr('data-filter') : "";
				});
				e.isotope({
					filter : filterValue ? filterValue : "*"
				});
				if ($(this).parent().siblings(".active_filter").length != 0) {
					$(this).parent().siblings(".active_filter").html($(this).html());
					$(this).parent().slideUp(200);
				};
				return false;
			});
			
			a.find(".isotope_group_select").on("change", function () {
				var se =$(this);
				var filterValue = "";
				a.find(".isotope_group_select").each(function (index) {
					a.find(".isotope_group").eq(index).find('a[data-filter="'+$(this).val()+'"]').addClass("active").siblings().removeClass("active");
					filterValue += $(this).val() != "*" ? $(this).val() : "";
				});
				e.isotope({
					filter : se.val()
				});
			});
			

			a.find('.sort_box a').click(function () {
				var sortName = $(this).attr('href').slice(1);
				$(this).addClass("active").siblings().removeClass("active");
				e.isotope({
					sortBy : sortName
				});
				if ($(this).parent().siblings(".active_filter").length != 0) {
					$(this).parent().siblings(".active_filter").html($(this).html());
					$(this).parent().slideUp(200);
				}
				return false;
			});


			a.find('.desc_asc a').click(function () {
				var sorts = $(this).attr("data-sort");
				$(this).addClass("active").siblings().removeClass("active");
				e.isotope({
					sortAscending : 'asc' == sorts
				});
				if ($(this).parent().siblings(".active_filter").length != 0) {
					$(this).parent().siblings(".active_filter").html($(this).html());

					$(this).parent().slideUp(200);
				}
				return false;
			});
			
			a.find('.filter-switch').click(function () {
				$(this).siblings("a").each(function() { console.log($(this).hasClass("active"))
					if(!$(this).hasClass("active")){
                   	 $(this).click();
					 return false;
					}
                });
			});

			a.find(".active_filter").each(function () {
				$(this).on("click", function () {
					$(this).siblings(".filter_list").slideToggle(100);
				})
				$(this).parent().on("mouseleave", function () {
					$(this).find(".filter_list").slideUp(200);
				})
			});
			a.children(".loading").remove()
			a.removeClass("loading");
		}, e)
	});
	}
	/*decorate*/
 	if(typeof($(document).easyPieChart) =="function"){
	$(".decorate").each(function () {
		var chart_default = {
			animate : 1000,
			barColor : $(this).css("color"),
			trackColor : "#dddddd",
			size : 200,
			lineWidth : 10,
			lineCap : 'round',
			scaleColor : false,
			onStep : function (from, to, percent) {
				$(this.el).find('.percentage_inner span').text(Math.round(percent));
			}
		}
		var e = $(this);
		for (i in chart_default) {
			if (e.data(i) != undefined) {
				chart_default[i] = e.data(i);
			} else if (e.data(i.toLowerCase()) != undefined) {
				chart_default[i] = e.data(i.toLowerCase());
			}
		}
		
		$(this).easyPieChart(chart_default);
		
		
	});
	}
	/*text slide*/
	
	$(".text-slide").each(function() {
		var e=$(this);
		var textslide=function(){
			e.find("span").removeClass("previous");
			curr=e.find(".active");
			curr.removeClass("active").addClass("previous");
			if(curr.next().length!=0){
				curr.next().addClass("active")
			}else{
				e.find("span").eq(0).addClass("active");
			}
		e.animate({"width":e.find(".active").width()+1},400)
			
		}
		speed= e.data("speed")?e.data("speed"):3000;
		setInterval(textslide,speed);	
	});



	
/*pagepiling*/

	if (typeof ($(document).pagepiling) == "function") {
		$(document).ready(function () {
			if ($("#pagepiling").length != 0) {
				if ($("body").hasClass("dnnEditState")) {
					$("#pagepiling .section").css({ "position": "relative", "height": $(window).height() });
					return false
				}
				$("body,html").css("overflow", "hidden");
			}
			var deleteLog = false;
			if ($("#pagepiling").length == 0) return false;
			var el = $("#pagepiling"),
				e = el.children(".section"),
				start = e.eq(0).data("tooltips") ? e.eq(0).data("tooltips") : "page 1",
				d = start + " ";
			for (i = 1; i < e.length; i++) {
				var s = e.eq(i).data("tooltips") ? e.eq(i).data("tooltips") : "page " + (i + 1)
				d += "," + s;
			}
			var data = d.split(",");
			var ontouchstart = $(window).width() < 992 ? true : false;
			var curr = 0,
				off = true; 
			el.pagepiling({
				navigation: {
					'textColor': '#f2f2f2',
					'bulletsColor': '#ccc',
					'position': el.data("navposition") ? el.data("navposition") : "right",
					'tooltips': data
				},
				scrollingSpeed: el.data("Speed") ? parseInt(el.data("Speed")) : 700,
				easing: el.data("easing") ? el.data("easing") : "swing",
				direction: el.data("direction") ? el.data("direction") : "vertical",
				onLeave: function (index, nextIndex, direction) {
					e.eq(nextIndex - 1).removeClass("animated");
					e.eq(nextIndex - 1).find(".animation").removeClass("animated");
					curr = nextIndex;
					off = false;
				},
				afterLoad: function (anchorLink, index) {
					e.eq(index - 1).addClass("animated");
					e.eq(index - 1).find(".animation").addClass("animated");
					off = true;
				}
			})
			if ($(window).scrollTop() > 0) {
				$("body,html").css("overflow", "visible");
			}
	
			$(window).stop().scrollTop(0);
			e.css("height", $(window).height());
			el.css("height", $(window).height());
			e.find(".section-scrollbar").css("height", $(window).height());
			e.find(".section-scrollbar").each(function (index, element) {
				var x = $(this);
				var bottom = true;
	
				e.eq(e.length - 1).on('mousewheel', function (event) {
					if (event.deltaY < 0 && bottom) {
						el.stop().animate({
							marginTop: -el.siblings("footer").height()
						}, 500);
						bottom = false;
							$.fn.pagepiling.setAllowScrolling(false);
					}
					if (event.deltaY > 0 && !bottom) {
						el.stop().animate({
							marginTop: 0
						}, 500, function () {
							if(!ontouchstart){
								$.fn.pagepiling.setAllowScrolling(true);
							}
							e.find(".section-scrollbar").mCustomScrollbar("update");
						});
						bottom = true;
					}
				});
				el.siblings("footer").on('mousewheel', function (event) {
					if (event.deltaY > 0 && !bottom) {
						el.stop().animate({
							marginTop: 0
						}, 500, function () {
							if(!ontouchstart){
								$.fn.pagepiling.setAllowScrolling(true);
							}
							e.find(".section-scrollbar").mCustomScrollbar("update");
						});
						bottom = true;
	
					}
				});
	
				var mouseevents = {
					mousedown: function () {
						startX = events.clientX;
						startY = events.clientY;
						$.fn.pagepiling.setAllowScrolling(false);
					},
					mouseup: function () {
						OffsetY = events.clientY - startY;
						if (OffsetY < 0 && bottom) {
							el.stop().animate({
								marginTop: -el.siblings("footer").height()
							}, 500);
							bottom = false;
							$.fn.pagepiling.setAllowScrolling(false);
						}
						if (OffsetY > 0 && !bottom) {
							el.stop().animate({
								marginTop: 0
							}, 500, function () {
								if(!ontouchstart){
									$.fn.pagepiling.setAllowScrolling(true);
								}
								e.find(".section-scrollbar").mCustomScrollbar("update");
								bottom = true;
							});
						}
					},
					mousemove: function () {
	
					}
				}
	
				e.eq(e.length - 1).newMouse(mouseevents);
				el.siblings("footer").newMouse(mouseevents);
	
	
				if (ontouchstart) {
					$.fn.pagepiling.setAllowScrolling(false);
				} else {
					$.fn.pagepiling.setAllowScrolling(true);
				}
 	
				x.mCustomScrollbar({
					theme:"dark",
					callbacks:{
						onTotalScroll:function(){
						if(curr == e.length && off && ontouchstart && el.siblings("footer").length!=0){	 
						
							el.stop().animate({
								marginTop:-el.siblings("footer").height()
							},500,function(){
								e.find(".section-scrollbar").mCustomScrollbar("disable");
							}); 
							e.eq(e.length-1).find(".section-scrollbar").mCustomScrollbar("scrollTo","+=1",{scrollInertia:100});
							bottom=false;
						}
						}
					}
				});
			});
			
 			
 
			e.find(".section-scrollbar").mCustomScrollbar("scrollTo", 1)
			$(window).resize(function () {
				e.css("height", $(window).height());
				el.css("height", $(window).height());
				e.find(".section-scrollbar").css("height", $(window).height());
				e.find(".section-scrollbar").mCustomScrollbar("update");
				
				
				if ($(window).width() < 992) {
					ontouchstart=true;
					$.fn.pagepiling.setAllowScrolling(false);
				} else {
					ontouchstart=false;
					$.fn.pagepiling.setAllowScrolling(true);
				}

			})
			el.addClass("active");
		});
	}
	
	
	/*fixed footer*/
	$(".fixed_footer").each(function() {
      var e=$(this);
	  	 e.wrap("<div class=\"fixed_footer_clone\"><div class=\"fixed_footer_bottom\"></div></div>"); 
		 var wh=$(window).height(),
		 	 parent=e.parent().parent(),
		 	 parent2=e.parent();
			 
		 parent.height(e.innerHeight());
		 
		 $(window).resize(function() {
			 parent.height(e.innerHeight());
			 e.css("max-height",wh=$(window).height());
			 wh=$(window).height();
			 parent2.height($(window).scrollTop() +wh - parent.offset().top);
		})
		$(window).load(function() {
			 parent.height(e.innerHeight());
			 e.css("max-height",wh=$(window).height());
			 wh=$(window).height();
			 parent2.height($(window).scrollTop() +wh - parent.offset().top);
		})
		e.addClass("active"); 
		e.css("max-height",wh=$(window).height());
		parent2.height($(window).scrollTop() +wh - parent.offset().top);
		
		$(window).scroll(function() {
			parent2.height($(window).scrollTop() +wh - parent.offset().top)
		})
		
    });

	$(".dg-bg-roll-left").each(function() {
        var e=$(this);
		e.css("background-position-x",e.width())
		$(window).resize(function(){
			e.css("background-position-x",e.width())
		})
    });
	$(".dg-bg-roll-right").each(function() {
        var e=$(this);
		e.css("background-position-x",-e.width())
		$(window).resize(function(){
			e.css("background-position-x",-e.width())
		})
    });
	$(".dg-bg-roll-top").each(function() {
        var e=$(this);
		e.css("background-position-y",e.height())
		$(window).resize(function(){
			e.css("background-position-y",e.height())
		})
    });
	$(".dg-bg-roll-bottom").each(function() {
        var e=$(this);
		e.css("background-position-y",-e.height())
		$(window).resize(function(){
			e.css("background-position-y",-e.height())
		})
    });
	jQuery('#to_top,#go_up').click(function () {
		jQuery('body,html').stop().animate({
			scrollTop : 0
		}, 800);
	});	
	var backtop = function () {
		Math.max.call(window.scrollTop, document.body.scrollTop, document.documentElement.scrollTop) > 245 ? jQuery('#to_top').fadeIn(300) : jQuery('#to_top').fadeOut(300)
	}
	$(window).load(function () {
		backtop();
	})
	$(window).scroll(function () {
		backtop();
	})

	animationShow({
		"#user-icon" : "#Loginandlanguage",
		"#search-icon" : "#search"
	});
	animationShow({
		"#RightMenu-icon" : "#main_right",
		"#rightClose" : "#main_right"
	});
	animationShow({
		"#rightClose" : "#main_right"
	});
	animationShow({
		"#ico_search" : "#mobile_search"
	});


	$(document).ready(function () {
        jQuery(document).click(function (e) {
		if ($(".nav_ico").length != 0) {
			if (!($(e.target).closest(".nav_ico").length != 0 || jQuery.contains($(".nav_ico")[0], e.target))) {
				$("#header1 .nav_ico .searchBox,#header1 .Loginandlanguage").fadeOut();
				$("#header1 .nav_ico .fa").removeClass("active");
			}
		}
		if ($(".nav_ico").length != 0 && $("#main_right").length != 0) {
			if (!($(e.target).closest("#main_right").length != 0 || jQuery.contains($("#main_right"), e.target) || $(e.target).closest(".nav_ico").length != 0 || jQuery.contains($(".nav_ico")[0], e.target))) {
				$("#main_right").removeClass("active");
				$("#header2 .nav_ico .fa").removeClass("active");
			}
		}
		if ($(".searchMainBox").length != 0) {
			if (!($(e.target).closest(".searchMainBox").length != 0 || jQuery.contains($(".searchMainBox")[0], e.target))) {
				$(".searchMainBox .searchBox").fadeOut();
				$(".searchMainBox .fa").removeClass("active");
			}
		}
		if ($(".nav_ico").length != 0 && $("#main_right").length != 0) {
			if (!($(e.target).closest("#main_right").length != 0 || jQuery.contains($("#main_right"), e.target) || $(e.target).closest(".nav_ico").length != 0 || jQuery.contains($(".nav_ico")[0], e.target))) {
				$("#main_right").removeClass("active");
				$("#header2 .nav_ico .fa").removeClass("active");
			}
		}
	});

	    $("#main_right").appendTo("body")
    })

	jQuery(window).load(function () {
		var e = $(".roll_menu");
		if (e.length != 0) {
			var top = e.offset().top + e.height();
			
			if(e.data("top") > top){
				top =e.data("top");
			}
			
			e.roll_menu({
				MTop : top,
				noroll : 992
			});
		}
		//	e.roll_menu({ MTop:e.offset().top-1});
	});
	
	/*banner anchor*/
	$(".tp-banner a").each(function() {
		if($(this).attr("href")[0]=="#" && $(this).attr("href").length > 1 ){
			$(this).on("click",function(e){	
			if($($(this).attr("href")).length!=0){ 
				e.preventDefault();
				jQuery('body,html').stop().animate({scrollTop : $($(this).attr("href")).offset().top}, 800);
				
			}
			})
		}
	});
})

$(window).load(function(){
	if($("#dnn_content").length!=0){
	if(Math.round($("#dnn_content").offset().top)<Math.round($(".header_bg").height())){ 
		$("#dnn_content").css("paddingTop",$(".header_bg").height())
	}
	}
})


if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	var msViewportStyle = document.createElement("style");
	msViewportStyle.appendChild(
	document.createTextNode("@-ms-viewport{width:auto!important}"));
	document.getElementsByTagName("head")[0].
	appendChild(msViewportStyle);
}



jQuery(document).ready(function ($) {
	
	$("#left_menu,#right_menu").each(function(index, element) {
		var menu=$(this);
        menu.find(".gomenu > ul > li > a").on("click",function(){
			if($(this).siblings("ul").css("display")=="none"){
				menu.find(".gomenu > ul > li >ul").slideUp();
				$(this).siblings("ul").slideDown();
				return false;
			}
		})
    });

	var e = $(".sidemenu-pos .leftMain.fxdenabled,.sidemenu-pos .rightMain.fxdenabled");
	e.each(function () {
		var l = $(this),
			e = l.parents(".sidemenu-pos"),
			offset = 20;
		l.css("max-height", $(window).height() - offset);
		l.mCustomScrollbar({
			autoHideScrollbar: true,
			theme: "light-thin"
		});
		$(this).css("min-height", Math.min(l.height(), $(window).height() - offset));
		var t = e.offset().top - offset,
			th = e.height(),
			h = l.height(),
			b = t + th - h,
			lt = th - h,
			r = true;
		function maxw() {
			l.css({"height":"inherit","min-height":"inherit"});
			if(l.height()>$(window).height() - offset){
				l.css({"height":$(window).height() - offset,"min-height":$(window).height() - offset});
			}
			e.css("min-height", Math.min(l.height(), $(window).height() - offset));
		}
		function newb() {
			t = e.offset().top - offset;
			h = l.height() - offset;
			th = e.height() - offset;
			b = t + th - h;
			lt = th - h;
		}
		$(window).resize(function () {
			maxw();
			l.mCustomScrollbar("update");
		})
		l.resize(function () {
			maxw();
			newb();
		})
		e.resize(function () {
			maxw();
			newb();
			if (l.css("position") == "fixed") {
				l.css({
					"position" : "static",
					"width" : "auto"
				})
				l.width(l.width())
				l.css("position", "fixed")
			}
			if (l.css("position") == "absolute") {
				l.css({
					"position" : "static",
					"width" : "auto"
				})
				l.width(l.width())
				l.css("position", "absolute")
			}
			maxw();
		})
		
		$(window).scroll(function () {
			if ($(".roll_menu").hasClass("roll_activated")) {
				offset = $(".roll_menu.roll_activated").height()+20;
				if (r) {
					maxw();
					newb();
					r = false;
					l.mCustomScrollbar("update");
				}
			} else {
				offset = 20;
				r=true;
			}
			if ($(window).scrollTop() >= t) {
				l.width(l.width())
				l.css({
					"position" : "fixed",
					"top" : offset
				})
			}
			if ($(window).scrollTop() < t) {
				l.width("auto")
				l.css({
					"position" : "relative",
					"top" : 0
				})
			}
			if ($(window).scrollTop() >= b) {
				l.css({
					"position" : "absolute",
					"top" : lt
				})
			}
		})

	});

})

$(document).ready(function () {

  $(".contact02-mapcon").height($('.Contact02PaneB').outerHeight())   
    $(window).resize(function () {  
     $(".contact02-mapcon").height($('.Contact02PaneB').outerHeight())   
  })



  $(".home04-map").height($('.contact-form').outerHeight())   
    $(window).resize(function () {  
  $(".home04-map").height($('.contact-form').outerHeight())    
  })


    $(".home03-map").height($('.Home03PaneB').outerHeight())   
    $(window).resize(function () {  
     $(".home03-map").height($('.Home03PaneB').outerHeight())   
  })


      /*imgbg cover*/
  $(".imgbg-cover03").each(function (index, element) {
    $(this).css("background-image", "url(\"" + $('.contact_img img').attr("src") + "\")");
 });

});



/*header9*/
jQuery(document).ready(function ($) {
	if ($("#header9").length != 0) {
		$("#header9 .nav_ico > .dislay-menu,.header9 .toggle_leftBox").on("click", function () {
			$("html").toggleClass("header9_active")
		})

        $(".header9 .nav_box").height($(window).height());        
		$(".header9 .nav_box").css('margin-top',-$('.header9 .center_top').height())
		$(window).resize(function () {
			$(".header9 .nav_box").height($(window).height());
			$(".header9 .nav_box").css('margin-top',-$('.header9 .center_top').height())
		})

		$("#header9 .nav_ico > .fa-user,#header9 .user-close").on("click", function () {
			$("html").toggleClass("header9_user_active").removeClass("header9_search_active")
		})
		$("#header9 .nav_ico > .fa-search,#header9 .search-close").on("click", function () {
			$("html").toggleClass("header9_search_active").removeClass("header9_user_active")
		})

	}
})

/*header6*/
jQuery(document).ready(function ($) {
	    $(".menu_res").height($(window).height()-$('.header_top').height()-$('.header_bottom').outerHeight());
	$(window).resize(function () {
		$(".menu_res").height($(window).height()-$('.header_top').height()-$('.header_bottom').outerHeight());
	});	
	
});
jQuery(document).ready(function ($) {
	if ($("#header6").length != 0) {
		var e=$(".header6close");
		
		if(e.data("stg")=="push-content"){
			e.appendTo(".dnngo-main");
			$("#header6").appendTo(".dnngo-main");
			var oneclick=true;
			$(".header6close").on("click", function () {
				if(oneclick){
					oneclick=false;
					if($("html").hasClass("header6_active")){
						$("html").removeClass("header6_active").delay(500).queue(function(){ oneclick=true; $(this).removeClass("push-content").dequeue(); })
					}else{
						$("html").addClass("header6_active push-content").delay(500).queue(function(){ oneclick=true;  $(this).dequeue(); })
					}
				}
			})
		}else{
			$(".header6close").on("click", function () {
				$("html").toggleClass("header6_active "+$(this).data("stg"))
			})
		
		}
	}

})

jQuery(document).ready(function ($) {
	jQuery(".HoverStyle_4 #dnngo_megamenu .primary_structure").lavaLamp({
		fx : 'easeOutExpo',
		speed : 600
	});
});

/*header7*/
jQuery(document).ready(function ($) {

	if ($("#header7").length != 0) {
    
		var e = $("#header7"),
		im = e.find(".primary_structure").children("li:not(.back)"),
		l = im.length,
		time = 200;
		c = Math.round(l / 2) - 1;
		e.find(".primary_structure").height(im.eq(0).outerHeight(true));
		im.slice(0, c + 1).addClass("left-item");
		im.slice(c + 1, l).addClass("right-item");
		$(this).find(".dnn_logo").insertAfter(im.eq(c)).wrap("<li class=\"menulogo\"></li>");
    e.find(".primary_structure > .back").hide();
		var logo = e.find(".menulogo")
			ImgLoad(function () {
				var left = logo.position().left;
				var right = logo.position().left + logo.outerWidth(true);
				var i1 = 0,
				i2 = c + 1;
				logo.addClass("logo-at");
				var leftitem = function () {
					var t = im.eq(c - i1);
					left = left - t.outerWidth(true)
						t.css("left", left).addClass("left-at");
					i1++;
					if (i1 < c + 1) {
						setTimeout(leftitem, time);
					}else{
            
            if($(".HoverStyle_4").length==1 && t.hasClass("current")){
              e.find(".primary_structure > .current").mouseout()
              e.find(".primary_structure > .back").fadeIn();
            }
            
          }
				}
				var rightitem = function () {
					var t = im.eq(i2);
					if (i2 != c + 1) {
						right = right + im.eq(i2 - 1).outerWidth(true)
					}
					t.css("left", right).addClass("right-at");
					i2++;
					if (i2 < l) {
						setTimeout(rightitem, time);
					}else{
            if($(".HoverStyle_4").length==1 && t.hasClass("current")){
              
              e.find(".primary_structure > .current").mouseout();
              e.find(".primary_structure > .back").fadeIn();
            }
            
          }
				}
				setTimeout(leftitem, time);
				setTimeout(rightitem, time);

				var resize = function () {
					var left2 = logo.position().left;
					var right2 = logo.position().left + logo.outerWidth(true);
					for (i = 0; i < l; i++) {
						if (i < c + 1) {
							var t = im.eq(c - i);
							left2 = left2 - t.outerWidth(true)
								t.css("left", left2)
						} else {
							var t = im.eq(i);
							if (i != c + 1) {
								right2 = right2 + im.eq(i - 1).outerWidth(true)
							}
							t.css("left", right2);

						}
					}
				}
    
        
				$(window).resize(function () {
					resize();
				})
				var roll = true;
				$(window).scroll(function () {
					if ($(".roll_menu").hasClass("roll_activated") && roll) {
						roll = false;
						resize();
					} else if (!$(".roll_menu").hasClass("roll_activated") && !roll) {
						roll = true;
						resize();
					}
				})

			}, im)

			$("#header7 .nav_ico span,.header7 .nav_ico span").on("click", function () {
				$(this).toggleClass("active");
				$(".rightBox.header7").toggleClass("active");
			})
			jQuery(document).click(function (e) {
				if ($(".rightBox.header7").length != 0) {
					if (!($(e.target).closest("#header7 .nav_ico span").length != 0 || $(e.target).closest(".rightBox.header7").length != 0 || jQuery.contains($(".rightBox.header7")[0], e.target))) {
						$("#header7 .nav_ico span").removeClass("active");
						$(".rightBox.header7").removeClass("active");
					}
				}
			});
		if($(".userProfileImg img").length!=0){
			$(".userProfileImg img").attr("src", changeURLPar($(".userProfileImg img").attr("src"), "h", 100))
			$(".userProfileImg img").attr("src", changeURLPar($(".userProfileImg img").attr("src"), "w", 100))
			$(".header7.rightBox .userProfileImg").prependTo(".header7 .Login").wrap("<ul class=\"buttonGroup\"></ul>");
			var rg = $("<ul class=\"registerGroup\"></ul>");
			$(".header7.rightBox .userMessages").appendTo(rg)
			$(".header7.rightBox .userNotifications ").appendTo(rg);
			rg.appendTo(".header7 .Login");
		}
	}
})
function changeURLPar(contentUrl, key, keyValue) {
	var pattern = key + '=([^&]*)';
	var replaceText = key + '=' + keyValue;
	if (contentUrl.match(pattern)) {
		var tmp = '/' + key + '=[^&]*/';
		tmp = contentUrl.replace(eval(tmp), replaceText);
		return (tmp);
	} else {
		if (contentUrl.match('[\?]')) {
			return contentUrl + '&' + replaceText;
		} else {
			return contentUrl + '?' + replaceText;
		}
	}
	return contentUrl + '\n' + key + '\n' + keyValue;
}


/*home14*/
jQuery(document).ready(function ($) {
    var home14_banner_h=parseInt($('.home14-con').height()/2);	
  	$('.home14-con').css('margin-top',-home14_banner_h);  
    $(window).resize(function () {
      var home14_banner_h=parseInt($('.home14-con').height()/2);	
      $('.home14-con').css('margin-top',-home14_banner_h);  
	})

})

jQuery(document).ready(function ($) {
	
	if($(".mobile_header").length==0){
		return false;
	}
	var mobiletop=$(".mobile_header").offset().top;
	if($(window).scrollTop()>=mobiletop){
		$(".mobile_nav").css("position","fixed");
	}
	$(window).scroll(function(){
		if($(window).scrollTop()>mobiletop){
			$(".mobile_nav").css("position","fixed").addClass("header-fixed");
		}else{
			$(".mobile_nav").css("position","absolute").removeClass("header-fixed");
		}
	})
	
})


//IE Fix for "jumpy" fixed bacground

if(navigator.userAgent.match(/Trident\/7\./)) {
	document.body.addEventListener("mousewheel", function() {
	  event.preventDefault();
	  var wd = event.wheelDelta;
	  var csp = window.pageYOffset;
	  window.scrollTo(0, csp - wd);
	});
  }