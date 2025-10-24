import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSCMAuth } from "../auth/SCMAuthContext";
import { AppRole } from "../types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const roles: AppRole[] = ["farmer", "logistics", "market_agent", "buyer", "admin"];

const SCMLogin: React.FC = () => {
  const [role, setRole] = useState<AppRole | undefined>();
  const { signInAsRole } = useSCMAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    signInAsRole(role);
    const from = (location.state as any)?.from?.pathname || "/scm";
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>SCM Sign in</CardTitle>
          <CardDescription>Select your role to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Role</Label>
              <Select onValueChange={(v: AppRole) => setRole(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(r => (
                    <SelectItem key={r} value={r}>{r.replace("_", " ")}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={!role} className="w-full">Continue</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SCMLogin;
