import { videoPreview } from "./video_preview";

export interface videoState {
  time: number
  progress: number
  workout_desc: string
}

function secs_to_mmss(t:number){
  return new Date(t * 1000).toISOString().slice(14, 19);
}

export default function player(state: videoState){

  function progressBar(){
    let percentage = (Math.floor((state.progress / state.time) * 100)).toString()+'%';
    
    return (
      
        <div className="flex flex-row w-full h-5 mt-4 mb-2">
          <div className="font-sans font-bold text-base h-sm w-20 ml-4 leading-none">  
            <p>{secs_to_mmss(state.progress)}</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700 mr-4">
            <div className="bg-blue-600 h-3 rounded-full " style={{width: percentage}}></div>
          </div>
        </div>
      
    )
  }

  function sideBar(){
    return <div className="rounded-r-lg h-auto w-12 max-w-12 border-2 border-gray-300 dark:border-gray-800">

    </div>
  }

  function videoSpecs(){
    return <div className="flex flex-1 flex-col h-autos mb-auto">
      <div className="z-10 text-xl font-semibold mt-5 mb-auto ml-4">{secs_to_mmss(state.time)}</div>
      <div className="z-10 text-sm font-bold ml-4" >{state.workout_desc}</div>
    </div>
  }

  return (<div className="flex flex-row bg-white h-full text-black dark:text-white dark:bg-gray-900">
      {sideBar()}
      <div className="relative flex flex-col flex-1 w-full h-full">
          {videoPreview()}
        {videoSpecs()}
        {progressBar()}
      </div>
    </div>
  )
}