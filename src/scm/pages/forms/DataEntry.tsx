import React, { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MockApi } from "../../services/mockApi";
import { useSCMAuth } from "../../auth/SCMAuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Shipment } from "../../types";

const DataEntry: React.FC = () => {
  const { currentUser, role } = useSCMAuth();
  const qc = useQueryClient();
  const { data: shipments } = useQuery({
    queryKey: ["shipments", role, currentUser?.id],
    queryFn: () => MockApi.listShipments({ role: role!, userId: currentUser!.id }),
    enabled: !!currentUser && !!role,
  });

  const [selectedShipment, setSelectedShipment] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<"in_transit" | "delayed" | "delivered">("in_transit");
  const [notes, setNotes] = useState("");
  const [lat, setLat] = useState<string>("");
  const [lng, setLng] = useState<string>("");

  const mutation = useMutation({
    mutationFn: async () => {
      if (!selectedShipment || !currentUser) return;
      return MockApi.addCheckpoint(selectedShipment, {
        name: "Manual Update",
        location: { lat: parseFloat(lat) || 0, lng: parseFloat(lng) || 0 },
        timestamp: new Date().toISOString(),
        handlerRole: role!,
        handlerName: currentUser.name,
        status,
        notes,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["shipments"] });
      qc.invalidateQueries({ queryKey: ["shipment", selectedShipment] });
      setNotes("");
    },
  });

  const canSubmit = useMemo(() => !!selectedShipment && !!role && (role === "farmer" || role === "logistics"), [selectedShipment, role]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <Label>Shipment</Label>
            <Select onValueChange={setSelectedShipment}>
              <SelectTrigger>
                <SelectValue placeholder="Select shipment" />
              </SelectTrigger>
              <SelectContent>
                {shipments?.map((s: Shipment) => (
                  <SelectItem key={s.id} value={s.id}>{s.crop} - {s.batchId}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label>Status</Label>
            <Select onValueChange={(v: any) => setStatus(v)} defaultValue={status}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Latitude</Label>
            <Input value={lat} onChange={(e) => setLat(e.target.value)} placeholder="e.g., 19.22" />
          </div>
          <div className="space-y-2">
            <Label>Longitude</Label>
            <Input value={lng} onChange={(e) => setLng(e.target.value)} placeholder="e.g., 72.88" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label>Notes</Label>
            <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Condition, delays, etc." />
          </div>
          <div className="md:col-span-2">
            <Button disabled={!canSubmit || mutation.isPending} onClick={() => mutation.mutate()}>Submit Update</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataEntry;
