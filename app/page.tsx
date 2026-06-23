'use client';
import { useState } from "react";
import * as Tone from "tone";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const synth = new Tone.Synth().toDestination();

function Fretboard({scale, tuning, root}) {
  let localNotes = [...notes];

  let index = localNotes.indexOf(root);
  for (let i = 0; i < scale.length; i++) {
    if (index > notes.length) {
      index = index - notes.length;
    }
    localNotes = localNotes.fill("", index + 1, index + scale[i]);
    index = index + scale[i];
  }

  const strings = tuning.map((value, key) => <String key={key} tuning={value} localNotes={localNotes}/>);

  return (
    <div className="fretboard ">
    <div className="string grid grid-cols-12">
    {strings}
    </div>
    </div>
  );
};

function String({tuning, localNotes}) {

  const start = notes.indexOf(tuning);
  localNotes = localNotes.slice(start).concat(localNotes.slice(0, start));

  const displayNotes = localNotes.map((note, key) => <Note key={key} note={note}/>);
  return (
    <>
    {displayNotes}
    </>
  );
}

function Note({note}) {
  if (note !== "") {
  return (
    <div className="note flex flex-column flex-center" onClick={() => synth.triggerAttackRelease(note + "4", "8n")}>
    <p>
    {note}
    </p>
    </div>
  );
  } else {
  return (
    <div className="note flex">
    </div>
  );
  }
}

function RootNote({root, onRootChange}) {
  const listNotes = notes.map(function(note, key) { 
    if (root === note) {
      return <li key={key} className="active"><a href="#">{note}</a></li>
    } else {
      return <li key={key}><a href="#" onClick={() => onRootChange(note)}>{note}</a></li>
    }
  });

  return <ul className="rootNotes flex flex-row items-center items-stretch text-center sm:items-start sm:text-left">{listNotes}</ul>;
}

export default function Home() {
  const [rootNote, setRootNote] = useState("B");
  const scale = [2, 2, 1, 2, 2, 2, 1];
  const tuning = ["E", "A", "D", "G", "B", "E"];

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <main className="">
    <h1>Root note: {rootNote}</h1>
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">

    <Fretboard scale={scale} tuning={tuning} root={rootNote}/>
    <RootNote root={rootNote} onRootChange={setRootNote}/>
    Chromatic
    Major diatonic, Ionian mode
    Lydian
    Mixolydian
    Melodic minor
    Dorian
    Phrygian
    Aeolian mode Natural minor relative minor
    Harmonic minor
    Major pentatonic
    Minor pentatonic
    Whole tone
    Diminished
    Locrian

    <select>
    <option>E Standard</option>
    </select>
    </div>

    </main>
    </div>
  );
}
