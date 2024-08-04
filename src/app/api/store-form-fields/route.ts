import {dbConnect} from "@/lib/dbConnect";
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

    const existingUser = await FormModel.findOne({
      $or: [{email: formData.email}, {username: formData.username}]
    })

    if (existingUser) {
      await FormModel.updateOne({
          _id: existingUser._id
        },
        {
          $set: parsedData
        })

      return Response.json(new ApiResponseHandler(true, "Response updated successfully", {}),
        {status: 200})
    } else {
      const newForm = new FormModel(parsedData);
      await newForm.save();
    }

    return Response.json(new ApiResponseHandler(true, "Response saved successfully", {}),
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
