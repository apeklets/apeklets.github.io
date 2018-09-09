//Extend jQuery with an isVisible() function
$.fn.isVisible = function() {
	
		var vpH = $(window).height(),
			st = $(window).scrollTop(),
			y = $(this).offset().top;
	
		return ((y < (vpH + st)) && (y > st));
}
$.fn.visible = function(callback) {
	var el = $(this);
	el.on("bV", function() {
		callback();
	});
	var loop = setInterval(function() {
		if( el.isVisible() ) {
			el.trigger('bV');
			clearTimeout(loop);
		}
	}, 500);
}
$.fn.dScroll = function() {
	return ($(window).scrollTop() + window.innerHeight - $(this).offset().top) / (window.innerHeight + $(this).height());
}

$(document).ready(function() {
	//Scroll Effects
    $(window).scroll(function() {
		var wScroll = $(window).scrollTop();
		$('.parallax-bg').css('background-position', 'center ' + (wScroll * -0.50) + 'px');
		var x1 = $('#exp').dScroll();
		var f1 = 0.5 - 0.5 * Math.sin(3*x1 - 1.5 + Math.PI);
		$('#exp').css('background-position', 'center ' + (-0.125 * f1 * wScroll) + 'px');
		$('.jumbotron-content h1').css('font-size', 3 - (wScroll * 0.00055) + 'em');
		$('.jumbotron-content p').css('font-size', 1.4 + (wScroll * 0.00015) + 'em');
		var werk = ($('#werk').offset().top - (2 * wScroll)) * 0.06;
		$('#werk').css('background-position', werk + 'px 0px');
		//Fix Nav on White BG
		var upperBound = $('#types').offset().top;
		var lowerBound = $('#werk').offset().top + $('#werk').height();
		if(upperBound - 40 < wScroll && wScroll < lowerBound + 40) {
			$('.nav-container').addClass('overlay');
		} else {
			$('.nav-container').removeClass('overlay');
		}
	});
	//Animated scroll links
	$('a[href^="#"]').click(function(e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $( $(this).attr('href') ).offset().top + 10
		}, 750);
	});
	//Incoming Animations
	$('#over .col-md-12').css('height', $('#over .col-md-12').height());
	$('#over p').hide();
	$('#over .page-header').visible(function() {
		$('#over').addClass('in');
		setTimeout(function() {
			$('#over p').slideDown(500).promise().then(function() {
				$('#over .col-md-12').css('height', 'initial');
			});
		}, 600);
	});
	$('#exp .exp-list li:last').visible(function() {
		$('.exp-container').addClass('in');
	});
	$('#types .col-md-4:first strong:first').visible(function() {
		$('#types').addClass('in');
		$('#types .col-md-4').each(function(i, e) {
			setTimeout(function() {
				$(e).addClass('in');
			}, 250 * i);
		});
	});
	$('#werk .thumbnail:first').visible(function() {
		$('#werk').addClass('in');
	});
	$('#contact').visible(function() {
		$('#contact').addClass('in');
	})
});