var windowW = $(window).width();
$(document).ready(function(e){
	background.init();
	var windowW = $(window).width();
	$("#wrapper_back").css({"width" : windowW + "px"});
});
var speedPer = 100,
	backSpeed = 1,
	num = 0,
	status = 0,
	time = 3000,
	defaultTime = 3000,
	setTime,
	lastStep = 0,
	lastPercent = 0,
	resultBack = 0,
	numTotal = 0,
	runTotal = 0,
	hideTotal = 0;

var background = {
	lastNum: 17,
	lastPos: 1390,
	init: function(){
		background.lastNum = 17;
		background.lastPos = 1390;
		$('#wrapper_back_pic span').remove();
		$('#wrapper_back_pic').append('<span></span><span></span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span>');
		$('#wrapper_back_pic').css({'left': '0px', 'width': windowW+'px'});
		$('#wrapper_back_pic span').each(function (e) {
			var pos = e;
			var pos_l = e * 80 -50;
			$(this).css('left', pos_l + 'px');
		});
	},
	setPos: function (speed) {
		background.lastNum++;
		background.addBox();
		$('#wrapper_back_pic').css({'left': '-=80px'});
		$('#wrapper_back_pic span:first').remove();
		background.checkAdd();
	},
	addBox: function () {
	    var newNum = background.lastNum;
	    var newPos = background.lastPos - -80;
	    $('#wrapper_back_pic').append('<span>' + newNum + '</span>');
	    $('#wrapper_back_pic span:last').css('left', newPos + 'px');
	    background.lastPos = newPos;
	},
	checkAdd: function() {
		var back_w = $('#wrapper_back_pic').width();
		var back_l = $('#wrapper_back_pic').position().left;
		if (back_l + back_w <= windowW) {
			$('#wrapper_back_pic').width(back_w + 100);
		}
	}
};
var people = {
	index: 1,
	step: 0,
	dieAnimation: 0,
	run: function() {
		if (people.index == 1) {
			people.index = 2;
			$('#wrapper_people').removeClass('people_hide').removeClass('people_run01').addClass('people_run02');
		} else if (people.index == 2) {
			people.index = 1;
			$("#wrapper_people").removeClass('people_hide').removeClass('people_run02').addClass('people_run01');
		} else {
			people.index = 1;
			$('#wrapper_people').removeClass("people_hide").removeClass("people_run02").addClass("people_run01");
		}
	},
	hide: function() {
		//alert("sd");
		people.index = 3;
		$("#wrapper_people").removeClass('people_run02').removeClass('people_run01').addClass('people_hide');
	},
	die: function() {
		$('#wrapper_people').hide();
		$('#die').show();
		$('#die_people1').addClass('die_people1_ani');
		$('#die_people2').addClass('die_people2_ani');
		$('#die_people3').addClass('die_people3_ani');
		setTimeout(people.dieAni, 500);
	},
	dieAni: function() {
		$('#die').hide();
		$('#die_cloud').show().addClass('people_beat');
		var people_punchcombo = $('#people_punchcombo')[0];
		people_punchcombo.play();
		setTimeout(people.dieAni1,500);
	},
	dieAni1: function() {
		$('#die_people1').removeClass('die_people1_ani');
		$('#die_people2').removeClass('die_people2_ani');
		$('#die_people3').removeClass('die_people3_ani');
		people.dieAnimation = 1;
		if (people.dieAnimation == 1 && resultBack == 1) {
			$('#result').show();
		}
	},
	reset: function() {
		people.dieAnimation = 0;
		$('#die_cloud').hide();
		$("#wrapper_people").removeClass('people_run01').removeClass('people_run02').removeClass('people_hide');
		$('#wrapper_people').show();
	}
}
function check() {
	var n = num +1;
	if (n%7 == 0) {
		return false;
	}
	var s_num = n.toString();
	if (s_num.indexOf("7") > -1) {
		return false;
	}
	return true;
}

function timeCount() {
	time -= speedPer;
	showTime();
	if (time > 0) {
		setTime = setTimeout("timeCount()", speedPer);
	}
	if (time == 0) {
		gameOver();
	}
}
function showTime() {
	var s_time = time / 1000;
	$("#layer_time_num").html(s_time);
}

function resetTime() {
	clearTimeout(setTime);
	time = defaultTime;
	timeCount();
}



