import {dbConnect} from "@/lib/dbConnect";
import mongoose from "mongoose";
import FormModel from "@/model/FormModel";
import {FormSchema} from "@/schema/FormSchema";
import {z} from "zod";
import {ApiResponseHandler} from "@/lib/ApiResponseHandler";

export async function POST(request: Request): Promise<Response> {
  await dbConnect();

  try {

    const formData = await request.json();
    console.log(formData)
    const parsedData = FormSchema.parse(formData);


    const newForm = new FormModel(parsedData);


    await newForm.save();

    return Response.json(new ApiResponseHandler(true, "Form data saved successfully", {}),
      {status: 200}
    )
  } catch (error: any) {
    console.error("Error saving form data:", error);
    if (error instanceof z.ZodError) {
      return Response.json(new ApiResponseHandler(false, "", {error: error.errors}),
        {status: 400}
      )
    }
    return Response.json(
      new ApiResponseHandler(false, "Internal server error", {error}),
      {status: 500}
    )
  }
}
