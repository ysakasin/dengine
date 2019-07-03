import Random from "./random";

export interface Result {
  dice: Dice[];
  total: number;
  isSecret: boolean;
  status: Status;
  actions: string[];
  messages: string[];
  mainMassage: string;
}

export interface Dice {
  faces: number;
  value: number;
}

export enum Status {
  Success = "SUCCESS",
  Failure = "FAILURE",
  Unknown = "UNKNOWN"
}

export interface Plugin {
  id: string;
  name: string;
  helpMessage: string;
  prefixes?: string[];
  roll(rand: Random, command: string, tokens: string[]): Result | null;
}