function gameOver(){
	people.die();
	status = -1;
	lastStep = num;
	num = 0;
	$("#layer").hide();
	clearTimeout(setTime);
	var resultString = '';
	var shareString = '';
	var shareString1 = '';
	if (lastStep <= 15) {
		resultString = '这么垃圾还好意思学人家摆摊，进去蹲几年吧！';
	} else if (lastStep > 15 && lastStep <= 30) {
		resultString = '傻逼了吧，进去了吧，腿短还学人摆摊，辣鸡';
	} else if (lastStep > 30 && lastStep <= 45) {
		resultString = '从前有个卖炒饭的小哥，然后就没然后了！';
	} else if (lastStep > 45 && lastStep <= 60) {
		resultString = '你别以为你长得帅我就不抓你！';
	} else if (lastStep > 60 && lastStep <= 75) {
		resultString = '哎哟我去，吃啥长大的，长腿欧巴！';
	} else if (lastStep > 75 && lastStep <= 90) {
		resultString = '你再快点，小心没有朋友！';
	} else if (lastStep > 90 && lastStep <= 110) {
		resultString = '不愧是快枪手，我服！';
	} else if (lastStep > 110 && lastStep <= 140) {
		resultString = '卧槽，吊炸天的智商，请收下我的膝盖！';
	} else {
		resultString = '你别跑呀，我不查你还不行吗！';
	}
	$("#result1").html(resultString);
	$('#num').html(lastStep);
	resultBack = 1;
	var peopleScream = $('#people_scream')[0];
	peopleScream.play();
}

function tryAgain() {
	people.reset();
	$('#layer_btn_hide').removeClass('btn_hide_hover');
	$('#layer_btn_run').removeClass('btn_run_hover');
	time = 3000;
	showTime();
	background.init();
	status = 0;
	lastStep = 0;
	$('#layer').show();
}

function run() {
	if (!check()) {
		gameOver();
	} else{
		people.run();
		num += 1;
		background.setPos(backSpeed);
		resetTime();
	}
}


function pass() {
    if (check()) {
    	gameOver();
    }
    else {
    	//alert("dc");
        people.hide();
        num += 1;
        background.setPos(backSpeed);
        resetTime();
    }
}


//判断设备，其实并没有什么卵用
function isPc() {
	var userAgentInfo = navigator.userAgent;
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
	var flag = true;
	for (var i = 0; i < Agents.length; i++) {
		if (userAgentInfo.indexOf(Agents[i]) > 0) {
			flag = false;
			break;
		}
	return flag;
	}
}

var touchStart = "touchstart";
var touchEnd = "touchend";
if (isPc()) {
	touchStart = "mousedown";
	touchEnd = 'mouseup';
}
var isPc = isPc();
var live = $.fn.live;
$.fn.live = function(obj) {
	if (typeof obj == "object") {
		if (isPc) {
			if (obj.touchStart) {
				obj.mousedown = obj.touchstart;
				delete obj.touchstart;
			};
			if (obj.touchend) {
				obj.mouseup = obj.touchend;
				delete obj.touchend;
			}
		}
	}
	live.apply(this,arguments);
}

var bind = $.fn.bind;
$.fn.bind = function(obj) {
	if (typeof obj == "object") {
		if (isPc) {
			if (obj.touchStart) {
				obj.mousedown = obj.touchstart;
				delete obj.touchstart;
			};
			if (obj.touchend) {
				obj.mouseup = obj.touchend;
				delete obj.touchend;
			}
		}
	}
	bind.apply(this,arguments);
}



//开始时
$('#rule_go').die().live({
	'touchstart': function () {
	    $('#rule_go').addClass('rule_go');
	    $('#rule').hide();
	    $('#layer').show();
	},
	'touchend': function () {
	  
	    $('#J_rule_btn').removeClass('btn_rule_run_hover');
	}
});



//跑跟躲避按钮
$('#layer_btn a').bind({
    'touchstart': function (e) {
        var btn_type = $(this).attr('id');
        if (btn_type == 'layer_btn_hide') {
            if (status != -1 && num != 0) {
                $('#layer_btn_hide').addClass('btn_hide_hover');
                pass();
                //alert(btn_type); 
            }
        } else {
            if (status != -1) {
                $('#layer_btn_run').addClass('btn_run_hover');
                run();
                 
            }
        }
    },
    'touchend': function (e) {
        var btn_type = $(this).attr('id');
        if (btn_type == 'layer_btn_hide') {
            if (status != -1 && num != 0) {
                $('#layer_btn_hide').removeClass('btn_hide_hover');
                 
            }
        } else {
            if (status != -1) {
                $('#layer_btn_run').removeClass('btn_run_hover');
                 
            }
        }
    }
});

//分享





//再来一次
$('#again').die().live({
    'touchstart': function () {
        $('#again').addClass('again_hover');
        $('#result').hide();
        tryAgain();
    },
    'touchend': function () {
        $('#again').removeClass('again_hover');
    }
});


//如何玩，规则
$('#how').die().live({
    'touchstart': function () {
        $('#result').hide();
        tryAgain();
        $('#rule').show();
        $('#layer').hide();
    }
});


