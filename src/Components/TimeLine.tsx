import React, { useState } from "react"; // Merged React imports and removed unused import
import { Boxes } from "./TimeLineGadgets/ResizableBoxes";
import { Rows } from "./TimeLineGadgets/rows";

export default function TimeLine() {
  return (
    <div>
      <div className="flex justify-center bg-white text-black">
        <div className="flex w-full">
          <Rows />
          <div className="hide-scrollbar flex-1 overflow-x-scroll">
            <Boxes />
          </div>
        </div>
      </div>
    </div>
  );
}
