var subScript = (function(){
  var headBannerH = 0;
      var contentPaddingTop;
	var device = '';
	return {
		checkEvt : function(){
			//디바이스, 브라우저 체크이벤트
			if( /Android/i.test(navigator.userAgent)) {
				device = "android";
			} else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
				return navigator.userAgent.match(/(iPhone|iPod)/g) ? device="ios" : device="ipad";
			}else {
				device = "pc";
			}

			var agent = navigator.userAgent.toLowerCase(),
				name = navigator.appName;

			if(name === "Microsoft Internet Explorer" || agent.indexOf("trident") > -1 || agent.indexOf("edg/") > -1) {
				browser = "ie";
				if(name === "Microsoft Internet Explorer") { // IE old version (IE 10 or Lower)
					agent = /msie ([0-9]{1,}[\\.0-9]{0,})/.exec(agent);
					browser += parseInt(agent[1]);
				} else { // IE 11+
					if(agent.indexOf("trident") > -1) { // IE 11
						browser += 11;
					} else if(agent.indexOf("edg/") > -1) { // Edge	
						browser = "edge";
					}
				}
			} else if(agent.indexOf("safari") > -1) { // Chrome or Safari
				if(agent.indexOf("opr") > -1) { // Opera
					browser = "opera";
				} else if(agent.indexOf("chrome") > -1) { // Chrome
					browser = "chrome";
				} else { // Safari
					browser = "safari";
				}
			} else if(agent.indexOf("firefox") > -1) { // Firefox
				browser = "firefox";
			}
		},

		selectEvt : function(){
			//select_form
			$(document).on("click", ".select_form .select", function(){
				if(!$(this).parents(".select_form").hasClass("readonly") && !$(this).parents(".select_form").hasClass("disabled")) {
					if (!$(this).parents(".select_form").hasClass("on")) {
						$(this).parents(".select_form").addClass("on");
						$(this).parents(".add_select").addClass("on");
						$(this).parents(".select_form").find(".option").stop(true, true).slideDown(200);
					} else {
						$(this).parents(".select_form").find(".option").stop(true, true).slideUp(200, function () {
							$(this).parents(".select_form").removeClass("on");
							$(this).parents(".add_select").removeClass("on");
						});
					}
				}
			})
			$(document).on("click", ".select_form .option a", function(){
				if(!$(this).hasClass("disabled")) {
					$(this).parents(".select_form").find(".select").attr("value", $(this).find(".text span").attr("value"));
					$(this).parents(".select_form").find(".select p").text($(this).find(".text span b").text());
					if ($(this).parents(".select_form").hasClass("count")) {
						$(this).parents(".select_form").find(".count_txt").show();
					}
					if ($(this).hasClass("textarea")) {
						$(this).parents(".input_form").find(".textarea_div").parents(".input_area").show();
					} else {
						$(this).parents(".input_form").find(".textarea_div").parents(".input_area").hide();
					}
					$(this).parents(".select_form").find(".select span").show();
					$(this).parents(".select_form").find(".option").stop(true, true).slideUp(200, function () {
						$(this).parents(".select_form").removeClass("on");
						$(this).parents(".add_select").removeClass("on");
					});
				}
			});

			$("body").click(function(e) {
				if ($(".select_form.on .option").is(":visible")) {
					if (!$(".select_form.on").has(e.target).length) {
						$(".select_form.on .option").stop(true, true).slideUp(200, function () {
							$(this).parents(".select_form").removeClass("on");
							$(this).parents(".add_select").removeClass("on");
						});
					}
				}
			});
		},

		tabEvt : function(){
			//탭이벤트
			$(document).on("click", ".cont_tab a", function () {
				if ($(this).parents(".cont_parent").size() > 0) {
					//페이지 내에 탭이 여러개 있어서 부모로 묶어서 구분 지어야할때
					if (!$(this).hasClass("on")) {
						$(this).siblings("a").removeClass("on");
						$(this).addClass("on");
						$(this).parents(".cont_parent").find(".cont_con").eq($(this).parents(".cont_parent").find(".cont_tab a").index($(this))).siblings(".cont_con").css("display", "none");
						$(this).parents(".cont_parent").find(".cont_con").eq($(this).parents(".cont_parent").find(".cont_tab a").index($(this))).css("display", "block");
					}
				} else {
					//페이지 내에 탭이 a태그로 구현되는 탭이 하나라 부모 태그 없어도 될때
					if (!$(this).hasClass("on")) {
						$(this).siblings("a").removeClass("on");
						$(this).addClass("on");
						$(".cont_con").css("display", "none");
						$(".cont_con").eq($(this).index()).css("display", "block");
					}
				}
			});
			//라디오버튼 탭
			$(document).on("click", ".radio_tab .radio_box input", function () {
				if (!$(this).parents(".radio_box").hasClass("on")) {
					$(this).parents(".radio_tab").find(".radio_box").removeClass("on");
					$(this).parents(".radio_box").addClass("on");
					$(this).parents(".radio_tab_parents").find(".radio_tab_con .tab_cont").css("display", "none");
					$(this).parents(".radio_tab_parents").find(".radio_tab_con .tab_cont").eq($(this).parents(".radio_box").index()).css("display", "block");
				}
			});
		},

		accorEvt : function(){
			//아코디언 이벤트
			$(document).on("click", ".accor_div .list .open", function(){
				//아코디언 이벤트, each클래스 있을시 다른 아코디언과 관계 없이 움직임. each클래스 없을시 다른 아코디언 열릴시 닫힘.
				if(!$(this).parents(".list").hasClass("on")){
					if(!$(this).parents(".accor_div").hasClass("each")){
						$(this).parents(".accor_div").find(".list").removeClass("on");
						$(this).parents(".accor_div").find(".list .close").stop(true, true).slideUp(300);
					}
					$(this).parents(".list").addClass("on");
					$(this).parents(".list").find(".close").stop(true, true).slideDown(300);
				}else{
					$(this).parents(".list").removeClass("on");
					$(this).parents(".list").find(".close").stop(true, true).slideUp(300);
				}
			});
		},

		resizeEvt : function() {
			$(window).resize(function(){
				var PopupH = 719;
				$(".layer_pop").each(function(){
					$(this).height("");
					$(this).removeClass("scroll");
					if($(this).outerHeight() > PopupH){
						if(PopupH % 2 == 1){
							PopupH = PopupH + 1
						}
						$(this).outerHeight(PopupH);
						$(this).addClass("scroll");
					}
					if($(this).find(".pop_con").siblings(".btn_type").size() > 0){
						$(this).addClass("has_fixed_btn");
					}
				});

				//기본 이미지 리사이징
				$(".img_resize").each(function(){
					if($(this).find("img").size() > 0) {
						//센터크롭 시켜야 하는곳에는 img_resize 클래스 추가
						if($(this).find("img").size() > 0) {
							if($(this).parents(".swiper-container").size() > 0){
								if ($(this).find("img").get(0).naturalWidth * $(this).height() / ($(this).find("img").get(0).naturalHeight * $(this).width()) >= 1){
									$(this).addClass("reverse");
								}
							}else{
								if ($(this).find("img").get(0).naturalWidth * $(this).height() / ($(this).find("img").get(0).naturalHeight * $(this).width()) <= 1){
									$(this).addClass("reverse");
								}
							}
						}
					}
				})
				
				//상품상세 앵커 스크롤
				if($(".item_dtl_div .item_dtl_tab_area .anchor_tab").size() > 0){
					if($(window).scrollTop() + $("header nav").outerHeight() >= $(".item_dtl_div .item_dtl_tab_area").offset().top){
						$(".item_dtl_div .item_dtl_tab_area .anchor_tab").addClass("fixed");
						$(".item_dtl_div .item_dtl_tab_area .anchor_tab").css({"top": $("header nav").outerHeight() - 1});
					}else{
						$(".item_dtl_div .item_dtl_tab_area .anchor_tab").removeClass("fixed");
						$(".item_dtl_div .item_dtl_tab_area .anchor_tab").css({"top":"", "left":""});
					}
				}
				
				//floating
				$(".floating_btn").css("left", $("#wrap").outerWidth() - 92 - $(window).scrollLeft());

				fixedBox();
			});$(window).resize();
		},


		scrollEvt : function() {
			$(".head_banner").css("left",-$(window).scrollLeft());
			var headBannerH;
			var prevScroll = $(window).scrollTop();
			$(window).scroll(function(){

				if($(".head_banner").is(":visible")){
					headBannerH = $(".head_banner").outerHeight();
				}else{
					headBannerH = 0;
				}
				var contentPaddingTop = $("#content").css("padding-top");

				//헤더이벤트
				if ($(window).scrollTop() > 0) {
					$("header").addClass("fix");
					$("header").css("left", -$(window).scrollLeft())
					if($(".head_banner").is(":visible")){
						$("header").css("top", headBannerH);
						$("#content").css("padding-top", contentPaddingTop + headBannerH);
					}else{
						$("header").css("top", "");
						$("#content").css("padding-top", "");
					}
				}else{
					$("header").removeClass("fix");
				}

				//상품상세 앵커 스크롤
				if($(".item_dtl_div .item_dtl_tab_area .anchor_tab").size() > 0){
					if($(window).scrollTop() + $("header nav").outerHeight() >= $(".item_dtl_div .item_dtl_tab_area").offset().top){
						$(".item_dtl_div .item_dtl_tab_area .anchor_tab").addClass("fixed");
						$(".item_dtl_div .item_dtl_tab_area .anchor_tab").css({"top": $("header nav").outerHeight() - 1});
					}else{
						$(".item_dtl_div .item_dtl_tab_area .anchor_tab").removeClass("fixed");
						$(".item_dtl_div .item_dtl_tab_area .anchor_tab").css({"top":""});
					}

					$(".item_dtl_div .item_dtl_tab_area .anchor_tab a").each(function(q){
						if($(window).scrollTop() >= $(".tab_con").eq(q).offset().top - $(".item_dtl_div .item_dtl_tab_area .anchor_tab").outerHeight() - $("header").outerHeight() - parseInt($(".item_dtl_div .item_dtl_tab_area .tab_content .tab_con:not(:first-child)").css("margin-top"))){
							if (!$(".item_dtl_div .item_dtl_tab_area .anchor_tab a").eq(q).hasClass("on")) {
								$(".item_dtl_div .item_dtl_tab_area .anchor_tab a").removeClass("on");
								$(".item_dtl_div .item_dtl_tab_area .anchor_tab a").eq(q).addClass("on");
							}
						}
					})
				}

				//상품상세 하단 구매 옵션 바
				if($(".item_dtl_div .item_bottom_fix_option").size() > 0){
					if($(window).scrollTop() + $("header nav").outerHeight() >= $(".item_dtl_div .item_dtl_tab_area").offset().top){
						if($(window).scrollTop() + $(window).outerHeight() > $(".item_dtl_div").offset().top + $(".item_dtl_div").outerHeight() + $("header nav").outerHeight() + $(".item_dtl_div .item_dtl_tab_area .anchor_tab").outerHeight()){
							$(".item_dtl_div .item_bottom_fix_option").css({"position":"absolute", "bottom": -($("footer").offset().top - $(".item_dtl_div").offset().top - $(".item_dtl_div").outerHeight())})
						}else{
							$(".item_dtl_div .item_bottom_fix_option").css({"position":"", "bottom":0})
						}
					}else{
						$(".item_dtl_div .item_bottom_fix_option").css({"position":"", "bottom":""})
					}
				}


				//floating & Top
				$(".floating_btn").css("left", $("#wrap").outerWidth() - 92 - $(window).scrollLeft());
				if ($(window).scrollTop() >= 200) {
					$(".floating_btn .top_btn").show();
				}else{
					$(".floating_btn .top_btn").hide();
				}

				prevScroll = Math.abs($(window).scrollTop());

				
				fixedBox();
			});$(window).scroll();
		},

		etcEvt : function() {

			//.content padding-top
			setTimeout(() => {
				if($("#content").parents(".main").size() > 0){
					contentPaddingTop = parseInt($("#wrap.main #content").css("padding-top"));
				}else{
					contentPaddingTop = parseInt($("#content").css("padding-top"));
				}
			}, 100);
		
			//띠배너
			if($(".head_banner").is(":visible")){
        headBannerH = $(".head_banner").outerHeight();
				setTimeout(() => {
					$("header").css("top", headBannerH);
					$("#content").css("padding-top", contentPaddingTop + headBannerH);
				},100);
			}else{
				headBannerH = 0;
			}

			$("header").css("left", -$(window).scrollLeft())
			if($(".head_banner").is(":visible")){
				$("header").css("top", headBannerH);
				$("#content").css("padding-top", contentPaddingTop + headBannerH);
			}else{
				$("header").css("top", "");
				$("#content").css("padding-top", "");
			}
			
			//띠배너 닫기 버튼
			$(".head_banner .close_btn").click(function () {
				headBannerH = 0;
				if ($("header.fix").size() > 0) {
					$("header").css("top", "");
				} else {
					$("header").css("top", "0");
				}
				$(this).parents(".head_banner").hide();
				$("#content").css("padding-top", "");
			})

			
			//전체메뉴
			$("header nav .gnb .one_depth").hover(function () {
				$(this).addClass("on");
				if($(this).hasClass("has_two")){
					$(this).find(".two_depth_wrap").stop(true, false).slideDown(200);
				}
			}, function () {
				$(this).removeClass("on");
				$(this).find(".two_depth_wrap").css({"display":"none"});
			})

			//floating
			$(".floating_btn .top_btn").click(function () {
				TweenMax.to($("html, body"), 0.5, {scrollTop: 0})
			})

			//paging 클릭 시 scroll 처리
			$(document).on("click", ".paging a", function () {
				var contentScroll = $(this).parents(".paging").siblings("div:first").offset().top - parseInt($("#content").css("padding-top").split("p")[0]) - 100;
				$(window).scrollTop(contentScroll);
			})


			//footer 패밀리사이트
			$(document).on("click", "footer .familysite .select", function () {
				if (!$(this).parents(".familysite").hasClass("on")) {
					$(this).parents(".familysite").addClass("on");
					$(this).parents(".familysite").find(".option").stop(true, true).slideDown(300);
				} else {
					$(this).parents(".familysite").find(".option").stop(true, true).slideUp(300, function () {
						$(this).parents(".familysite").removeClass("on");
					});
				}
			})
			$(document).on("click", "footer .familysite .option a", function () {
				$(this).parents(".familysite").find(".option").stop(true, true).slideUp(300, function () {
					$(this).parents(".familysite").removeClass("on");
				});
			});


			//레이어팝업 하단고정버튼
			$(".layer_pop").each(function () {
				if ($(this).find(".fixed_btn").size() > 0) {
					$(this).addClass("has_btn");
					if ($(this).find(".fixed_btn a").size() > 1) {
						$(this).find(".fixed_btn").addClass("two");
					}
				}

				if ($(this).find(".bottom_btn").size() > 0) {
					if ($(this).find(".bottom_btn a").size() > 1) {
						$(this).find(".bottom_btn").addClass("two");
					}
				}
			})

			//인풋 + 버튼
			$(".input_form .input_area").each(function () {
				if ($(this).find(".btn").size() > 0) {
					$(this).addClass("has_btn");
				}

				if ($(this).hasClass("pw_view")) {
					$(this).find(".view").click(function () {
						if (!$(this).hasClass("on")) {
							$(this).addClass("on");
							$(this).parents(".input_area").find("input").attr("type", "text");
						} else {
							$(this).removeClass("on");
							$(this).parents(".input_area").find("input").attr("type", "password");
						}
					})
				}
			})

			//체크박스 이벤트
			$(".chk_box input").each(function () {
				$(this).click(function () {
					if (!$(this).parents(".chk_box").hasClass("fix")) {
						//.chk_box에 fix 클래스 넣을시 이벤트 작동 안하게 만들 수 있음.
						if (!$(this).parents(".chk_box").hasClass("on")) {
							$(this).parents(".chk_box").addClass("on");
							$(this).prop("checked", true);
						} else {
							$(this).parents(".chk_box").removeClass("on");
							$(this).prop("checked", false);
						}
					}
				})
			});
			
			// 체크박스 전체 체크
			$(".all_chk_container .chk_box input").each(function(){
				$(this).click(function(){
					if($(this).parents(".chk_div").hasClass("all_chk_div")){				
						// 전체 체크 눌렀을 때
						if($(this).parents(".chk_box").hasClass("on")){
							// 전체 체크 꺼져있을 때
							$(this).parents(".all_chk_container").find("[class*='chk']").addClass("on");
						}else{
							// 전체 체크 켜져있을 때
							$(this).parents(".all_chk_container").find("[class*='chk']").removeClass("on");
						}
					}else{
						//다른 거 눌렀을 때
						if(!$(this).parents(".all_chk_container").find(".all_chk_div .chk_box").hasClass("on")){
							// 전체 체크 꺼져있을 때
							if($(this).parents(".all_chk_container").find(".chk_box").size()-1 == $(this).parents(".all_chk_container").find(".chk_box.on").size()){
								$(this).parents(".all_chk_container").find(".all_chk_div, .all_chk_div *").addClass("on");
							}
						}else{
							// 전체 체크 켜져있을 때
							$(this).parents(".all_chk_container").find(".all_chk_div, .all_chk_div *").removeClass("on");
						}
					}
				});
			});

			$(".has_sub_chk_div input").each(function(){
				$(this).click(function(){
					if($(this).parents(".main_chk").size() > 0){
						if($(this).parents(".chk_box").hasClass("on")){
							$(this).parents(".has_sub_chk_div").find(".sub_chk").addClass("on");
						}else{
							$(this).parents(".has_sub_chk_div").find(".sub_chk").removeClass("on");
						}
					}else{
						if($(this).parents(".has_sub_chk_div").find(".sub_chk").hasClass("on")){
							if(!$(this).parents(".has_sub_chk_div").find(".main_chk").hasClass("on")){
								$(this).parents(".has_sub_chk_div").find(".main_chk").addClass("on")
							}
						}else{
							$(this).parents(".has_sub_chk_div").find(".main_chk").removeClass("on")
						}
					}
				})
			})

			//input X버튼
			var isMouseCheck = new Array();
			$(document).on("click", ".clear_has input", function () {
				if ($(this).parents(".point_div").size() > 0) {
					if ($(this).val() != "0") {
						$(this).parents(".clear_has").find(".delete").show();
					}
				} else {
					if ($(this).val() != "") {
						$(this).parents(".clear_has").find(".delete").show();
					}
				}
			});
			$(document).on("keyup", ".clear_has input", function () {
				if ($(this).parents(".point_div").size() > 0) {
					if ($(this).val() == "0") {
						$(this).parents(".clear_has").find(".delete").hide();
					} else {
						$(this).parents(".clear_has").find(".delete").show();
					}
				} else {
					if ($(this).val() == "") {
						$(this).parents(".clear_has").find(".delete").hide();
					} else {
						$(this).parents(".clear_has").find(".delete").show();
					}
				}
			});
			$(document).on("click", ".clear_has .delete", function () {
				if ($(this).parents(".point_div").size() > 0) {
					$(this).parents(".clear_has").find("input").val("0");
				} else {
					$(this).parents(".clear_has").find("input").val("");
				}
				$(this).parents(".clear_has").find("input").removeClass("on");
				$(this).parents(".clear_has").find(".delete").hide();
				$(this).parents(".clear_has").find("input").focus();
			});


			$(document).on("mouseenter", ".clear_has", function () {
				isMouseCheck[$(".clear_has").index(this)] = true;
			});
			$(document).on("mouseleave", ".clear_has", function () {
				isMouseCheck[$(".clear_has").index(this)] = false;
			});

			$(document).on("focusout", ".clear_has", function () {
				if (!isMouseCheck[$(".clear_has").index(this)]) {
					$(this).find(".delete").hide();
				}
			});


			// on/off btn 이벤트
			$(".on_off_btn_div").each(function(){
				$(this).find("a").click(function(){
					$(this).siblings("a").removeClass("on");
					$(this).addClass("on");
				})
			})
			

			//body클릭 이벤트
			$("body").click(function (e) {
				//footer 패밀리 사이트
				if ($("footer .top .right .familysite .option").is(":visible")) {
					if (!$("footer .top .right .familysite").has(e.target).length) {
						$("footer .top .right .familysite").find(".option").stop(true, true).slideUp(300, function () {
							$("footer .top .right .familysite").removeClass("on");
						});
					}
				}

				//날짜검색 select_date
				if ($(".select_date .calendar_page").is(":visible")) {
					if (!$(".select_date").has(e.target).length) {
						$(".select_date .calendar_page").hide();
					}
				}

			})

			$(document).on("mouseenter", ".tooltip_div", function (e) {
				/* tooltip 이 레이어팝 안에 있을 때 위치 잡기 */
				if ($(this).parents(".layer_pop").size() > 0) {
					$(this).parents('.pop_con').css({'position': 'relative'});
					// left
					if ($(this).parents('.tool').position().left + $(this).find('.tooltip').outerWidth() > 480) {
						$(this).find('.tooltip').css({"left": -$(this).parents('.tool').position().left});
					} else {
						$(this).find('.tooltip').css({"left": ""});
					}
				} else {
					$(this).parents('.pop_con').css({'position': ''});
					
					/* tooltip 이 이너 밖으로 나갈 때 위치 잡기 */
					if($(this).position().left + $(this).find('.tooltip').outerWidth() > $(".inner").position().left + $(".inner").innerWidth()){
						$(this).find('.tooltip').css({"left": "auto", "right": 0});
					}else{
						$(this).find('.tooltip').css({"left": "", "right": "auto"});
					}
				}
			});

			//메인 팝업
			if($(".main_pop").size() > 0){
				$(".main_pop").stop(true, true).fadeIn(300);
				if($(".main_pop .swiper-slide").size() > 1){
					//메인팝업 스와이퍼
					var mainPopSwiper = new Swiper($(".main_pop .swiper-container"), {
						observer: true,
						observeParents: true,
						pagination: {
							el: $(".main_pop .swiper-container .swiper-pagination"),
							type: "fraction",
						},
						loop: true,
						loopAdditionalSlides: 0,
					});
				}
				$(".main_pop .close").on("click", function(){
					$(".main_pop").stop(true, true).fadeOut(300);
				})
			}


			//메인 스와이퍼
			var mainBannerSwiper = new Swiper($(".main_div .main_banner_div .swiper-container"), {
				observer: true,
				observeParents: true,
				pagination: {
					el: $(".main_div .main_banner_div .swiper-container .swiper-pagination"),
					type: "progressbar",
				},
				navigation: {
					nextEl: $(".main_div .main_banner_div .swiper-container .swiper-next"),
					prevEl: $(".main_div .main_banner_div .swiper-container .swiper-prev"),
				},
				loop: true,
				loopAdditionalSlides: 0,
			});
			
			//고객리뷰 스와이퍼
			var customerReviewSwiper = new Swiper($(".main_div .customer_review_div .swiper-container"), {
				slidesPerView: "auto",
				spaceBetween: 24,
				centeredSlides: true,
				loop: true,
				observer: true,
				observeParents: true,
				pagination: {
					el: $(".main_div .customer_review_div .swiper-container .swiper-pagination"),
					type: "progressbar",
				},
				navigation: {
					nextEl: $(".main_div .customer_review_div .swiper-container .swiper-next"),
					prevEl: $(".main_div .customer_review_div .swiper-container .swiper-prev"),
				},
			});

			//제품 전시 스와이퍼 타입
			$(".item_disp_type.func_swiper").each(function (q) {
				var listType = $(this)[0].classList;
				if (listType.contains("grid4")) {
					var grid4Swiper = new Swiper($(this).find(".swiper-container"), {
						slidesPerView: "auto",
						spaceBetween: 24,
						observer: true,
						observeParents: true,
						navigation: {
							nextEl: $(this).find(".swiper-next"),
							prevEl: $(this).find(".swiper-prev"),
						},
					});
				}else if (listType.contains("grid3")) {
					var grid3Swiper = new Swiper($(this).find(".swiper-container"), {
						slidesPerView: "auto",
						spaceBetween: 40,
						observer: true,
						observeParents: true,
						navigation: {
							nextEl: $(this).find(".swiper-next"),
							prevEl: $(this).find(".swiper-prev"),
						},
					});
				}
			})

			//리뷰보기 팝업 이미지 스와이퍼
			$(".review_dtl_pop").each(function (q) {
				var reviewDtlPopSwiper = new Swiper($(this).find(".review_img_swiper"), {
					observer: true,
					observeParents: true,
					spaceBetween: 0,
					pagination: {
						el: $(this).find(".swiper-pagination"),
						type: 'fraction',
					},
					loop: true,
				});
			})


			/* 상품상세 */
			//썸네일
			if ($(".item_dtl_div .thumb_box .swiper-slide").size() > 1) {
				var productDtlSwiper = new Swiper(".item_dtl_div .left_area .thumb_box", {
					observer: true,
					observeParents: true,
					on: {
						slideChangeTransitionStart: function () {
							$(".item_dtl_div .left_area .thumb_tab a").removeClass("on");
							$(".item_dtl_div .left_area .thumb_tab a").eq(this.activeIndex).addClass("on");
						}
					},
				});
			}
			$(".item_dtl_div .thumb_tab a").each(function (q) {
				$(this).click(function () {
					if (!$(this).hasClass("on")) {
						$(".item_dtl_div .thumb_tab a").removeClass("on");
						$(this).addClass("on");
						productDtlSwiper.slideTo(q);
					}
				})
			})

			$(".item_dtl_div .item_dtl_tab_area .anchor_tab a").each(function (q) {
				$(this).click(function () {
					$(this).parents(".anchor_tab").find("a").removeClass("on");
					$(this).addClass("on");
					TweenMax.to($("html, body"), 0.4, {scrollTop: $(".item_dtl_div .item_dtl_tab_area .tab_content .tab_con").eq(q).offset().top - $("header").outerHeight() - $(".item_dtl_div .item_dtl_tab_area .anchor_tab").outerHeight()})
				})
			})

			//상세정보
			var prevOffset;
			$(".product_dtl .tab_content .tab_con .detail_intro .more").click(function () {
				if (!$(this).parents(".detail_intro").hasClass("on")) {
					$(this).parents(".detail_intro").addClass("on");
					$(this).find("span").text("상세정보 접기");
				} else {
					prevOffset = $(".product_dtl .tab_content .tab_con .detail_intro .more").offset().top - $(window).scrollTop();
					$(this).parents(".detail_intro").removeClass("on");
					$(this).find("span").text("상세정보 펼쳐보기");
					$("html, body").scrollTop($(".product_dtl .tab_content .tab_con .detail_intro .more").offset().top - prevOffset);
				}
			})

			$(".product_dtl .bottom_fix .detail .option .selector").click(function () {
				$(".bottom_fix").hide();
				$(".option_layer").show();
				optionLayerFunc($(".option_layer"));

				if ($(".option_layer").css("display") == 'block') {
					$(".option_layer").trigger("click");
				}
			})

			$(document).on("click", ".option_layer .close", function () {
				if ($(".product_dtl").size() > 0) {
					$(".option_layer").hide();
					$(".bottom_fix").show();
				} else {
					$(".option_layer").hide();
					$(".dimd_bg").stop(true, true).fadeOut(300);
					$("html").removeClass("lock");
				}

				if ($(".bottom_fix .detail").css("display") == 'block') {
					$(".bottom_fix .detail .close").trigger("click");
				}
			});

			//옵션레이어 이벤트
			$(document).on("click", ".option_layer .select_box .one_depth", function () {
				if (!$(this).parents(".select_box").hasClass("on")) {
					$(this).parents(".option_layer").find(".select_box.on .two_depth").stop(true, true).slideUp(300, function () {
						$(this).parents(".select_box").removeClass("on");
					})
					$(this).parents(".select_box").addClass("on");
					$(this).parents(".select_box").find(".two_depth").stop(true, true).slideDown(300, function () {
						subScript.resizeEvt();
					});
				} else {
					$(this).parents(".option_layer").find(".select_box.on .two_depth").stop(true, true).slideUp(300, function () {
						$(this).parents(".select_box").removeClass("on");
					})
					$(".option_layer").height("");
				}
			})

			$(document).on("click", ".option_layer .two_depth .txt", function () {
				if (!$(this).parent("div").hasClass("soldout")) {
					if (!$(this).hasClass("on")) {
						$(this).addClass("on");
					} else {
						$(this).removeClass("on");
					}
				}
			})

			//리뷰작성 별점
			$(document).on("click", ".satisfaction .star .click", function () {
				$(".satisfaction .star").removeClass().addClass("star");
				$(".satisfaction .star").addClass($(this).attr("class").split("click")[1].replace(" ", ""));
			})

			//리뷰 이미지 줌인 / 줌아웃 스와이퍼
			$(".review_lst_div .list").each(function (q) {
				var imgIdx = 0
				var reviewDtlSwiper = new Swiper($(this).find(".review_img_swiper"), {
					observer: true,
					observeParents: true,
					spaceBetween: 0,
					pagination: {
						el: $(this).find(".swiper-pagination"),
						type: 'fraction',
					},
					loop: true,
					navigation: {
						nextEl: $(this).find(".swiper-next"),
						prevEl: $(this).find(".swiper-prev"),
					},
				});
				$(this).find(".img").click(function(){
					if($(this).find(".zoom").hasClass("in")){
						imgIdx = $(this).index() + 1;
						$(this).parents(".review_img_box").find(".review_img_nav").hide();
						$(this).parents(".review_img_box").find(".review_img_swiper").show();
						reviewDtlSwiper.slideTo(imgIdx, 0, false);
					}
				})
				$(".zoom.out").click(function(){
					$(this).parents(".review_img_box").find(".review_img_nav").show();
					$(this).parents(".review_img_box").find(".review_img_swiper").hide();
				})
			})

			//1:1문의 이미지 줌인 / 줌아웃 스와이퍼
			$(".inqu_list_div .list").each(function (q) {
				var imgIdx = 0
				var reviewDtlSwiper = new Swiper($(this).find(".inqu_img_swiper"), {
					observer: true,
					observeParents: true,
					spaceBetween: 0,
					pagination: {
						el: $(this).find(".swiper-pagination"),
						type: 'fraction',
					},
					loop: true,
					navigation: {
						nextEl: $(this).find(".swiper-next"),
						prevEl: $(this).find(".swiper-prev"),
					},
				});
				$(this).find(".img").click(function(){
					if($(this).find(".zoom").hasClass("in")){
						imgIdx = $(this).index() + 1;
						$(this).parents(".img_box").find(".inqu_img_nav").hide();
						$(this).parents(".img_box").find(".inqu_img_swiper").show();
						reviewDtlSwiper.slideTo(imgIdx, 0, false);
					}
				})
				$(".zoom.out").click(function(){
					$(this).parents(".img_box").find(".inqu_img_nav").show();
					$(this).parents(".img_box").find(".inqu_img_swiper").hide();
				})
				afterResize(".inqu_img_swiper .img_resize")
			})


			//faq 스와이퍼
			var faqCateSwiper = new Swiper($(".faq_cate_swiper"), {
				slidesPerView: "auto",
				spaceBetween: 8,
				observer: false,
				observeParents: false,
			});

			//select textarea
			$("select").each(function () {
				$(this).change(function () {
					if ($(this).val() == "textarea") {
						$(this).parents(".input_form").find(".textarea_div").parents(".input_area").show();
					} else {
						$(this).parents(".input_form").find(".textarea_div").parents(".input_area").hide();
					}
				})
			})


			/* 마이페이지 주문배송조회 날짜선택*/
			$(".order_div .search_area .btn_div").each(function () {
				$(this).find("a").each(function (q) {
					$(this).click(function () {
						if (!$(this).hasClass("on")) {
							$(this).parents(".btn_div").find("a").removeClass("on");
							$(this).addClass("on");
							$(".order_div .search_area .select_date").removeClass("on");
						}
					})
				})
			})
			$(".order_div .search_area .select_date").click(function () {
				$(".order_div .search_area .btn_div a").removeClass("on");
				$(this).addClass("on");
			});

			$(document).on("click", ".select_date .sel", function () {
				if ($(this).index() == 0) {
					$(".select_date .calendar_page").css("right", "auto");
					$(".select_date .calendar_page").css("left", "0");
					$(".select_date .calendar_page").show(); //개발에서 처리할떄 삭제예정
				} else {
					$(".select_date .calendar_page").css("left", "auto");
					$(".select_date .calendar_page").css("right", "0");
					$(".select_date .calendar_page").show(); //개발에서 처리할떄 삭제예정
				}
			})

			$(document).on("click", ".select_date .calendar_page .month a", function () {
				if ($(".select_date .calendar_page").css("left") == "0px") {
					if ($(this).text().split("월")[0].length == 1) {
						$(".select_date .sel p").eq(0).text($(this).parents(".calendar_page").find(".years p").text() + "-0" + $(this).text().split("월")[0])
					} else {
						$(".select_date .sel p").eq(0).text($(this).parents(".calendar_page").find(".years p").text() + "-" + $(this).text().split("월")[0])
					}
					$(".select_date .sel").eq(0).attr("value", $(".select_date .sel p").eq(0).text());
				} else {
					if ($(this).text().split("월")[0].length == 1) {
						$(".select_date .sel p").eq(1).text($(this).parents(".calendar_page").find(".years p").text() + "-0" + $(this).text().split("월")[0])
					} else {
						$(".select_date .sel p").eq(1).text($(this).parents(".calendar_page").find(".years p").text() + "-" + $(this).text().split("월")[0])
					}
					$(".select_date .sel").eq(1).attr("value", $(".select_date .sel p").eq(1).text());
				}
				$(".select_date .calendar_page").hide();
			});

			var accorInterval;
			$(".pay_info_form .accor_div .top .open").click(function () {
				if (!$(this).parents(".top").hasClass("on")) {
					accorInterval = setInterval(fixedBox, 10);
					$(this).parents(".top").addClass("on");
					$(this).parents(".accor_div").find(".bottom").stop(true, true).slideDown(300, function () {
						clearInterval(accorInterval);
					});
				} else {
					accorInterval = setInterval(fixedBox, 10);
					$(this).parents(".top").removeClass("on");
					$(this).parents(".accor_div").find(".bottom").stop(true, true).slideUp(300, function () {
						clearInterval(accorInterval);
					});
				}
			})

			$(document).on("click", ".fixed_container .pay_way_area .pay_way_div a", function () {
				fixedBox();
			})

			if ($(".pay_comp").size() > 0) {
				if ($(".pay_div .pay_comp .fix_area").outerHeight() >= $(".pay_div .pay_comp .pay_area").outerHeight()) {
					$(".pay_div .pay_comp .pay_area").outerHeight($(".pay_div .pay_comp .fix_area").outerHeight())
				}
			}

			// 팝업 아코디언
			function layerPopAccorResize() {
				var PopupH = 719;
				$(".layer_pop").each(function () {
					$(this).height("");
					if ($(this).outerHeight() > PopupH) {
						if (PopupH % 2 == 1) {
							PopupH = PopupH + 1
						}
						$(this).outerHeight(PopupH);
						$(this).addClass("scroll");
					}
				});
			}
			var layerPopAccorInterval;
			$(document).on("click", ".layer_pop .accor_div .open", function () {
				layerPopAccorInterval = setInterval(layerPopAccorResize, 10);
				setTimeout(function () {
					clearTimeout(layerPopAccorInterval);
				}, 300)
			})

			//개인정보처리방침 앵커
			if ($(".terms_div").size() > 0) {
				if ($(".terms_div").parents(".layer_pop").size() == 0) {
					for (i = 0; i < $(".terms_div .text_div .tit").not(".etc").size(); i++) {
						$(".terms_div .anchor_div").append('<h2><a href="javascript:">' + $(".terms_div .text_div .tit").eq(i).text() + '</a></h2>');
					}

					$(document).on("click", ".terms_div .anchor_div a", function () {
						TweenMax.to($("html, body"), 0.5, {scrollTop: $(".terms_div .text_div .tit").eq($(this).parents("h2").index()).offset().top - $("header").outerHeight() - 1})
					})
				}
			}


			//프린트
			$(".print_btn").on("click",function(){
				var printContent=$(".layer_pop .pop_con").html();
				$("body").append("<div class='print_pop'></div>");
				$(".print_pop").append(printContent);
				$("#wrap").hide();
				window.print();
				$("#wrap").show();
				$(".print_pop").hide();
				$(".print_pop").remove()
			})

			//메일복사 공통
			$(document).on("click", ".mail_copy", function () {
				var copyTextarea = document.createElement("textarea");
				copyTextarea.value = $(this).text();
				document.body.appendChild(copyTextarea);
				copyTextarea.select();
				document.execCommand("copy");
				document.body.removeChild(copyTextarea);
				toastPop("메일 주소가 복사 되었습니다");
			})
		},

		layerPopEvt: function (popName, depth) {

			//팝업이벤트
			//alert팝업, confirm팝업, toast팝업은 개별 함수참고
			var scrollT = 0;
			$("." + popName).stop(true, true).fadeIn(300);
			scrollT = $(window).scrollTop();
			if($("." + popName).hasClass("review_con_pop")){
				var PopupH = 719;
				$(".review_con_pop").each(function(){
					$(this).height("");
					$(this).removeClass("scroll");
					if($(this).outerHeight() > PopupH){
						if(PopupH % 2 == 1){
							PopupH = PopupH + 1
						}
						$(this).outerHeight(PopupH);
						$(this).addClass("scroll");
					}
				});
			}
			if (depth == "y") {
				$("." + popName).css("z-index","14");
				$(".dimd_bg").css("z-index", "13");
			}
			$(".dimd_bg").stop(true, true).fadeIn(300);
			$("html").addClass("lock");

			//닫기
			$("." + popName + " .close").on("click", function () {
				if(!$(this).parents(".accor_div").size() > 0) {
					$("." + popName).stop(true, true).fadeOut(300);
					if (depth == "y") {
						$("." + popName).css("z-index","");
						$(".dimd_bg").css("z-index", "");
					} else {
						if($(".alert_pop").size() == 0){
							$(".dimd_bg").stop(true, true).fadeOut(300);
						}
						$("html").removeClass("lock");
						$("html, body").scrollTop(scrollT);
					}
				}
			});

			
			//팝업 내 스와이퍼 이미지 리사이즈
			if($("." + popName).find(".swiper-container").size() > 0){
				setTimeout(() => {
					afterResize(".swiper-container .img_resize")
				}, 100);
			}
		},
	}
})();

