import {Request} from "express";
import {ResponseObject, WikiItem} from "../../interfaces";
import {emptyResultResponse, emptyStatementResponse, responseObjectItems, serviceDB} from "../../helpers";
import {Statement} from "better-sqlite3";

export const getAllWikiAdapter = async (req: Request): Promise<ResponseObject<WikiItem[]>> => {
    return new Promise<ResponseObject<WikiItem[]>>((resolve, reject) => {
        const stmt: Statement = serviceDB.prepare(`SELECT * FROM wiki`);
        if (!stmt) {
            reject(emptyStatementResponse)
        }

        const results: WikiItem[] = stmt.all() as WikiItem[];
        if (results) {
            resolve(responseObjectItems<WikiItem>(req, results));
        } else {
            reject(emptyResultResponse)
        }
    });
}