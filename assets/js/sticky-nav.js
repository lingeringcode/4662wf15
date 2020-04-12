jQuery(document).ready(function($){
	var  mn = $(".nav-pre-scroll");
	    mns = "nav-scrolled";
	    n = $('nav').height();

	$(window).scroll(function() {
	  if( $(this).scrollTop() > n ) {
	    mn.addClass(mns);
	  } else {
	    mn.removeClass(mns);
	  }
	});
});