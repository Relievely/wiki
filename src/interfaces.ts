import {ParamsDictionary} from "express-serve-static-core";
import QueryString from "qs";
import {MediaType} from "express";

type ReqBody = any;

export interface ResponseObject<T> {
    url: string,
    route: any,
    query: QueryString.ParsedQs,
    params: ParamsDictionary,
    body: ReqBody,
    accepted: MediaType[],
    status?: string
    data?: {
        length: number
        value: T
    },
    error?: string
}

export interface WikiItem{
    id?: number,
    title: string,
    content:string,
    excerpt: string
}