$(document).ready(function(){
	subScript.checkEvt();
	subScript.selectEvt();
	subScript.tabEvt();
	subScript.accorEvt();
	subScript.resizeEvt();
	subScript.scrollEvt();
	subScript.etcEvt();
});

$(window).load(function(){
	subScript.resizeEvt();
});

function optionLayerFunc(thisLayer){
	//옵션레이어 상품선택창 max-height값
	var sumH = 0;
	for(var i=0; i < thisLayer.find(".tit").length; i++) {
		sumH += thisLayer.find(".tit").eq(i).outerHeight(true);
		sumH += thisLayer.find(".select_box").eq(i).outerHeight(true);
	}
	sumH += thisLayer.find(".bottom_btn").outerHeight(true);
	if((thisLayer.outerHeight() - parseInt(thisLayer.find(".pop_con").css("padding-top").split("p")[0]) - 120 - (sumH - thisLayer.find(".select_box.on .two_depth").outerHeight())) % 2 == 0) {
		thisLayer.find(".select_box .two_depth").css("max-height", thisLayer.outerHeight() - parseInt(thisLayer.find(".pop_con").css("padding-top").split("p")[0]) - 120 - (sumH - thisLayer.find(".select_box.on .two_depth").outerHeight()))
	}else{
		thisLayer.find(".select_box .two_depth").css("max-height", thisLayer.outerHeight() - parseInt(thisLayer.find(".pop_con").css("padding-top").split("p")[0]) - 121 - (sumH - thisLayer.find(".select_box.on .two_depth").outerHeight()))
	}
}

