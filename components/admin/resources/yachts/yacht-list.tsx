"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { dataProvider } from '@/lib/data-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Yacht {
  id: number;
  name: string;
  type: string;
  capacity: number;
  pricePerHour: number;
  images: string[];
  available: boolean;
}

export default function YachtList() {
  const [yachts, setYachts] = useState<Yacht[]>(() => {
    // Fetch yachts from the data provider
    const { data } = dataProvider.getList('yachts', {
      pagination: { page: 1, perPage: 25 },
      sort: { field: 'id', order: 'ASC' },
      filter: {},
    });
    return data as Yacht[];
  });
  
  const [searchTerm, setSearchTerm] = useState('');

  const filteredYachts = yachts.filter(yacht => 
    yacht.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    yacht.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteYacht = (id: number) => {
    if (window.confirm('Are you sure you want to delete this yacht?')) {
      dataProvider.delete('yachts', { id, previousData: {} as any });
      setYachts(yachts.filter(yacht => yacht.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Yachts</h1>
          <p className="text-muted-foreground">Manage your yacht listings</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Yacht
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Yacht Fleet</CardTitle>
          <CardDescription>
            You have {filteredYachts.length} yachts in your database.
          </CardDescription>
          <div className="pt-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search yachts..."
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
                <TableHead>Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Price/Hour</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredYachts.map((yacht) => (
                <TableRow key={yacht.id}>
                  <TableCell className="font-medium">{yacht.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={yacht.images[0]} alt={yacht.name} />
                        <AvatarFallback>{yacht.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{yacht.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{yacht.type}</TableCell>
                  <TableCell>{yacht.capacity} people</TableCell>
                  <TableCell>${yacht.pricePerHour}/hour</TableCell>
                  <TableCell>
                    <Badge variant={yacht.available ? "default" : "secondary"}>
                      {yacht.available ? "Available" : "Unavailable"}
                    </Badge>
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
                      onClick={() => handleDeleteYacht(yacht.id)}
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