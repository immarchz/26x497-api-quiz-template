import { getPrisma } from "@/libs/getPrisma";
import { Student } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export type StudentGetResponse = {
  students: Student[];
};

export const GET = async () => {
  const prisma = getPrisma();

  //2. Display list of student
  const students = await prisma.student.findMany()

  return NextResponse.json<StudentGetResponse>({
    students: students, //replace empty array with result from DB
  });
};

export type StudentPostOKResponse = { ok: true };
export type StudentPostErrorResponse = { ok: false; message: string };
export type StudentPostResponse =
  | StudentPostOKResponse
  | StudentPostErrorResponse;



export const POST = async (request: NextRequest) => {
  const {studentId,firstName,lastName}:Partial<Student> = await request.json() ;
  const prisma = getPrisma();

  //4. Add new Student data
  const studentPost = await prisma.student.create({
    data: {
      studentId,
      firstName,
      lastName,
    }  
  })
  
  // return NextResponse.json<StudentPostErrorResponse>(
  //   { ok: false, message: "Student Id already exists" },
  //   { status: 400 }
  // );

   return NextResponse.json<StudentPostOKResponse>({ ok: true });
};
