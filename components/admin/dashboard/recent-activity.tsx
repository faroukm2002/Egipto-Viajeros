"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

interface Activity {
  id: number;
  action: string;
  subject: string;
  timestamp: Date;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
}

const recentActivities: Activity[] = [
  {
    id: 1,
    action: "created",
    subject: "New hotel listing: Cairo Skyline Hotel",
    timestamp: new Date(2025, 2, 10, 14, 30),
    user: {
      name: "Ahmed Hassan",
      initials: "AH",
    },
  },
  {
    id: 2,
    action: "updated",
    subject: "Yacht 'Nile Voyager' availability",
    timestamp: new Date(2025, 2, 10, 12, 15),
    user: {
      name: "Sarah Ibrahim",
      avatar: "/avatars/sarah.jpg",
      initials: "SI",
    },
  },
  {
    id: 3,
    action: "deleted",
    subject: "Expired tour listing: Cairo by Night",
    timestamp: new Date(2025, 2, 9, 16, 45),
    user: {
      name: "Mohamed Ali",
      initials: "MA",
    },
  },
  {
    id: 4,
    action: "responded",
    subject: "Customer inquiry about Luxor packages",
    timestamp: new Date(2025, 2, 9, 10, 20),
    user: {
      name: "Laila Mansour",
      avatar: "/avatars/laila.jpg",
      initials: "LM",
    },
  },
  {
    id: 5,
    action: "published",
    subject: "New article: 'Top 10 Attractions in Alexandria'",
    timestamp: new Date(2025, 2, 8, 15, 10),
    user: {
      name: "Khaled Nassar",
      initials: "KN",
    },
  },
  {
    id: 6,
    action: "flagged",
    subject: "Review from user jsmith about Aswan tour",
    timestamp: new Date(2025, 2, 8, 9, 30),
    user: {
      name: "Nour Hamed",
      avatar: "/avatars/nour.jpg",
      initials: "NH",
    },
  },
];

export function RecentActivityPanel() {
  return (
    <div className="space-y-6">
      {recentActivities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium">
              <span className="font-semibold">{activity.user.name}</span>{" "}
              <span className="text-muted-foreground">{activity.action}</span>{" "}
              {activity.subject}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(activity.timestamp, "MMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}