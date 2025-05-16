"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare, Search, Trash2 } from "lucide-react";
import { format } from 'date-fns';
import { dataProvider } from '@/lib/data-provider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  message: string;
  dateSent: Date;
  status?: 'new' | 'read' | 'replied';
}

export default function InquiryList() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    // Fetch inquiries from the data provider
    const { data } = dataProvider.getList('inquiries', {
      pagination: { page: 1, perPage: 25 },
      sort: { field: 'dateSent', order: 'DESC' },
      filter: {},
    });
    // Convert string dates to Date objects and add status
    return (data as any[]).map(inquiry => ({
      ...inquiry,
      dateSent: new Date(inquiry.dateSent),
      status: Math.random() > 0.7 ? 'replied' : Math.random() > 0.5 ? 'read' : 'new'
    }));
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const filteredInquiries = inquiries.filter(inquiry => 
    inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewInquiry = (inquiry: Inquiry) => {
    // Mark as read if it was new
    if (inquiry.status === 'new') {
      const updatedInquiries = inquiries.map(item => 
        item.id === inquiry.id ? { ...item, status: 'read' as const } : item
      );
      setInquiries(updatedInquiries);
    }
    setSelectedInquiry(inquiry);
  };

  const handleDeleteInquiry = (id: number) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      dataProvider.delete('inquiries', { id, previousData: {} as any });
      setInquiries(inquiries.filter(inquiry => inquiry.id !== id));
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="default">New</Badge>;
      case 'read':
        return <Badge variant="secondary">Read</Badge>;
      case 'replied':
        return <Badge variant="outline">Replied</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Inquiries</h1>
          <p className="text-muted-foreground">View and respond to customer inquiries</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Customer Inquiries</CardTitle>
          <CardDescription>
            You have {inquiries.filter(i => i.status === 'new').length} new inquiries that need attention.
          </CardDescription>
          <div className="pt-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inquiries..."
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
                <TableHead className="w-[180px]">Name</TableHead>
                <TableHead className="w-[220px]">Email</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInquiries.map((inquiry) => (
                <TableRow key={inquiry.id} className={inquiry.status === 'new' ? 'bg-muted/30' : undefined}>
                  <TableCell className="font-medium">{inquiry.id}</TableCell>
                  <TableCell>{inquiry.name}</TableCell>
                  <TableCell>{inquiry.email}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {inquiry.message}
                  </TableCell>
                  <TableCell>{format(inquiry.dateSent, 'MMM d, yyyy')}</TableCell>
                  <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewInquiry(inquiry)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteInquiry(inquiry.id)}
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
      
      {/* Inquiry Detail Dialog */}
      <Dialog open={!!selectedInquiry} onOpenChange={(open) => !open && setSelectedInquiry(null)}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Inquiry from {selectedInquiry?.name}</DialogTitle>
            <DialogDescription>
              Received on {selectedInquiry && format(selectedInquiry.dateSent, 'MMMM d, yyyy, h:mm a')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Contact Information</h4>
              <p className="font-medium">{selectedInquiry?.email}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Message</h4>
              <div className="p-4 bg-muted rounded-md">
                <p>{selectedInquiry?.message}</p>
              </div>
            </div>
            
            <div className="pt-4">
              <Button className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Reply to Inquiry
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}