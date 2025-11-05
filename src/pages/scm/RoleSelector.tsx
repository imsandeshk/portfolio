import ScmLayout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const ROLE_OPTIONS = [
  { id: 'farmer', label: 'Farmer' },
  { id: 'logistics', label: 'Logistics Partner' },
  { id: 'buyer', label: 'Buyer' },
  { id: 'market-agent', label: 'Market Agent' },
  { id: 'admin', label: 'Admin' },
] as const;

export default function RoleSelector() {
  const { roles, setDemoRoles } = useAuth();

  const toggle = (role: string) => {
    const next = roles.includes(role) ? roles.filter((r) => r !== role) : [...roles, role];
    setDemoRoles(next);
  };

  return (
    <ScmLayout>
      <Card>
        <CardHeader>
          <CardTitle>Demo Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {ROLE_OPTIONS.map((r) => (
              <Button key={r.id} variant={roles.includes(r.id) ? 'default' : 'outline'} onClick={() => toggle(r.id)}>
                {r.label}
              </Button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-3">Select roles to simulate access without authentication.</p>
        </CardContent>
      </Card>
    </ScmLayout>
  );
}
