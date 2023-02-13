import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("permissions").del();
    await knex("users").del();

    // Inserts seed entries
    await knex("permissions").insert([
        { access: "Admin" },
        { access: "Moderator" },
        { access: "User" }
    ]);
    await knex("users").insert([
        { permission_id: 1 , first_name: "Geoffrey Chun Wah" , last_name: "Luk", 
        date_of_birth: "1997-11-23", email: "geffbluestar@gmail.com", password: "123" },
        { permission_id: 3 , first_name: "Christopher Yat Sum" , last_name: "Wong", 
        date_of_birth: "2005-01-01", email: "test@gmail.com", password: "123" },
    ]);
};
