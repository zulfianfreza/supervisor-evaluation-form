"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useGetQuestions } from "@/services/hooks/use-question";
import { useSubmitRespondent } from "@/services/hooks/use-respondent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const assestmentSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  department: z.string().min(1, "Department is required"),
  years_of_service: z.string().min(1, "Years of service is required"),
  answers: z.array(
    z.object({
      question_id: z.string(),
      answer: z.string().min(1, "Answer is required"),
    })
  ),
});

type AssestmentData = z.infer<typeof assestmentSchema>;

export default function AssessmentForm() {
  const router = useRouter();

  const { data, isLoading } = useGetQuestions({ sort_by: "created_at.ASC" });

  const form = useForm<AssestmentData>({
    resolver: zodResolver(assestmentSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      department: "",
      years_of_service: "",
      answers: [],
    },
  });

  const submitRespondent = useSubmitRespondent({
    onSuccess: (data) => {
      form.reset();
      router.push(`/success?id=${data.data.id}`);
    },
  });

  const onSubmit: SubmitHandler<AssestmentData> = useCallback(
    (values) => {
      submitRespondent.mutate(values);
    },
    [submitRespondent]
  );

  useEffect(() => {
    if (data && data.items) {
      const answers = data.items.map((item) => ({
        question_id: item.id,
        value: "",
      }));

      form.reset({
        ...form.getValues(),
        answers: answers,
      });
    }
  }, [data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" w-full p-6 bg-white rounded-b-lg flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6 items-start">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>First Name</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Last Name</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem className=" col-start-1">
                  <FormLabel required>Department</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="years_of_service"
              render={({ field }) => (
                <FormItem className=" col-span-2">
                  <FormLabel required>
                    How many years have you been with this company?
                  </FormLabel>
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className=" w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 years">1 years</SelectItem>
                      <SelectItem value="2 years">2 years</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" space-y-2">
            <Label required>How do you feel about managemenet?</Label>
            <Table>
              <TableBody className=" [&_td]:px-1">
                <TableRow>
                  <TableCell className=" "></TableCell>
                  <TableCell className=" whitespace-pre-line text-center">
                    Strongly Agree
                  </TableCell>
                  <TableCell>Agree</TableCell>
                  <TableCell>Neutral</TableCell>
                  <TableCell>Disagree</TableCell>
                  <TableCell className=" whitespace-pre-line text-center">
                    Strongly Disagree
                  </TableCell>
                </TableRow>
                {isLoading
                  ? [...Array(5)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell className="  whitespace-normal">
                          <Skeleton className=" w-[250px] h-4" />
                        </TableCell>
                        {[...Array(5)].map((_, ii) => (
                          <TableCell className=" text-center" key={ii}>
                            <Skeleton className=" h-4 w-4 mx-auto rounded-full" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  : data &&
                    data.items.map((item, i) => (
                      <TableRow
                        key={item.id}
                        className={cn({
                          " bg-red-50":
                            !!form.formState.errors.answers?.[i]?.answer,
                        })}
                      >
                        <TableCell className="  whitespace-normal">
                          {item.question_text}
                        </TableCell>
                        {[...Array(5)].map((_, ii) => (
                          <TableCell className=" text-center" key={ii}>
                            <FormField
                              control={form.control}
                              name={`answers.${i}.answer`}
                              render={({ field }) => (
                                <input
                                  type="radio"
                                  name={item.id}
                                  value={5 - ii}
                                  checked={field.value === (5 - ii).toString()}
                                  className="w-4 h-4 accent-blue-600 "
                                  onChange={(e) => {
                                    const value = e.target.value;

                                    field.onChange(value);
                                  }}
                                />
                              )}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" type="button" onClick={() => form.reset()}>
            Clear Form
          </Button>
          <Button disabled={submitRespondent.isPending}>
            {submitRespondent.isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
