$(document).foundation();
$(document).ready(function () {
		$(".downvote").click(function(){
				$(".downvote").addClass("hidden");
		});
	$(window).bind("load", function () {
		var footer = $("footer");
		var pos = footer.position();
		var height = $(window).height();
		height = height - pos.top;
		height = height - footer.height();
		if (height > 0) {
			footer.css({
				'margin-top': height + 'px'
			});
		}
	});
	$(function () {
		$.getJSON('/js/dddata.json', function (data) {
			console.log('success');
			$('#avatar-select').ddslick({
				data: data,
				showSelectedHTML: false,
				selectText: "Select Avatar",
				width: 100 + "%",
				height: 200,
				background: "#FFFFFF",
				onSelected: function (selectedData) {
					//callback function: do something with selectedData;
				}
			});
		}).error(function () {
			console.log('error');
		});
	});
});
