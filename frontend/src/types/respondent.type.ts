import { TTimestamp } from "./common.type";
import { TQuestion } from "./question.type";

export type TRespondent = TTimestamp & {
  id: string;
  first_name: string;
  last_name: string;
  department: string;
  years_of_service: string;
  created_at: Date;
  updated_at: Date;
  total_score: number;
  assessment_response: TAssessmentResponse;
};

export type TAssessmentResponse = {
  id: string;
  respondent_id: string;
  submitted_at: Date;
  created_at: Date;
  updated_at: Date;
  response_answers: TResponseAnswer[];
};

export type TResponseAnswer = {
  id: string;
  assessment_response_id: string;
  question_id: string;
  answer: number;
  created_at: Date;
  updated_at: Date;
  question: TQuestion;
};
