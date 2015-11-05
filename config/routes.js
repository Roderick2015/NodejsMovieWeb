var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movie')


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
	//登出
	app.get('/user/logout', User.logout);
	//用户列表
	app.get('/user/userList', User.userList);

	/*电影Controller*/
	//电影录入页
	app.get('/admin/movie', Movie.admin);
	//新增电影操作
	app.post('/admin/movie/new', Movie.save);
	//电影列表
	app.get('/admin/list', Movie.adminList);
	//详情
	app.get('/movie/:id', Movie.detail);
	//更新
	app.get('/admin/update/:id', Movie.update);
	//删除
	app.delete('/admin/delete', Movie.delete);
}




