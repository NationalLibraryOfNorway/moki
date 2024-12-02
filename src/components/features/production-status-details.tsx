import {ReactElement, useEffect, useState} from "react";
import {getEventsById} from "@/services/production-data.ts";
import {DigitizedItem} from "@/models/digitized-item.ts";
import {ItemEvent} from "@/models/item-event.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {LuCheck, LuHourglass, LuX} from "react-icons/lu";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";

interface ProductionStatusDetailsProps {
  selectedObject: DigitizedItem;
}

export const ProductionStatusDetails = (props: ProductionStatusDetailsProps) => {
  const [events, setEvents] = useState<ItemEvent[]>([]);

  useEffect(() => {
    if (!props.selectedObject.id) return;
    getEventsById(props.selectedObject.id).then(events => {
      setEvents(events);
    });
  }, [props.selectedObject.id]);

  const formatDateString = (dateString?: string): string => {
    if (!dateString || dateString.trim() === '') return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19).replace('T', ' ');
  };

  const statusToIcon = (status: string): ReactElement => {
    const getIcon = (status: string): ReactElement => {
      switch (status.toLowerCase()) {
      case 'done':
        return <LuCheck size={24} className="text-blue-500" />;
      case 'failed':
        return <LuX size={24} className="text-orange-500" />;
      default:
        return <LuHourglass size={24} />;
      }
    };

    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            {getIcon(status)}
          </TooltipTrigger>
          <TooltipContent side="right">
            {status}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead className="text-start">Type</TableHead>
          <TableHead className="text-start">Status</TableHead>
          <TableHead className="text-start">Melding</TableHead>
          <TableHead className="text-start">Started</TableHead>
          <TableHead className="text-start">Startet av</TableHead>
          <TableHead className="text-start">Fullført</TableHead>
          <TableHead className="text-start">Fullført av</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event, index) => (
          <TableRow key={index}>
            <TableCell className="text-start">{event.type}</TableCell>
            <TableCell className="text-start">{statusToIcon(event.status ?? '')}</TableCell>
            <TableCell className="text-start">{event.statusText}</TableCell>
            <TableCell className="text-start">{formatDateString(event.started)}</TableCell>
            <TableCell className="text-start">{event.startedBy}</TableCell>
            <TableCell className="text-start">{formatDateString(event.completed)}</TableCell>
            <TableCell className="text-start">{event.completedBy}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
};