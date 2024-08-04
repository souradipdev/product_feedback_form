import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from "@/lib/dbConnect";
import FormModel from "@/model/FormModel";
import { ApiResponseHandler } from "@/lib/ApiResponseHandler";

export async function GET(request: NextRequest): Promise<NextResponse> {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      new ApiResponseHandler(false, "Email parameter is required", {}),
      { status: 400 }
    );
  }

  try {
    const formData = await FormModel.findOne({ email });

    if (!formData) {
      return NextResponse.json(
        new ApiResponseHandler(false, "No form data found for the provided email", {}),
        { status: 404 }
      );
    }

    return NextResponse.json(
      new ApiResponseHandler(true, "Form data retrieved successfully", formData),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving form data:", error);
    return NextResponse.json(
      new ApiResponseHandler(false, "Internal server error", { error }),
      { status: 500 }
    );
  }
}
