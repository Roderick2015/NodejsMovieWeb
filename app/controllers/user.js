var User = require('../models/user')

exports.signup = function(req, res) {
	var _user = req.body.user;

	User.find({name: _user.name}, function(err, user) {
		if(err) {
			console.log(err);
		}

		if(user.length > 0) {
			console.log('用户名已存在！');
			return res.redirect('/');
		}else {
			var user = new User(_user);

			user.save(function(err, user) {
				if(err) {
					console.log(err)
				}

				res.redirect('/admin/userList');
			})
		}
	})
}

exports.signin = function(req, res) {
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;

	User.findOne({name: _user.name}, function(err, user) {
		if(err) {
			console.log(err);
		}

		if(!user) {
			return res.redirect('/');
		}

		user.comparePassword(password, function(err, isMatch) {
			if(err) {
				console.log(err);
			}

			if(isMatch) {
				req.session.user = user
				console.log('password is matched!')
			}else {
				console.log('password is not matched!')
			}
			return res.redirect('/');
		})
	})
}

exports.logout = function(req, res) {
	delete req.session.user;
//-	delete app.locals.user;
	res.redirect('/');
}

exports.userList = function(req, res) {
	User.fetch(function(err, users) {
		if(err) {
			console.log(err)
		}

		res.render('userlist', {
			title: 'nodeWeb用户列表页',
			users: users
		})
	})
}
