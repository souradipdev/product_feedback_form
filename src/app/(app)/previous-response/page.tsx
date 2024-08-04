"use client";
import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Rating } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormSchema } from "@/schema/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/magicui/border-beam";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import axios, { AxiosError } from "axios";
import { ApiResponseHandler } from "@/lib/ApiResponseHandler";

const ViewResponseForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      satisfactionRating: 0,
      easeOfUse: 0,
      featureCompleteness: 0,
      recommend: undefined,
      customerRecomendation: "",
    },
  });

  const satisfactionRating = watch("satisfactionRating");
  const easeOfUse = watch("easeOfUse");
  const featureCompleteness = watch("featureCompleteness");
  const recommend = watch("recommend");

  useEffect(() => {
    if (email) {
      (async function () {
        try {
          const response = await axios.get<ApiResponseHandler>(`api/get-response?email=${email}`);
          const data = response.data.data;

          toast({
            variant: "default",
            title: "Success",
            description: response.data.message,
          });

          for (const key in data) {
            setValue(key as keyof z.infer<typeof FormSchema>, data[key]);
          }
        } catch (error: any) {
          const axiosError = error as AxiosError<ApiResponseHandler>;

          toast({
            variant: "destructive",
            title: "Error",
            description: axiosError.response?.data.message || "Unable to fetch response",
          });
        }
      })();
    }
  }, [email, setValue, toast]);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background p-20 md:shadow-xl">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn("[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] bg-gray-950")}
      />
      <div className="z-10 w-[90%] h-fit flex items-center justify-center">
        <div className="w-full h-fit relative flex flex-col items-center border border-gray-300 bg-white bg-opacity-70 backdrop-blur-lg rounded-lg shadow-lg p-6">
          <BorderBeam size={900} borderWidth={2} />
          <h2 className="text-2xl font-bold text-secondary-foreground">Expense Master</h2>
          <p className="pt-3.5 font-semibold text-muted-foreground text-center max-w-96 mb-4">Your response</p>
          <form className="w-full flex flex-col items-center gap-3.5">
            <div className="w-full flex flex-col gap-2.5 items-center">
              <span className="text-gray-900 self-start text-sm">Username *</span>
              <Input type="text" {...register("name")} className="bg-white" placeholder="ie: John Doe" disabled />
            </div>
            <div className="w-full flex flex-col gap-3 items-center">
              <span className="text-gray-900 self-start text-sm">Email *</span>
              <Input type="text" {...register("email")} className="bg-white" placeholder="ie: johndoe@gmail.com" disabled />
            </div>
            <div className="w-full flex flex-col gap-3 items-center">
              <span className="text-gray-900 self-start text-sm">Phone</span>
              <Input type="text" {...register("phone")} className="bg-white" placeholder="ie: 123-456-7890" disabled />
            </div>
            <p className={"w-full h-[1px] bg-muted-foreground"}></p>
            <div className="w-full flex-col items-center">
              <span className="text-gray-900 self-start text-sm">Overall satisfaction with Expense Master *</span>
              <div className="w-full py-1.5">
                <Rating name="satisfactionRating" value={satisfactionRating || 0} readOnly />
              </div>
            </div>
            <div className="w-full flex-col items-center">
              <span className="text-gray-900 self-start text-sm">Ease of use *</span>
              <div className="w-full py-1.5">
                <Rating name="easeOfUse" value={easeOfUse || 0} readOnly />
              </div>
            </div>
            <div className="w-full flex-col items-center">
              <span className="text-gray-900 self-start text-sm">Feature completeness *</span>
              <div className="w-full py-1.5">
                <Rating name="featureCompleteness" value={featureCompleteness || 0} readOnly />
              </div>
            </div>
            <p className={"w-full h-[1px] bg-muted-foreground"}></p>
            <div className="w-full flex flex-col gap-3 items-center">
              <span className="text-gray-900 self-start text-sm">Will you recommend our product to your friend *</span>
              <RadioGroup className="self-start" value={recommend || ""}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="option-yes" disabled />
                  <Label htmlFor="option-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="option-no" disabled />
                  <Label htmlFor="option-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="w-full flex flex-col gap-2.5 items-center">
              <span className="text-gray-900 self-start text-sm">How can we improve your overall experience with Expense Master?</span>
              <Textarea {...register("customerRecomendation")} className={"resize-none h-32"} placeholder={"Your recommendation"} disabled />
            </div>
          </form>

          <Button variant="outline" onClick={() => router.back()} className="self-start mt-3">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

const ViewResponsePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ViewResponseForm />
    </Suspense>
  );
};

export default ViewResponsePage;
