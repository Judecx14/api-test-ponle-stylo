import User from 'App/Models/User'
import Application from '@ioc:Adonis/Core/Application'
import Hash from '@ioc:Adonis/Core/Hash'

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
    const data = request.only(['name', 'lastname', 'email', 'password'])
    const coverImage = request.file('profile_photo', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpge'],
    })

    if (coverImage) {
      await coverImage.move(Application.tmpPath('uploads'))
      try {
        const user = await User.create({
          name: data.name,
          lastname: data.lastname,
          email: data.email,
          password: data.password,
          profilePhoto: coverImage.filePath,
          validate: false
        })
        return response.status(201).send({ status: true, data: user })
      } catch (e) {
        return response.status(400).send({ Error: e })
      }
    } else {
      try {
        const user = await User.create({
          name: data.name,
          lastname: data.lastname,
          email: data.email,
          password: data.password,
          validate: false
        })
        return response.status(201).send({ status: true, data: user })
      } catch (e) {
        return response.status(400).send({ Error: e })
      }
    }
  }



  async login({ request, response, auth }) {

    const email = request.input('email')
    const password = request.input('password')
    const user = await User.findBy('email', email)
    if(user && (await Hash.verify(user.password, password))) {
      
      const userVerified = user?.validate
      if (userVerified){
        const token = await auth.use('api').attempt(email, password)
        return response.status(200).send({token, user })  
      }else if (!userVerified){
        return response.status(401).send({status: userVerified})
      } 
      
    } else {
      return response.badRequest('Invalid credentials')
    }
  }

  async usernameTaken({ response, request }) {
    const data = request.input('username')
    //console.log(data);
    let taken: boolean
    try {
      ;(await User.findBy('username', data)) ? (taken = true) : (taken = false)
      return response.status(200).send({ status: taken })
    } catch (e) {
      console.log(e)
      return response.status(400).send({ Error: e })
    }
  }

  async emailTaken({ response, request }) {
    const data = request.input('email')
    // console.log(data);
    let taken: boolean
    try {
      ;(await User.findBy('email', data)) ? (taken = true) : (taken = false)
      return response.status(200).send({ status: taken })
    } catch (e) {
      console.log(e)
      return response.status(400).send({ Error: e })
    }
  }

  async accountVerification({ request, response }){
    const email = request.input('email')

    console.log(email)

    return response.status(200).send({email: email})

  }

  async test ({request}){
    console.log(request.all())
     const coverImage = request.file('profile_photo', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpge'],
    })

    if (coverImage) {
      await coverImage.move(Application.tmpPath('uploads'))
    }
  }

  async returnUserData({request, response}) {
    //console.log(request.headers())

    return response.status(200).send({
      name: "Pepe",
      lastname: "Lopez",
      email: "pepito@gmail.com",
      role: ["instructor", "usuario"],
      profile_photo: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tobey-maguire-andrew-garfield-tom-holland-1607527815.jpg?resize=768:*"
    })
  }

  async update({response}){

    // const user = await User.find(173)

    // user.name = "Cesar Javier"
    // user.lastname = "Sanchez Hernandez"
    // user.email = "prueba@gmail.com"
    // user.roles
    // user.profile_photo = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tobey-maguire-andrew-garfield-tom-holland-1607527815.jpg?resize=768:*"

    // await user.save()

    return response.status(200).send({
      name: "Pepe",
      lastname: "Lopez",
      email: "pepito@gmail.com",
      roles: "user",
      profile_photo: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tobey-maguire-andrew-garfield-tom-holland-1607527815.jpg?resize=768:*"
    })
  }

  async updateChange({response}){



    return response.status(200).send({
      status: "pending"
    })
  }


   async checkToken({request, response}){

    const email = request.input('token_email')

    console.log(email)


    return response.status(200).send({
      status: true    })
  }

  async createCourse({request, response}){


    console.log(request.all())


    return response.status(200)
  }


  async uploadFile({request, response}){
    
    const files = request.file('file')

    if (files) {
      await files.move(Application.tmpPath('uploads'))
    }
    return response.status(200)

  }


}

//https://i.pinimg.com/736x/2d/cd/80/2dcd802794dd3c4895da67916630a0bb.jpg