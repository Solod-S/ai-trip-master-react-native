import { chatSession, geminiAIprompt } from "../config/GeminiResponse";
import { saveTripData } from "./saveTripData";
import moment from "moment";

export const generateTripWithGeminiAI = async tripData => {
  const finalAIPrompt = geminiAIprompt
    .replace("{source}", tripData?.srcLocationInfo?.name)
    .replace("{location}", tripData?.locationInfo?.name)
    .replace("{traveler}", tripData?.travelerCount?.title)
    .replace("{budget}", tripData?.budget)
    .replace("{startDate}", moment(tripData?.startDate).format("DD MMM"))
    .replace("{endDate}", moment(tripData?.endDate).format("DD MMM"));

  try {
    const result = await chatSession.sendMessage(finalAIPrompt);
    if (!result) {
      return false;
    }

    const jsonResponse = await JSON.parse(result.response.text());
    console.log("JSON format result from Gemini API:", jsonResponse);

    return await saveTripData(jsonResponse, tripData, "GeminiAI");
  } catch (error) {
    console.error(
      "An error occurred in Gemini response/ Firebase save:",
      error
    );
    return false;
  }
};
