//注册
function fnSignUp() {
    document.getElementById("signUp").style.display = "block";
    document.getElementById("signUpNone").onclick = function() {
        document.getElementById("signUp").style.display = "none";
    }
}

//登录
function fnSignIn() {
    document.getElementById("signIn").style.display = "block";
    document.getElementById("signInNone").onclick = function() {
        document.getElementById("signIn").style.display = "none";
    }
}

//AJAX请求数据及动态绑定
var utils = {
    listToArray: function(similarArray) {
        /*
         *   try catch js
         * */
        var a = [];
        try {
            a = Array.prototype.slice.call(similarArray);
        } catch (e) {
            alert(); //ie7 和 8 弹出
            var a = [];
            for (var i = 0; i < similarArray.length; i++) {
                a[a.length] = similarArray[i];
            }
        }
        return a;
    },
    jsonParse: function(jsonStr) {
        return 'JSON' in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    }

}
var tBody = document.getElementById("tBody");
var data = [{
        "name": "令狐冲",
        "score": 1234
    },
    {
        "name": "任盈盈",
        "score": 2345
    },
    {
        "name": "岳不群",
        "score": 5184
    },
    {
        "name": "岳灵珊",
        "score": 3004
    },
    {
        "name": "东方不败",
        "score": 5234
    },
    {
        "name": "张三",
        "score": 1243
    },
    {
        "name": "李四",
        "score": 3241
    },
    {
        "name": "王五",
        "score": 4235
    },
    {
        "name": "木头六",
        "score": 2908
    }
];
// var xhr = new XMLHttpRequest();
// xhr.open('get', './data.txt', false);
// xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
//         var val = xhr.responseText;
//         data = utils.jsonParse(val);
//     }
// }
// xhr.send(null);

function bind() {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
        var cur = data[i];
        var oTr = document.createElement("tr");
        for (var key in cur) {
            var oTd = document.createElement("td");
            oTd.innerHTML = cur[key];
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
    frg = null;
}
bind();

//隔行变色
function changeColor() {
    var oAllTr = tBody.getElementsByTagName("tr");
    for (var i = 0; i < oAllTr.length; i++) {
        oAllTr[i].className = "";
        i % 2 == 1 ? oAllTr[i].className = "bg" : null;
    }
}
changeColor();

//升序降序
var thScore = document.getElementById("thScore"),
    thName = document.getElementById("thName");
thScore.index = 1;
thName.index = 2;
thName.flag = -1;
thScore.flag = -1;
var curIndex;

function upOrder() {
    if (curIndex == undefined) {

    } else {
        if (curIndex == this.index) {

        } else {
            if (curIndex == 1) {
                thScore.flag = -1;
            } else {
                thName.flag = -1;
            }
        }
    }
    curIndex = this.index;
    var oAllTr = tBody.rows;
    var ary = utils.listToArray(oAllTr);
    var _this = this;
    this.flag *= -1;
    if (this.index == 1) {
        ary.sort(function(a, b) {
            return (parseFloat(a.cells[1].innerHTML) - parseFloat(b.cells[1].innerHTML)) * _this.flag;
        });
    } else {
        ary.sort(function(a, b) {
            return a.cells[0].innerHTML.localeCompare(b.cells[0].innerHTML) * _this.flag;
        })
    }

    var frg = document.createDocumentFragment();
    for (var i = 0; i < ary.length; i++) {
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    frg = null;
    changeColor();
}
thName.onclick = function() {
    upOrder.call(this);
}
thScore.onclick = function() {
    //upOrder.call(thScore);
    upOrder.call(this);
}

//回到顶部动画
var goLink = document.getElementById("goLink");
window.onscroll = getDisplay;

function getDisplay() {
    var curTop = document.documentElement.scrollTop || document.body.scrollTop; //当前距顶的高度。
    var curHeight = document.documentElement.clientHeight || document.body.clientHeight; //当前一个屏幕的高度。
    goLink.style.display = curTop > curHeight / 10 ? "block" : "none";
}
goLink.onclick = function() {
    this.style.display = "none";
    window.onscroll = null;
    var timer = window.setInterval(function() {
        var curTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (curTop === 0) {
            window.clearInterval(timer);
            window.onscroll = getDisplay;
            return;
        }
        curTop -= 50;
        document.documentElement.scrollTop = curTop;
        document.body.scrollTop = curTop;
    }, 50);
}
