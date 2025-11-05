import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MockApi } from "../../services/mockApi";

const roles = ["farmer", "logistics", "market_agent", "buyer", "admin"] as const;

type Role = typeof roles[number];

type Row = { id: string; name: string; email: string; role: Role };

const AdminUsers: React.FC = () => {
  // Mock: read users from shipments' participants
  const usersMap = new Map<string, Row>();
  const sample = Array.from((MockApi as any).listRoles());
  roles.forEach((r) => {
    const u = MockApi.getUserByRole(r as Role);
    if (u) usersMap.set(u.id, { id: u.id, name: u.name, email: u.email, role: u.role as Role });
  });
  const users = Array.from(usersMap.values());

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Select defaultValue={u.role}>
                    <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {roles.map((r) => (
                        <SelectItem key={r} value={r}>{r.replace("_", " ")}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">Save</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminUsers;
