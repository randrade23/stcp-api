const axios = require('axios').default;

const STCP_ENDPOINT = "https://www.stcp.pt/pt/itinerarium/callservice.php";

module.exports.getDirections = async (lcode) => {
    let request = { action: 'linedirslist', lcode };

    let directionsList = (await (await axios.get(STCP_ENDPOINT, { params: request })).data);
    directionsList = directionsList["records"];

    return directionsList;
}