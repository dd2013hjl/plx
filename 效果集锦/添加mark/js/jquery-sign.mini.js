/* DaTouWang URL: www.datouwang.com */
(function($) {
	var d, cY, indexId = 0,
		removeId, Data = [],
		DOM, changeSignColor = false,
		signColor;
	var f = false,
		bodyColor, changeFontColor = false,
		fontColor;
	var g, Rtop;
	jQuery.sign = {
		bindSign: function(a) {
			DOM = a;
			defined(a);
		},
		setSignColor: function(a) {
			changeSignColor = true;
			signColor = a;
		},
		setBodyColor: function(a) {
			f = true;
			bodyColor = a;
		},
		setFontColor: function(a) {
			changeFontColor = true;
			fontColor = a;
		},
		getSignMessage: function() {
			return Data;
		},
		loadingSign: function(a) {
			loading(a);
			Data.concat(a);
		}
	};
	document.oncontextmenu = function(e) {
		e.preventDefault();
	};

	function defined(c) {
		$(document).on("mousedown", c, function(e) {
			e.preventDefault();
			if (e.which === 3) {
				$('.chooseBox').remove();
				$(c).append("<div class='chooseBox'><ul><li id='addsign'>添加标记</li></ul></div>");
				var l = e.clientX - $(c).offset().left;
				var t = e.clientY - $(c).offset().top;
				$('.chooseBox').css({
					"left": l,
					"top": t
				});
				d = l;
				cY = t;
			}
		});
		$(document).on("click", "#addsign", function(e) {
			e.preventDefault();
			$(c).append("<div class='inputSignBox'></div>");
			$('.inputSignBox').append("<div class='outSignbox'>x</div>");
			$('.inputSignBox').append("<div class='signbox' contenteditable='true' id='inputText' tabindex='-1'><em id='deflutText'>输入标记</em></div>");
			$('.inputSignBox').append("<div class='sureSign'>确定</div>");
			$('.inputSignBox').css({
				"left": d,
				"top": cY
			});
		});
		$(document).on('click', '#inputText', function() {
			$(this).focus();
			$('.signbox em').remove();
		});
		$(document).on('click', '.outSignbox', function() {
			$('.inputSignBox').remove();
		});
		$(document).on('click', '.sureSign', function() {
			if ($('.signbox em').length > 0) {
				$('.inputSignBox').remove();
			} else if ($('.signbox').text().length <= 0) {
				$('.inputSignBox').remove();
			} else {
				var a = $('.signbox').text();
				$('.inputSignBox').remove();
				$(c).append("<div class='signIndex' id='Ts" + indexId + "' theSign='" + a + "'></div>");
				$('#Ts' + indexId).css({
					"left": d - 15,
					"top": cY - 15
				});
				if (changeSignColor) {
					$('#Ts' + indexId).css("border", signColor + " 3px solid");
				}
				indexId++;
				var b = {
					left: d - 15,
					top: cY - 15,
					message: a
				};
				Data[Data.length] = b;
			}
		});
		$(document).on('mousedown', '[id*=Ts]', function(e) {
			var m = $(this).attr('id').replace(/[^0-9]/ig, "");
			if (e.which === 3) {
				e.stopPropagation();
				removeId = m;
				$('.chooseBox').remove();
				g = $(this).css("left").replace(/[^0-9]/ig, "");
				Rtop = $(this).css("top").replace(/[^0-9]/ig, "");
				var l = e.clientX - $(c).offset().left,
					t = e.clientY - $(c).offset().top;
				$(c).append("<div class='chooseBox'><ul><li id='deleteSign'>删除标记</li></ul></div>");
				$('.chooseBox').css({
					"left": l,
					"top": t
				});
			}
		});
		$(document).on('click', '#deleteSign', function() {
			deleteData(g, Rtop);
			$('#Ts' + removeId).remove();
		});
		$(document).on('mouseover', '[id*=Ts]', function() {
			var l = $(this).offset().left,
				T = $(this).offset().top;
			$('.hintBox').remove();
			var t = $(this).attr("theSign");
			$('body').append("<div class='hintBox'>" + t + "</div>");
			var a = $('.hintBox').width(),
				Hh = $('.hintBox').height();
			if (Hh > 35) {
				$('.hintBox').css({
					"text-align": "left"
				});
			}
			$('.hintBox').append("<div class='triangle-down'></div>");
			$('.triangle-down').css({
				"left": a / 2 - 10,
				"top": Hh
			});
			$('.hintBox').css({
				"left": l - a / 2 + 20,
				"top": T - Hh - 10
			});
			if (f) {
				$('.hintBox').css("background", bodyColor);
				$('.triangle-down').css("border-top", "10px solid " + bodyColor);
			}
			if (changeFontColor) {
				$('.hintBox').css("color", fontColor);
			}
		});
		$(document).on('mouseleave', '[id*=Ts]', function() {
			$('.hintBox').remove();
		});
		$(document).click(function() {
			$('.chooseBox').remove();
		});
	}
	function deleteData(a, b) {
		for (var i = 0; i < Data.length; i++) {
			if (Data[i].left === a && Data[i].top === b) {
				Data.splice(i, 1);
				break;
			} else {
				continue;
			}
		}
	}
	function loading(a) {
		var l = Data.length;
		for (var i = 0; i < a.length; i++) {
			$(DOM).append("<div class='signIndex' id='Ts" + l + "' theSign='" + a[i].message + "'></div>");
			$('#Ts' + l).css({
				"left": a[i].left,
				"top": a[i].top
			});
			if (changeSignColor) {
				$('#Ts' + l).css("border", signColor + " 3px solid");
			}
			l++;
		}
		indexId = l;
	}
})(jQuery);