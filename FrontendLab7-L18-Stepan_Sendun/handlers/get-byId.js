const fs = require('fs');

module.exports = function (app) {
    app.get('/users/:id', function (req, res) {
        var id = parseInt(req.params.id);
        var found = false;
        fs.readFile('./users.json', function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var arr = JSON.parse(data).map(x => x);

                if (arr.length === 0) {
                    res.status(404).send('User not found');
                } else {
                    for (var val of arr) {
                        if (val['id'] === id) {
                            
                            res.status(200).send(val).end();
                            found = true;
                        }


                    }

                }

                if (!found) {
                    found = false;
                    res.status(404).send('User not found').end();
                }
            }
        })
    });

}
