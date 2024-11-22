import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type RowProps = {
  cellContent: (string | JSX.Element)[];
  onRowClick: () => void;
}

type ListTableProps = {
  caption: string;
  headers: string[];
  rows: RowProps[];
  tooltip?: string;
};

export const ListTable = ({ caption, headers, rows, tooltip }: ListTableProps) => {
  return (
    <div className="overflow-x-auto max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto">
      <TooltipProvider>
        <Table className="min-w-full border border-gray-300 border-collapse">
          <TableCaption>{caption}</TableCaption>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <Tooltip key={rowIndex}>
                <TooltipTrigger asChild>
                  <TableRow
                    key={rowIndex}
                    onClick={row.onRowClick}
                  >
                    {row.cellContent.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                </TooltipTrigger>
                {tooltip && (
                  <TooltipContent>
                    <p>{tooltip}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </TableBody>
        </Table>
      </TooltipProvider>
    </div>
  );
};
