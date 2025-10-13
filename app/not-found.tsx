import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-bold font-heading text-accent mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-muted mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have
          been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="h-5 w-5" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/projects">
              <ArrowLeft className="h-5 w-5" />
              View Projects
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

