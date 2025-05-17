"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { HotelForm } from './hotel-form';
import { dataProvider } from '@/lib/data-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Hotel {
  id: number;
  name: string;
  description: string;
  location: string;
  pricePerNight: number;
  images: string[];
  availability: boolean;
}

export default function HotelList() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isCreating, setIsCreating] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data } = await dataProvider.getList('hotels', {
          pagination: { page: 1, perPage: 25 },
          sort: { field: 'id', order: 'ASC' },
          filter: {},
        });
        setHotels(data as Hotel[]);
      } catch (err) {
        setError('Failed to load hotels. Please try again later.');
        console.error('Error fetching hotels:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleCreateHotel = (newHotel: Omit<Hotel, 'id'>) => {
    try {
      const { data } = dataProvider.create('hotels', { data: newHotel });
      setHotels([...hotels, data as Hotel]);
      setIsCreating(false);
    } catch (err) {
      console.error('Error creating hotel:', err);
      // Handle error appropriately
    }
  };

  const handleUpdateHotel = (updatedHotel: Hotel) => {
    try {
      const { data } = dataProvider.update('hotels', {
        id: updatedHotel.id,
        data: updatedHotel,
        previousData: editingHotel as Hotel,
      });
      
      setHotels(hotels.map(hotel => hotel.id === updatedHotel.id ? (data as Hotel) : hotel));
      setEditingHotel(null);
    } catch (err) {
      console.error('Error updating hotel:', err);
      // Handle error appropriately
    }
  };

  const handleDeleteHotel = (id: number) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      try {
        dataProvider.delete('hotels', { id, previousData: {} as any });
        setHotels(hotels.filter(hotel => hotel.id !== id));
      } catch (err) {
        console.error('Error deleting hotel:', err);
        // Handle error appropriately
      }
    }
  };
  
  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isCreating || editingHotel) {
    return (
      <HotelForm 
        hotel={editingHotel || undefined}
        onSave={editingHotel ? handleUpdateHotel : handleCreateHotel}
        onCancel={() => {
          setIsCreating(false);
          setEditingHotel(null);
        }}
      />
    );
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Hotels</h1>
          <p className="text-muted-foreground">Manage your hotel listings</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Hotel
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Hotel Listings</CardTitle>
          <CardDescription>
            You have {filteredHotels.length} hotels in your database.
          </CardDescription>
          <div className="pt-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search hotels..."
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
                <TableHead className="w-[250px]">Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price/Night</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHotels.map((hotel) => (
                <TableRow key={hotel.id}>
                  <TableCell className="font-medium">{hotel.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={hotel.images[0]} alt={hotel.name} />
                        <AvatarFallback>{hotel.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{hotel.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{hotel.location}</TableCell>
                  <TableCell>${hotel.pricePerNight}/night</TableCell>
                  <TableCell>
                    <Badge variant={hotel.availability ? "default" : "secondary"}>
                      {hotel.availability ? "Available" : "Unavailable"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingHotel(hotel)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteHotel(hotel.id)}
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