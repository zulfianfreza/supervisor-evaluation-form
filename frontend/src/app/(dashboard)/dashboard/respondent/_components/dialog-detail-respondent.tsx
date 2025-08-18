"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetRespondent } from "@/services/hooks/use-respondent";
import { TRespondent } from "@/types/respondent.type";

type TDialogDetailRespondentProps = {
  open: boolean;
  toggle: () => void;
  respondent?: TRespondent;
};

export default function DialogDetailRespondent({
  open,
  toggle,
  respondent,
}: TDialogDetailRespondentProps) {
  const { data, isLoading } = useGetRespondent(respondent?.id || "", {
    enabled: !!open && !!respondent,
  });

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Respondent</DialogTitle>
        </DialogHeader>
        <div className=" w-full  flex flex-col gap-6">
          <div className="flex flex-col gap-4 items-start">
            <div className="grid grid-cols-2 w-full">
              <div className=" space-y-1">
                <Label>First Name</Label>
                <p className=" font-medium">{data?.first_name}</p>
              </div>
              <div className=" space-y-1">
                <Label>Last Name</Label>
                <p className=" font-medium">{data?.last_name}</p>
              </div>
            </div>
            <div className=" space-y-1">
              <Label>Department</Label>
              <p className=" font-medium">{data?.department}</p>
            </div>
            <div className=" space-y-1">
              <Label>How many years have you been with this company?</Label>
              <p className=" font-medium">{data?.years_of_service}</p>
            </div>
            <div className=" space-y-1">
              <Label>Score</Label>
              <p className=" font-medium">
                {data?.assessment_response.response_answers.reduce(
                  (acc, curr) => acc + curr.answer,
                  0
                )}
              </p>
            </div>
          </div>
          <div className=" space-y-2">
            <Label>How do you feel about managemenet?</Label>
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
                    data.assessment_response.response_answers.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="  whitespace-normal">
                          {item.question.question_text}
                        </TableCell>
                        {[...Array(5)].map((_, ii) => (
                          <TableCell className=" text-center" key={ii}>
                            <input
                              type="radio"
                              name={item.id}
                              value={5 - ii}
                              defaultChecked={item.answer === 5 - ii}
                              className="w-4 h-4 accent-blue-600 pointer-events-none"
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
