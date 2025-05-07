// Steg 1: Ta reda på vår plats
let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};



function success(pos) {
    const coords = pos.coords;

    console.log('Detta är vår position:', pos);
    // Visa data på sidan
    document.getElementById('longitude').textContent = coords.longitude;
    document.getElementById('latitude').textContent = coords.latitude;
    document.getElementById('accuracy').textContent = `${coords.accuracy} meter`;

    // Altitud och precision altitud kan vara null
    document.getElementById('altitude').textContent = coords.altitude !== null ? `${coords.altitude} meter` : '?';
    document.getElementById('accuracy-altitude').textContent = coords.altitudeAccuracy !== null ? `${coords.altitudeAccuracy} meter` : '?';

    // Hastighet kan också vara null
    document.getElementById('speed').textContent = coords.speed !== null ? `${coords.speed.toFixed(2)} m/s` : '?';

    // Steg 3: Visa hastighet i km/h och ändra färg
    if (coords.speed !== null) {
        let speedKmh = coords.speed * 3.6;
        let speedText = `${speedKmh.toFixed(2)} km/h`;
        let colors = '';

        if (speedKmh < 5) {
            colors = 'alert-danger';
            speedText += ' (Långsamt)';
        } else if (speedKmh < 10) {
            colors = 'alert-warning';
            speedText += ' (Mellan)';
        } else {
            colors = 'alert-success';
            speedText += ' (Snabbt)';
        }

        let speedContainer = document.getElementById('speed-container');
        speedContainer.className = `alert ${colors}`;
        speedContainer.textContent = `Du rör dig i ${speedText}`;
    }
}

function error(err) {
    console.warn('Något gick fel:', err.message);
}

// Hämta plats 1 gång
navigator.geolocation.getCurrentPosition(success, error, options);

//Uppdatera platsen 
let watchID = navigator.geolocation.watchPosition(success, error, options);


