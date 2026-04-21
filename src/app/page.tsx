import { getCount } from "./actions";
import WaitlistForm from "./WaitlistForm";

export default async function Page() {
  const count = await getCount();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-8 text-center max-w-lg w-full">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-indigo-500">
            Bientôt disponible
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Rejoins la waitlist
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            On prépare quelque chose d'incroyable.
            <br />
            Inscris-toi pour être parmi les premiers à y accéder.
          </p>
        </div>

        <WaitlistForm initialCount={count} />
      </div>
    </main>
  );
}
