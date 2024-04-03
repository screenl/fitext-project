"use client"; // This is a client component 👈🏽

import player from "../Components/video_player";
import { useState } from "react";

import TimeLine from "~/Components/TimeLine";
import VideoUploadButton from "~/Components/VideoUploadButton";
import AddExcersiseButton from "~/Components/AddExcersiseButton";

export default function HomePage() {
  const [vs, setvs] = useState({
    time: 1,
    progress: 0,
    workout_desc: "",
    playing: false,
  });
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const [exercises, setExercisesState] = useState<Array<{reps: number, sets: number, time: number}>>([]);
  const addExercise = () => {
    setExercisesState([...exercises, { reps: 0, sets: 0, time: 0}]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div className="container flex flex-col items-center justify-center px-4 py-16 ">
        {/*<h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">*/}
        {/*  Create <span className="text-[hsl(280,100%,70%)]">T3</span> App*/}
        {/*</h1>*/}
        <div className="aspect-video h-[450px] w-[975px]">
          {player(vs, setvs, videoUrl)}
        </div>
        <div className="h-[250 px] flex flex-row ">
          <div className="w-[850px]">
              <TimeLine exercises={exercises} setExercisesState={setExercisesState}/>
          </div>

          {/* The div for the buttons on the right */}
          <div className=" flex flex-col overflow-hidden bg-white">
              <AddExcersiseButton addExercise={addExercise}/>
              <VideoUploadButton onVideoUpload={setVideoUrl}/>
          </div>
        </div>
        {/*<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"></div>*/}
      </div>
    </main>
  );
}
