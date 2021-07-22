import User from 'App/Models/User'
import Application from '@ioc:Adonis/Core/Application'

export default class UsersController {
  async index({ response }) {
    const data = await User.all()
    try {
      return response.status(200).send({ Data: data })
    } catch (e) {
      return response.status(400).send({ Error: e })
    }
  }

  async create({ request, response }) {
    
    const data = request.only(['name', 'lastname', /*'username', */ 'email', 'password', ])
    //console.log(request.file('profile_photo'))
    const coverImage = request.file('profile_photo', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpge'],
    })

    if (coverImage) {
      await coverImage.move(Application.tmpPath('uploads'))
    }
    console.log(coverImage)
    if(coverImage){
      try {
        const user = await User.create({
          name: data.name,
          lastname: data.lastname,
          email: data.email,
          password: data.password,
          profilePhoto: coverImage.filePath,
        })
        //console.log(coverImage.filePath)
        return response.status(201).send({ status: true, data: user})
      } catch(e) {
        return response.status(400).send({ Error: e })
      }
    }else{
      try {
        const user = await User.create({
          name: data.name,
          lastname: data.lastname,
          email: data.email,
          password: data.password,
        })
        //console.log(coverImage.filePath)
        return response.status(201).send({ status: true, data: user})
      } catch(e) {
        return response.status(400).send({ Error: e })
      }
    }
    
  }

  async login({ request, response, auth }) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  async usernameTaken({ response, request }) {
    const data = request.input('username');
    //console.log(data);
    let taken: boolean;
    try {
      await User.findBy('username', data) ? taken = true : taken = false
      return response.status(200).send( {status:taken } )
    } catch (e) {
      console.log(e)
      return response.status(400).send({ Error: e })
    }
  }


  async emailTaken({ response, request }) {
    const data = request.input('email');
   // console.log(data);
    let taken: boolean;
    try {
      await User.findBy('email', data) ? taken = true : taken = false
      return response.status(200).send( {status:taken })
    } catch (e) {
      console.log(e)
      return response.status(400).send({ Error: e })
    }
  }

  async image({ response, request }){
    console.log(request.file('profile_photo'))
    const coverImage = request.file('profile_photo', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpge'],
    })

    if (coverImage) {
      await coverImage.move(Application.tmpPath('uploads'))
      
    }

    try{return response.status(200).send( {path:coverImage.filePath} )}catch(e){return response.status(400).send( {error: e} )}
  }

}
