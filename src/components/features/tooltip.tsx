import {Tooltip as ShadcnTooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {ReactNode} from "react";

interface TooltipProps {
  trigger: ReactNode;
  description: string;
  delayDuration?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export const Tooltip = (props: TooltipProps) => {
  return (
    <TooltipProvider>
      <ShadcnTooltip delayDuration={props.delayDuration ?? 0}>
        <TooltipTrigger>
          {props.trigger}
        </TooltipTrigger>
        <TooltipContent side={props.side ?? 'right'}>
          {props.description}
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  )
};