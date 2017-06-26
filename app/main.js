import './main.css';
var _this = null;
window.onload = function() {
    var obj = new FnAttribute();
    document.onkeydown = function() {
        obj.startMove();
    }
}

function FnAttribute() { //构造函数
    _this = this;
    this.setBack();
    this.oMove = document.createElement("div");
    this.oMove.setAttribute("id", "div2");
    this.oMove.setAttribute("style", "width:18px;height:18px;background:green;position:absolute;");
    document.getElementById("15r5c").appendChild(this.oMove);
    this.aSnake = [];
    this.aSnake.push(2);
    this.sPreParentId = null;
    this.vTimeInterval = 600;
    this.timer = null;
    this.startMove();
    this.keycode = null;
    this.sNewDivId = null;
    this.score = null; //积分
}

FnAttribute.prototype.setBack = function() { //把区域分成一个一个的小方块。
    for (var i = 0; i < 30; i++) {
        for (var j = 0; j < 30; j++) {
            this.newDiv = document.createElement("div");
            this.newDiv.setAttribute("id", i + "r" + j + "c");
            this.newDiv.setAttribute("style", "width:18px;height:18px;position:absolute;left:" + (20 * j) + "px;top:" + (20 * i) + "px;margin:0;z-index:-2;");
            document.getElementById("div1").appendChild(this.newDiv);
        }
    }
}

FnAttribute.prototype.startMove = function() {
    if (this.keycode == event.keyCode) { //如果上一次的输入的方向键与这一次的相同，则什么都不做，这样可以消除反复按同一个键加速运动方块的效果。

    } else if (this.keycode == (event.keyCode + 2)) { //如果这一次的按键的方向与上一次的按键的方向相反的话，那就什么都不做。这样可以避免误操作，向相反的方向运动就是贪吃蛇的误操作。

    } else if (this.keycode == (event.keyCode - 2)) { //如果这一次的按键的方向与上一次的按键的方向相反的话，那就什么都不做。这样可以避免误操作，向相反的方向运动就是贪吃蛇的误操作。

    } else {
        this.fnMakeFood();
        this.keycode = event.keyCode;
        switch (this.keycode) {
            case 38:
                clearInterval(this.timer);
                this.timer = setInterval(function() {
                    _this.fnMoveup(); //由于这个函数前面没有“.”，所以这里面直接用this是指的window。
                }, this.vTimeInterval)
                this.fnMoveup(); //由于setInterval是每次在设定时间之后才执行第一次操作，所以，每次按方向键换方向的时候都会有一个停顿。所以在setInterval之外来单独执行一下。
                break;
            case 40:
                clearInterval(this.timer);
                this.timer = setInterval(function() {
                    _this.fnMovedown();
                }, this.vTimeInterval)
                this.fnMovedown();
                break;
            case 37:
                clearInterval(this.timer);
                this.timer = setInterval(function() {
                    _this.fnMoveleft();
                }, this.vTimeInterval)
                this.fnMoveleft();
                break;
            case 39:
                clearInterval(this.timer);
                this.timer = setInterval(function() {
                    _this.fnMoveright();
                }, this.vTimeInterval)
                this.fnMoveright();
                break;
            case 17:
                clearInterval(this.timer);
                break;
        }
    }
}
FnAttribute.prototype.fnMoveup = function() { //上下运动，取第二位的字符转化为数字，如果为数字，则后面造字符串的时候从第二位开始，否则从第一位开始。
    var oNowDiv = document.getElementById("div2");
    this.sPreParentId = oNowDiv.parentNode.id;
    var nIf = parseInt(this.sPreParentId.slice(1, 2));
    if (isNaN(nIf)) {
        if (parseInt(this.sPreParentId.slice(0, 1)) == 0) { //判断是否到达边界
            clearInterval(this.timer);
            alert("撞到墙壁啦");
            window.location.reload();
        } else {
            this.sNewDivId = parseInt(this.sPreParentId) - 1 + (this.sPreParentId).slice(1);
        }
    } else {
        this.sNewDivId = parseInt(this.sPreParentId) - 1 + (this.sPreParentId).slice(2);
    }
    oNowDiv.parentNode.removeChild(oNowDiv); //方块运动的方法，在原方块中删除绿色方块，在下一个方块中创建绿色方块。
    document.getElementById(this.sNewDivId).appendChild(oNowDiv);
    this.fnEatFood();
    this.fnFollowDiv();
    this.fnFailAlert();
}

