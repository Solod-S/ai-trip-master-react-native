import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY
);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8392,
  responseMimeType: "application/json",
};

// export const prompt = `
// Create a detailed travel itinerary in a timeline format based on the following details: the source location is {location}. The travelers include {traveler} (which can be For Me, Family, Couple, or Friends). The trip is planned with a decided expenditure of {budget} type, and the travel dates range from {startDate} to {endDate}.

// Expenditure type considerations:
// If the expenditure type is "Budget", focus on 'affordable choices to save costs.'
// If it's "Standard", then 'balance cost and comfort with moderate cost.'
// If "Premium", go for 'luxury experiences without compromise and a bigger budget.'
// If "All-Inclusive", focus on 'the most exquisite, extravagant, and worry-free vacation where everything is covered.'

// The itinerary should cover the number of days of the trip (calculated as the difference between startDate and endDate) and include detailed day-by-day plans for hotels, restaurants, places to visit, and local transportation. Hotels should be chosen based on the number of nights and proximity to other attractions. Similarly, restaurants should be suggested based on their distance from the places to visit, ensuring convenience.

// Itinerary format: Provide day-by-day plans for hotels, restaurants, places to visit, and transportation. Structure the itinerary in a timeline format so that each day is organized by time, ensuring visits are optimized for the most beautiful or convenient moments:

// Suggest visiting beaches or scenic outdoor locations during sunrise or sunset for stunning views.
// Recommend visiting gardens, parks, or areas with beautiful lighting in the late afternoons or evenings.
// Suggest historical sites, museums, or indoor attractions in the early morning or late afternoon to avoid crowds or peak heat.
// Recommend meal times at restaurants based on proximity to other attractions and ideal times to enjoy the cuisine.

// Additional details to include:
// 3-4 flight options
// 5-6 hotel options
// 6-7 must-see attractions with the best times to visit
// 4-5 restaurant options
// 1-2 modes of local transportation

// Please provide the response in JSON format and ensure the JSON is formatted according to the following schema:
// {
//   "flights": [
//     {
//       "airline": "string",
//       "flight_number": "string",
//       "price": "number",
//       "booking_url": "string"
//     }
//   ],
//   "hotels": [
//     {
//       "name": "string",
//       "rating": "number (out of 5)",
//       "total_reviews": "number",
//       "img_url": "string (actual URL of an HD quality image)",
//       "price_per_night": "number",
//       "booking_url": "string",
//       "geo_coordinates": {
//         "latitude": "number",
//         "longitude": "number"
//       }
//     }
//   ],
//   "places_to_visit": [
//     {
//       "name": "string",
//       "description": "string",
//       "address": "string",
//       "entry_fees": "number (if applicable)",
//       "best_times_to_visit": "string",
//       "rating": "number (out of 5)",
//       "total_reviews": "number"
//     }
//   ],
//   "restaurants": [
//     {
//       "name": "string",
//       "cuisine_type": "string",
//       "address": "string",
//       "geo_coordinates": {
//         "latitude": "number",
//         "longitude": "number"
//       },
//       "rating": "number (out of 5)",
//       "total_reviews": "number",
//       "average_cost_per_meal": "number",
//       "currency": "string",
//       "booking_url": "string (if available)"
//     }
//   ],
//   "local_transportation": [
//     {
//       "mode_of_transportation": "string",
//       "currency": "string",
//       "price_estimate": "number"
//     }
//   ],
//   "itinerary": [
//     {
//       "day": "number",
//       "date": "string",
//       "timeline": [
//         {
//           "time": "HH:MM",
//           "activity": "Visit/Meal/Hotel/Travel",
//           "details": "string"
//         }
//       ]
//     }
//   ]
// }
// Ensure that the itinerary optimizes timing, convenience, and proximity between attractions to provide a smooth and enjoyable travel experience tailored to the specified budget and traveler type.
// `;

