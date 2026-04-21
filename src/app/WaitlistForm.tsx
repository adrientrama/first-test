"use client";

import { useActionState } from "react";
import { joinWaitlist, type ActionResult } from "./actions";

export default function WaitlistForm({
  initialCount,
}: {
  initialCount: number;
}) {
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    joinWaitlist,
    null
  );

  const count = state?.success ? state.count : initialCount;

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <p className="text-slate-500 text-sm font-medium tracking-wide uppercase">
        {count} {count <= 1 ? "personne inscrite" : "personnes inscrites"}
      </p>

      {state?.success ? (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-6 py-4 text-sm font-medium">
          <span className="text-lg">✓</span>
          Bienvenue ! Tu es inscrit(e) sur la waitlist.
        </div>
      ) : (
        <form action={formAction} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <div className="flex flex-col flex-1 gap-1">
            <input
              type="email"
              name="email"
              placeholder="ton@email.com"
              required
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            {state && !state.success && (
              <p className="text-rose-500 text-xs pl-1">{state.error}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={pending}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
          >
            {pending ? "…" : "S'inscrire"}
          </button>
        </form>
      )}
    </div>
  );
}
