"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useCreateQuestion,
  useUpdateQuestion,
} from "@/services/hooks/use-question";
import { TActionMode } from "@/types/common.type";
import { TQuestion } from "@/types/question.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TDialogActionQuestionProps = {
  open: boolean;
  toggle: () => void;
  mode: TActionMode;
  onSuccess?: () => void;
  question?: TQuestion;
};

const schema = z.object({
  question_text: z.string().min(1, "Field is required"),
});

type TSchema = z.infer<typeof schema>;

export default function DialogActionQuestion({
  open,
  mode,
  toggle,
  onSuccess = () => {},
  question,
}: TDialogActionQuestionProps) {
  const form = useForm<TSchema>({
    defaultValues: {
      question_text: "",
    },
    resolver: zodResolver(schema),
  });

  const createQuestion = useCreateQuestion({
    onSuccess: () => {
      toggle();
      toast.success("Create question successfully");
      onSuccess();
    },
  });

  const updateQuestion = useUpdateQuestion({
    onSuccess: () => {
      toggle();
      toast.success("Update question successfully");
      onSuccess();
    },
  });

  const actualSubmit: SubmitHandler<TSchema> = useCallback(
    async (values) => {
      if (mode === "edit" && question) {
        updateQuestion.mutate({ id: question.id, payload: values });
      }

      if (mode === "add") {
        createQuestion.mutate(values);
      }
    },
    [createQuestion, updateQuestion, question, mode]
  );

  useEffect(() => {
    if (open && mode === "add") {
      form.reset();
    }
  }, [open, mode]);

  useEffect(() => {
    if (open && mode === "edit" && question) {
      form.setValue("question_text", question.question_text);
    }
  }, [question, mode, open]);

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add" : "Update"} Question
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(actualSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="question_text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button>{mode === "add" ? "Create" : "Save"}</Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
