import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/shadcn/dialog"
import {ReactNode} from "react";
import {LuCircleHelp} from "react-icons/lu";

interface HelpDialogProps {
  title: string;
  body: ReactNode | string;
}

export const HelpDialog = (props: HelpDialogProps) => {

  return (
    <Dialog>
      <DialogTrigger className="rounded-full size-10 flex items-center justify-center hover:bg-accent hover:cursor-pointer">
        <LuCircleHelp style={{ width: '24px', height: '24px' }}  />
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