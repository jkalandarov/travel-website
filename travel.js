const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
.create({defaultLayout: 'main'})
const fortune = require('./lib/fortune')

app.set('port', process.env.PORT || 5000)
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
})

//Set up handlebars view engine
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.get('/', function(req, res){
    res.render('home');
});

app.get('/about', function(req, res){
    res.render('about', {fortune: fortune.getFortune()});
});

// custom 404 page
app.use(function(req, res){
    res.status(404).render('404');
});
    
// custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).render('500');
});

app.listen(app.get('port'), () => {
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});