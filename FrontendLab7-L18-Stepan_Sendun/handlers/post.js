const fs = require('fs');
const cryptoFns = require('../crypto');



module.exports = function (app) {
    app.post('/users', function (req, res) {
        var users = [];
        var user = req.body;
        var found = false;
        user.password = cryptoFns.encrypt(user.password);
        fs.readFile('./users.json', function (err, data) {
            if (err) {
                console.log(err);
            } else {
                if (!!data.toString()) {
                    var arr = JSON.parse(data).map(x => x);
                    for (var val of arr) {
                        if (val['id'] === user['id']) {
                            res.sendStatus(409);
                            found = true;
                        }


                    }
                    users = arr.map(x => x);
                }

                if (!found) {
                    users.push(user);
                    fs.writeFile('users.json', JSON.stringify(users), null, function (err) {
                        if (err) console.log(err);
                    })
                    res.sendStatus(201);
                    found = false;
                }

                res.end();

            }
        })
    });
}
