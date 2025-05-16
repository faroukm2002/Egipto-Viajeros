"use client";

import fakeDataProvider from 'ra-data-fakerest';
import { DataProvider } from 'react-admin';

// Generate random date within the last year
const randomDate = () => {
  const now = new Date();
  const pastDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  return new Date(pastDate.getTime() + Math.random() * (now.getTime() - pastDate.getTime()));
};

// Generate random dates within next 3 months
const generateAvailableDates = (count = 5) => {
  const dates = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const futureDate = new Date(now);
    futureDate.setDate(now.getDate() + Math.floor(Math.random() * 90));
    dates.push(futureDate);
  }
  return dates;
};

// Generate hotels
const generateHotels = (count = 15) => {
  const hotels = [];
  const locations = ['Cairo', 'Alexandria', 'Luxor', 'Aswan', 'Hurghada', 'Sharm El Sheikh'];
  
  for (let i = 1; i <= count; i++) {
    hotels.push({
      id: i,
      name: `Hotel ${i}`,
      description: `Luxury hotel with beautiful views and excellent service. Located in the heart of the city, close to major attractions.`,
      location: locations[Math.floor(Math.random() * locations.length)],
      pricePerNight: Math.floor(Math.random() * 300) + 100,
      images: [
        `https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg`,
        `https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg`,
        `https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg`,
      ],
      availability: Math.random() > 0.2,
    });
  }
  
  return hotels;
};

// Generate yachts
const generateYachts = (count = 10) => {
  const yachts = [];
  const types = ['Luxury', 'Sport', 'Cruiser', 'Sailboat', 'Catamaran'];
  
  for (let i = 1; i <= count; i++) {
    yachts.push({
      id: i,
      name: `Yacht ${i}`,
      type: types[Math.floor(Math.random() * types.length)],
      capacity: Math.floor(Math.random() * 20) + 5,
      pricePerHour: Math.floor(Math.random() * 500) + 200,
      images: [
        `https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg`,
        `https://images.pexels.com/photos/358332/pexels-photo-358332.jpeg`,
        `https://images.pexels.com/photos/2402705/pexels-photo-2402705.jpeg`,
      ],
      available: Math.random() > 0.3,
    });
  }
  
  return yachts;
};

// Generate tours
const generateTours = (count = 20) => {
  const tours = [];
  const durations = ['Half-day', 'Full-day', '2 days', '3 days', 'Week-long'];
  
  for (let i = 1; i <= count; i++) {
    tours.push({
      id: i,
      title: `Tour ${i}`,
      description: `Explore the ancient wonders and beautiful landscapes with our expert guides.`,
      duration: durations[Math.floor(Math.random() * durations.length)],
      price: Math.floor(Math.random() * 200) + 50,
      availableDates: generateAvailableDates(),
    });
  }
  
  return tours;
};

// Generate articles
const generateArticles = (count = 12) => {
  const articles = [];
  const authors = ['Mohamed Ahmed', 'Sarah Hassan', 'Ahmed Ali', 'Nour Ibrahim'];
  
  for (let i = 1; i <= count; i++) {
    articles.push({
      id: i,
      title: `Article ${i}`,
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nunc est ultricies nisl, vel ultricies nisl est vel ultricies.`,
      author: authors[Math.floor(Math.random() * authors.length)],
      publishedAt: randomDate(),
    });
  }
  
  return articles;
};

// Generate reviews
const generateReviews = (count = 30) => {
  const reviews = [];
  const names = ['John Smith', 'Maria Garcia', 'Alex Johnson', 'Emma Williams', 'Mohammed Ali'];
  const relatedTypes = ['hotel', 'yacht', 'tour'];
  
  for (let i = 1; i <= count; i++) {
    reviews.push({
      id: i,
      userName: names[Math.floor(Math.random() * names.length)],
      rating: Math.floor(Math.random() * 5) + 1,
      comment: `This was an amazing experience. The service was excellent and I would definitely recommend it.`,
      relatedTo: relatedTypes[Math.floor(Math.random() * relatedTypes.length)],
      relatedId: Math.floor(Math.random() * 10) + 1,
    });
  }
  
  return reviews;
};

// Generate inquiries
const generateInquiries = (count = 25) => {
  const inquiries = [];
  const names = ['Samuel Brown', 'Jessica Lee', 'Robert Chen', 'Linda Kim', 'David Lopez'];
  
  for (let i = 1; i <= count; i++) {
    inquiries.push({
      id: i,
      name: names[Math.floor(Math.random() * names.length)],
      email: `email${i}@example.com`,
      message: `I would like to inquire about your services. Please provide more information about availability and pricing.`,
      dateSent: randomDate(),
    });
  }
  
  return inquiries;
};

// Generate packages
const generatePackages = (count = 8) => {
  const packages = [];
  const durations = ['3 days', '5 days', '7 days', '10 days'];
  
  for (let i = 1; i <= count; i++) {
    packages.push({
      id: i,
      title: `Package ${i}`,
      description: `Complete travel package including accommodation, tours, and transportation.`,
      includes: [
        'Hotel accommodation',
        'Daily breakfast',
        'Guided tours',
        'Airport transfers',
        'Nile cruise',
      ],
      price: Math.floor(Math.random() * 1000) + 500,
      duration: durations[Math.floor(Math.random() * durations.length)],
    });
  }
  
  return packages;
};

// Generate FAQs
const generateFaqs = (count = 15) => {
  const faqs = [];
  
  for (let i = 1; i <= count; i++) {
    faqs.push({
      id: i,
      question: `Frequently Asked Question ${i}?`,
      answer: `This is the answer to the frequently asked question number ${i}. We provide detailed information to help our customers.`,
    });
  }
  
  return faqs;
};

// Generate news
const generateNews = (count = 10) => {
  const news = [];
  
  for (let i = 1; i <= count; i++) {
    news.push({
      id: i,
      title: `News Article ${i}`,
      content: `This is a news article about our latest offerings and updates. Stay informed about what's happening.`,
      publishedAt: randomDate(),
    });
  }
  
  return news;
};

// Generate emails
const generateEmails = (count = 20) => {
  const emails = [];
  const subjects = ['Newsletter', 'Special Offer', 'Holiday Package', 'Exclusive Deal', 'New Tour'];
  
  for (let i = 1; i <= count; i++) {
    emails.push({
      id: i,
      subject: `${subjects[Math.floor(Math.random() * subjects.length)]} - ${i}`,
      content: `Email content with information about our services and special offers.`,
      sentAt: randomDate(),
      to: 'subscribers@list.com',
    });
  }
  
  return emails;
};

// Settings
const settings = {
  id: 1,
  siteTitle: 'Egipto Viajeros',
  contactEmail: 'contact@egiptoviajeros.com',
  phoneNumber: '+20 123 456 7890',
};

// Create the data object with all resources
const data = {
  hotels: generateHotels(),
  yachts: generateYachts(),
  tours: generateTours(),
  articles: generateArticles(),
  reviews: generateReviews(),
  inquiries: generateInquiries(),
  packages: generatePackages(),
  faqs: generateFaqs(),
  news: generateNews(),
  emails: generateEmails(),
  settings: [settings],
};

// Create and export the data provider
export const dataProvider: DataProvider = fakeDataProvider(data);