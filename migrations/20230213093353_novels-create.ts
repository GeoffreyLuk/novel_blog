import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("authors",(table)=>{
        table.increments();
        table.string("name");
        table.timestamps(false,true)
    })
    await knex.schema.createTable("genres",(table)=>{
        table.increments();
        table.string("genre");
        table.timestamps(false,true);
    })
    await knex.schema.createTable("translators",(table)=>{
        table.increments();
        table.string("name");
        table.string("email");
        table.timestamps(false,true);
    })
    await knex.schema.createTable("novels",(table)=>{
        table.increments();
        table.string("title");
        table.integer("author_id").unsigned().notNullable();
        table.foreign("author_id").references("authors.id")
        table.integer("genre_id").unsigned().notNullable();
        table.foreign("genre_id").references("genres.id")
        table.integer("translator_id").unsigned().nullable();
        table.foreign("translator_id").references("translators.id");
        table.string("picture").defaultTo("default_picture.jpg")
        table.timestamps(false,true);
    })
    await knex.schema.createTable("chapters",(table)=>{
        table.increments();
        table.string("name");
        table.jsonb("content");
        table.timestamps(false,true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("novels")
    await knex.schema.dropTable("authors")
    await knex.schema.dropTable("genres")
    await knex.schema.dropTable("translators")
    await knex.schema.dropTable("chapters")
}

