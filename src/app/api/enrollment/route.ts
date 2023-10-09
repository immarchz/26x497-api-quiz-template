import { getPrisma } from "@/libs/getPrisma";
import { Course, Enrollment, Student } from "@prisma/client";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

type EnrollmentWithRelation = Enrollment & {
  student: Student;
  course: Course;
};

export type EnrollmentGetResponse = {
  enrollments: EnrollmentWithRelation[];
};

export const GET = async () => {
  const prisma = getPrisma();

  try {
    // Fetch enrollments along with related student and course data
    const enrollments = await prisma.enrollment.findMany({
      include: {
        student: true,
        course: true,
      },
    });

    return NextResponse.json<EnrollmentGetResponse>({
      enrollments, // Return the enrollments array with related student and course data
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error('Internal server error', 500);
  }
};


