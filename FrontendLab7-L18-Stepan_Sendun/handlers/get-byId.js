const fs = require('fs');

module.exports = function (app) {
    app.get('/users/:id', function (req, res) {
        var id = req.params.id;
        var found = false;
        fs.readFile('./users.json', function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var arr = JSON.parse(data).map(x => x);
                for (var val of arr) {
                    if (val['id'] === id) {
                        res.send(val);
                        found = true;
                    }


                }

                if (!found) {
                    res.sendStatus(404);
                    found = false;
                }
                res.end();
            }
        })
    });

}
