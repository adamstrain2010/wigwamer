$(document).ready(function(){
	$(document).on("click",".nav a", function(){
   		$(".nav").find(".active").removeClass("active");
   		$(this).parent().addClass("active");
	});
	$(document).on("mouseover",".navbar-header",function(){
		console.log("hovery");
		$(this).animate({opacity:0},500);
	});
	$(document).on("mouseleave",".navbar-header",function(){
		$(this).animate({opacity:1},500);
	});
});	


