const fs = require('fs');
const cryptoFns = require('../crypto');

module.exports = function (app) {
    app.put('/users/:id', function (req, res) {
        var id = req.params.id;
        var found = false;
        var foundIndex;
        var user = req.body;
        user.password = cryptoFns.encrypt(user.password);
        var result;
        fs.readFile('./users.json', function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var updatedArr = JSON.parse(data).map(x => x);
                for (var [index, value] of updatedArr.entries()) {
                    if (value['id'] === id) {
                        user.id = id;
                        result = Object.assign(value, user);
                        found = true;
                        foundIndex = index;
                        res.send(result);
                    }
                }

                if (!found) {
                    res.sendStatus(404);
                    found = false;
                } else {
                    fs.writeFile('users.json', JSON.stringify(updatedArr), null, function (err) {
                        if (err) console.log(err);
                    })
                }
                res.end();
            }
        })
    });
}
