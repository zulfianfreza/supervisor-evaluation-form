"use client";

import Container from "@/components/container";
import DialogConfirm from "@/components/dialog-confirm";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDialog from "@/hooks/use-dialog";
import {
  useDeleteQuestion,
  useGetQuestions,
} from "@/services/hooks/use-question";
import { TQuestion } from "@/types/question.type";
import { useCallback } from "react";
import DialogActionQuestion from "./_components/dialog-action-question";

export default function LaoshiPage() {
  const dialog = useDialog<TQuestion>();
  const dialogDelete = useDialog<TQuestion>();

  const { data, refetch } = useGetQuestions({
    limit: 999,
    sort_by: "created_at.DESC",
  });

  const deleteQuestion = useDeleteQuestion({
    onSuccess: () => {
      refetch();
      dialogDelete.toggle();
    },
  });

  const handleConfirm = useCallback(async () => {
    if (dialogDelete.data) {
      deleteQuestion.mutate(dialogDelete.data.id);
    }
  }, [dialogDelete.data, deleteQuestion]);

  return (
    <Container>
      <div className="flex justify-end">
        <Button onClick={() => dialog.open()} size="sm">
          Add
        </Button>
      </div>
      <div className="mt-4 w-full overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">No.</TableHead>
              <TableHead>Question</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.items?.map((item, i) => (
              <TableRow key={item.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{item.question_text}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => dialog.open("edit", item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => dialogDelete.open("delete", item)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DialogActionQuestion
        open={dialog.isShow}
        toggle={dialog.toggle}
        mode={dialog.mode}
        onSuccess={() => {
          refetch();
        }}
        question={dialog.data}
      />

      <DialogConfirm
        open={dialogDelete.isShow}
        toggle={dialogDelete.toggle}
        onDelete={handleConfirm}
      />
    </Container>
  );
}
