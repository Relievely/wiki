import {Router} from "express";
import {getAllWikiController} from "../middleware/controller/wikiController";

export const wiki = Router();

wiki
    .get("/", getAllWikiController)