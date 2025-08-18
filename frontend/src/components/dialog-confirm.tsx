'use client';

import { LucideXCircle } from 'lucide-react';
import { Dialog, DialogClose, DialogContent } from './ui/dialog';
import { Button } from './ui/button';

type TProps = {
  open: boolean;
  toggle: () => void;
  onDelete?: () => void;
  loading?: boolean;
};

export default function DialogConfirm({
  open,
  toggle,
  onDelete = () => {},
  loading = false,
}: TProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={toggle}
    >
      <DialogContent className="lg:max-w-md">
        <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
          <LucideXCircle
            size={80}
            className="text-red-500"
          />
          <p>Apakah kamu yakin ingin menghapus data ini?</p>
          <div className="mt-4 flex justify-center gap-2">
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>

            <Button
              onClick={onDelete}
              variant="destructive"
              disabled={loading}
            >
              Hapus
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
