// Clock
function clock() {
    let now = new Date();
    let s = now.getSeconds();
    s = s < 10 ? s = "0" + s : s;

    let m = now.getMinutes();
    m = m < 10 ? m = "0" + m : m;

    let h = now.getHours();
    h = h < 10 ? h = "0" + h : h;
    document.querySelector("#horlogeDroite").innerHTML = h + ":" + m + ":" + s;
}

function initClock() {
    clock();
    setInterval(clock, 1000);
}