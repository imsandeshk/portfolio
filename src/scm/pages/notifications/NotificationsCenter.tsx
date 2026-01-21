import React from "react";
import { useSCMAuth } from "../../auth/SCMAuthContext";
import { MockApi } from "../../services/mockApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NotificationsCenter: React.FC = () => {
  const { currentUser } = useSCMAuth();
  const qc = useQueryClient();
  const { data: notifications } = useQuery({
    queryKey: ["notifications", currentUser?.id],
    queryFn: () => MockApi.listNotifications(currentUser!.id),
    enabled: !!currentUser,
  });

  const markRead = useMutation({
    mutationFn: (id: string) => MockApi.markNotificationRead(currentUser!.id, id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications?.map(n => (
            <div key={n.id} className="flex items-center justify-between border rounded p-3">
              <div>
                <div className="font-medium">{n.type.toUpperCase()}</div>
                <div className="text-sm">{n.message}</div>
                <div className="text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleString()}</div>
              </div>
              {!n.read && (
                <Button size="sm" variant="outline" onClick={() => markRead.mutate(n.id)}>Mark read</Button>
              )}
            </div>
          ))}
          {!notifications?.length && <div className="text-sm text-muted-foreground">No notifications.</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsCenter;
