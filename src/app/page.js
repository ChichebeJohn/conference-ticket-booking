import { redirect } from "next/navigation";

export default function HomePage() {
  // Immediately redirect to the ticket booking page
  redirect("/tickets");
  return null;
}
