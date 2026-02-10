"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold">Something went wrong</h1>

        <p className="text-muted-foreground">
          An unexpected error occurred while loading this page.
        </p>

        <div className="rounded-lg border bg-card p-4 text-sm text-left text-muted-foreground">
          {error.message}
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => reset()}>
            Try again
          </Button>

          <Button variant="default" asChild>
            <a href="/">Go home</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
