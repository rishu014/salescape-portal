
import { useState, useEffect } from "react";
import AttendanceCard from "@/components/attendance/AttendanceCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

interface TimeLog {
  date: string;
  timeSpent: number; // in minutes
}

const Attendance = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>(() => {
    const saved = localStorage.getItem('timeLogs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('timeLogs', JSON.stringify(timeLogs));
  }, [timeLogs]);

  const handleTimeLogged = (minutes: number) => {
    const today = new Date().toISOString().split('T')[0];
    setTimeLogs(prev => {
      const existingLog = prev.find(log => log.date === today);
      if (existingLog) {
        return prev.map(log => 
          log.date === today 
            ? { ...log, timeSpent: log.timeSpent + minutes }
            : log
        );
      }
      return [...prev, { date: today, timeSpent: minutes }];
    });
  };

  const getTotalHoursForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    const log = timeLogs.find(log => log.date === dateString);
    return log ? Math.round(log.timeSpent / 60 * 100) / 100 : 0;
  };

  const totalHoursThisWeek = timeLogs.reduce((acc, log) => {
    const logDate = new Date(log.date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - logDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) {
      return acc + (log.timeSpent / 60);
    }
    return acc;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Time Tracking</h1>
          <p className="mt-2 text-gray-600">
            Track your work hours and manage attendance
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <AttendanceCard onTimeLogged={handleTimeLogged} />
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Weekly Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(totalHoursThisWeek * 100) / 100} hours
                </div>
                <p className="text-sm text-gray-500">Total hours this week</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
                {date && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">Hours worked on selected date:</p>
                    <p className="text-2xl font-bold">{getTotalHoursForDate(date)} hours</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