function afterResize(selector){
	//이미지 로드 후 리사이징, 비동기 처리 부분
	$(selector).each(function(){
		
		if($(this).find("img").size() > 0) {
			if($(this).parents(".swiper-container").size() > 0){
				if ($(this).find("img").get(0).naturalWidth * $(this).height() / ($(this).find("img").get(0).naturalHeight * $(this).width()) >= 1){
					$(this).addClass("reverse");
				}
			}else{
				if ($(this).find("img").get(0).naturalWidth * $(this).height() / ($(this).find("img").get(0).naturalHeight * $(this).width()) <= 1){
					$(this).addClass("reverse");
				}
			}
		}
	});
}

function alertPop(tit, txt, txt2, btn, url, depth) { //txt : 텍스트, btn : 확인버튼 문구, url : 확인버튼 url 추가시
	//확인버튼만 있는 알럿팝업
	var scrollT = 0;

	//url 입력안할시
	if (url == undefined || url == "") {
		url = 'javascript:';
	} else if (url == "reload") {
		url = 'javascript:location.reload();';
	}

	$("#wrap").append('<div class="alert_pop"><div class="pop_con"><div class="tit"><p>' + tit + '</p></div><div class="txt"><p>' + txt + '</p></div><p class="txt2">' + txt2 + '</p><div class="pop_btn"><a href="' + url + '" class="ok_btn close">' + btn + '</a></div></div></div>');
	if (txt == undefined || tit == "") {
		$(".alert_pop .pop_con .tit").remove();
	}
	if (txt == undefined || txt == "") {
		$(".alert_pop .pop_con .txt").remove();
	}
	if (txt2 == undefined || txt2 == "") {
		$(".alert_pop .pop_con .txt2").remove();
	}


	if ($(".alert_pop").width() % 2 != 0) {
		$(".alert_pop").width($(".alert_pop").width() - 1);
	}
	$(".alert_pop").stop(true, true).fadeIn(300);
	if (depth == "y") {
		$(".dimd_bg").css("z-index", "13");
	}
	$(".dimd_bg").stop(true, true).fadeIn(300);
	scrollT = $(window).scrollTop();
	$("html").addClass("lock");

	$(".alert_pop .close").on("click", function () {
		$(".alert_pop").stop().fadeOut(300, function () {
			$(this).remove();
		});
		if (depth == "y") {
			$(".dimd_bg").css("z-index", "");
		} else {
			$(".dimd_bg").stop().fadeOut(300);
			$("html").removeClass("lock");
			$("html, body").scrollTop(scrollT);
		}
	});
}

