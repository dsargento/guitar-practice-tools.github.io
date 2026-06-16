function Fretboard() {
  const tuning = ["E", "A", "D", "G", "B", "E"];
  const strings = tuning.map((value, key) => <String key={key} tuning={value}/>);

  return (
    <div className="fretboard ">
    <div className="string grid grid-cols-12">
    {strings}
    </div>
    </div>
  );
};

function String({tuning}) {
  let notes = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];

  const start = notes.indexOf(tuning);
  notes = notes.slice(start).concat(notes.slice(0, start));

  const displayNotes = notes.map((note, key) => <Note key={key} note={note}/>);
  return (
    <>
    {displayNotes}
    </>
  );
}

function Note({note}) {
  return (
    <div className="note">
    <p>
    {note}
    </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <main className="">
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">

    <Fretboard />
    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
    To get started, edit the page.tsx file.
      </h1>
    <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
    Looking for a starting point or more instructions? Head over to{" "}
    <a
    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    className="font-medium text-zinc-950 dark:text-zinc-50"
    >
    Templates
    </a>{" "}
    or the{" "}
    <a
    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    className="font-medium text-zinc-950 dark:text-zinc-50"
    >
    Learning
    </a>{" "}
    center.
      </p>
    </div>
    <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
    <a
    className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
    href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    target="_blank"
    rel="noopener noreferrer"
    >
    Documentation
    </a>
    </div>
    </main>
    </div>
  );
}
