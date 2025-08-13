import { TTimestamp } from "./common.type";

export type TQuestion = TTimestamp & {
  id: string;
  question_text: string;
};
