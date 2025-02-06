import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Clock, CheckCircle, Timer, Calendar } from "lucide-react";

const AttendanceCard = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState<string>("00:00:00");
  const [timerInterval, setTimerInterval] = useState<number | null>(null);

  const formatElapsedTime = (startTime: Date) => {
    const now = new Date();
    const diff = now.getTime() - startTime.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleAttendance = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    if (!isCheckedIn) {
      setCheckInTime(timeString);
      setIsCheckedIn(true);
      const interval = window.setInterval(() => {
        setElapsedTime(formatElapsedTime(now));
      }, 1000);
      setTimerInterval(interval);
      toast({
        title: "Checked In Successfully",
        description: `Check-in time: ${timeString}`,
      });
    } else {
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
      toast({
        title: "Checked Out Successfully",
        description: `Check-out time: ${timeString}`,
      });
      setIsCheckedIn(false);
      setCheckInTime(null);
      setElapsedTime("00:00:00");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Time Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Status</p>
              <div className="flex items-center gap-2">
                <CheckCircle className={`h-4 w-4 ${isCheckedIn ? 'text-green-500' : 'text-muted-foreground'}`} />
                <span className="text-sm">{isCheckedIn ? 'Working' : 'Not Working'}</span>
              </div>
            </div>
            {checkInTime && (
              <div>
                <p className="text-sm font-medium">Start Time</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{checkInTime}</p>
                </div>
              </div>
            )}
            <div>
              <p className="text-sm font-medium">Elapsed Time</p>
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{elapsedTime}</p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleAttendance}
            className={`w-full ${isCheckedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {isCheckedIn ? 'Stop Timer' : 'Start Timer'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceCard;