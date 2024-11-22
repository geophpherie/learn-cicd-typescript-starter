import { Request, Response } from "express";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { respondWithError, respondWithJSON } from "./json.js";
import { createUser, getUser } from "../db/queries/users.js";
import { User } from "../db/schema.js";

export async function handlerUsersCreate(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const apiKey = generateRandomSHA256Hash();
    const userId = uuidv4();

    await createUser({
      id: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name,
      apiKey,
    });
    const user = await getUser(apiKey);
    if (user) {
      respondWithJSON(res, 201, user);
    } else {
      respondWithError(res, 500, "Couldn't retrieve user");
    }
  } catch {
    respondWithError(res, 500, "Couldn't create user");
  }
}

export async function handlerUsersGet(req: Request, res: Response, user: User) {
  respondWithJSON(res, 200, user);
}

function generateRandomSHA256Hash(): string {
  return crypto
    .createHash("sha256")
    .update(crypto.randomBytes(32))
    .digest("hex");
}

// notely-dev-1: is this still used?
export function isValidEmail(email: string): boolean {
  const emailExpression =
    /^([a-zA-Z0-9_])+(([a-zA-Z0-9])+)+([a-zA-Z0-9]{2,4})+$/;

  return emailExpression.test(email);
}