let justPosted = false;

window.addEventListener("load", function () {
    document.getElementById("checkbox").addEventListener("click", function () {justPosted = true; axios.post('/', {on: document.getElementById("checkbox").checked})});
    document.getElementById("checkbox").addEventListener("touchend", function () {justPosted = true; axios.post('/', {on: document.getElementById("checkbox").checked})});
});

axios.options("/").then(function (response) {
    if (justPosted) {
        justPosted = false;
        return;
    }

    document.getElementById("checkbox").checked = (response.data.name || "").includes("on");
}).catch(function (reason) {
    console.log("Failed to get current state!");
});

setInterval(async function () {
    axios.options("/").then(function (response) {
        if (justPosted) {
            justPosted = false;
            return;
        }

        document.getElementById("checkbox").checked = (response.data.name || "").includes("on");
    }).catch(function (reason) {
        console.log("Failed to get current state!");
    });
}, 1000);