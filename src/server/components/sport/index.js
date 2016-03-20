var Sport = {
    data: [],
    putSports: function(req, callback) {
        console.log('Reqbody', req.body);
        if (req.body) {
            Sport.data = req.body;
            callback(null, '200 OK');
        } else {
            callback('Failed');
        }
    },
    getSports: function() {
        return Sport.data;
    }
};


module.exports = Sport;