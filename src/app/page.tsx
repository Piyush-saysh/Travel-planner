"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import {
  MapPin,
  Calendar,
  Clock,
  Compass,
  Star,
  Plane,
  Camera,
  CheckCircle,
  XCircle,
} from "lucide-react";

const formSchema = z.object({
  place: z.string().min(1, "Please enter a destination."),
  days: z.coerce
    .number()
    .min(1, "Must be at least 1 day.")
    .max(30, "Max 30 days allowed."),
});

interface Data {
  title: string;
  introduction: string;
  dayPlan: Record<string, string[]>;
  travelTips: string[];
}

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      place: "",
      days: 1,
    },
  });
  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    console.log("formData", formData);
    setIsLoading(true);
    const response = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = (await response.json()) as Data;
    console.log("data", data);
    setData(data);
    form.reset();
    setIsLoading(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-4 flex items-center gap-3">
            <Plane className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Travel Planner</h1>
          </div>
          <p className="text-lg text-blue-100">
            Create your perfect travel itinerary in minutes
          </p>
        </div>
      </div>

      <div
        className={`container mx-auto px-6 py-8 ${data ? "lg:flex lg:flex-row lg:items-start lg:justify-center lg:gap-8" : ""}`}
      >
        <div
          className={`mx-auto mb-12 max-w-2xl lg:min-w-[400px] ${data ? "lg:sticky lg:top-8 lg:mb-0" : ""}`}
        >
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-center gap-3">
              <Compass className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Plan Your Journey
              </h2>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="place"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <MapPin className="h-4 w-4" />
                        Destination
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Where would you like to go? e.g., Paris"
                          className="rounded-lg border-2 px-4 py-3 transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage className="flex items-center gap-1 text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="days"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Calendar className="h-4 w-4" />
                        Number of Days
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min="1"
                          max="30"
                          className="rounded-lg border-2 px-4 py-3 transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage className="flex items-center gap-1 text-red-600" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full transform items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Star className="h-5 w-5" />
                      Generate Itinerary
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {isLoading && (
          <div className="mx-auto max-w-4xl py-12 text-center lg:max-w-none lg:flex-1 lg:py-0">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                Crafting Your Perfect Trip
              </h3>
              <p className="text-gray-600">
                Analyzing the best attractions, restaurants, and experiences...
                <br />
                Almost there!
              </p>
            </div>
          </div>
        )}

        {error && !isLoading && (
          <div className="mx-auto max-w-2xl py-8 text-center lg:max-w-none lg:flex-1 lg:py-0">
            <div className="rounded-2xl border border-red-300 bg-red-50 p-8 shadow-lg">
              <XCircle className="mx-auto mb-4 h-16 w-16 text-red-600" />
              <h3 className="mb-2 text-xl font-semibold text-red-800">
                Oops! Something Went Wrong.
              </h3>
              <p className="text-red-700">{error}</p>
              <p className="mt-4 text-sm text-red-600">
                Please check your input and try again.
              </p>
            </div>
          </div>
        )}

        {data && !isLoading && !error && (
          <div className="animate-fade-in mx-auto flex max-w-4xl flex-col items-center space-y-8 lg:max-w-none lg:flex-1">
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-xl">
              <div className="mb-4 flex items-center gap-3">
                <Camera className="h-8 w-8" />
                <h1 className="text-3xl font-bold">{data.title}</h1>
              </div>
              <p className="text-lg leading-relaxed text-blue-100">
                {data.introduction}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
              <div className="mb-6 flex items-center gap-3">
                <Clock className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Daily Itinerary
                </h2>
              </div>

              <div className="space-y-8">
                {Object.entries(data.dayPlan).map(
                  ([day, activities], dayIndex) => (
                    <div key={day} className="relative">
                      <div className="mb-4 flex items-center gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-lg font-bold text-white shadow-lg">
                          {dayIndex + 1}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {day}
                        </h3>
                      </div>

                      <div className="ml-16 space-y-3">
                        {activities.map((activity, index) => (
                          <div
                            key={index}
                            className="rounded-lg border-l-4 border-blue-400 bg-gray-50 p-4 transition-all duration-300 hover:scale-[1.01] hover:bg-blue-50 hover:shadow-md"
                          >
                            <div className="flex items-start gap-3">
                              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                              <p className="leading-relaxed text-gray-700">
                                {activity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {dayIndex < Object.entries(data.dayPlan).length - 1 && (
                        <div className="absolute top-16 bottom-0 left-6 w-0.5 bg-gradient-to-b from-blue-200 to-purple-200"></div>
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 shadow-lg">
              <div className="mb-6 flex items-center gap-3">
                <Star className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-green-800">
                  Essential Travel Tips
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {data.travelTips.map((tip, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-green-100 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></div>
                      <p className="leading-relaxed text-gray-700">{tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
