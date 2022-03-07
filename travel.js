const express = require('express')
const app = express()
const handlebars = require('express-handlebars').create({defaultLayout: 'main'})

app.set('port', process.env.PORT || 5000)
app.use(express.static(__dirname + '/public'));

//Set up handlebars view engine
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

let fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
]

app.get('/', function(req, res){
    res.render('home');
});

app.get('/about', function(req, res){
    let randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
    res.render('about', {fortune: randomFortune});
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