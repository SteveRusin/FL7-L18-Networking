const fs = require('fs');

module.exports = function (app) {
    app.delete('/users/:id', function (req, res) {
        var id = req.params.id;
        var found = false;
        var user = req.body;
        fs.readFile('./users.json', function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var updatedArr = JSON.parse(data).map(x => x);
                for (var [index, value] of updatedArr.entries()) {
                    if (value['id'] === id) {
                        updatedArr.splice(index, 1);
                        found = true;
                        res.send('{"message": "User has been successfully removed."}');
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
