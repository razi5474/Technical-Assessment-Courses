'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CourseCard from '@/components/course-card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Compass, Search, SlidersHorizontal, Sparkles } from 'lucide-react';

type Course = {
  _id: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  duration: number;
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tuitionRange, setTuitionRange] = useState([0, 60]);

  // ✅ React Query Fetch
  const { data: courses = [], isLoading, error } = useQuery({
    queryKey: ['courses', searchTerm],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}/api/courses?search=${searchTerm}`
      );

      if (!res.ok) throw new Error('Failed to fetch');

      return res.json();
    },
    staleTime: 1000 * 60 * 5, // 🧠 cache for 5 min
  });

  // ✅ Filter
  const filteredCourses = courses.filter((course: Course) => {
    const duration = Number(course.duration || 0);
    return duration <= tuitionRange[1];
  });

  return (
    <div className="bg-background text-foreground">

      {/* HERO */}
      <section className="text-center py-20 px-4 bg-card border-b">
        <h1 className="text-5xl font-bold text-primary">
          Find Your Perfect Course
        </h1>

        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#search">
              <Compass className="mr-2" /> Start Exploring
            </Link>
          </Button>

          <Button asChild size="lg" variant="secondary">
            <Link href="/course-match">
              <Sparkles className="mr-2" /> AI Course Match
            </Link>
          </Button>
        </div>
      </section>

      {/* SEARCH */}
      <section id="search" className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* FILTER */}
          <aside className="lg:col-span-1">
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 flex gap-2">
                <SlidersHorizontal /> Filters
              </h3>

              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <div className="mt-4">
                <Slider
                  min={0}
                  max={60}
                  step={1}
                  value={[tuitionRange[1]]}
                  onValueChange={(val) => setTuitionRange([0, val[0]])}
                />
                <p className="text-sm mt-1">
                  Up to {tuitionRange[1]} months
                </p>
              </div>
            </div>
          </aside>

          {/* COURSES */}
          <main className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-6">
              {filteredCourses.length} Courses Found
            </h2>

            {isLoading && <p>Loading...</p>}

            {error && <p className="text-red-500">Error loading courses</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course: Course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}