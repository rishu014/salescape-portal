import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Clock, CheckCircle } from "lucide-react";

const AttendanceCard = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  const handleAttendance = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    if (!isCheckedIn) {
      setCheckInTime(timeString);
      setIsCheckedIn(true);
      toast({
        title: "Checked In Successfully",
        description: `Check-in time: ${timeString}`,
      });
    } else {
      toast({
        title: "Checked Out Successfully",
        description: `Check-out time: ${timeString}`,
      });
      setIsCheckedIn(false);
      setCheckInTime(null);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Daily Attendance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Current Status</p>
              <div className="flex items-center gap-2">
                <CheckCircle className={`h-4 w-4 ${isCheckedIn ? 'text-success' : 'text-muted-foreground'}`} />
                <span className="text-sm">{isCheckedIn ? 'Checked In' : 'Not Checked In'}</span>
              </div>
            </div>
            {checkInTime && (
              <div className="text-right">
                <p className="text-sm font-medium">Check-in Time</p>
                <p className="text-sm text-muted-foreground">{checkInTime}</p>
              </div>
            )}
          </div>
          <Button 
            onClick={handleAttendance}
            className={`w-full ${isCheckedIn ? 'bg-danger hover:bg-danger/90' : 'bg-success hover:bg-success/90'}`}
          >
            {isCheckedIn ? 'Check Out' : 'Check In'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceCard;