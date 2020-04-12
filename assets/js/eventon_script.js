/*
	Javascript code that is associated with the front end of the calendar
	version: 2.2.21
*/
jQuery(document).ready(function($){
	
	init();

	/**
	 * run these on page load
	 * @return void 
	 */
	function init(){
		init_run_gmap_openevc();
		fullheight_img_reset();	
		run_gototoday();	
	}


	// GO TO TODAY button
	// @since 2.2.25 - coming soon
		function run_gototoday(){
			$('.ajde_evcal_calendar').find('.evo-gototoday-btn').each(function(){
				obj = $(this);
			});
		}

	// LIGHTBOX
		var popupcode = "<div class='evo_popup' style='display:none'><div class='evo_popin'><a class='evopopclose'>X</a><div class='evo_pop_body evcal_eventcard'></div></div></div><div class='evo_popbg' style='display:none'></div>";
		$('body').append(popupcode);
		
		// close popup
		$('.evopopclose').click(function(){
			$(this).closest('.evo_popup').fadeOut().siblings('.evo_popbg').fadeOut();
		});
		// close with click outside popup box when pop is shown
			$(document).mouseup(function (e){
				var container=$('.evo_pop_body');
				
					if (!container.is(e.target) // if the target of the click isn't the container...
						&& e.pageX < ($(window).width() - 30)
					&& container.has(e.target).length === 0) // ... nor a descendant of the container
					{
						$('.evo_popup').fadeOut(300);
						$('.evo_popbg').fadeOut(300);
					}
				
			});
			
		// LIGHTBOX functionsx
			function prepair_popup(){
				var cur_window_top = parseInt($(window).scrollTop()) + 50;
				$('.evo_popin').css({'margin-top':cur_window_top});				
				$('.evo_pop_body').html('');
			}
			
			function show_popup(){
				$('.evo_popup').fadeIn(300);
				$('.evo_popbg').fadeIn(300);
			}
			
			function appendTo_popup(content){
				$('.evo_pop_body').append(content);
			}
	
	// OPENING event card -- USER INTREACTION and loading google maps
		//event full description\		
		$('body').on('click','.eventon_events_list .desc_trig', function(event){

			var obj = $(this);
			var attr = obj.closest('.evoLB').attr('data-cal_id');
			if(typeof attr !== typeof undefined && attr !== false){
				var cal_id = attr;
				var cal = $('#'+cal_id);
			}else{
				var cal = obj.closest('.ajde_evcal_calendar');
			}
						
			var evodata = cal.find('.evo-data');

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

			//console.log(ux_val);
			// open as popup
			if(ux_val=='3'){
				event.preventDefault();
				
				$('.evo_pop_body').show();
				obj.evoGenmaps({	'_action':'lightbox',	});

				// update border color
					bgcolor = $('.evo_pop_body').find('.evcal_cblock').attr('data-bgcolor');
					$('.evo_pop_body').find('.evopop_top').css({'border-left':'3px solid '+bgcolor});
				
				return false;

			// open in single events page -- require single event addon
			}else if(ux_val=='4'){
				
				if( obj.attr('href')!='' &&  obj.attr('href')!== undefined){
					return;
				// if there is no href like single event box	
				}else{
					var url = obj.siblings('.evo_event_schema').find('a').attr('href');
					window.open(url, '_self');
					return false;
				}

			}else if(ux_val=='2'){
				return;
			}else if(ux_val=='X'){
				return false;
			}else if(ux_val=='none'){
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

					//alert('ff');
					
					var click_item = obj.siblings('.event_description');
					if(click_item.hasClass('open')){
						click_item.slideUp().removeClass('open');
					}else{
						// accordion
						if(accord__=='1'){
							cal.find('.event_description').slideUp().removeClass('open');
						}
						click_item.slideDown().addClass('open');
						
					}
					
					// This will make sure markers and gmaps run once and not multiples			
					if( obj.attr('data-gmstat')!= '1'){				
						obj.attr({'data-gmstat':'1'});
						//load_googlemaps(obj);
						
						obj.evoGenmaps({'fnt':2});
					}
							
					return false;
				}
			}
		});
		

		// call to run google maps on load
		// function init_run_gmap_openevc(delay){
		// 	$('.ajde_evcal_calendar').each(function(){
		// 		if($(this).find('.evo-data').data('evc_open')=='1'){
		// 			$(this).find('.desc_trig').each(function(){
		// 				if(delay!=''){
		// 					$(this).evoGenmaps({'fnt':2, 'delay':delay});
		// 				}else{
		// 					$(this).evoGenmaps({'fnt':2});
		// 				}
		// 			});
		// 		}
		// 	});
		// }
	
	// MONTH jumper
		$('.ajde_evcal_calendar').on('click','.evo-jumper-btn', function(){
			$(this).parent().siblings().find('.evo_j_container').slideToggle();
		});

		// select a new time from jumper
		$('.evo_j_dates').on('click','a',function(){
			var val = $(this).attr('data-val');
			var type = $(this).parent().parent().attr('data-val');
			var container = $(this).closest('.evo_j_container');

			if(type=='m'){
				container.attr({'data-m':val});
			}else{
				container.attr({'data-y':$(this).html() });
			}

			// update set class
				$(this).parent().find('a').removeClass('set');
				$(this).addClass('set');

			if(container.attr('data-m')!==undefined && container.attr('data-y')!==undefined){
				
				var calid = container.closest('.ajde_evcal_calendar').attr('id');
				var evo_data = $('#'+calid).find('.evo-data');
				evo_data.attr({
					'data-cmonth':container.attr('data-m'),
					'data-cyear':container.attr('data-y'),
				});


				ajax_post_content(evo_data.attr('data-sort_by'),calid,'none');

				container.delay(2000).slideUp();
			}
		});

		// change jumper values
		function change_jumper_set_values(cal_id){
			var evodata = $('#'+cal_id).find('.evo-data');
			var ej_container = $('#'+cal_id).find('.evo_j_container');
			var new_month = evodata.attr('data-cmonth');
			var new_year = evodata.attr('data-cyear');

			ej_container.attr({'data-m':new_month});

			// correct month
			ej_container.find('.evo_j_months p.legend a').removeClass('set').parent().find('a[data-val='+new_month+']').addClass('set');
			ej_container.find('.evo_j_years p.legend a').removeClass('set').parent().find('a[data-val='+new_year+']').addClass('set');
		}
	
	// close event card
		$('.eventon_events_list').on('click','.evcal_close',function(){
			$(this).parent().parent().slideUp();
		});		
		
	// change IDs for map section for eventon widgets
		if( $('.ajde_evcal_calendar').hasClass('evcal_widget')){
			cal.find('.evcal_gmaps').each(function(){
				var gmap_id = obj.attr('id');
				var new_gmal_id =gmap_id+'_widget';
				obj.attr({'id':new_gmal_id})
			});
		}

	// show more events on the list
		$('body').on('click','.evoShow_more_events',  function(){
			var evCal = $(this).closest('.ajde_evcal_calendar');
			var evoData = evCal.find('.evo-data');
			var event_count = parseInt(evoData.data('ev_cnt'));
			var show_limit = evoData.data('show_limit');
			
			var eventList = $(this).parent();
			var allEvents = eventList.find('.eventon_list_event').length;


			var currentShowing = eventList.find('.eventon_list_event:visible').length;

			for(x=1; x<=event_count ; x++ ){
				var inde = currentShowing+x-1;
				eventList.find('.eventon_list_event:eq('+ inde+')').slideDown();
			}

			// hide view more button
			if(allEvents > currentShowing && allEvents<=  (currentShowing+event_count)){
				$(this).fadeOut();
			}


			//console.log(currentShowing);
		});
			
	//===============================
	// SORT BAR SECTION
	// ==============================
	
		// display sort section
		$('.evo_sort_btn').click(function(){
			$(this).siblings('.eventon_sorting_section').slideToggle('fast');
		});	
		
		// sorting section	
		$('.evo_srt_sel p.fa').click(function(){		
			$(this).siblings('.evo_srt_options').fadeToggle();
		});
		
			// update calendar based on the sorting selection
			$('.evo_srt_options').on('click','p',function(){		
					
				var evodata = $(this).closest('.eventon_sorting_section').siblings('.evo-data');
				var cmonth = parseInt( evodata.attr('data-cmonth'));
				var cyear = parseInt( evodata.attr('data-cyear'));	
				var sort_by = $(this).attr('data-val');
				var new_sorting_name = $(this).html();
				var cal_id = evodata.parent().attr('id');	
							
				ajax_post_content(sort_by,cal_id,'none');
				
				// update new values everywhere
				evodata.attr({'data-sort_by':sort_by});		
				$(this).parent().find('p').removeClass('evs_hide');
				$(this).addClass('evs_hide');		
				$(this).parent().siblings('p.fa').html(new_sorting_name);
				$(this).parent().hide();

			});
		
		
		// filtering section
		$('.filtering_set_val').click(function(){
			var obj = $(this);
			obj.siblings('.eventon_filter_dropdown').fadeToggle('fast');
			
			
		});	

		
		
			// selection on filter dropdown list
			$('.eventon_filter_dropdown').on('click','p',function(){
				var new_filter_val = $(this).attr('data-filter_val');
				var filter = $(this).closest('.eventon_filter');
				var filter_current_set_val = filter.attr('data-filter_val');
				
				if(filter_current_set_val == new_filter_val){
					$(this).parent().fadeOut();
				}else{
					// set new filtering changes				
					var evodata = $(this).closest('.eventon_sorting_section').siblings('.evo-data');
					var cmonth = parseInt( evodata.attr('data-cmonth'));
					var cyear = parseInt( evodata.attr('data-cyear'));	
					var sort_by = evodata.attr('data-sort_by');
					var cal_id = evodata.parent().attr('id');				
					
					// make changes
					filter.attr({'data-filter_val':new_filter_val});	
					evodata.attr({'data-filters_on':'true'});
					
					ajax_post_content(sort_by,cal_id,'none');
					
					// reset the new values				
					var new_filter_name = $(this).html();
					$(this).parent().find('p').removeClass('evf_hide');
					$(this).addClass('evf_hide');
					$(this).parent().fadeOut();
					$(this).parent().siblings('.filtering_set_val').html(new_filter_name);
				}
			});
		
			// fadeout dropdown menus
			/*
			$(document).mouseup(function (e){
				var item=$('.eventon_filter_dropdown');
				var container=$('.eventon_filter_selection');
				
				if (!container.is(e.target) // if the target of the click isn't the container...
					&& e.pageX < ($(window).width() - 30)
				&& container.has(e.target).length === 0) // ... nor a descendant of the container
				{
					item.fadeOut('fast');
				}
				
			});
*/
		
	// MONTH SWITCHING
		// previous month
		$('body').on('click','.evcal_btn_prev', function(){
			var evodata = $(this).parent().siblings('.evo-data');				
			var sort_by=evodata.attr('data-sort_by');		
			cal_id = $(this).closest('.ajde_evcal_calendar').attr('id');
			
			ajax_post_content(sort_by,cal_id,'prev');			
			
		});
		
		// next month
		$('body').on('click','.evcal_btn_next',function(){	
			
			var evodata = $(this).parent().siblings('.evo-data');				
			var sort_by=evodata.attr('data-sort_by');		
			cal_id = $(this).closest('.ajde_evcal_calendar').attr('id');
			
			ajax_post_content(sort_by, cal_id,'next');
			
		});
			
	/*	PRIMARY hook to get content	*/
		function ajax_post_content(sort_by,cal_id, direction){
			
			// identify the calendar and its elements.
			var ev_cal = $('#'+cal_id); 
			var cal_head = ev_cal.find('.calendar_header');	
			var evodata = ev_cal.find('.evo-data');	

			// check if ajax post content should run for this calendar or not
			
			if(ev_cal.attr('data-runajax')!='0'){
				
				// category filtering for the calendar
				var cat = ev_cal.find('.evcal_sort').attr('cat');
				
				var data_arg = {
					action: 		'the_ajax_hook',
					direction: 		direction,
					sort_by: 		sort_by, 
					filters: 		ev_cal.evoGetFilters(),
					shortcode: 		ev_cal.evo_shortcodes(),
					evodata: 		ev_cal.evo_getevodata()
				};	

				data_arg = cal_head.evo_otherVals({'data_arg':data_arg});				
				
				$.ajax({
					beforeSend: function(){
						ev_cal.find('.eventon_events_list').slideUp('fast');
						ev_cal.find('#eventon_loadbar').show().css({width:'0%'}).animate({width:'100%'});
					},
					type: 'POST',
					url:the_ajax_script.ajaxurl,
					data: data_arg,
					dataType:'json',
					success:function(data){
						// /alert(data);
						//console.log(data);
						ev_cal.find('.eventon_events_list').html(data.content);
						animate_month_switch(data.cal_month_title, ev_cal.find('#evcal_cur'));
						
						evodata.attr({'data-cmonth':data.month,'data-cyear':data.year});
						change_jumper_set_values(cal_id);
															
					},complete:function(){
						ev_cal.find('#eventon_loadbar').css({width:'100%'}).fadeOut();
						ev_cal.find('.eventon_events_list').delay(300).slideDown('slow');
						ev_cal.evoGenmaps({'delay':400});
						init_run_gmap_openevc(600);
						fullheight_img_reset(cal_id);
					}
				});
			}
			
		}
	
	// subtle animation when switching months
		function animate_month_switch(new_data, title_element){
			
			var current_text = title_element.html();
			var hei = title_element.height();
			var wid= title_element.width();
			
			title_element.html("<span style='position:absolute; width:"+wid+"; height:"+hei+" ;'>"+current_text+"</span><span style='position:absolute; display:none;'>"+new_data+"</span>").width(wid);
			
			
			title_element.find('span:first-child').fadeOut(800); 
			title_element.find('span:last-child').fadeIn(800, function(){
				title_element.html(new_data).width('');
			});
		}
	
	// show more and less of event details
		$('.eventon_events_list').on('click','.eventon_shad_p',function(){		
			control_more_less( $(this) );		
		});
		
		$('.evo_pop_body').on('click','.eventon_shad_p',function(){		
			control_more_less( $(this));		
		});	
	
	// actual animation/function for more/less button
		function control_more_less(obj){
			var content = obj.attr('content');
			var current_text = obj.find('.ev_more_text').html();
			var changeTo_text = obj.find('.ev_more_text').attr('data-txt');
			
			if(content =='less'){			
				
				var hei = obj.parent().siblings('.eventon_full_description').height();
				var orhei = obj.closest('.evcal_evdata_cell').height();
				
				obj.closest('.evcal_evdata_cell').attr({'orhei':orhei}).animate({height: (parseInt(hei)+40) });
				
				obj.attr({'content':'more'});
				obj.find('.ev_more_arrow').addClass('less');
				obj.find('.ev_more_text').attr({'data-txt':current_text}).html(changeTo_text);
				
			}else{
				var orhei = parseInt(obj.closest('.evcal_evdata_cell').attr('orhei'));
				
				obj.closest('.evcal_evdata_cell').animate({height: orhei });
				
				obj.attr({'content':'less'});
				obj.find('.ev_more_arrow').removeClass('less');
				obj.find('.ev_more_text').attr({'data-txt':current_text}).html(changeTo_text);
			}
		}
		
	// expand and shrink featured image		
		$('body').on('click','.evcal_evdata_img',function(){
			if(!$(this).hasClass('evo_noclick')){				
				feature_image_expansion($(this), 'click');
			}
		});
		

	// featured image height processing
		function feature_image_expansion(image, type){
			img = image;
			
			var img_status = img.attr('data-status');
			var img_style = img.attr('data-imgstyle');
			
			// if image already expanded
			if(img_status=='open' ){
				img.attr({'data-status':'close'}).css({'height':''});			
			}else{	

				var img_full_height = parseInt(img.attr('data-imgheight'));
				var cal_width = parseInt(img.closest('.ajde_evcal_calendar').width());
					cal_width = (cal_width)? cal_width: img.width();
				var img_full_width = parseInt(img.attr('data-imgwidth'));


				// show at minimized height
				if(img_style=='100per'){
					relative_height = img_full_height;
				}else if(img_style=='full'){
					relative_height = parseInt(img_full_height * (cal_width/img_full_width)) ;
				}else{
					// minimized version
					if(type=='click'){
						relative_height = parseInt(img_full_height * (cal_width/img_full_width));
						relative_height = (relative_height)? relative_height: img_full_height;
						//console.log(relative_height+ ' '+img_full_height+' '+type);
					}else{
						relative_height = img.attr('data-minheight');
					}					
					//relative_height = parseInt(img_full_height * (cal_width/img_full_width));
				}


				// OTHER PRINT
					//console.log(cal_width);
				
				// when to set the status as open for images
				if(img_status=='' && img_style=='minmized'){
					img.attr({'data-status':'close'});
				}else{
					img.attr({'data-status':'open'});
				}
				img.css({'height':relative_height});
			}			
		}

	// reset featured images based on settings
		function fullheight_img_reset(calid){
			if(calid){
				$('#'+calid).find('.eventon_list_event .evo_metarow_fimg').each(function(){
					feature_image_expansion($(this));
				});
			}else{
				$('.evo_metarow_fimg').each(function(){					
					feature_image_expansion($(this));					
				});
			}
		}
		
	
	// treatments for calendar events upon load
		function treat_events(calid){
			if(calid!=''){
				if(is_mobile()){
					$('#'+calid).find('.evo_metarow_getDr form').attr({'target':'_self'});
				}
			}
		}

		// if mobile check
		function is_mobile(){
			return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )? true: false;
		}


})