FnAttribute.prototype.fnMovedown = function() { //上下运动，取第二位的字符转化为数字，如果为数字，则后面造字符串的时候从第二位开始，否则从第一位开始。
    var oNowDiv = document.getElementById("div2");
    this.sPreParentId = oNowDiv.parentNode.id;
    var nIf = parseInt(this.sPreParentId.slice(1, 2));
    if (isNaN(nIf)) {
        this.sNewDivId = parseInt(this.sPreParentId) + 1 + (this.sPreParentId).slice(1);
    } else {
        if (this.sPreParentId.slice(0, 2) == 29) { //向下运动的撞墙的判断。
            clearInterval(this.timer);
            alert("撞到墙壁啦");
            window.location.reload();
        } else {
            this.sNewDivId = parseInt(this.sPreParentId) + 1 + (this.sPreParentId).slice(2);
        }

    }
    oNowDiv.parentNode.removeChild(oNowDiv);
    document.getElementById(this.sNewDivId).appendChild(oNowDiv);
    this.fnEatFood();
    this.fnFollowDiv();
    this.fnFailAlert();
}

FnAttribute.prototype.fnMoveleft = function() {
    var oNowDiv = document.getElementById("div2");
    this.sPreParentId = oNowDiv.parentNode.id;
    var nIf = this.sPreParentId.slice(-2, -1); //倒数第二位赋值给nIf
    if (nIf == 0) { //判断倒数第二位是否为零。如果为0，则要继续判断是10还是20。如果这里不做特殊的处理，0减1会变成-1。
        if (isNaN(this.sPreParentId.slice(-3, -2))) { //如何是字母，就会返回NaN，那就是到头了。
            clearInterval(this.timer);
            alert("撞到墙壁啦");
            window.location.reload();
        } else if (this.sPreParentId.slice(-3, -2) == 1) { //判断倒数第三位是否为1。为1就是10了，不为1就是20，因为最大的数字就是29，所以没有其他的可能了。
            this.sNewDivId = this.sPreParentId.slice(-7, -3) + 9 + "c"; //是10，不要正常的减1的方法了，直接手动变成9.
        } else {
            this.sNewDivId = this.sPreParentId.slice(-7, -3) + 19 + "c"; //是20，不要正常的减1的方法了，直接手动变成19.
        }
    } else {
        this.sNewDivId = this.sPreParentId.slice(-7, -2) + (nIf - 1) + "c"; //正常的减1的方法。
    }
    oNowDiv.parentNode.removeChild(oNowDiv);
    document.getElementById(this.sNewDivId).appendChild(oNowDiv);
    this.fnEatFood();
    this.fnFollowDiv();
    this.fnFailAlert();
}

