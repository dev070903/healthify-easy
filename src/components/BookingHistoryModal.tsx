
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { DoctorBooking, useBookingService } from "./BasicBookingService";
import { Badge } from "@/components/ui/badge";
import { CalendarX2, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface BookingHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

const BookingHistoryModal = ({ isOpen, onClose, userEmail }: BookingHistoryModalProps) => {
  const { getUserBookings, cancelBooking, isLoading } = useBookingService();
  const [bookings, setBookings] = useState<DoctorBooking[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      if (isOpen && userEmail) {
        const userBookings = await getUserBookings(userEmail);
        setBookings(userBookings);
      }
    };

    fetchBookings();
  }, [isOpen, userEmail, refreshKey]);

  const handleCancelBooking = async (bookingId: string) => {
    const success = await cancelBooking(bookingId);
    if (success) {
      setRefreshKey(prev => prev + 1);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 border-green-300">
          <CheckCircle className="w-3 h-3 mr-1" /> Confirmed
        </Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
          <Clock className="w-3 h-3 mr-1" /> Pending
        </Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 border-red-300">
          <CalendarX2 className="w-3 h-3 mr-1" /> Cancelled
        </Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">
          <CheckCircle className="w-3 h-3 mr-1" /> Completed
        </Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-800 border-slate-300">
          <AlertCircle className="w-3 h-3 mr-1" /> {status}
        </Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Your Appointment History</DialogTitle>
        </DialogHeader>

        {isLoading && <div className="text-center py-8">Loading your appointments...</div>}

        {!isLoading && bookings.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-600 mb-4">You don't have any appointments yet.</p>
            <Button onClick={onClose}>Book an Appointment</Button>
          </div>
        )}

        {!isLoading && bookings.length > 0 && (
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.doctorName}</TableCell>
                    <TableCell>
                      {format(new Date(booking.appointmentDate), "PPP")}
                    </TableCell>
                    <TableCell>{booking.appointmentTime}</TableCell>
                    <TableCell>
                      {booking.appointmentType === "video" ? "Video Consultation" : "In-person"}
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell className="text-right">
                      {booking.status === "confirmed" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingHistoryModal;
