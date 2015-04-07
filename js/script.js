(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var statsLoaded = false;

$( document ).ready(function() {
	//animateStats();
	fontResize();
	$('#pin1').waypoint('sticky');
	$('#pin2').waypoint('sticky');
	$('#pin3').waypoint('sticky');
	$('#pin4').waypoint('sticky');
	$('#pin5').waypoint('sticky');
	$('#pin6').waypoint('sticky');

	$(window).on('resize', function(){
		fontResize();
	});

	//scroll animations
	var controller = new ScrollMagic();

	if ($(window).width() > 749){
		var logoTween = TweenMax.fromTo("#logo-big", 25, 
			{css: {left:"15.73%", top:"3%", width:"68.54%"}},
			{css: {left:"8%", top:"45%", width: "27%"}}
		);

		var logoScene = new ScrollScene({/*triggerElement: "header",*/ duration: 750})
							.setTween(logoTween)
							.addTo(controller);
	}

	var statScene = new ScrollScene({triggerElement: "#stats-trigger"})
						.on('start', function(){
							if (!statsLoaded){
								animateStats();
								statsLoaded = true;
							}
						})
						.addTo(controller);

});

function fontResize(){
	var headWidth = $("header").width(); 
	var els = [
		{"selector" : "header h1", "scale" : 8.73, "min" : 58},
		{"selector" : "header h1 .title-highlight", "scale" : 4.64, "min" : 100},
		{"selector" : "header .title-description", "scale" : 26.66, "min" : 21},
		{"selector" : "header .byline-main", "scale" : 26.66, "min" : 17},
		{"selector" : "header .byline-sub", "scale" : 43.63, "min" : 14}
	];
	
	for (var i in els){
		var el = els[i];
		var newSize = Math.ceil(parseInt(headWidth)/el.scale);

		if (newSize < el.min){
			newSize = el.min;
		}

		$(el.selector).css('font-size', newSize+"px");

	}
}

function animateStats(){
	for (var j=1; j<=$('.progress-radial').length; j++){

		var whichStat = j;
		var totalPercent = $('#stat-'+j).attr('data-total');

		for (var i=1; i<=totalPercent; i++){
			makeTimeout(j, i, totalPercent);
		}
	}
}

function makeTimeout(stat, num, total){
	setTimeout(function(){
		$('#stat-'+stat).removeClass('progress-'+(num-1));
		$('#stat-'+stat).addClass('progress-'+num);
		$('#stat-'+stat+' .overlay .percent-num').html(num);
	}, (1500/total)*num);
}

},{}]},{},[1])