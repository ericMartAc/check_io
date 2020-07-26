const collapseLayouts = document.getElementById('collapseLayouts');
const collapseLayouts2 = document.getElementById('collapseLayouts2');
const collapseLayouts3 = document.getElementById('collapseLayouts3');
const collapseLayouts4 = document.getElementById('collapseLayouts4');

const i1 = document.getElementById('i1');
const i2 = document.getElementById('i2');
const i3 = document.getElementById('i3');
const i4 = document.getElementById('i4');

setInterval(() => {
    if (collapseLayouts.className == "collapse") {
        i1.className = "fas fa-angle-right float-right";
    }else{
        i1.className = "fas fa-angle-down float-right";
    }

    if (collapseLayouts2.className == "collapse") {
        i2.className = "fas fa-angle-right float-right";
    }else{
        i2.className = "fas fa-angle-down float-right";
    }

    if (collapseLayouts3.className == "collapse") {
        i3.className = "fas fa-angle-right float-right";
    }else{
        i3.className = "fas fa-angle-down float-right";
    }

    if (collapseLayouts4.className == "collapse") {
        i4.className = "fas fa-angle-right float-right";
    }else{
        i4.className = "fas fa-angle-down float-right";
    }
}, 80);



/*
var cl1 = 0;
var cl2 = 0;
var cl3 = 0;
var cl4 = 0;
$(document).ready(function () {
    $("#collapseLayouts").click(function () {
    });
});

function c1() {
    sleep(100).then(function () {
        // Do something
        collapseLayouts2.className = "collapse";
        collapseLayouts3.className = "collapse";
        collapseLayouts4.className = "collapse";
    });


}

function c2() {
    sleep(100).then(function () {
        // Do something
        collapseLayouts.className = "collapse";
        collapseLayouts3.className = "collapse";
        collapseLayouts4.className = "collapse";
    });
}

function c3() {
    sleep(100).then(function () {
        // Do something
        collapseLayouts.className = "collapse";
        collapseLayouts2.className = "collapse";
        collapseLayouts4.className = "collapse";
    });
}

function c4() {
    sleep(100).then(function () {
        // Do something
        collapseLayouts2.className = "collapse";
        collapseLayouts3.className = "collapse";
        collapseLayouts.className = "collapse";
    });
}
function sleep(ms) {
    return (new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(); }, ms);
    }));
}
*/