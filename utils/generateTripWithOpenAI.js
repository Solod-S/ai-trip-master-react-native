import axios from "axios";
import { openAIprompt } from "../config/GeminiResponse";
import { saveTripData } from "./saveTripData";
import moment from "moment";

export const generateTripWithOpenAI = async tripData => {
  const finalAIPrompt = openAIprompt
    .replace("{source}", tripData?.srcLocationInfo?.name)
    .replace("{location}", tripData?.locationInfo?.name)
    .replace("{traveler}", tripData?.travelerCount?.title)
    .replace("{budget}", tripData?.budget)
    .replace("{startDate}", moment(tripData?.startDate).format("DD MMM"))
    .replace("{endDate}", moment(tripData?.endDate).format("DD MMM"));

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: finalAIPrompt },
          {
            role: "assistant",
            content: "I don't need such notes like ```json or ```",
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPEN_AI_API_KEY}`,
        },
      }
    );

    const result = response?.data?.choices[0]?.message?.content?.trim();

    if (!result) {
      return false;
    }

    const jsonResponse = await JSON.parse(result);
    console.log("JSON format result from OpenAI API:", jsonResponse);
    return await saveTripData(jsonResponse, tripData, "OpenAI");
  } catch (error) {
    console.error(
      "An error occurred in Gemini response/ Firebase save:",
      error
    );
    return false;
  }
};
