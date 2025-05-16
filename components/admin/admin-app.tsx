"use client";

import { useState, useEffect } from 'react';
import Dashboard from './dashboard/dashboard';
import HotelList from './resources/hotels/hotel-list';
import YachtList from './resources/yachts/yacht-list';
import TourList from './resources/tours/tour-list';
// import ArticleList from './resources/articles/article-list';
// import ReviewList from './resources/reviews/review-list';
import InquiryList from './resources/inquiries/inquiry-list';
// import PackageList from './resources/packages/package-list';
// import FaqList from './resources/faqs/faq-list';
// import NewsList from './resources/news/news-list';
// import EmailList from './resources/emails/email-list';
// import SettingsList from './resources/settings/settings-list';
import { usePathname } from 'next/navigation';

export default function AdminApp() {
  const pathname = usePathname();
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<Dashboard />);

  useEffect(() => {
    // Map paths to components
    const componentMap: Record<string, React.ReactNode> = {
      '/': <Dashboard />,
      '/hotels': <HotelList />,
      '/yachts': <YachtList />,
      '/tours': <TourList />,
      // '/articles': <ArticleList />,
      // '/reviews': <ReviewList />,
      '/inquiries': <InquiryList />,
      // '/packages': <PackageList />,
      // '/faqs': <FaqList />,
      // '/news': <NewsList />,
      // '/emails': <EmailList />,
      // '/settings': <SettingsList />,
    };

    // Set the active component based on the current path
    setActiveComponent(componentMap[pathname] || <Dashboard />);
  }, [pathname]);

  return (
    <div className="w-full">
      {activeComponent}
    </div>
  );
}