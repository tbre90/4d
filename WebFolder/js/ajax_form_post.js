// @param data      -> the name of the form fields
// @param errTarget -> if an error occurs, errTarget.value will be set to the responseMessage
// @param urlTarget -> the target url to POST to
let ajax_form_post = function(data, errTarget, urlTarget) {
    let request = new XMLHttpRequest();

    let urlEncodedData = "";
    let urlEncodedDataPairs = [];

    for (let name in data) {
        let val = document.getElementById(data[name]).value;
        urlEncodedDataPairs.push(encodeURIComponent(name) + "=" + encodeURIComponent(val));
    }

    urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+");

    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {

            let et = document.getElementById(errTarget);
            let json = JSON.parse(request.responseText);

            if (request.status >= 400) {
                let et = document.getElementById(errTarget);
                let json = JSON.parse(request.responseText);
                et.innerHTML = json["message"];
                et.style.color = "#FF0000";
            } else {
                window.location.href = json["message"]
            }
        }
    }

    request.open("POST", urlTarget);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(urlEncodedData);
}
