export interface Result {
  dice: Dice[];
  total: number;
  isSecret: boolean;
  status: Status;
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
  Unknown = "UNKNOWN",
}
