var request = require('request-promise');

exports.connect = async function (req, res) {
    try {
        //console.log(req);
        var array = [];
        array[0] = { obj: '1', data: '1234' };
        console.log(array);
        return array;
    }
    catch (e) {
        throw Error(e);
    }
}