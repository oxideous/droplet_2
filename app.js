var fs = require('fs');
var express = require('express');
var app = express();
var ejs = require('ejs');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var bodyParserUrlEncoded = bodyParser.urlencoded({
	extended: false
});
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('forum.db');

db.run("PRAGMA foreign_keys = ON;")

app.set('view_engine', 'ejs');
app.use(bodyParserUrlEncoded);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.enable('trust proxy');

app.get('/', function (req, res) {
	res.redirect('/forum');
});

app.get('/forum', function (req, res) {
	var pLocation = "home";
	db.all('SELECT * FROM threads INNER JOIN users ON author_id WHERE threads.author_id = users.user_id', function (err, list) {
		if (err) {
			throw err;
		} else {
			res.render('index.html.ejs', {
				pLocation: pLocation,
				list: list
			});
		}
	});
});

app.get('/forum/new', function (req, res) {
	var pLocation = "newpost";
	res.render('index.html.ejs', {
		pLocation: pLocation
	});
});

app.post('/forum', function (req, res) {
	db.run('INSERT INTO users (username, user_avatar) VALUES (?,?)', req.body.name, req.body.sd_dd_selected_value, function (err) {
		if (err) {
			throw err;
		} else {
			db.run('INSERT INTO threads(title, author_id, content, img_url, votes) VALUES(?,?,?,?,?)', req.body.subject, this.lastID, req.body.content, req.body.img_url, 1, function (err) {
				if (err) {
					throw err;
				} else {
					res.redirect('/forum/' + this.lastID);
				}
			});
		}
	});
});

app.get('/forum/:id', function (req, res) {
	var pLocation = "showpost";
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var id = req.params.id;
	db.get('SELECT * FROM threads INNER JOIN users ON author_id WHERE threads.author_id = users.user_id AND id=?', id, function (err, post) {
		db.all('SELECT * FROM comments WHERE thread_id = ?', id, function (err, comments) {
			console.log(ip);
			res.render('index.html.ejs', {
				pLocation: pLocation,
				post: post,
				comments: comments
			});
		});
	});
});

app.post('/forum/:id', function (req, res) {
	var id = req.params.id;
	db.run('INSERT INTO comments (comment_author_id, comment_avatar, content, img_url, thread_id) VALUES (?,?,?,?,?)', req.body.name, req.body.sd_dd_selected_value, req.body.content, req.body.img_url, id, function (err) {
		if (err) {
			throw err;
		} else {
			res.redirect('/forum/' + id);
		}
	});
});

app.post('/forum/:id/vote', function (req, res) {
	var id = req.params.id;
	db.run("UPDATE threads SET votes = votes-1 WHERE id=?", id, function (err) {
		if (err) {
			throw err;
		} else {
			res.redirect('/forum/' + id + '/#');
		}
	});
});

app.listen(3000, function (err) {
	if (err) {
		throw err;
	} else {
		console.log("Glistening on port 3000.");
	}
});
