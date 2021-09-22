import Route from '@ioc:Adonis/Core/Route'


Route.get('update', 'UsersController.update')
Route.post('updateChange', 'UsersController.updateChange')

Route.post('createCourse', 'UsersController.createCourse')

Route.post('signup', 'UsersController.create')
Route.post('verification', 'UsersController.accountVerification')
Route.post('login', 'UsersController.login')


Route.group(() => {
  Route.post('/username', 'UsersController.usernameTaken')
  Route.post('/email', 'UsersController.emailTaken')
}) .prefix('check')

Route.post('/test', 'UsersController.test')
Route.get('/getUserData', 'UsersController.returnUserData')
Route.post('/checkToken', 'UsersController.checkToken')


Route.post('/uploadFile', 'UsersController.uploadFile')