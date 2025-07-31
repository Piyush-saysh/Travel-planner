import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(request: Request): Promise<Response> {
  try {
    const { place, days } = (await request.json()) as {
      place: string;
      days: number;
    };

    const response = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `I want to travel to ${place} for ${days} days`,
      system: `
        You are a travel planning assistant.
        Your task is to create personalized travel itineraries based on the number of days and location provided by the user.

        You must respond with ONLY a valid JSON object in this exact structure:
        {
          "title": "[Number of Days] Day Itinerary for [Location]",
          "introduction": "2-3 line introduction about the destination and what to expect",
          "dayPlan": {
            "Day 1": [
              "Morning: Activity description with approximate time",
              "Lunch: Restaurant/food recommendation with cuisine type",
              "Afternoon: Activity description with approximate time",
              "Evening: Activity description with approximate time"
            ],
            "Day 2": [
              "Morning: Activity description with approximate time",
              "Lunch: Restaurant/food recommendation with cuisine type",
              "Afternoon: Activity description with approximate time",
              "Evening: Activity description with approximate time"
            ]
            // Continue for all days requested
          },
          "travelTips": [
            "Transportation: Specific transportation advice for the location",
            "Entry Tickets: Information about attraction fees and booking",
            "Local Specialties: Must-try food and cultural experiences",
            "Safety: Relevant safety tips for the destination"
          ]
        }

        Guidelines for content:
        - Include top attractions, local experiences, and recommended food options
        - Suggest approximate time for each activity (morning, afternoon, evening)
        - Keep the tone friendly and informative
        - If the location is not known or too broad, suggest popular nearby options
        - Provide practical travel tips including transportation, tickets, and local specialties
        - Each day should have 4 activities: morning, lunch, afternoon, evening
        - Be specific with restaurant names and activity durations where possible

        IMPORTANT: Return ONLY the JSON object, no additional text or formatting.
    `,
    });

    let parsedData;
    try {
      parsedData = JSON.parse(response.text) as {
        title: string;
        introduction: string;
        dayPlan: Record<string, string[]>;
        travelTips: string[];
      };
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      return new Response("Invalid AI response format", { status: 500 });
    }

    return new Response(JSON.stringify(parsedData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
