import './main.css';
var _this = null; //发现这里如果不在全局声明的话，在定时器函数中无法使用。
document.onkeydown = function() {
    new fnAttribute();
}

function fnAttribute() { //构造函数
    _this = this; //给全局声明的变量赋值。如果在这里声明，没有效果，下面使用的时候会报错。
    this.setBack();
    this.oMove = document.createElement("div");
    this.oMove.setAttribute("id", "div2");
    this.oMove.setAttribute("style", "width:18px;height:18px;background:green;position:absolute;");
    document.getElementById("15r5c").appendChild(this.oMove);
    this.keycode = event.keyCode;
    console.log(this.keycode);
    this.speed = 1;
    this.timer = null;
    this.startMove();
}

fnAttribute.prototype.setBack = function() { //把区域分成一个一个的小方块。
    for (var i = 0; i < 30; i++) {
        for (var j = 0; j < 30; j++) {
            this.newDiv = document.createElement("div");
            this.newDiv.setAttribute("id", i + "r" + j + "c");
            this.newDiv.setAttribute("style", "width:18px;height:18px;background:grey;position:absolute;left:" + (20 * j) + "px;top:" + (20 * i) + "px;border:solid 1px white;margin:0;z-index:-1;");
            document.getElementById("div1").appendChild(this.newDiv);
        }
    }
}

fnAttribute.prototype.startMove = function() {
    switch (this.keycode) {
        case 38:
            clearInterval(this.timer);
            this.timer = setInterval(function() {
                _this.fnMoveup()
            }, 1000)
            break;
        case 40:
            clearInterval(this.timer);
            this.timer = setInterval(function() {
                _this.fnMovedown()
            }, 1000)
            break;
        case 37:
            clearInterval(this.timer);
            this.timer = setInterval(function() {
                _this.fnMoveleft()
            }, 1000)
            break;
        case 39:
            clearInterval(this.timer);
            this.timer = setInterval(function() {
                _this.fnMoveright()
            }, 1000)
            break;
        case 17:
            clearInterval(this.timer);
            break;
    }
}
fnAttribute.prototype.fnMoveup = function() { //上下运动，取第二位的字符转化为数字，如果为数字，则后面造字符串的时候从第二位开始，否则从第一位开始。
    var nIf = parseInt((this.oMove.parentNode.id).slice(1, 2));
    if (isNaN(nIf)) {
        if (parseInt((this.oMove.parentNode.id).slice(0, 1)) == 0) { //判断是否到达边界
            clearInterval(timer);
        } else {
            var sUpDivId = parseInt(this.oMove.parentNode.id) - 1 + (this.oMove.parentNode.id).slice(1);
        }
    } else {
        var sUpDivId = parseInt(this.oMove.parentNode.id) - 1 + (this.oMove.parentNode.id).slice(2);
    }
    this.oMove.parentNode.removeChild(this.oMove); //方块运动的方法，在原方块中删除绿色方块，在下一个方块中创建绿色方块。
    document.getElementById(sUpDivId).appendChild(this.oMove);
}

fnAttribute.prototype.fnMovedown = function() { //上下运动，取第二位的字符转化为数字，如果为数字，则后面造字符串的时候从第二位开始，否则从第一位开始。
    var nIf = parseInt((this.oMove.parentNode.id).slice(1, 2));
    if (isNaN(nIf)) {
        var sUpDivId = parseInt(this.oMove.parentNode.id) + 1 + (this.oMove.parentNode.id).slice(1);
    } else {
        if ((this.oMove.parentNode.id).slice(0, 2) == 29) { //向下运动的撞墙的判断。
            clearInterval(timer);
        } else {
            var sUpDivId = parseInt(this.oMove.parentNode.id) + 1 + (this.oMove.parentNode.id).slice(2);
        }

    }
    this.oMove.parentNode.removeChild(this.oMove);
    document.getElementById(sUpDivId).appendChild(this.oMove);
}

fnAttribute.prototype.fnMoveleft = function() {
    var nIf = (this.oMove.parentNode.id).slice(-2, -1); //倒数第二位赋值给nIf
    if (nIf == 0) { //判断倒数第二位是否为零。如果为0，则要继续判断是10还是20。如果这里不做特殊的处理，0减1会变成-1。
        if (isNaN((this.oMove.parentNode.id).slice(-3, -2))) { //如何是字母，就会返回NaN，那就是到头了。
            clearInterval(timer);
        } else if ((this.oMove.parentNode.id).slice(-3, -2) == 1) { //判断倒数第三位是否为1。为1就是10了，不为1就是20，因为最大的数字就是29，所以没有其他的可能了。
            var sLeftDivId = (this.oMove.parentNode.id).slice(-7, -3) + 9 + "c"; //是10，不要正常的减1的方法了，直接手动变成9.
        } else {
            var sLeftDivId = (this.oMove.parentNode.id).slice(-7, -3) + 19 + "c"; //是20，不要正常的减1的方法了，直接手动变成19.
        }
    } else {
        var sLeftDivId = (this.oMove.parentNode.id).slice(-7, -2) + (nIf - 1) + "c"; //正常的减1的方法。
    }
    this.oMove.parentNode.removeChild(this.oMove);
    document.getElementById(sLeftDivId).appendChild(this.oMove);
}

fnAttribute.prototype.fnMoveright = function() {
    var nIf = parseInt((this.oMove.parentNode.id).slice(-2, -1)); //这里与上面向左的运动有区别。向左是减法，向右是加法。这里如果不转化成数字，返回的是"5"，而”5“ + 1返回的是”51“。减法就不会出现这样的情况。原因是减法会产生隐式转换。所以这里需要把取出来的东西转换成数字。
    if (nIf == 9) {
        if ((this.oMove.parentNode.id).slice(-3, -2) == 2) { //如果等于2，就说明到头了。
            clearInterval(timer);
        } else if ((this.oMove.parentNode.id).slice(-3, -2) == "r") { //不是数字，或者等于"r"，说明是1位到2位的转变，直接手动加10.
            var sLeftDivId = (this.oMove.parentNode.id).slice(-7, -2) + 10 + "c";
        } else {
            var sLeftDivId = (this.oMove.parentNode.id).slice(-7, -3) + 20 + "c"; //因为最大是29，所有只有这一种19到20的转变了，不需要判断了。
        }
    } else {
        var sLeftDivId = (this.oMove.parentNode.id).slice(-7, -2) + (nIf + 1) + "c";
    }
    this.oMove.parentNode.removeChild(this.oMove);
    document.getElementById(sLeftDivId).appendChild(this.oMove);
}
