// src/types/custom.ts

import { Request } from "express";
import { Iuser } from "../models/user.model"; 

export interface CustomRequest extends Request {
    user?: Iuser;
}
