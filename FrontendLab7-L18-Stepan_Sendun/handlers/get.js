const fs = require('fs');

module.exports = function (app) {
    app.get('/users', function (req, res) {
        fs.readFile('./users.json', function (err, data) {
            if (err) {
                console.log(err);
            } else {

                if (!!!data.toString()) {
                    res.send('[]');
                } else {
                    res.send(data);
                }

            }
        })
    });
}
