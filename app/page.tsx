// Bug du DO
// Pourquoi le do est il inclus dans des gammes où il ne doit pas être 
'use client';
import { useState } from "react";
import * as Tone from "tone";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
// const synth = new Tone.Synth().toDestination();

function Fretboard({scale, tuning, root}) {
  let localNotes = [...notes];
  // Note filtering according to scale intervals
  // Start at the rootnote
  let index = localNotes.indexOf(root);
  for (let i = 0; i < scale.length; i++) {
    // Wrapping
    if (index > notes.length) {
      // On wrap, mais on laisse des notes dans la gamme qui ne devraient pas y etre
      // Parce que du coup dans la ligne suivante quand on remplace, on a déjà dépassé les notes
      // Donc il faudrait s'assurer qu'entre 0 et notre index les notes sont bien remplacées
      index = (index - notes.length);
      localNotes = localNotes.fill("", 0, index);
    }

    // On remplace les notes entre l'index actuel non inclus et l'index défini par l'intervalle 
    localNotes = localNotes.fill("", index + 1, index + scale[i]);
    index = index + scale[i];
  }

  const strings = tuning.map((value, key) => <String key={key} tuning={value} localNotes={localNotes}/>);

  return (
    <div className="fretboard ">
    <div className="string grid grid-cols-25">
    {strings}
    </div>
    </div>
  );
};

function String({tuning, localNotes}) {

  const start = notes.indexOf(tuning[0]);
  let octave = tuning[1];
  localNotes = localNotes.slice(start).concat(localNotes.slice(0, start));
  localNotes = localNotes.concat(localNotes).concat([localNotes[0]]);

  const displayNotes = localNotes.map(function(note, key) { 
                                      if (note == "C") {
                                        octave++;
                                      }
                                      return <Note key={key} note={note} octave={octave}/>
  });
  return (
    <>
    {displayNotes}
    </>
  );
}

function Note({note, octave}) {
  if (note !== "") {
  return (
    <div className="note flex flex-column flex-center" onClick={() => synth.triggerAttackRelease(note + octave, "8n")}>
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
  const tuning = ["E4", "B3", "G3", "D3", "A2", "E2"];

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
