jQuery(document).ready(function($){
  $('#cable').lazylinepainter(
    {
      "svgData": pathObj,
      "strokeWidth": 2,
      "strokeColor": "#000000"
  });
  $('#cable').lazylinepainter('paint');
});