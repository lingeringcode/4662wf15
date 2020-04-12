jQuery(document).ready(function($){
  $("#syllabus h2.subsection").click(function(){
    //slideUp() all sections
    $("#syllabus section div.accordian-subsection").slideUp("fast");
    //slidDown() if the div below the clicked h2 is closed
    if(!$(this).next().is(":visible"))
    {
      $(this).next().slideDown("fast");
    }
  })
})