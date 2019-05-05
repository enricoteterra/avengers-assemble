const proxy = require("http-proxy-middleware");
module.exports = function(app){
    app.use(proxy('/signup', {target: 'http://localhost:3020'}));
    app.use(proxy('/roster', {target: 'http://localhost:3021'}));
}