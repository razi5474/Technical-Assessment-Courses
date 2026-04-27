'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  User,
  Clock,
  Tag
} from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch course by ID
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/courses/${params.id}`
        );

        if (!res.ok) throw new Error("Course not found");

        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error(err);
        router.push("/"); // redirect if not found
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) fetchCourse();
  }, [params.id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!course) return <p className="text-center mt-10">Course not found</p>;

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto py-12 px-4">

        {/* BACK BUTTON */}
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>

        {/* CARD */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-primary">
              {course.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* DESCRIPTION */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">
                {course.description}
              </p>
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="flex items-center gap-3">
                <Tag className="text-accent" />
                <span><b>Category:</b> {course.category}</span>
              </div>

              <div className="flex items-center gap-3">
                <User className="text-accent" />
                <span><b>Instructor:</b> {course.instructor}</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="text-accent" />
                <span><b>Duration:</b> {course.duration} months</span>
              </div>

            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}