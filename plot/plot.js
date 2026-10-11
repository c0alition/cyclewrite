const isGPX = document.getElementById("gpxFileInput");
isGPX.addEventListener("change", function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const rideFile = e.target.result;
        const ride = processGPX(rideFile);
        if (ride) {
            drawTrack(ride);
            addOSMMap(ride);
        }
    };
    reader.readAsText(file);
});

function processGPX(rideFile) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rideFile, "application/xml");
    const trkpts = xmlDoc.getElementsByTagName("trkpt");
    if (!trkpts || trkpts.length === 0) {
        console.log("No.");
        return null;
    }

    const rideStart = trkpts[0];
    const rideEnd = trkpts[trkpts.length - 1];
    const firstLat = parseFloat(rideStart.getAttribute("lat"));
    const firstLon = parseFloat(rideStart.getAttribute("lon"));
    const lastLat = parseFloat(rideEnd.getAttribute("lat"));
    const lastLon = parseFloat(rideEnd.getAttribute("lon"));
    console.log("Start:", firstLat, firstLon);
    console.log("End:", lastLat, lastLon);

    const latDiff = Math.abs(lastLat - firstLat);
    const lonDiff = Math.abs(lastLon - firstLon);
    const latAvg = (lastLat + firstLat) / 2;
    const lonAvg = (lastLon + firstLon) / 2;

    const milePerDegLat = 69;
    const milePerDegLon = 69 * Math.cos(latAvg * Math.PI / 180);

    let minLat = Infinity, maxLat = -Infinity, minLon = Infinity, maxLon = -Infinity;
    const coordinates = [];
    for (let i = 0; i < trkpts.length; i++) {
        const pt = trkpts[i];
        const lat = parseFloat(pt.getAttribute("lat"));
        const lon = parseFloat(pt.getAttribute("lon"));
        coordinates.push([lon, lat]);

        if (lat < minLat) {
            minLat = lat;
        }
        if (lat > maxLat) {
            maxLat = lat;
        }
        if (lon < minLon) {
            minLon = lon;
        }
        if (lon > maxLon) {
            maxLon = lon;
        }
    }

    return {
        trkpts,
        coordinates,
        start: { lat: firstLat, lon: firstLon },
        end: { lat: lastLat, lon: lastLon },
        scaling: {
            milePerDegLat,
            milePerDegLon
        },
        boundingBox: {
            minLat, maxLat, minLon, maxLon
        }
    };
}

function drawTrack(rideData) {
    const { trkpts, boundingBox: { minLat, maxLat, minLon, maxLon } } = rideData;
    const latDiff = maxLat - minLat;
    const lonDiff = maxLon - minLon;
    const aspectRatio = lonDiff / latDiff;
    let baseHeight = 600;

    const svgHeight = baseHeight;
    const svgWidth = baseHeight * aspectRatio;

    const svg = document.getElementById("svgOutput");
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);

    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }

    const outerMinLat = minLat - latDiff;
    const outerMaxLat = maxLat + latDiff;
    const outerMinLon = minLon - lonDiff;
    const outerMaxLon = maxLon + lonDiff;

    function lonSVGX(lon) {
        return ((lon - outerMinLon) / (outerMaxLon - outerMinLon)) * svgWidth;
    }

    function latSVGY(lat) {
        return svgHeight - ((lat - outerMinLat) / (outerMaxLat - outerMinLat)) * svgHeight;
    }

    const innerRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    innerRect.setAttribute("x", lonSVGX(minLon));
    innerRect.setAttribute("y", latSVGY(maxLat));
    innerRect.setAttribute("width", lonSVGX(maxLon) - lonSVGX(minLon));
    innerRect.setAttribute("height", latSVGY(minLat) - latSVGY(maxLat));
    innerRect.setAttribute("fill", "none");
    innerRect.setAttribute("stroke", "red");
    innerRect.setAttribute("stroke-width", "2");
    svg.appendChild(innerRect);

    const points = [];
    for (let i = 0; i < trkpts.length; i++) {
        const lat = parseFloat(trkpts[i].getAttribute("lat"));
        const lon = parseFloat(trkpts[i].getAttribute("lon"));
        points.push(`${lonSVGX(lon)},${latSVGY(lat)}`);
    }

    const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polyline.setAttribute("points", points.join(" "));
    polyline.setAttribute("fill", "none");
    polyline.setAttribute("stroke", "black");
    polyline.setAttribute("stroke-width", "1");
    svg.appendChild(polyline);

    function drawPoint(lat, lon, color) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", lonSVGX(lon));
        circle.setAttribute("cy", latSVGY(lat));
        circle.setAttribute("r", "4");
        circle.setAttribute("fill", color);
        svg.appendChild(circle);
    }

    drawPoint(rideData.start.lat, rideData.start.lon, "green");
    drawPoint(rideData.end.lat, rideData.end.lon, "orange");
}

function addOSMMap(rideData) {
    const { boundingBox: { minLat, maxLat, minLon, maxLon }, coordinates } = rideData;

    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([(minLon + maxLon) / 2, (minLat + maxLat) / 2]),
            zoom: 12
        })
    });

    const transformedCoordinates = coordinates.map(coord => ol.proj.fromLonLat(coord));

    // Create a LineString geometry
    const lineString = new ol.geom.LineString(transformedCoordinates);

    // Create a feature with the LineString geometry
    const feature = new ol.Feature({
        geometry: lineString
    });

    // Create a vector source and add the feature to it
    const vectorSource = new ol.source.Vector({
        features: [feature]
    });

    // Create a vector layer with the vector source
    const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 3
            })
        })
    });

    // Add the vector layer to the map
    map.addLayer(vectorLayer);

    // Fit the map to the bounding box
    const extent = ol.proj.transformExtent([minLon, minLat, maxLon, maxLat], 'EPSG:4326', map.getView().getProjection());
    map.getView().fit(extent, { size: map.getSize() });

    // Update the SVG overlay size and position
    const mapSize = map.getSize();
    const overlay = document.getElementById('svgOutput');
    overlay.setAttribute('width', mapSize[0]);
    overlay.setAttribute('height', mapSize[1]);
}
