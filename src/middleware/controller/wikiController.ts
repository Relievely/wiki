import {getAllWikiAdapter} from "../adapters/wiki";
import {responseError} from "../../helpers";
import {ResponseObject, WikiItem} from "../../interfaces";
import {Request, Response} from "express";

export const getAllWikiController = (req: Request, res: Response<ResponseObject<WikiItem[]>>) => {
    getAllWikiAdapter(req)
        .then((response: ResponseObject<WikiItem[]>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}