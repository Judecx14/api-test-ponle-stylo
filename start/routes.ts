import Route from '@ioc:Adonis/Core/Route'

Route.post('signup', 'UsersController.create')
Route.post('login', 'UsersController.login')
Route.get('users', 'UsersController.index')

Route.group(() => {
  Route.post('/username', 'UsersController.usernameTaken')
  Route.post('/email', 'UsersController.emailTaken')
}) .prefix('check')

Route.post('img', 'UsersController.image')