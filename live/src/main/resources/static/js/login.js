var ip;
function ipg() {
    $("[data-toggle='tooltip']").tooltip();
    $.ajax({
        method: "GET",
        url: url + "/api/loginState",
        success: function (result) {
            result = JSON.parse(result);
            if (result.result === true) window.location.href = url;
            $.ajax({
                method: "GET",
                url: "https://ipv6.ddnspod.com",
                timeout: 2000,
                success: function (result) {
                    ip = result;
                    $("#ips").fadeOut("0.3s");
                },
                error: function () {
                    $.ajax({
                        method: "GET",
                        url: "https://ipv4.ddnspod.com",
                        success: function (result) {
                            ip = result;
                            $("#ips").fadeOut("0.3s");
                        },
                        error: function () {
                            ip = "未知";
                            $("#ips").fadeOut("0.3s");
                        },
                    });
                },
            });
        },
    });
}
function reg() {
    window.location.href = url + "/register";
}
function tk() {
    window.open(url + "/terms");
}
function opClk() {
    $.ajax({
        method: "POST",
        url: url + "/api/openRoom",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({
            uid: parseInt($("#d-uid").text()),
        }),
        success: function (result) {
            result = JSON.parse(result);
            if (result.result === false) {
                fail(result.message);
                loading(false);
                return;
            }
            $("#succ").animate({ left: "+=200%" }, "2s");
            setTimeout(
                (window.location.href = url + "/c/" + $("#d-nickname").text()),
                300
            );
        },
    });
}
function checkEmail(s) {
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (re.test(s)) return true;
    return false;
}
function tip(i) {
    if (i > 0) {
        if (i == 1) $("#tip1").css("visibility", "visible");
        else if (i == 2) $("#tip2").css("visibility", "visible");
    } else if (i < 0) {
        if (i == -1) $("#tip1").css("visibility", "hidden");
        else if (i == -2) $("#tip2").css("visibility", "hidden");
    }
}
function submit() {
    var email = document.getElementById("email").value.toLowerCase();
    var pass = document.getElementById("password").value;
    if (checkEmail(email) === false || pass.length < 8) {
        fail("请输入正确的邮箱地址和密码");
        return;
    }
    loading(true);
    $.ajax({
        method: "POST",
        url: url + "/api/login",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({
            email: email,
            password: pass,
            ip: ip,
        }),
        success: function (result) {
            result = JSON.parse(result);
            if (result.result === false) {
                fail(result.message);
                loading(false);
                return;
            }
            $("#succ").animate({ left: "+=200%" }, "2s");
            setTimeout(function () {
                var s = window.location.href.toString().split("?f=");
                if (s.length == 1) window.location.href = url;
                else window.location.href = s[1];
            }, 300);
        },
    });
}
function forget() {
    var email = document.getElementById("email").value.toLowerCase();
    if (checkEmail(email) === false) {
        fail("请输入正确的邮箱地址后重试");
        return;
    }
    $.ajax({
        method: "POST",
        url: url + "/api/forgot",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({
            email: email,
        }),
        success: function (result) {
            result = JSON.parse(result);
            if (result.result === false) {
                fail(result.message);
                return;
            }
            $(".forg").animate({ top: "+=50%" }, "1s");
            return;
        },
    });
}
function fail(s) {
    document.getElementById("fail-cont").textContent = s;
    $(".fail").animate({ top: "-=50%" }, "1s").delay(2000);
    $(".fail").animate({ top: "+=50%" }, "1s");
}
function jpo() {
    setTimeout(function () {
        $("#succ").animate({ left: "+=200%" }, "2s");
        window.location.href = url + "/login?e=" + $("#e").text();
    }, 1000);
}
function loading(e) {
    if (e === true) {
        $(".sigsvg").css("visibility", "hidden");
        $(".loadsvg").fadeIn("0.2s");
        return;
    }
    $(".sigsvg").css("visibility", "visible");
    $(".loadsvg").fadeOut("0.2s");
}
