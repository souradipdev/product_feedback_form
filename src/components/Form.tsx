"use client";
import React, { useState } from "react";
import { Rating} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormSchema } from "@/schema/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/magicui/border-beam";
import {RadioGroupItem, RadioGroup} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

function Form() {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      satisfactionRating: 0,
      easeOfUse: 0,
      featureCompleteness: 0,

      recommend: false,
      customerRecomendation: ""
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <div className="z-10 w-[90%] h-fit flex items-center justify-center">
      <div className="w-full h-fit relative flex flex-col items-center border border-gray-300 bg-white bg-opacity-70 backdrop-blur-lg rounded-lg shadow-lg p-6">
        <BorderBeam size={900} borderWidth={2} />
        <h2 className="text-2xl font-bold text-secondary-foreground">Expense Master</h2>
        <p className="pt-3.5 font-semibold text-muted-foreground">
          Your feedback matters. It won't take more than 3 minutes of your valuable time
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
            <div className="w-full py-3">
              <Rating
                name="simple-controlled"
                value={value1}

                onChange={(event, newValue) => {
                  setValue1(newValue || 0);
                }}
              />
            </div>
          </div>

          <div className="w-full flex-col items-center">
            <span className="text-gray-900 self-start text-sm">Ease of use *</span>
            <div className="w-full py-3">
              <Rating
                name="simple-controlled"
                value={value2}
                onChange={(event, newValue) => {
                  setValue2(newValue || 0);
                }}
              />
            </div>
          </div>

          <div className="w-full flex-col items-center">
            <span className="text-gray-900 self-start text-sm">Feature completeness *</span>
            <div className="w-full py-3">
              <Rating
                name="simple-controlled"
                value={value3}
                onChange={(event, newValue) => {
                  setValue3(newValue || 0);
                }}
              />
            </div>
          </div>

          <p className={"w-full h-[1px] bg-muted-foreground"}></p>

          <div className="w-full flex flex-col gap-3 items-center">
            <span className="text-gray-900 self-start text-sm">Will you recommend our product to your friend</span>
            <RadioGroup defaultValue="option-one" className={"self-start"}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one"/>
                <Label htmlFor="option-one">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="option-two"/>
                <Label htmlFor="option-two">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="w-full flex flex-col gap-2.5 items-center">
            <span className="text-gray-900 self-start text-sm">How can we improve your overall experience with Expense Master?</span>
            <Textarea {...register("customerRecomendation")} className={"resize-none"} placeholder={"Your recommendation"}/>
            {errors && <span className="text-red-500 self-start text-sm">{errors.customerRecomendation?.message}</span>}
          </div>

          <Button variant="outline" type="submit" className="self-start" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Form;
