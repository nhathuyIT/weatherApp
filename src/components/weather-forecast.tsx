import type { ForecastData } from "@/api/types";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface WeatherForecastProps {
  data: ForecastData;
}
interface DailyForecast {
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  date: number;
}
const WeatherForecast = ({ data }: WeatherForecastProps) => {
  if (!data?.list) return null;

  const dailyForecast = data.list.reduce(
    (acc, forecast) => {
      const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
      if (!acc[date]) {
        acc[date] = {
          temp_min: forecast.main.temp_min,
          temp_max: forecast.main.temp_max,
          humidity: forecast.main.humidity,
          wind: forecast.wind.speed,
          weather: forecast.weather[0],
          date: forecast.dt,
        };
      } else {
        acc[date].temp_min = Math.min(
          acc[date].temp_min,
          forecast.main.temp_min,
        );
        acc[date].temp_max = Math.max(
          acc[date].temp_max,
          forecast.main.temp_max,
        );
      }
      return acc;
    },
    {} as Record<string, DailyForecast>,
  );

  const nextDays = Object.values(dailyForecast).slice(1, 6); // Next 5 days

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:gap-4">
            {nextDays.map((day) => (
              <div
                key={day.date}
                className="flex flex-col sm:grid sm:grid-cols-3 items-start sm:items-center gap-2 sm:gap-4 rounded-lg border p-3 sm:p-4"
              >
                <div className="w-full sm:w-auto">
                  <p className="text-xs sm:text-sm md:text-base font-medium">
                    {format(new Date(day.date * 1000), "EEE, MMM d")}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground capitalize">
                    {day.weather.description}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-center w-full sm:w-auto gap-4">
                  <div className="flex gap-2 sm:gap-4">
                    <span className="flex items-center text-xs sm:text-sm text-blue-500">
                      <ArrowDown className="mr-0.5 sm:mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                      {formatTemp(day.temp_min)}
                    </span>
                    <span className="flex items-center text-xs sm:text-sm text-red-500">
                      <ArrowUp className="mr-0.5 sm:mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                      {formatTemp(day.temp_max)}
                    </span>
                  </div>

                  <div className="flex sm:hidden gap-3">
                    <span className="flex items-center gap-1">
                      <Droplets className="h-3 w-3 text-blue-500" />
                      <span className="text-xs">{day.humidity}%</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Wind className="h-3 w-3 text-blue-500" />
                      <span className="text-xs">{day.wind}m/s</span>
                    </span>
                  </div>
                </div>

                <div className="hidden sm:flex justify-end gap-2 sm:gap-4">
                  <span className="flex items-center gap-1">
                    <Droplets className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                    <span className="text-xs sm:text-sm">{day.humidity}%</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                    <span className="text-xs sm:text-sm">{day.wind}m/s</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherForecast;
