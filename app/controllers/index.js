var Movie = require('../models/movie')

exports.index = function(req, res) {
	console.log('user in session')
	console.log(req.session.user)

	Movie.fetch(function(err, movies) {
		if(err) {
			console.log(err)
		}

		res.render('index', {
			title: 'nodeWeb首页',
			movies: movies
		})
	})
}