<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCg7sH4zb7LaEGCbP3EHHg1FgnjG0d7N9c&libraries=geometry">

coordinates = [
    new google.maps.LatLng(127.03024372458458, 37.58667558831418),
    new google.maps.LatLng(127.0309692621231, 37.5873387310489),
    new google.maps.LatLng(127.03066818416117, 37.58754064833648),
    new google.maps.LatLng(127.03001841902733, 37.586892651310045),
    new google.maps.LatLng(127.03024372458458, 37.58667558831418)
]

const centerX = (127.03024372458458 + 127.0309692621231 + 127.03066818416117 + 127.03001841902733 + 127.03024372458458)/5;
const centerY = (37.58667558831418 + 37.5873387310489 + 37.58754064833648 + 37.586892651310045 + 37.58667558831418) /5;
const area = new google.maps.Polygon({
    paths:coordinates
})

const isWithinPolygon = google.maps.geometry.poly.containsLocation(centerX, centerY);

console.log(isWithinPolygon);

</script>