
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

// Types for our booking service
export interface DoctorBooking {
  id: string;
  doctorId: number;
  doctorName: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: "in-person" | "video";
  reason: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
}

// Simulate a database of bookings
let bookings: DoctorBooking[] = [];

// Basic booking hook
export const useBookingService = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create a new booking
  const createBooking = async (bookingData: Omit<DoctorBooking, "id" | "status" | "createdAt">) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a random ID
      const id = Math.random().toString(36).substring(2, 9);
      
      // Create booking
      const newBooking: DoctorBooking = {
        ...bookingData,
        id,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };
      
      // Add to "database"
      bookings.push(newBooking);
      
      // Success message
      toast({
        title: "Booking Confirmed",
        description: `Your appointment with Dr. ${bookingData.doctorName} has been booked for ${format(new Date(bookingData.appointmentDate), "PPP")} at ${bookingData.appointmentTime}.`,
      });
      
      console.log("Booking created:", newBooking);
      return newBooking;
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("Failed to create booking. Please try again.");
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Get bookings for a user
  const getUserBookings = async (userEmail: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filter bookings by user email
      const userBookings = bookings.filter(booking => booking.patientEmail === userEmail);
      return userBookings;
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to fetch bookings. Please try again.");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel a booking
  const cancelBooking = async (bookingId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find and update booking
      const bookingIndex = bookings.findIndex(b => b.id === bookingId);
      
      if (bookingIndex === -1) {
        throw new Error("Booking not found");
      }
      
      bookings[bookingIndex].status = "cancelled";
      
      toast({
        title: "Booking Cancelled",
        description: "Your appointment has been cancelled successfully.",
      });
      
      return true;
    } catch (err) {
      console.error("Error cancelling booking:", err);
      setError("Failed to cancel booking. Please try again.");
      
      toast({
        title: "Cancellation Failed",
        description: "There was an error cancelling your booking. Please try again.",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createBooking,
    getUserBookings,
    cancelBooking,
    isLoading,
    error,
  };
};

// Export a basic function to simulate getting all bookings (admin function)
export const getAllBookings = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return bookings;
};
