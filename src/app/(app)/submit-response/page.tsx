"use client"
import {cn} from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import {BorderBeam} from "@/components/magicui/border-beam";
import React from "react";
import {Button} from "@/components/ui/button";
import {useRouter, useSearchParams} from "next/navigation";

const DotPatternDemo2 = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background p-20 md:shadow-xl">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn("[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] bg-gray-950")}
      />

      <div className="z-10 w-[90%] h-fit flex items-center justify-center">
        <div
          className="w-full h-52 relative flex flex-col items-center justify-between border border-gray-300 bg-white bg-opacity-70 backdrop-blur-lg rounded-lg shadow-lg p-6">
          <BorderBeam size={900} borderWidth={2}/>
          <div className={"w-full"}>
            <p className={"text-lg text-gray-800 font-bold text-center"}>Every feedback counts</p>
            <p className={"text-lg text-gray-800 font-bold text-center"}>Your feedback was recorded successfully</p>
          </div>

          <div className={"w-full flex items-center justify-between"}>
            <Button variant={"outline"} className={"text-center"} onClick={() => router.back()}>Edit response</Button>
            <Button variant={"outline"} className={"text-center"}
                    onClick={() => router.push(`previous-response?email=${email}`, {scroll: false})}>
              View previous response
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DotPatternDemo2;
