// /*eslint-disable*/
// const map=document.getElementById('map');
// console.log("Go here")
// if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition(function (position){
//         const {latitude}=position.coords;
//         const {longitude}=position.coords;
//         console.log(latitude,longitude);
//         const coordinants=[latitude,longitude];
//          map =L.map('map').setView(coordinants, 13);

//         L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         }).addTo(map);

//         L.marker(coordinants).addTo(map)
//             .bindPopup('A pretty CSS popup.<br> Easily customizable.')
//             .openPopup();
//        map.on("click",function (mapE){
//             mapEvent=mapE;
//             form.classList.remove("hidden");
//             inputDistance.focus();
//            console.log(mapEvent)
//             const{lat,lng}=mapEvent.latlng;
//             L.marker([lat,lng])
//                 .addTo(map)
//                 .bindPopup(L.popup({
//                     maxWidth:250,
//                     minWidth:100,
//                     autoCLose:false,
//                     closeOnClick:false,
//                     className:"running-popup"
//                 }))
//                 .setPopupContent("Workout")
//                 .openPopup();
//         })
//     },function (){
//         alert("Could not get your position");
//     })
// }