function confirmPop(tit, txt, txt2, no, ok, noId, okId, depth) { //txt : 서브텍스트, ok : 확인버튼 문구, no : 취소버튼 문구, okId : 확인버튼 id값(이벤트 처리위해 등록), noId : 취소버튼 id값(이벤트 처리위해 등록)
	//두가지 버튼 지닌 컨펌팝업
	var scrollT = 0;

	$("#wrap").append('<div class="alert_pop"><div class="pop_con"><div class="tit"><p>' + tit + '</p></div><p class="txt">' + txt + '</p><p class="txt2">' + txt2 + '</p><div class="pop_btn two"><a href="javascript:" id="' + noId + '" class="no_btn close">' + no + '</a><a href="javascript:" id="' + okId + '" class="ok_btn">' + ok + '</a></div></div></div>');
	// 입력안할시
	if (tit == undefined || tit == "") {
		$(".alert_pop .pop_con .tit").remove();
	}
	if (txt == undefined || txt == "") {
		$(".alert_pop .pop_con .txt").remove();
	}
	if (txt2 == undefined || txt2 == "") {
		$(".alert_pop .pop_con .txt2").remove();
	}

	if ($(".alert_pop").width() % 2 != 0) {
		$(".alert_pop").width($(".alert_pop").width() - 1);
	}
	$(".alert_pop").stop(true, true).fadeIn(300);
	if (depth == "y") {
		$(".dimd_bg").css("z-index", "13");
	}
	$(".dimd_bg").stop(true, true).fadeIn(300);
	scrollT = $(window).scrollTop();
	$("html").addClass("lock");

	$(".alert_pop .close").on("click", function () {
		$(".alert_pop").stop().fadeOut(300, function () {
			$(this).remove();
		});
		if (depth == "y") {
			$(".dimd_bg").css("z-index", "");
		} else {
			$(".dimd_bg").stop().fadeOut(300);
			$("html").removeClass("lock");
			$("html, body").scrollTop(scrollT);
		}
	});
}

