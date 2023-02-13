import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("novels_chapters",(table)=>{
        table.increments();
        table.integer("chapter_id").unsigned();
        table.foreign("chapter_id").references("chapters.id");
        table.integer("novel_id").unsigned();
        table.foreign("novel_id").references("novels.id");
        table.timestamps(false,true);
    })
    await knex.schema.createTable("reading_list",(table)=>{
        table.increments();
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("users.id");
        table.integer("novels_chapters_id").unsigned();
        table.foreign("novels_chapters_id").references("novels_chapters.id");
        table.timestamps(false,true);
    })
    await knex.schema.createTable("comments",(table)=>{
        table.increments();
        table.text("content");
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("users.id");
        table.integer("novels_chapters_id").unsigned();
        table.foreign("novels_chapters_id").references("novels_chapters.id");
        table.timestamps(false,true);
    })
    await knex.schema.createTable("bookmarked",(table)=>{
        table.increments();
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("users.id");
        table.integer("novel_id").unsigned();
        table.foreign("novel_id").references("novels.id");
        table.timestamps(false,true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("reading_list");
    await knex.schema.dropTable("comments");
    await knex.schema.dropTable("bookmarked");
    await knex.schema.dropTable("novels_chapters");
}

