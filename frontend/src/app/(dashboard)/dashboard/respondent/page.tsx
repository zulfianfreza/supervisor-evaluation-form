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
  useDeleteRespondent,
  useGetRespondents,
} from "@/services/hooks/use-respondent";
import { TRespondent } from "@/types/respondent.type";
import { format } from "date-fns";
import { useCallback } from "react";
import DialogDetailRespondent from "./_components/dialog-detail-respondent";

export default function LaoshiPage() {
  const dialog = useDialog<TRespondent>();
  const dialogDelete = useDialog<TRespondent>();

  const { data, refetch } = useGetRespondents({
    limit: 999,
    sort_by: "created_at.DESC",
  });

  const deleteRespondent = useDeleteRespondent({
    onSuccess: () => {
      refetch();
      dialogDelete.toggle();
    },
  });

  const handleConfirm = useCallback(async () => {
    if (dialogDelete.data) {
      deleteRespondent.mutate(dialogDelete.data.id);
    }
  }, [dialogDelete.data, deleteRespondent]);

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
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Years</TableHead>
              <TableHead>Submitted At</TableHead>
              <TableHead>Total Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.items?.map((item, i) => (
              <TableRow key={item.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{item.first_name}</TableCell>
                <TableCell>{item.last_name}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{item.years_of_service}</TableCell>
                <TableCell>{item.total_score}</TableCell>
                <TableCell>
                  {format(
                    item.assessment_response.submitted_at,
                    "dd MMMM yyyy HH:mm"
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => dialog.open("view", item)}
                    >
                      Detail
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

      <DialogDetailRespondent
        open={dialog.isShow}
        toggle={dialog.toggle}
        respondent={dialog.data}
      />

      <DialogConfirm
        open={dialogDelete.isShow}
        toggle={dialogDelete.toggle}
        onDelete={handleConfirm}
      />
    </Container>
  );
}
