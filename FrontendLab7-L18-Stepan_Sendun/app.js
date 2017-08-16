const express = require('express');
const bodyParser = require('body-parser');
const qs = require('qs');
const app = express();


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({
    extended: true
}));


require('./handlers/post')(app);

require('./handlers/get')(app);

require('./handlers/get-byId')(app);

require('./handlers/put')(app);

require('./handlers/delete')(app);




app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