function toastPop(tit) {
	if ($("#wrap").find(".toast_pop").size() > 0) {
		$(".toast_pop").remove();
	}
	$("#wrap").append('<div class="toast_pop"><div class="pop_con"><p class="title">' + tit + '</p></div></div>');
	if ($(".toast_pop").width() % 2 != 0) {
		$(".toast_pop").width($(".toast_pop").width() - 1);
	}
	TweenMax.to($(".toast_pop"), 0.3, {bottom: 40, ease: Power3.easeOut, onComplete: function () {
		TweenMax.to(this.targets(), 0.3, {bottom: -200, delay: 2, ease: Power3.easeIn, onComplete: function () {
				this.targets()[0].remove();
				isToastMake = true;
			}})
	}})
}

// fixed_area (따라다니는 박스)
function fixedBox(){
	var headBannerH;
	if($(".head_banner").is(":visible")){
		headBannerH = $(".head_banner").outerHeight();
	}else{
		headBannerH = 0;
	}

	if($(".fixed_container").size() > 0){
		var topDistance = 0;
		var fixDistance = 15;  // "header" - "fixed_area" 간격! 주고싶은 만큼 조정
		if($(".fixed_container").find(".top_area").size() > 0){
			topDistance = $(".top_area").outerHeight();
			$(".fixed_area").css({"top":topDistance});
		}

		if($(window).scrollTop() >= $(".fixed_container").offset().top - $("header").outerHeight() - headBannerH + topDistance - fixDistance && $(".standard_of_fixed").outerHeight() >= $(".fixed_area").outerHeight()){	
			if($(window).scrollTop() + $(".fixed_area").outerHeight() > $(".fixed_container").offset().top + $(".fixed_container").outerHeight() - $("header").outerHeight() - fixDistance){
				$(".fixed_area").css({"position": "", "top":$(".standard_of_fixed").outerHeight() - $(".fixed_area").outerHeight() + headBannerH + topDistance, "left":""});
			}else{
				$(".fixed_area").css({"position": "fixed", "top": $("header").outerHeight() + fixDistance + headBannerH, "left": $(".inner").offset().left + 860 - $(window).scrollLeft()});
			}
		}else{
			$(".fixed_area").css({"position":"","top": topDistance,"left":""});
		}
	
		if ($(".standard_of_fixed").outerHeight() < $(".fixed_area").outerHeight()) {
			$(".fixed_container").height($(".fixed_area").outerHeight())
		}
	}
	
	$(".standard_of_fixed .list").each(function(q){
		var contentBoxHeight = $(".fixed_container").outerHeight();
		$(this).find(".delete").click(function(){
			if ($(".standard_of_fixed").outerHeight() < $(".fixed_area").outerHeight()) {
				$(".fixed_container").height($(".fixed_area").outerHeight())
			}else{
				contentBoxHeight = contentBoxHeight - $(this).parents(".list").outerHeight();
				$(".fixed_container").height(contentBoxHeight);
				$(this).parents(".list").hide();
			}
		});
	})
}

