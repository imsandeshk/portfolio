import React from "react";
import { Link } from "react-router-dom";

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-semibold">Unauthorized</h1>
      <p className="text-muted-foreground max-w-md">You don't have access to this page. Please switch to an account with the required role.</p>
      <Link to="/scm" className="underline">Go to dashboard</Link>
    </div>
  );
};

export default Unauthorized;
