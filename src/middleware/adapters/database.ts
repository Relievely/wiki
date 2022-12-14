import {emptyResultResponse, responseObjectItems, serviceDB} from "../../helpers";
import {ResponseObject} from "../../interfaces";
import {RunResult, Statement} from "better-sqlite3";
import {Request} from "express";


export const createTablesAdapter = async (req: Request): Promise<ResponseObject<RunResult[]>> => {
    return new Promise<ResponseObject<RunResult[]>>((resolve, reject) => {
        const endResult: RunResult[] = [];

        const createwikiTable: Statement = serviceDB.prepare(`CREATE TABLE IF NOT EXISTS wiki
                                                (
                                                    id INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
                                                    title   TEXT UNIQUE NOT NULL,
                                                    content TEXT NOT NULL,
                                                    excerpt TEXT NOT NULL
                                                );`);

        serviceDB.transaction(() => {
            const wikiResult: RunResult = createwikiTable.run();
            if (wikiResult) {
                endResult.push(wikiResult);
            } else {
                reject(emptyResultResponse);
            }

        })();

        resolve(responseObjectItems<RunResult>(req, endResult));

    })
}

export const fillTablesAdapter = async (req: Request): Promise<ResponseObject<RunResult[]>> => {
    return new Promise<ResponseObject<RunResult[]>>((resolve, reject) => {

        const endResult: RunResult[] = [];

        const fillActivityTable = serviceDB.prepare(`INSERT OR IGNORE INTO wiki (title, content, excerpt)
                                              VALUES ('Meditate', 'If you are stressful, just meditate. It will help you', 'Meditation is good'),
                                              ('Swimming', 'If you are stressful, just go to swim. It will help you', 'Swimming is good'),
                                              ('Football', 'If you are stressful, just play football. It will help you', 'Football is good')
                                                `);

        try {
            serviceDB.transaction(() => {
                const activityResult: RunResult = fillActivityTable.run();
                endResult.push(activityResult);
            })();

            resolve(responseObjectItems<RunResult>(req, endResult));
        } catch (err) {
            reject(err);
        }

    })
}
