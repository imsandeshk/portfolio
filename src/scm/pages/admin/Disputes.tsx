import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Disputes: React.FC = () => {
  const disputes = [
    { id: "d1", subject: "Damaged crates on arrival", shipmentId: "s_xxxxxx1", status: "open" },
    { id: "d2", subject: "Quantity mismatch", shipmentId: "s_xxxxxx2", status: "investigating" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Disputes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Shipment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {disputes.map((d) => (
              <TableRow key={d.id}>
                <TableCell className="font-medium">{d.subject}</TableCell>
                <TableCell>{d.shipmentId}</TableCell>
                <TableCell className="capitalize">{d.status}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">Resolve</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Disputes;
