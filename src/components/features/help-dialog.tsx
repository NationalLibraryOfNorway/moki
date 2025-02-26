import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import {LuHelpCircle} from "react-icons/lu";
import {ReactNode} from "react";

interface HelpDialogProps {
  title: string;
  body: ReactNode | string;
}

export const HelpDialog = (props: HelpDialogProps) => {

  return (
    <Dialog>
      <DialogTrigger className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-accent">
        <LuHelpCircle style={{ width: '24px', height: '24px' }}  />
      </DialogTrigger>
      <DialogContent className="max-h-dvh overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <div>
            {props.body}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
};