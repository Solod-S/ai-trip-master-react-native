import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { Timeline } from "react-native-just-timeline";
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export function TripScheduleTimeline({ singleParsedItinerary }) {
  const [data, setData] = useState([]);

  const chooseIcon = activity => {
    switch (activity) {
      case "Travel":
        return "cab";
      case "Arrival":
        return "location-arrow";
      case "Transportation":
        return "plane";
      case "Flight":
        return "plane";
      case "Check-in":
        return "check-square-o";
      case "Check-out":
        return "check-square-o";
      case "Lunch":
        return "cutlery";
      case "Visit":
        return "star";
      case "Dinner":
        return "cutlery";
      case "Meal":
        return "cutlery";
      case "Relax":
        return "hotel";
      case "Hotel":
        return "hotel";
      case "Breakfast":
        return "coffee";
      case "Free Time":
        return "shopping-cart";
      default:
        return "question-circle";
    }
  };

  const changeBgColor = activity => {
    switch (activity) {
      case "Travel":
        return "#FFD700"; // Gold
      case "Arrival":
        return "#32CD32"; // LimeGreen
      case "Transportation":
        return "#00CED1"; // DarkTurquoise
      case "Flight":
        return "#00CED1"; // DarkTurquoise
      case "Check-in":
        return "#FF4500"; // OrangeRed
      case "Check-out":
        return "#FF4500"; // OrangeRed
      case "Lunch":
        return "#FF6347"; // Tomato
      case "Visit":
        return "#4682B4"; // SteelBlue
      case "Dinner":
        return "#8A2BE2"; // BlueViolet
      case "Meal":
        return "#8A2BE2"; // BlueViolet
      case "Relax":
        return "#20B2AA"; // LightSeaGreen
      case "Hotel":
        return "#20B2AA"; // LightSeaGreen
      case "Breakfast":
        return "#FFA07A"; // LightSalmon
      case "Free Time":
        return "#00CED1"; // LightSalmon
      default:
        return "#D3D3D3"; // LightGray for unknown activities
    }
  };

  useEffect(() => {
    if (singleParsedItinerary) {
      const newData = singleParsedItinerary?.timeline.map(timelineElem => {
        return {
          title: () => (
            <View>
              <Text
                style={{
                  ...styles.titleStyle,
                  color: changeBgColor(timelineElem.activity),
                }}
              >
                {timelineElem.activity}
              </Text>
            </View>
          ),
          description: {
            content: timelineElem.details,
            style: styles.descStyle,
          },
          time: {
            content: timelineElem.time,
            style: styles.timeStyle,
          },
          icon: {
            content: chooseIcon(timelineElem.activity),
            style: {
              ...styles.iconStyle,
              backgroundColor: changeBgColor(timelineElem.activity),
            },
          },
        };
      });
      // console.log(`newData`,newData);
      setData(newData);
    }
  }, [singleParsedItinerary]);

  return (
    <View style={styles.mainView}>
      <View style={styles.textView}>
        <Text style={styles.textStyle}>Day: {singleParsedItinerary.day}</Text>

        <Text style={styles.textStyle}>
          {moment(singleParsedItinerary?.date).format("DD MMM YYYY")}
        </Text>
      </View>
      <Timeline data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: Colors.lightGray,
    padding: 15,
    borderRadius: 15,
  },
  textView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
  },
  textStyle: {
    fontFamily: "outfit-semibold",
    fontSize: hp(2.1),
  },
  titleStyle: {
    fontFamily: "outfit-semibold",
    fontSize: hp(1.8),
  },
  timeStyle: {
    paddingTop: 8,
    fontSize: hp(1.8),
    color: Colors.gray,
  },
  descStyle: {
    paddingTop: 8,
    fontFamily: "outfit",
    fontSize: hp(1.7),
    color: Colors.gray,
  },
  iconStyle: {
    width: 40,
    height: 40,
    color: "#FFF",
    borderColor: "#FFF",
    fontSize: hp(2.3),
    paddingTop: 8,
    borderRadius: 20,
  },
});
