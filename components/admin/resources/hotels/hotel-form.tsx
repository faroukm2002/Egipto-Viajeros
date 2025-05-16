"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Plus, X } from "lucide-react";

interface Hotel {
  id: number;
  name: string;
  description: string;
  location: string;
  pricePerNight: number;
  images: string[];
  availability: boolean;
}

interface HotelFormProps {
  hotel?: Hotel;
  onSave: (hotel: any) => void;
  onCancel: () => void;
}

export function HotelForm({ hotel, onSave, onCancel }: HotelFormProps) {
  const [formData, setFormData] = useState({
    name: hotel?.name || '',
    description: hotel?.description || '',
    location: hotel?.location || '',
    pricePerNight: hotel?.pricePerNight || 0,
    images: hotel?.images || [''],
    availability: hotel?.availability || true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'pricePerNight' ? parseFloat(value) : value,
    });
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty image URLs
    const filteredImages = formData.images.filter(url => url.trim() !== '');
    
    if (hotel) {
      onSave({ ...formData, id: hotel.id, images: filteredImages });
    } else {
      onSave({ ...formData, images: filteredImages });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onCancel} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">
          {hotel ? 'Edit Hotel' : 'Add New Hotel'}
        </h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Hotel Information</CardTitle>
            <CardDescription>
              Enter the details for the hotel listing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Hotel Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pricePerNight">Price Per Night ($)</Label>
                <Input
                  id="pricePerNight"
                  name="pricePerNight"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.pricePerNight}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Hotel Images</Label>
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center gap-2 mt-2">
                  <Input
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="Enter image URL"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeImageField(index)}
                    disabled={formData.images.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={addImageField}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="availability"
                checked={formData.availability}
                onCheckedChange={(checked) => setFormData({ ...formData, availability: checked })}
              />
              <Label htmlFor="availability">Available for booking</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {hotel ? 'Update Hotel' : 'Create Hotel'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}