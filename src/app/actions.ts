"use server";

import fs from "fs/promises";
import path from "path";

const WAITLIST_PATH = path.join(process.cwd(), "data", "waitlist.json");

async function readEmails(): Promise<string[]> {
  try {
    const raw = await fs.readFile(WAITLIST_PATH, "utf-8");
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

async function writeEmails(emails: string[]): Promise<void> {
  await fs.writeFile(WAITLIST_PATH, JSON.stringify(emails, null, 2), "utf-8");
}

export type ActionResult =
  | { success: true; count: number }
  | { success: false; error: string };

export async function joinWaitlist(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const email = (formData.get("email") as string | null)?.trim() ?? "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Adresse email invalide." };
  }

  const emails = await readEmails();

  if (emails.includes(email.toLowerCase())) {
    return { success: false, error: "Cette adresse est déjà inscrite." };
  }

  emails.push(email.toLowerCase());
  await writeEmails(emails);

  return { success: true, count: emails.length };
}

export async function getCount(): Promise<number> {
  return (await readEmails()).length;
}
