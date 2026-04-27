'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CourseMatchInputSchema } from '@/ai/schemas';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Star, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function CourseMatchPage() {
  const [recommendations, setRecommendations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(CourseMatchInputSchema),
    defaultValues: {
      description: '',
    },
  });

  // ✅ UPDATED FUNCTION (API CALL)
  async function onSubmit(values: any) {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const res = await fetch("http://localhost:5000/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: values.description,
          level: "beginner",
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch recommendations");

      const data = await res.json();

      // ✅ Convert backend response → UI format
      const formatted = {
        suggestions: data.recommendations.map((item: any, index: number) => ({
          courseName: item.title,
          universityName: item.instructor,
          matchScore: 80 + index * 5,
          rationale: `This course matches your interest in "${values.description}"`,
        })),
      };

      setRecommendations(formatted);

    } catch (e) {
      console.error(e);
      setError("An error occurred while generating recommendations.");
    } finally {
      setIsLoading(false);
    }
  }

  const exampleDescription = "I'm interested in AI, coding, and software development.";

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="text-center mb-12">
        <Sparkles className="mx-auto h-12 w-12 text-accent mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">
          AI Course Match
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Describe your interests and get AI-powered course recommendations.
        </p>
      </div>

      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="p-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us what you like..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="link"
                onClick={() => form.setValue('description', exampleDescription)}
              >
                Use example
              </Button>
            </CardContent>

            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2" />
                    Find Courses
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {/* ERROR */}
      {error && (
        <div className="mt-6 text-red-500 text-center">
          {error}
        </div>
      )}

      {/* RESULTS */}
      {recommendations && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">
            Recommended Courses
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {recommendations.suggestions.map((rec: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{rec.courseName}</CardTitle>
                  <CardDescription>{rec.universityName}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Match Score
                      </span>
                      <Badge>{rec.matchScore}%</Badge>
                    </div>
                    <Progress value={rec.matchScore} />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {rec.rationale}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}