import React from "react";
import Image from "next/image";
const Experience = () => {
  return (
    <div className="w-full h-full flex p-12 flex-col items-start justify-start">
      <div
        data-name="experience-grid"
        className="w-full h-fit grid grid-cols-[13%_2%_85%] border-1 border-dashed border-highlight/10 rounded-lg items-center gap-2 justify-center"
      >
        <p className="text-sm font-silkamono font-bold text-highlight/70 text-center">
          2022-2025
        </p>
        <div
          data-name="line"
          className="w-[8px] h-[200px] bg-highlight/80 justify-self-center"
        ></div>

        <div className="w-fit h-fit flex flex-col items-start justify-center p-4 border-1 border-dashed border-highlight/10 rounded-lg gap-6 shadow-md shadow-black/80 justify-self-start">
          <Image
            src="/assets/logos/yangflow.svg"
            alt="Yangflow"
            width={200}
            height={200}
          />
          <p className="text-sm font-silkamono font-bold leading-6 text-highlight/70">
            Fullstack Developer ⎜ Tech Lead
          </p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