export const prompt = `
Create a detailed travel itinerary in a timeline format based on the following details: the source location is {source}, and the destination is {location}. The travelers include {traveler} (which can be For Me, Family, Couple, or Friends). The trip is planned with a decided expenditure of {budget} type, and the travel dates range from {startDate} to {endDate}.

Expenditure type considerations:
If the expenditure type is "Budget", focus on 'affordable choices to save costs.'
If it's "Standard", then 'balance cost and comfort with moderate cost.'
If "Premium", go for 'luxury experiences without compromise and a bigger budget.'
If "All-Inclusive", focus on 'the most exquisite, extravagant, and worry-free vacation where everything is covered.'

The itinerary should cover the number of days of the trip (calculated as the difference between startDate and endDate) and include detailed day-by-day plans for hotels, restaurants, places to visit, and local transportation. Hotels should be chosen based on the number of nights and proximity to other attractions. Similarly, restaurants should be suggested based on their distance from the places to visit, ensuring convenience.

Itinerary format: Provide day-by-day plans for hotels, restaurants, places to visit, and transportation. Structure the itinerary in a timeline format so that each day is organized by time, ensuring visits are optimized for the most beautiful or convenient moments:

Suggest visiting beaches or scenic outdoor locations during sunrise or sunset for stunning views.
Recommend visiting gardens, parks, or areas with beautiful lighting in the late afternoons or evenings.
Suggest historical sites, museums, or indoor attractions in the early morning or late afternoon to avoid crowds or peak heat.
Recommend meal times at restaurants based on proximity to other attractions and ideal times to enjoy the cuisine.

Additional details to include:
3-4 flight options
5-6 hotel options
6-7 must-see attractions with the best times to visit
4-5 restaurant options
1-2 modes of local transportation

Please provide the response in JSON format and ensure the JSON is formatted according to the following schema:
{
  "flights": [
    {
      "airline": "string",
      "flight_number": "string",
      "price": "number",
      "booking_url": "string"
    }
  ],
  "hotels": [
    {
      "name": "string",
      "rating": "number (out of 5)",
      "total_reviews": "number",
      "img_url": "string (actual URL of an HD quality image)",
      "price_per_night": "number",
      "booking_url": "string",
      "geo_coordinates": {
        "latitude": "number",
        "longitude": "number"
      }
    }
  ],
  "places_to_visit": [
    {
      "name": "string",
      "description": "string",
      "address": "string",
      "entry_fees": "number (if applicable)",
      "best_times_to_visit": "string",
      "rating": "number (out of 5)",
      "total_reviews": "number"
    }
  ],
  "restaurants": [
    {
      "name": "string",
      "cuisine_type": "string",
      "address": "string",
      "geo_coordinates": {
        "latitude": "number",
        "longitude": "number"
      },
      "rating": "number (out of 5)",
      "total_reviews": "number",
      "average_cost_per_meal": "number",
      "currency": "string",
      "booking_url": "string (if available)"
    }
  ],
  "local_transportation": [
    {
      "mode_of_transportation": "string",
      "currency": "string",
      "price_estimate": "number"
    }
  ],
  "itinerary": [
    {
      "day": "number",
      "date": "string",
      "timeline": [
        {
          "time": "HH:MM",
          "activity": "Visit/Meal/Hotel/Travel",
          "details": "string"
        }
      ]
    }
  ]
}
Ensure that the itinerary optimizes timing, convenience, and proximity between attractions to provide a smooth and enjoyable travel experience tailored to the specified budget and traveler type.
`;

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Create a detailed travel itinerary in a timeline format based on the following details: the source location is Київ, Ukraine. The travelers include Friends (which can be For Me, Family, Couple, or Friends). The trip is planned with a decided expenditure of [object Object] type, and the travel dates range from 20 Feb to 27 Feb.\n\nExpenditure type considerations:\nIf the expenditure type is "Budget", focus on \'affordable choices to save costs.\'\nIf it\'s "Standard", then \'balance cost and comfort with moderate cost.\'\nIf "Premium", go for \'luxury experiences without compromise and a bigger budget.\'\nIf "All-Inclusive", focus on \'the most exquisite, extravagant, and worry-free vacation where everything is covered.\'        \n\nThe itinerary should cover the number of days of the trip (calculated as the difference between startDate and endDate) and include detailed day-by-day plans for hotels, restaurants, places to visit, and local transportation. Hotels should be chosen based on the number of nights and proximity to other attractions. Similarly, restaurants should be suggested based on their distance from the places to visit, ensuring convenience.     \n\nItinerary format: Provide day-by-day plans for hotels, restaurants, places to visit, and transportation. Structure the itinerary in a timeline format so that each day is organized by time, ensuring visits are optimized for the most beautiful or convenient moments:\n\nSuggest visiting beaches or scenic outdoor locations during sunrise or sunset for stunning views.\nRecommend visiting gardens, parks, or areas with beautiful lighting in the late afternoons or evenings.\nSuggest historical sites, museums, or indoor attractions in the early morning or late afternoon to avoid crowds or peak heat.\nRecommend meal times at restaurants based on proximity to other attractions and ideal times to enjoy the cuisine.\n\nAdditional details to include:\n3-4 flight options\n5-6 hotel options\n6-7 must-see attractions with the best times to visit\n4-5 restaurant options\n1-2 modes of local transportation\n\nPlease provide the response in JSON format and ensure the JSON is formatted according to the following schema:\n{\n  "flights": [\n    {\n      "airline": "string",\n      "flight_number": "string",\n      "price": "number",\n      "booking_url": "string"\n    }\n  ],\n  "hotels": [\n    {\n      "name": "string",\n      "rating": "number (out of 5)",\n      "total_reviews": "number",\n      "img_url": "string (actual URL of an HD quality image)",\n      "price_per_night": "number",\n      "booking_url": "string",\n      "geo_coordinates": {\n        "latitude": "number",\n        "longitude": "number"\n      }\n    }\n  ],\n  "places_to_visit": [\n    {\n      "name": "string",\n      "description": "string",\n      "address": "string",\n      "entry_fees": "number (if applicable)",\n      "best_times_to_visit": "string",\n      "rating": "number (out of 5)",\n      "total_reviews": "number"\n    }\n  ],\n  "restaurants": [\n    {\n      "name": "string",\n      "cuisine_type": "string",\n      "address": "string",\n      "geo_coordinates": {\n        "latitude": "number",\n        "longitude": "number"\n      },\n      "rating": "number (out of 5)",\n      "total_reviews": "number",\n      "average_cost_per_meal": "number",\n      "currency": "string",\n      "booking_url": "string (if available)"\n    }\n  ],\n  "local_transportation": [\n    {\n      "mode_of_transportation": "string",\n      "currency": "string",\n      "price_estimate": "number"\n    }\n  ],\n  "itinerary": [\n    {\n      "day": "number",\n      "date": "string",\n      "timeline": [\n        {\n          "time": "HH:MM",\n          "activity": "Visit/Meal/Hotel/Travel",\n          "details": "string"\n        }\n      ]\n    }\n  ]\n}\nEnsure that the itinerary optimizes timing, convenience, and proximity between attractions to provide a smooth and enjoyable travel experience tailored to the specified budget and traveler type.',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "flights": [\n    {\n      "airline": "Lufthansa",\n      "flight_number": "LH1234",\n      "price": 500,\n      "booking_url": "https://www.lufthansa.com"\n    },\n    {\n      "airline": "KLM",\n      "flight_number": "KL5678",\n      "price": 550,\n      "booking_url": "https://www.klm.com"\n    },\n    {\n      "airline": "Turkish Airlines",\n      "flight_number": "TK9012",\n      "price": 480,\n      "booking_url": "https://www.turkishairlines.com"\n    },\n    {\n      "airline": "Aeroflot",\n      "flight_number": "SU3456",\n      "price": 450,\n      "booking_url": "https://www.aeroflot.com"\n    }\n  ],\n  "hotels": [\n    {\n      "name": "Hotel Premier Palace Kyiv",\n      "rating": 4.5,\n      "total_reviews": 1200,\n      "img_url": "https://example.com/hotel1.jpg", \n      "price_per_night": 150,\n      "booking_url": "https://example.com/booking1",\n      "geo_coordinates": {\n        "latitude": 50.44,\n        "longitude": 30.52\n      }\n    },\n    {\n      "name": "Opera Hotel",\n      "rating": 4,\n      "total_reviews": 800,\n      "img_url": "https://example.com/hotel2.jpg",\n      "price_per_night": 100,\n      "booking_url": "https://example.com/booking2",\n      "geo_coordinates": {\n        "latitude": 50.44,\n        "longitude": 30.52\n      }\n    },\n    {\n      "name": "Ibis Kyiv City Center",\n      "rating": 3.5,\n      "total_reviews": 600,\n      "img_url": "https://example.com/hotel3.jpg",\n      "price_per_night": 75,\n      "booking_url": "https://example.com/booking3",\n      "geo_coordinates": {\n        "latitude": 50.45,\n        "longitude": 30.53\n      }\n    },\n    {\n      "name": "Pullman Kyiv City Centre",\n      "rating": 4.2,\n      "total_reviews": 950,\n      "img_url": "https://example.com/hotel4.jpg",\n      "price_per_night": 120,\n      "booking_url": "https://example.com/booking4",\n      "geo_coordinates": {\n        "latitude": 50.45,\n        "longitude": 30.50\n      }\n    },\n    {\n      "name": "Hyatt Regency Kyiv",\n      "rating": 4.8,\n      "total_reviews": 1500,\n      "img_url": "https://example.com/hotel5.jpg",\n      "price_per_night": 200,\n      "booking_url": "https://example.com/booking5",\n      "geo_coordinates": {\n        "latitude": 50.43,\n        "longitude": 30.51\n      }\n    },\n    {\n      "name": "Radisson Blu Podil",\n      "rating": 4,\n      "total_reviews": 750,\n      "img_url": "https://example.com/hotel6.jpg",\n      "price_per_night": 110,\n      "booking_url": "https://example.com/booking6",\n      "geo_coordinates": {\n        "latitude": 50.46,\n        "longitude": 30.54\n      }\n    }\n  ],\n  "places_to_visit": [\n    {\n      "name": "Saint Sophia\'s Cathedral",\n      "description": "A UNESCO World Heritage site.",\n      "address": "Vulitsya Volodymyrska, 24, Kyiv, 01001, Ukraine",\n      "entry_fees": 50,\n      "best_times_to_visit": "Morning or late afternoon",\n      "rating": 4.8,\n      "total_reviews": 2500\n    },\n    {\n      "name": "Kyiv Pechersk Lavra",\n      "description": "Monastery complex with caves and churches.",\n      "address": "Lavrska vul., 9, Kyiv, 02130, Ukraine",\n      "entry_fees": 30,\n      "best_times_to_visit": "Morning",\n      "rating": 4.6,\n      "total_reviews": 2000\n    },\n    {\n      "name": "Andriyivsky Descent",\n      "description": "Historic street with shops and cafes.",\n      "address": "Andriyivs\'kyi Descent, Kyiv, Ukraine",\n      "entry_fees": 0,\n      "best_times_to_visit": "Anytime",\n      "rating": 4.5,\n      "total_reviews": 1800\n    },\n    {\n      "name": "National Museum of the History of Ukraine in the Second World War",\n      "description": "Museum dedicated to WWII.",\n      "address": "Lavrska vul., 24, Kyiv, 02000, Ukraine",\n      "entry_fees": 40,\n      "best_times_to_visit": "Late afternoon",\n      "rating": 4.2,\n      "total_reviews": 1500\n    },\n    {\n      "name": "Rodina Mat",\n      "description": "Monument to Motherland",\n      "address": "Lavrska vul., 24, Kyiv, 02000, Ukraine",\n      "entry_fees": 0,\n      "best_times_to_visit": "Sunrise or Sunset",\n      "rating": 4.7,\n      "total_reviews": 1200\n    },\n    {\n      "name": "Mariinsky Palace",\n      "description": "Official residence of the President of Ukraine",\n      "address": "Vul. Instytutska, 23, Kyiv, 01001, Ukraine",\n      "entry_fees": 0,\n      "best_times_to_visit": "Afternoon",\n      "rating": 4.4,\n      "total_reviews": 1000\n    }\n  ],\n  "restaurants": [\n    {\n      "name": "Kanapa Restaurant",\n      "cuisine_type": "Ukrainian",\n      "address": "St. Volodymyrska, 49, Kyiv, Ukraine",\n      "geo_coordinates": {\n        "latitude": 50.45,\n        "longitude": 30.52\n      },\n      "rating": 4.6,\n      "total_reviews": 1000,\n      "average_cost_per_meal": 25,\n      "currency": "UAH",\n      "booking_url": "https://example.com/kanapa"\n    },\n    {\n      "name": "Ostannya Barykada",\n      "cuisine_type": "Modern Ukrainian",\n      "address": "Lypkivska St, 16, Kyiv, Ukraine",\n      "geo_coordinates": {\n        "latitude": 50.45,\n        "longitude": 30.53\n      },\n      "rating": 4.4,\n      "total_reviews": 800,\n      "average_cost_per_meal": 30,\n      "currency": "UAH",\n      "booking_url": "https://example.com/ostbar"\n    },\n    {\n      "name": "Beef Meat & Wine",\n      "cuisine_type": "Steakhouse",\n      "address": "Shota Rustaveli St, 16, Kyiv, Ukraine",\n      "geo_coordinates": {\n        "latitude": 50.44,\n        "longitude": 30.51\n      },\n      "rating": 4.2,\n      "total_reviews": 600,\n      "average_cost_per_meal": 40,\n      "currency": "UAH",\n      "booking_url": "https://example.com/beef"\n    },\n    {\n      "name": "Chicken Kyiv",\n      "cuisine_type": "Fast Food",\n      "address": "Multiple Locations",\n      "geo_coordinates": {\n        "latitude": 50.45,\n        "longitude": 30.52\n      },\n      "rating": 4,\n      "total_reviews": 500,\n      "average_cost_per_meal": 15,\n      "currency": "UAH",\n      "booking_url": null\n    },\n    {\n      "name": "Puzata Hata",\n      "cuisine_type": "Traditional Ukrainian",\n      "address": "Multiple Locations",\n      "geo_coordinates": {\n        "latitude": 50.45,\n        "longitude": 30.52\n      },\n      "rating": 3.8,\n      "total_reviews": 700,\n      "average_cost_per_meal": 10,\n      "currency": "UAH",\n      "booking_url": null\n    }\n  ],\n  "local_transportation": [\n    {\n      "mode_of_transportation": "Metro",\n      "currency": "UAH",\n      "price_estimate": 5\n    },\n    {\n      "mode_of_transportation": "Taxi/Uber",\n      "currency": "UAH",\n      "price_estimate": 100\n    }\n  ],\n  "itinerary": [\n    {\n      "day": 1,\n      "date": "2023-02-20",\n      "timeline": [\n        {\n          "time": "08:00",\n          "activity": "Travel",\n          "details": "Arrive at Kyiv Boryspil International Airport (KBP), transfer to Hotel Premier Palace Kyiv via Uber."\n        },\n        {\n          "time": "10:00",\n          "activity": "Hotel",\n          "details": "Check in to Hotel Premier Palace Kyiv."\n        },\n        {\n          "time": "12:00",\n          "activity": "Meal",\n          "details": "Lunch at Kanapa Restaurant."\n        },\n        {\n          "time": "14:00",\n          "activity": "Visit",\n          "details": "Visit Saint Sophia\'s Cathedral."\n        },\n        {\n          "time": "16:00",\n          "activity": "Visit",\n          "details": "Explore Andriyivsky Descent."\n        },\n        {\n          "time": "19:00",\n          "activity": "Meal",\n          "details": "Dinner at Ostannya Barykada."\n        }\n      ]\n    },\n    {\n      "day": 2,\n      "date": "2023-02-21",\n      "timeline": [\n         {\n          "time": "09:00",\n          "activity": "Visit",\n          "details": "Visit Kyiv Pechersk Lavra."\n        },\n        {\n          "time": "12:00",\n          "activity": "Meal",\n          "details": "Lunch at Chicken Kyiv near Lavra."\n        },\n        {\n          "time": "14:00",\n          "activity": "Visit",\n          "details": "Visit National Museum of the History of Ukraine in the Second World War."\n        },\n        {\n          "time": "17:00",\n          "activity": "Visit",\n          "details": "See Rodina Mat at sunset."\n        },\n        {\n          "time": "19:00",\n          "activity": "Meal",\n          "details": "Dinner at Beef Meat & Wine."\n        }\n      ]\n    },\n    {\n      "day": 3,\n      "date": "2023-02-22",\n      "timeline":[\n        {\n          "time": "10:00",\n          "activity": "Visit",\n          "details": "Visit Mariinsky Palace."\n        },\n        {\n          "time": "12:00",\n          "activity": "Meal",\n          "details": "Lunch at Puzata Hata"\n        },\n        {\n          "time": "14:00",\n          "activity": "Free Time",\n          "details": "Shopping or exploring the city."\n        },\n        {\n          "time": "19:00",\n          "activity": "Meal",\n          "details": "Dinner at a restaurant of your choice."\n        }\n\n      ]\n    },\n    {\n      "day": 4,\n      "date": "2023-02-23",\n      "timeline": [\n        {\n          "time": "09:00",\n          "activity": "Free Time",\n          "details": "Optional day trip or further exploration of Kyiv"\n        }\n      ]\n    },\n    {\n      "day": 5,\n      "date": "2023-02-24",\n      "timeline": [\n        {\n          "time": "09:00",\n          "activity": "Free Time",\n          "details": "Optional day trip or further exploration of Kyiv"\n        }\n      ]\n    },\n    {\n      "day": 6,\n      "date": "2023-02-25",\n      "timeline": [\n        {\n          "time": "09:00",\n          "activity": "Free Time",\n          "details": "Optional day trip or further exploration of Kyiv"\n        }\n      ]\n    },\n    {\n      "day": 7,\n      "date": "2023-02-26",\n      "timeline": [\n        {\n          "time": "12:00",\n          "activity": "Check-out",\n          "details": "Check out from the hotel."\n        },\n        {\n          "time": "14:00",\n          "activity": "Travel",\n          "details": "Transfer to Kyiv Boryspil International Airport (KBP) for departure."\n        }\n      ]\n    },\n    {\n      "day": 8,\n      "date": "2023-02-27",\n      "timeline": [\n        {\n          "time": "00:00",\n          "activity": "Travel",\n          "details": "Arrive back in Kyiv."\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Note:**  This JSON uses placeholder URLs for images and booking.  You would need to replace these with actual URLs.  The geo-coordinates are approximate and should be replaced with precise coordinates from a mapping service for each location.  Restaurant and hotel prices are estimates and will vary depending on the time of year and availability.  The itinerary assumes a standard budget; adjustments would need to be made for other budget types (Budget, Premium, All-Inclusive).  Flight prices are also estimates and need to be verified with current flight searches.\n',
        },
      ],
    },
  ],
});
