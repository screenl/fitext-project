"use client"; // This is a client component 👈🏽

import player from "../Components/video_player";
import React, { useState, useEffect } from "react";

import TimeLine from "~/Components/TimeLine";
import VideoUploadButton from "~/Components/VideoUploadButton";
import AddExerciseButton from "~/Components/AddExerciseButton";
import PortraitView from "~/Components/PortraitView";
import LoopButton from "~/Components/LoopButton";

interface MobilePreviewProps {
  videoUrl: string | null;
  setvs: (
    value:
      | ((prevState: {
          workout_desc: string;
          progress: number;
          playing: boolean;
          time: number;
        }) => {
          workout_desc: string;
          progress: number;
          playing: boolean;
          time: number;
        })
      | {
          workout_desc: string;
          progress: number;
          playing: boolean;
          time: number;
        },
  ) => void;
  vs: {
    workout_desc: string;
    progress: number;
    playing: boolean;
    time: number;
  };
  islooping: boolean;
  currentPlaying: number;
}

export default function HomePage(this: any) {
  /*
  List of important hooks:
  state [vs, setvs]: keep track of the playing properties of the video, like duration and play or stop status etc.
  state [currentPlaying, setCurrentPlaying]: keep track of the current playing exercise.
  state [width, setWidth]: the width of TimeLine component (where the boxes of exercises are).

  effect currentPlayingEffect: updates when the video is being played, or the playing status is changed.

  More details in the comments below.
   */

  // The state that keep track of the playing progress of the video
  const [vs, setvs] = useState({
    time: 1, // The total length of the video (in seconds)
    progress: 0, // The time elapsed (in seconds)
    workout_desc: "",
    playing: false,
  });
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  // const playerRef = React.useRef<ReactPlayer>(null);

  // The state that manage the information of the exercises in the box
  const [exercises, setExercisesState] = useState<
    Array<{
      name: string;
      reps: number;
      sets: number;
      time: number;
      size: number;
    }>
  >([
    {
      name: "jogging",
      reps: 0,
      sets: 0,
      time: 0,
      size: 100,
    },
  ]);

  const currentPlayingEffect = useEffect(() => {
    handleCurrentPlaying();
  }, [vs.progress, vs.playing]);

  const [isLooping, setLoop] = useState(false);
  const [currentExercise, setCurrentExercise] = useState([0,1000]);

  // The state that monitors the current box
  const [currentPlaying, setCurrentPlaying] = useState<number>(0);
  const handleCurrentPlaying = () => {
    let currentTime: number = vs.progress / vs.time;
    let acc = 0;
    let index = 0;

    for (index; index < exercises.length; index++) {
      let element = exercises[index]!;
      acc += element.size! / 100; // Here I am using size to monitor the progress
      if (currentTime <= acc) {
        break;
      }
    }

    if(!isLooping)
      setCurrentExercise([exercises[index]!.time,acc*vs.time-exercises[index]!.time]);
    setCurrentPlaying(index);
  };

  const addExercise = () => {
    if (exercises.length == 0) {
      setExercisesState([
        ...exercises,
        { name: "jogging", reps: 0, sets: 0, time: 0, size: 100 },
      ]);
      return;
    }

    setExercisesState([
      ...exercises,
      {
        name: "jogging",
        reps: 0,
        sets: 0,
        time: 0,
        size: exercises[exercises.length - 1]!.size,
      },
    ]);
  };

  const [width, setWidth] = useState(200);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center px-4">
        {/* Top part with Landscape and Portrait view */}
        <div className="flex flex-row">
          <div className="aspect-video h-[450px] w-[900px]">
            {player(vs, setvs, videoUrl, true, isLooping, currentPlaying,currentExercise[0]!,currentExercise[1]!)}
          </div>
          {/*  TODO: fix size issues */}
          {/*<MobilePreview vs={vs} setvs={setvs} videoUrl={videoUrl} />*/}
          {/*<div className="aspect-video h-[450px] w-[975px]">*/}
          {/*  {player(vs, setvs, videoUrl)}*/}
          {/*</div>*/}

          <PortraitView
            exercises={exercises}
            currentPlaying={currentPlaying}
            vs={vs}
            setvs={setvs}
            videoUrl={videoUrl}
            isLooping={isLooping}
            currentExLength={currentExercise[0]!}
            currentExStart={currentExercise[1]!}
          />
        </div>

        <div className="flex flex-row ">
          <div className="w-[850px]">
            <TimeLine
              exercises={exercises}
              setExercisesState={setExercisesState}
              width={width}
              setWidth={setWidth}
              current={currentPlaying}
              vs={vs}
            />
          </div>

          {/*  TODO: max-height */}
          <div className="flex flex-col overflow-hidden bg-white">
            <AddExerciseButton addExercise={addExercise} />
            <VideoUploadButton onVideoUpload={setVideoUrl} />
            {LoopButton(isLooping, setLoop)}
          </div>
        </div>
      </div>
    </main>
  );
}
