"use client";

import CanvasSidebar from "./canvas-sudebar";

const Canvas = () => {
  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div
          className="bg-background msx-w-[920px] h-full m-auto rounded-xl flex flex-col
        flex-grow items-center justify-start flex-1 overflow-y-auto"
        >
          <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
            اینجا رها کنید
          </p>
        </div>
      </div>
      <CanvasSidebar />
    </div>
  );
};

export default Canvas;
