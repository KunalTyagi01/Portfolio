import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/cn";

export type EmailSendStatus = "idle" | "sending" | "success" | "error";

type EmailStatusMessageProps = Readonly<{
  status: EmailSendStatus;
  emailConfigured: boolean;
  className?: string;
}>;

export function EmailStatusMessage({
  status,
  emailConfigured,
  className,
}: EmailStatusMessageProps) {
  if (!emailConfigured) {
    return (
      <div className={cn("status-message status-message-warning", className)}>
        <AlertTriangle className="mt-0.5 shrink-0" size={18} />
        <span>EmailJS env vars are missing. Use Open Mail App for now.</span>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className={cn("status-message status-message-success", className)}>
        <CheckCircle2 className="mt-0.5 shrink-0" size={18} />
        <span>Message sent successfully. I will get back to you soon.</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={cn("status-message status-message-error", className)}>
        <XCircle className="mt-0.5 shrink-0" size={18} />
        <span>Message failed to send. Please try Open Mail App.</span>
      </div>
    );
  }

  return null;
}
