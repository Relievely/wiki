import {Router} from "express";
import {createTablesController, fillTablesController} from "../middleware/controller/tableController";

export const creation = Router();

creation
    .all("/create", createTablesController)
    .all("/fill",fillTablesController);