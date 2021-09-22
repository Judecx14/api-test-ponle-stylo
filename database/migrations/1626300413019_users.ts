import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary(),
      table.string('name', 200).notNullable()
      table.string('lastname', 200).nullable()
      //table.string('username', 25).notNullable().unique()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('role', 10)
      table.string('profile_photo').nullable(),
      table.boolean('validate').notNullable()
      table.timestamps(true, true )
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
