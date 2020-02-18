const axios = require('axios').default;

const STCP_ENDPOINT = "https://www.stcp.pt/pt/itinerarium/callservice.php";

module.exports.getLines = async (service) => {
    let request = { action: 'lineslist', service };

    let busList = (await (await axios.get(STCP_ENDPOINT, { params: request })).data);
    busList = busList['records'];

    return busList;
}

module.exports.getDirections = async (lcode) => {
    let request = { action: 'linedirslist', lcode };

    let directionsList = (await (await axios.get(STCP_ENDPOINT, { params: request })).data);
    directionsList = directionsList['records'];

    return directionsList;
}

module.exports.getStops = async (lcode, ldir) => {
    let request = { action: 'linestops', lcode, ldir };

    let stopsList = (await (await axios.get(STCP_ENDPOINT, { params: request })).data);
    stopsList = stopsList['records'];

    return stopsList;
}

module.exports.getStop = async (stopcode) => {
    let request = { action: 'srchstoplines', stopcode };

    let stopInfo = (await (await axios.get(STCP_ENDPOINT, { params: request })).data);

    stopInfo.forEach(x => { x.geomdesc = JSON.parse(x.geomdesc) });

    return stopInfo;
}