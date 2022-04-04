const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path') ;
const methodOverride = require('method-override')
const app = express();
const port = process.env.PORT || 5000;
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const route = require('./routes');
const db = require('./config/db/index');
const req = require('express/lib/request');

//passport config
require('./config/passport')(passport);


// connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended:true
})) 
app.use(express.json());
app.use(methodOverride('_method'))

app.engine('hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,

}))
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global vars
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// route init
route(app);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
