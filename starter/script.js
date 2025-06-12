'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//getting users position
if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
    function(position) {
        console.log(position)
        const {latitude} = position.coords
        const {longitude} = position.coords
        const coords = [latitude, longitude]
        const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        console.log(googleMapsLink);

        //adding map
        const map = L.map('map').setView(coords, 14);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // pin exemple
        // L.marker(coords).addTo(map)
        //     .bindPopup('You are here')
        //     .openPopup();

        //adding markers 
        map.on("click", function(mapEvent) {
            console.log(mapEvent)
            const {lat, lng} = mapEvent.latlng

            L.marker([lat, lng]).addTo(map)
                .bindPopup(L.popup({
                    maxWidth:250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: 'running-popup'
                }))
                .setPopupContent("workout")
                .openPopup();
        })
    }, function() {
        alert('Could not get your position')
    })
