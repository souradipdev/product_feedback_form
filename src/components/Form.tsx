"use client"
import React from "react";
import {Rating} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {FormSchema} from "@/schema/FormSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {BorderBeam} from "@/components/magicui/border-beam";
import {RadioGroupItem, RadioGroup} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import axios, {AxiosError} from "axios";
import {useToast} from "@/components/ui/use-toast";
import {ApiResponseHandler} from "@/lib/ApiResponseHandler";
import {useRouter} from "next/navigation";

export let formDataExport: z.infer<typeof FormSchema>;

function Form() {
  const router = useRouter();
  const {toast} = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors, isSubmitting},
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
      customerRecomendation: ""
    },
  });
  const satisfactionRating = watch("satisfactionRating");
  const easeOfUse = watch("easeOfUse");
  const featureCompleteness = watch("featureCompleteness");

  const recommend = watch("recommend");

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (formData: z.infer<typeof FormSchema>) => {
    // console.log(formData);

    try {
      const response = await axios.post<ApiResponseHandler>("/api/store-form-fields", formData);
      toast({
        variant: "default",
        title: "Success",
        description: response.data.message
      })

      formDataExport = formData;
      router.push(`/submit-response?username=${formData.email}`, {scroll: false});
    } catch (error: any) {
      const axiosError = error as AxiosError<ApiResponseHandler>;
      toast({
        variant: "destructive",
        description: axiosError.response?.data.message || "Failed to save response"
      });
    }
  };

  return (
    <div className="z-10 w-[90%] h-fit flex items-center justify-center">
      <div
        className="w-full h-fit relative flex flex-col items-center border border-gray-300 bg-white bg-opacity-70 backdrop-blur-lg rounded-lg shadow-lg p-6">
        <BorderBeam size={900} borderWidth={2}/>
        <h2 className="text-2xl font-bold text-secondary-foreground">Expense Master</h2>
        <p className="pt-3.5 font-semibold text-muted-foreground text-center max-w-96 mb-4">
          Your feedback matters. It won&apos;t take more than 3 minutes of your valuable time
        </p>
        <form className="w-full flex flex-col items-center gap-3.5" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-col gap-2.5 items-center">
            <span className="text-gray-900 self-start text-sm">Username *</span>
            <Input type="text" {...register("name")} className="bg-white" placeholder="ie: John Doe"/>
            {errors && <span className="text-red-500 self-start text-sm">{errors.name?.message}</span>}
          </div>

          <div className="w-full flex flex-col gap-3 items-center">
            <span className="text-gray-900 self-start text-sm">Email *</span>
            <Input type="text" {...register("email")} className="bg-white" placeholder="ie: johndoe@gmail.com"/>
            {errors && <span className="text-red-500 self-start text-sm">{errors.email?.message}</span>}
          </div>

          <div className="w-full flex flex-col gap-3 items-center">
            <span className="text-gray-900 self-start text-sm">Phone</span>
            <Input type="text" {...register("phone")} className="bg-white" placeholder="ie: 123-456-7890"/>
            {errors && <span className="text-red-500 self-start text-sm">{errors.phone?.message}</span>}
          </div>

          <p className={"w-full h-[1px] bg-muted-foreground"}></p>

          <div className="w-full flex-col items-center">
            <span className="text-gray-900 self-start text-sm">Overall satisfaction with Expense Master *</span>
            <div className="w-full py-1.5">
              <Rating
                name="satisfactionRating"
                value={satisfactionRating || 0}
                onChange={(event, newValue) => {
                  setValue("satisfactionRating", newValue || 0);
                }}
              />
            </div>
            {errors && <span className="text-red-500 self-start text-sm">{errors.satisfactionRating?.message}</span>}
          </div>

          <div className="w-full flex-col items-center">
            <span className="text-gray-900 self-start text-sm">Ease of use *</span>
            <div className="w-full py-1.5">
              <Rating
                name="easeOfUse"
                value={easeOfUse || 0}
                onChange={(event, newValue) => {
                  setValue("easeOfUse", newValue || 0);
                }}
              />
            </div>
            {errors && <span className="text-red-500 self-start text-sm">{errors.easeOfUse?.message}</span>}
          </div>

          <div className="w-full flex-col items-center">
            <span className="text-gray-900 self-start text-sm">Feature completeness *</span>
            <div className="w-full py-1.5">
              <Rating
                name="featureCompleteness"
                value={featureCompleteness || 0}
                onChange={(event, newValue) => {
                  setValue("featureCompleteness", newValue || 0);
                }}
              />
            </div>
            {errors && <span className="text-red-500 self-start text-sm">{errors.featureCompleteness?.message}</span>}
          </div>

          <p className={"w-full h-[1px] bg-muted-foreground"}></p>

          <div className="w-full flex flex-col gap-3 items-center">
            <span className="text-gray-900 self-start text-sm">Will you recommend our product to your friend *</span>
            <RadioGroup
              className="self-start"
              value={recommend || ""}
              onValueChange={(value) => {
                setValue("recommend", value as "yes" | "no");
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="option-yes"/>
                <Label htmlFor="option-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="option-no"/>
                <Label htmlFor="option-no">No</Label>
              </div>
            </RadioGroup>
            {errors.recommend && <span className="text-red-500 self-start text-sm">
              {errors.recommend.message}
            </span>}
          </div>

          <div className="w-full flex flex-col gap-2.5 items-center">
            <span className="text-gray-900 self-start text-sm">How can we improve your overall experience with Expense Master?</span>
            <Textarea {...register("customerRecomendation")} className={"resize-none h-32"}
                      placeholder={"Your recommendation"}/>
            {errors && <span className="text-red-500 self-start text-sm">{errors.customerRecomendation?.message}</span>}
          </div>

          <Button variant="outline" type="submit" className="self-start" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Form;

