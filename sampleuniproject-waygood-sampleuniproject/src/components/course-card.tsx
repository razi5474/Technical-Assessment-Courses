'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, User, Clock } from 'lucide-react';

interface CourseCardProps {
  course: {
    _id?: string;
    title: string;
    description: string;
    category: string;
    instructor: string;
    duration: number;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      
      {/* HEADER */}
      <CardHeader>
        <CardTitle className="text-xl leading-tight text-primary">
          {course.title}
        </CardTitle>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="flex-grow space-y-4">
        
        {/* DESCRIPTION */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {course.description}
        </p>

        {/* BADGES */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            <BookOpen className="h-3 w-3 mr-1" />
            {course.category}
          </Badge>

          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            {course.duration || "N/A"} months
          </Badge>
        </div>

        {/* INSTRUCTOR */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4 text-accent" />
          <span>{course.instructor || "Unknown Instructor"}</span>
        </div>

      </CardContent>

      {/* FOOTER */}
      <CardFooter className="bg-muted/50 p-4">
        <Button asChild className="w-full" variant="outline">
          <Link href={`/courses/${course._id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}