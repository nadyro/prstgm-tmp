import {Credentials} from "./Credentials";

export class AuthResults<U> {
  success: boolean;
  object: U;
  credentials: Credentials;
  message: string;
}
