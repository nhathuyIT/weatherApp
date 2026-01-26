import type { WeatherData } from "@/api/types";
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface WeatherDetailsProps {
  data: WeatherData;
}
const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  if (!data) return null;

  const { wind, main, sys } = data;

  const getWindDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
    const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;
    return directions[index];
  };
  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "hh:mm a");
  };
  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icons: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icons: Sunset,
      color: "text-purple-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icons: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icons: Gauge,
      color: "text-blue-500",
    },
  ];
  return (
    <div>
      <>
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Weather Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2">
              {details.map((detail) => (
                <div
                  key={detail.title}
                  className="flex items-center gap-2 sm:gap-3 rounded-lg border p-3 sm:p-4"
                >
                  <detail.icons
                    className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${detail.color}`}
                  />
                  <div>
                    <p className="text-xs sm:text-sm font-medium leading-none">
                      {detail.title}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {detail.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </>
    </div>
  );
};

export default WeatherDetails;
