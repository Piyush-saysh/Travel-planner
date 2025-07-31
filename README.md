# ✈️ Travel Planner AI

Create your perfect travel itinerary in minutes with the **Travel Planner AI**! This application leverages the power of AI to generate personalized daily travel plans and essential tips based on your desired destination and number of days.

## ✨ Features

- **Intelligent Itinerary Generation**: Powered by the Gemini 2.5 Flash model (or OpenAI's GPT-4o-mini as specified in the API route), this application creates detailed day-by-day travel plans.
- **Customizable Trips**: Simply enter your destination and the number of days, and the AI will craft a unique itinerary for you.
- **Essential Travel Tips**: Receive practical advice covering transportation, entry tickets, local specialties, and safety for your chosen location.
- **Clean & Intuitive UI**: A modern, responsive user interface built with React and Tailwind CSS for a seamless planning experience.
- **Sticky Form**: The input form remains visible on larger screens while you scroll through your generated itinerary, allowing for quick adjustments or new searches.
- **Loading & Error States**: Clear visual feedback during itinerary generation and informative messages in case of errors.

## 🚀 Technologies Used

- **Next.js 14+**: A React framework for building full-stack web applications.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **ShadCN UI**: Reusable UI components built with Radix UI and Tailwind CSS.
- **React Hook Form**: For efficient and flexible form management.
- **Zod**: For schema validation.
- **`@ai-sdk/openai` (or `@ai-sdk/google`)**: AI SDK for interacting with Large Language Models.
- **`lucide-react`**: Beautiful and customizable open-source icons.

## ⚙️ Setup and Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18.x or later recommended)
- npm or Yarn

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of your project and add your AI API key.

If using **OpenAI**:

```env
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
```

If you plan to use Google's Gemini through AI SDK:

```env
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
```

**Note**: The provided API route code uses `openai("gpt-4o-mini")`. If you switch to Google's Gemini model (e.g., `google("gemini-flash-1.5")`), ensure you also update the import and model call in `app/api/message/route.ts` accordingly.

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please open an issue or submit a pull request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
