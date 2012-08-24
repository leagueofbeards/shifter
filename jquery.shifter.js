(function($) {
	$.fn.shift = function(options) {
		var options = $.extend( {}, $.fn.shift.defaults, options );
		return this.each(function() {
			$this = $(this);
			$(options.containerDiv + ' ' + options.targetClass).removeClass('hide');
			$(options.containerDiv + ' ' + options.targetClass + ':gt(0)').hide();
	
			for (var i = 0; i < $(options.containerDiv + ' ' + options.targetClass).length; i++)	{
				$(options.controlDiv).append('<a href="#">' + (i+1) + '</a>');
			}
		
			$(options.controlDiv + ' a:eq(0)').addClass('active');
			var rotate = null;
			
			$(options.controlDiv + ' a').click(function() {
				if( !$(this).hasClass('active') ) {
					if(rotate) {
						clearInterval(rotate);
						$(options.controlDiv + ' .active').removeClass('active');
						$(this).addClass('active');
						$(options.containerDiv + ' ' + options.targetClass).stop(true, true)
						$(options.containerDiv + ' ' + options.targetClass + ':visible').fadeOut();
						$(options.containerDiv + ' ' + options.targetClass).eq($(this).index()).fadeIn();
						beginShift();
					}
				}
		
				return false;
			});
				
			function beginShift() {
				rotate = setInterval(function() {
					if( options.useControls == true ) {
						if ($(options.controlDiv + ' .active').next('a').length > 0) {
							$(options.controlDiv + ' .active').next('a').trigger('click');
						} else {
							$(options.controlDiv + ' a:eq(0)').trigger('click');
						}
					}
				}, options.duration );
			};
		
			beginShift();
		});
		
		return $this;
	}

	$.fn.shift.defaults = {
		duration: 5000,
		controlDiv: '.controls',
		containerDiv: '#shifter',
		targetClass: '.shift',
		useControls: true
	};

})(jQuery);