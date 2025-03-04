'use client';

import {useEffect, useState} from "react";
import {getEventsById} from "@/services/production-data";
import {DigitizedItem} from "@/models/digitized-item";
import {ItemEvent} from "@/models/item-event";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/shadcn/table";
import {LuCheck, LuExternalLink, LuHourglass, LuX} from "react-icons/lu";
import {Tooltip} from "@/components/features/tooltip";
import {Button} from "@/components/ui/shadcn/button";

interface ProductionStatusDetailsProps {
  selectedObject: DigitizedItem;
}

export const ProductionStatusDetails = (props: ProductionStatusDetailsProps) => {
  const [events, setEvents] = useState<ItemEvent[]>([]);

  const relationUrl = process.env.NEXT_PUBLIC_RELATION_URL;

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

  const statusToIcon = (status: string) => {
    switch (status.toLowerCase()) {
    case 'done':
      return <Tooltip trigger={<LuCheck size={24} className="text-blue-500"/> } description={status} />;
    case 'failed':
      return <Tooltip trigger={<LuX size={24} className="text-orange-500" />} description={status} />;
    default:
      return <Tooltip trigger={<LuHourglass size={24} />} description={status} />;
    }
  };

  const isDigitizedPeriodical = (productionLineId: number): boolean => {
    return productionLineId === 26 || // Demonteringsskanning v2 (Flere hefter)
      productionLineId === 27 ||      // POS og V-form skanning v2 (1) (Return m/omslag)
      productionLineId === 28 ||      // POS og demonteringsskanning v2 (Kassering m/omslag)
      productionLineId === 37;        // Tidsskrift - Komplett (Enkelthefte)
  }

  return (
    <div className="text-start">
      <div className="flex justify-start gap-2.5 mb-5">
        {isDigitizedPeriodical(props.selectedObject.plineId ?? -1) && (
          <a href={`${relationUrl}/periodicals/issue/${props.selectedObject.id}`} target="_blank" rel="noreferrer">
            <Button variant="outline">Se i Relation <LuExternalLink /></Button>
          </a>
        )}
        {props.selectedObject.status === 'AddToSearchIndex.done' && (
          <a href={`https://urn.nb.no/URN:NBN:no-nb_${props.selectedObject.description}`} target="_blank" rel="noreferrer">
            <Button variant="outline">Se i nettbiblioteket<LuExternalLink /></Button>
          </a>
        )}
      </div>
      <Table>
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
    </div>

  )
};