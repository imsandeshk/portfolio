import React from 'react';
import type { Checkpoint } from '@/services/scmService';

function normalize(points: { lat: number; lng: number }[]) {
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const width = maxLng - minLng || 1;
  const height = maxLat - minLat || 1;

  return points.map((p) => ({
    x: ((p.lng - minLng) / width) * 100,
    y: 100 - ((p.lat - minLat) / height) * 100,
  }));
}

export default function MiniRouteMap({ checkpoints }: { checkpoints: Checkpoint[] }) {
  if (!checkpoints || checkpoints.length === 0) {
    return <div className="h-36 rounded-md border flex items-center justify-center text-sm text-muted-foreground">No route</div>;
  }
  const points = checkpoints.map((c) => c.location);
  const norm = normalize(points);
  const poly = norm.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <svg viewBox="0 0 100 100" className="h-36 w-full rounded-md border bg-muted/30">
      <polyline points={poly} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
      {norm.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.5} fill="hsl(var(--primary))" />
      ))}
    </svg>
  );
}
