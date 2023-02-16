import express from "express";
import path from "path"
import Knex from "knex";
import { User } from "./util/middleware";
import { formidableUserDetails } from "./util/formidable";

export const userRoutes = express.Router()