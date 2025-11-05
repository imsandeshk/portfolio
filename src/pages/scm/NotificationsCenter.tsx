import ScmLayout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { listNotifications, markNotificationRead, Notification } from '@/services/scmService';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function NotificationsCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    listNotifications().then(setNotifications);
  }, []);

  const markRead = async (id: string) => {
    await markNotificationRead(id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <ScmLayout>
      <div className="space-y-3">
        {notifications.map((n) => (
          <Card key={n.id} className={n.read ? 'opacity-70' : ''}>
            <CardHeader>
              <CardTitle>{n.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">{new Date(n.createdAt).toLocaleString()}</div>
              <p className="mt-2">{n.message}</p>
              {!n.read && (
                <Button size="sm" className="mt-3" onClick={() => markRead(n.id)}>Mark as read</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </ScmLayout>
  );
}