FnAttribute.prototype.fnMoveright = function() {
    var oNowDiv = document.getElementById("div2");
    this.sPreParentId = oNowDiv.parentNode.id;
    var nIf = parseInt(this.sPreParentId.slice(-2, -1)); //这里与上面向左的运动有区别。向左是减法，向右是加法。这里如果不转化成数字，返回的是"5"，而”5“ + 1返回的是”51“。减法就不会出现这样的情况。原因是减法会产生隐式转换。所以这里需要把取出来的东西转换成数字。
    if (nIf == 9) {
        if (this.sPreParentId.slice(-3, -2) == 2) { //如果等于2，就说明到头了。
            clearInterval(this.timer);
            alert("撞到墙壁啦");
            window.location.reload();
        } else if (this.sPreParentId.slice(-3, -2) == "r") { //不是数字，或者等于"r"，说明是1位到2位的转变，直接手动加10.
            this.sNewDivId = this.sPreParentId.slice(-7, -2) + 10 + "c";
        } else {
            this.sNewDivId = this.sPreParentId.slice(-7, -3) + 20 + "c"; //因为最大是29，所有只有这一种19到20的转变了，不需要判断了。
        }
    } else {
        this.sNewDivId = this.sPreParentId.slice(-7, -2) + (nIf + 1) + "c";
    }
    oNowDiv.parentNode.removeChild(oNowDiv);
    document.getElementById(this.sNewDivId).appendChild(oNowDiv);
    this.fnEatFood();
    this.fnFollowDiv();
    this.fnFailAlert();
}
FnAttribute.prototype.fnMakeFood = function() {
    if (document.getElementById("fooddiv") == null) {
        var i = Math.round(Math.random() * 30 - 1);
        var j = Math.round(Math.random() * 30 - 1);
        var id = i + "r" + j + "c";
        for (var k = 0; k < this.aSnake.length;) { //判断新生成的食物是否在蛇的身体里，如果在，则重新生成。
            if (id == document.getElementById("div" + this.aSnake[k]).parentNode.id) {
                i = Math.round(Math.random() * 30 - 1);
                j = Math.round(Math.random() * 30 - 1);
                id = i + "r" + j + "c";
                k = 0;
                continue;
            } else {
                k++;
            }
        }
        var oFoodDiv = document.createElement("div");
        oFoodDiv.setAttribute("id", "fooddiv");
        oFoodDiv.setAttribute("style", "width:18px;height:18px;background:green;position:absolute;");
        document.getElementById(id).appendChild(oFoodDiv);
    }
}
FnAttribute.prototype.fnEatFood = function() { //吃食物的函数，如果蛇头和食物的父div的id相同，则删除当前的食物。
    if (document.getElementById("div2").parentNode.id == document.getElementById("fooddiv").parentNode.id) {
        document.getElementById("fooddiv").parentNode.removeChild(document.getElementById("fooddiv"));
        this.score += 100; //设置积分。
        var oScore = document.getElementById("totalScore");
        oScore.innerHTML = oScore.innerHTML.slice(0, 3) + this.score;
        var i = this.aSnake[this.aSnake.length - 1] + 1; //取出数组的最后一个元素。
        var id = "div" + i;
        this.aSnake.push(i);
        var oCloneNode = document.getElementById("div2").cloneNode(false);
        oCloneNode.id = id;
        document.getElementById(this.sPreParentId).appendChild(oCloneNode); //吃掉食物之后长出来的身体。
        this.fnMakeFood();
        if (this.aSnake.length % 4 == 0) { //加速的方法，看数组里面的元素个数是否为4的倍数，是则加速。
            this.vTimeInterval -= 40;
        }
    }
}

FnAttribute.prototype.fnFollowDiv = function() { //后长出来的身体的移动的函数。思路就是一直把后一个div放到起一个div的父节点里面。
    if (this.aSnake.length > 1) {
        for (var i = 1; i < this.aSnake.length; i++) {
            var oNowDiv = document.getElementById("div" + this.aSnake[i]);
            var oNowParentId = oNowDiv.parentNode.id;
            oNowDiv.parentNode.removeChild(oNowDiv);
            document.getElementById(this.sPreParentId).appendChild(oNowDiv);
            this.sPreParentId = oNowParentId;
        }
    }
}

FnAttribute.prototype.fnFailAlert = function() { //撞尾巴函数
    for (var i = 4; i < this.aSnake.length; i++) {
        if (this.sNewDivId == document.getElementById("div" + this.aSnake[i]).parentNode.id) {
            alert("撞到尾巴啦");
            window.location.reload();
        }
    }
}
