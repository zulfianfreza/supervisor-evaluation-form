"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetRespondent } from "@/services/hooks/use-respondent";
import Link from "next/link";

type TPageProps = {
  searchParams: {
    id: string;
  };
};

export default function Page({ searchParams }: TPageProps) {
  const { data, isLoading } = useGetRespondent(searchParams?.id || "", {
    enabled: !!searchParams?.id,
  });

  return (
    <div className=" min-h-screen w-full bg-neutral-200/80 p-4">
      <div className=" max-w-2xl w-full mx-auto">
        <div className=" w-full aspect-[3.5/1] relative rounded-t-lg overflow-hidden bg-[url(/images/background.jpg)] bg-center bg-cover" />
        <div className=" w-full p-6 bg-white rounded-b-lg flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6 items-start">
            <div className=" space-y-2">
              <Label required>First Name</Label>
              {isLoading ? (
                <Skeleton className=" w-full h-9" />
              ) : (
                <Input defaultValue={data?.first_name} />
              )}
            </div>
            <div className=" space-y-2">
              <Label required>Last Name</Label>
              {isLoading ? (
                <Skeleton className=" w-full h-9" />
              ) : (
                <Input defaultValue={data?.last_name} />
              )}
            </div>
            <div className=" col-start-1 space-y-2">
              <Label required>Department</Label>
              {isLoading ? (
                <Skeleton className=" w-full h-9" />
              ) : (
                <Input defaultValue={data?.department} />
              )}
            </div>
            <div className=" col-span-2 space-y-2">
              <Label required>
                How many years have you been with this company?
              </Label>
              {isLoading ? (
                <Skeleton className=" w-48 h-9" />
              ) : (
                <Input
                  defaultValue={data?.years_of_service}
                  className=" w-48"
                />
              )}
            </div>
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
          <Link href="/" className=" text-blue-400 underline text-sm">
            Submit another response
          </Link>
        </div>
      </div>
    </div>
  );
}
