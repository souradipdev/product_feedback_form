"use client"
import {SubmitHandler, useForm} from "react-hook-form";
import {FormSchema} from "@/schema/FormSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { BorderBeam } from "@/components/magicui/border-beam";

function Form() {
  const {
    register, handleSubmit, formState: {errors, isSubmitting}
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
    }
  })

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = (data:z.infer<typeof FormSchema>) => {
    console.log(data);
  }

  return (
    <div className="z-10 w-[90%] h-fit flex items-center justify-center">
      <div className="w-full h-fit relative border border-gray-300 bg-white rounded-lg shadow-lg p-6">
        <BorderBeam  size={900} borderWidth={2}/>
        <form className={"w-full flex flex-col items-center gap-3.5"} onSubmit={handleSubmit(onSubmit)}>
          <div className={"w-full flex flex-col gap-2.5 items-center"}>
            <span className={"text-gray-900 self-start text-sm"}>Username *</span>
            <Input typeof={"text"} {...register("name")} className={"bg-white"} placeholder={"ie: John Doe"}/>
            {errors && <span className={"text-red-500 self-start text-sm"}>{errors.name?.message}</span>}
          </div>

          <div className={"w-full flex flex-col gap-3 items-center"}>
            <span className={"text-gray-900 self-start text-sm"}>Email *</span>
            <Input typeof={"text"} {...register("email")} className={"bg-white"} placeholder={"ie: johndoe@gmail.com"}/>
            {errors && <span className={"text-red-500 self-start text-sm"}>{errors.email?.message}</span>}
          </div>

          <div className={"w-full flex flex-col gap-3 items-center"}>
            <span className={"text-gray-900 self-start text-sm"}>Phone</span>
            <Input typeof={"text"} {...register("phone")} className={"bg-white"} placeholder={"ie: 123-456-7890"}/>
            {errors && <span className={"text-red-500 self-start text-sm"}>{errors.phone?.message}</span>}
          </div>

        <Button variant={"outline"} typeof={"submit"} className={"self-start"} disabled={isSubmitting}>Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default Form;
