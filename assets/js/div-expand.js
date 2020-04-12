jQuery(document).ready(function($){

  //for larger syllabus sections
  $("section[id^=section-] h2,h3").click(function() {
    $(this).siblings("div").toggle("fast");
  });
  $("section[id^=sub-] div").hide();

  //for schedule days
  $("div[class^=synopsis]").click(function() {
    $(this).siblings("div[class^=daily-info]").toggle("fast");
  });
  $("div[class^=daily-info]").hide();

  
  //for course objectives
  $("li[id^=cl-]").click(function() {
    $(this).siblings("li[class^=sub-crisp-list]").toggle("fast");
  });
  $("li[class^=sub-crisp-list]").hide();
});