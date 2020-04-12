/**
 *
 * Modified JS from DevJam (05/2015). Trying to learn how they used this code
 *  in conjunction with their HTML header schema + CSS.
 *
 **/

jQuery(document).ready(function($){
  
  // OPENING event card -- USER INTREACTION and loading google maps
    //event full description\   
    $('body').on('click','.schedule_weeks_list .desc_trig', function(event){

      var obj = $(this);
      var attr = obj.closest('.evoLB').attr('data-week_id');
      if(typeof attr !== typeof undefined && attr !== false){
        var week_id = attr;
        var week = $('#'+week_id);
      }else{
        var week = obj.closest('.ajde_evcal_calendar');
      }
            
      var evodata = week.find('.evo-data');

      // whole calendar specific values
      var ux_val__ = evodata.data('ux_val');
      var accord__ = evodata.data('accord');
      
      // event specific values
      var ux_val = obj.data('ux_val');
      var exlk = obj.data('exlk');      
      
      // override overall calendar user intereaction OVER individual event UX
      if(ux_val__!='' && ux_val__!== undefined && ux_val__!='00'){
        ux_val = ux_val__;
      }

      if(ux_val=='none'){
        return false;
      }else{
        // redirecting to external link
        if(exlk=='1' ){
          // if there is a href and <a>
          if( obj.attr('href')!='' &&  obj.attr('href')!== undefined){
            return;

          // if there is no href like single event box  
          }else{
            var url = obj.siblings('.evo_event_schema').find('a').attr('href');

            window.location = url;
            return false;
          }
        }else{
          
          var click_item = obj.siblings('.event_description');
          if(click_item.hasClass('open')){
            click_item.slideUp().removeClass('open');
          }else{
            // accordion
            if(accord__=='1'){
              week.find('.event_description').slideUp().removeClass('open');
            }
            click_item.slideDown().addClass('open');
            
          }
              
          return false;
        }
      }
    });
})