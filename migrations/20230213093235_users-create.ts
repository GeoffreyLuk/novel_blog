import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("permissions",(table)=>{
        table.increments();
        table.string("access");
        table.timestamps(false,true)
    })
    await knex.schema.createTable("users",(table)=>{
        table.increments();
        table.integer("permission_id").unsigned();
        table.foreign("permission_id").references("permissions.id");
        table.string("first_name");
        table.string("last_name");
        table.date("date_of_birth");
        table.string("email");
        table.string("password");
        table.string("icon").defaultTo("default_icon.jpg")
        table.timestamps(false,true)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("users")
    await knex.schema.dropTable("permissions");
}

