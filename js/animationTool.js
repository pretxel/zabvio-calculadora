$(document).ready(function() {
			
			// initialize the plugin, pass in the class selector for the sections of content (blocks)
			var scrollorama = $.scrollorama({ blocks:'.scrollblock', enablePin:false });
			
			

			// assign function to add behavior for onBlockChange event
			scrollorama.onBlockChange(function() {
				var i = scrollorama.blockIndex;
				$('#console')
					.css('display','block')
					.text('onBlockChange | blockIndex:'+i+' | current block: '+scrollorama.settings.blocks.eq(i).attr('id'));
					// alert("Alert");
			});
			
			// lettering.js for coolness
			// $('#title').lettering();
			// $('#title span')
			// 	.css('display','block')
			// 	.css('float','left');
			// $('.char9').css('padding-left','6px');
			
			
			
			// animate some examples
			scrollorama
				// .animate('#fly-in',{ delay: 400, duration: 100, property:'right',  start:-200, end:0 })
				.animate('#fly-in',{ delay: 400, duration: 100, property:'opacity',  start:0 });
			
			// animate the parallaxing
			scrollorama
				.animate('#parallax2',{ delay: 400, duration: 600, property:'top', start:800, end:-800 })
				.animate('#parallax3',{ delay: 200, duration: 1200, property:'top', start:500, end:-500 });
			
			// animate some easing examples
			// var $easing = $('#easing'),
			// 	$clone = $easing.clone().appendTo('#examples-easing')
			// 					.css({position:'relative',top:'-2.95em'})
			// 					.lettering();
			// $easing.css({ color: '#131420', textShadow: '0 1px 0 #363959' });
			// easing_array = [	'easeOutBounce',
			// 					'easeOutQuad',
			// 					'easeOutCubic',
			// 					'easeOutQuart',
			// 					'easeOutQuint', 
			// 					'easeOutExpo' 		];
			// $clone.find('span')
			// 	.each( function( idx, el ){
			// 		scrollorama.animate( $(this), {	delay:400, duration: 500, 
			// 										property:'top', end: 300,
			// 										easing: easing_array[idx] });
			// 	})
			
		});