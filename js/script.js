var moduleUI = (function(moduleUI, $, undefined){

	// GNB 영역 열기
	moduleUI.gnbShow = function(){
		this.init = function(){
			this.gnb = ".gnb",
			this.container = ".container",
			this.openBtn = ".open",
			this.closeBtn = ".close",
			this.speed =  100,
			this.scHeight = $(window).height();
		};
		this.initEvent = function(){
			var objThis = this;
			$(this.openBtn).on("click", function(e){
				e.preventDefault();
				objThis.open();
			});
			$(this.closeBtn).on("click", function(e){
				e.preventDefault();
				objThis.close();
			});
			$("body").on("click", ".bg", function(){
				objThis.close();
			});
		};
		this.open = function(){
			var objThis = this;
			$("body").css({overflow:"hidden"});
			$(this.gnb).css({display:"block", minHeight:this.scHeight}).stop().animate({right:0},objThis.speed, function(){
				$(objThis.container).css({position:"fixed",left:0,top:0});
			});
			$(".wrapper").append("<div class='bg'></div>");
		};
		this.close = function(){
			var objThis = this;
			$(this.gnb).stop().animate({right:"-160px"},objThis.speed, function(){
				$(this).css({display:"none"});
				$("body").css({overflow:"auto"});
			});
			$(this.container).css({position:"relative",left:0,top:0});
			$(".bg").remove();
		};
		this.init();
		this.initEvent();
	};

	// 인풋파일 (인풋파일, 파일명 출력)
	moduleUI.fakeInputFile = function(fileUpload){
		this.init = function( fileUpload){
			this.myfile = fileUpload;
			this.initEvent();
		};
		this.initEvent = function(){
			$("body").on("change", this.myfile, function(){
				var tg = $(this)
				var value = tg.val();
				tg.prev().val( value );
			});
		};
		this.init( fileUpload );
	};
	// 클릭시 리스트 추가 / 삭제
	moduleUI.inputFileAdd = function( ){
		this.init = function(){
			this.listcon01 = ".fileList";
			this.listcon02 = ".labelList";
			this.del = ".remove"
			this.initEvent();
		}
		this.initEvent = function(){
			var that = this;
			$("#addBtn01").on("click", function(e){
				e.preventDefault();
				$(that.listcon01).append("<li><div class='fakefile'><input type='text' /><input type='file' class='fileUpload' /><a href='' class='remove'>삭제</a></div></li>");
			});
			$("#addBtn02").on("click", function(e){
				e.preventDefault();
				$(that.listcon02).append("<li><div><input type='text' placeholder='항목명'' /></div><div><input type='text' placeholder='내용'' /></div><a href='' class='remove'>삭제</a></li>");
			})
			$("body").on("click", that.del, function(e){
				e.preventDefault();
				$(this).parents("li").remove();
			});
		}
		this.init();
	}

	// 서비스메뉴
	moduleUI.serviceMenu = function(){
		this.init = function(){
			this.menu = ".serviceMenu"
			this.initEvent();
		}
		this.initEvent = function(){
			var that = this;
			$(this.menu).on("click", function(){
				var tg = $(this);
				if( !tg.find("> ul").is(":visible") ){
					tg.find("> ul").addClass("active");
					$(".contents").append("<div class='bg02'></div>");
				}else{
					tg.find("> ul").removeClass("active");
					$(".bg02").remove();
				}
			});
			$(this.menu).find("ul > li").on("click",function(e){ e.stopPropagation() })
		}
		this.init();
	};

	return moduleUI;

})(window.moduleUI || {}, jQuery);

$(window).on("load", function(){
	moduleUI.gnbShow();
	moduleUI.fakeInputFile(".fileUpload");
	moduleUI.inputFileAdd();
	moduleUI.serviceMenu();
});

