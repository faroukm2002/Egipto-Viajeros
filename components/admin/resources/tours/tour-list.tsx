"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { format } from 'date-fns';
import { dataProvider } from '@/lib/data-provider';

interface Tour {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: number;
  availableDates: Date[];
}

export default function TourList() {
  const [tours, setTours] = useState<Tour[]>(() => {
    // Fetch tours from the data provider
    const { data } = dataProvider.getList('tours', {
      pagination: { page: 1, perPage: 25 },
      sort: { field: 'id', order: 'ASC' },
      filter: {},
    });
    // Convert string dates to Date objects
    return (data as any[]).map(tour => ({
      ...tour,
      availableDates: Array.isArray(tour.availableDates) 
        ? tour.availableDates.map((d: string | Date) => new Date(d))
        : []
    }));
  });
  
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTours = tours.filter(tour => 
    tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.duration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteTour = (id: number) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      dataProvider.delete('tours', { id, previousData: {} as any });
      setTours(tours.filter(tour => tour.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tours</h1>
          <p className="text-muted-foreground">Manage your tour offerings</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Tour
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Tour Listings</CardTitle>
          <CardDescription>
            You have {filteredTours.length} tours in your database.
          </CardDescription>
          <div className="pt-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tours..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead className="w-[250px]">Title</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Available Dates</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTours.map((tour) => (
                <TableRow key={tour.id}>
                  <TableCell className="font-medium">{tour.id}</TableCell>
                  <TableCell>{tour.title}</TableCell>
                  <TableCell>{tour.duration}</TableCell>
                  <TableCell>${tour.price}</TableCell>
                  <TableCell>
                    {tour.availableDates.length > 0 ? (
                      <span>
                        Next: {format(new Date(tour.availableDates[0]), 'MMM d, yyyy')}
                        {tour.availableDates.length > 1 && ` (+${tour.availableDates.length - 1} more)`}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">No dates available</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTour(tour.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}