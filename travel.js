const express = require('express')
const res = require('express/lib/response')
const app = express()
const handlebars = require('express-handlebars').create({defaultLayout: 'main'})
const fortune = require('./lib/fortune')

//Set up handlebars view engine
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.set('port', process.env.PORT || 5000)
app.use(express.static(__dirname + '/public'));

//set 'showTests' context property if the querystring contains test=1
app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && 
		req.query.test === '1';
	next();
});

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req,res){
	res.render('about', { 
		fortune: fortune.getFortune(),
		pageTestScript: '/qa/tests-about.js' 
	} );
});

app.get('/tours/hood-river', (req, res) => {
    res.render('tours/hood-river')
})

app.get('/tours/request-group-rate', (req, res) => {
    res.render('tours/request-group-rate');
})

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