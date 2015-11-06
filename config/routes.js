var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movie')
var Comment = require('../app/controllers/comment')


module.exports = function(app) {
	app.use(function(req, res, next) {
		var _user = req.session.user;

		app.locals.user = _user;
		return next();
	})
		//首页
	app.get('/', Index.index);

	/*用户Controller*/
	//注册
	app.post('/user/signup', User.signup);
	//登录
	app.post('/user/signin', User.signin);
	//注册页面
	app.get('/signup', User.showSignup);
	//登录页面
	app.get('/signin', User.showSignin);
	//登出
	app.get('/user/logout', User.logout);
	//用户列表
	app.get('/user/userList', User.signinRequired, User.adminRequired, User.userList);

	/*电影Controller*/
	//电影录入页
	app.get('/admin/movie', User.signinRequired, User.adminRequired, Movie.admin);
	//新增电影操作
	app.post('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.save);
	//电影列表
	app.get('/admin/list', User.signinRequired, User.adminRequired, Movie.adminList);
	//详情
	app.get('/movie/:id', User.signinRequired, User.adminRequired, Movie.detail);
	//更新
	app.get('/admin/update/:id', User.signinRequired, User.adminRequired, Movie.update);
	//删除
	app.delete('/admin/delete', User.signinRequired, User.adminRequired, Movie.delete);

	/*评论Controller*/
	app.post('/user/comment', User.signinRequired, Comment.save)
}




