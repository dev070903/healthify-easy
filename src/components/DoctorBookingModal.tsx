
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Clock } from "lucide-react";

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital?: string;
  experience: string;
  ratings: number;
  totalRatings: number;
  image: string;
  consultationFee?: number;
  nextAvailable?: string;
}

interface DoctorBookingModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
  type?: "in-person" | "video";
}

const DoctorBookingModal = ({ doctor, isOpen, onClose, type = "in-person" }: DoctorBookingModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    reason: "",
  });
  const [timeSlot, setTimeSlot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", 
    "12:00 PM", "02:00 PM", "03:00 PM", 
    "04:00 PM", "05:00 PM", "06:00 PM"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call to book appointment
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Appointment Booked Successfully!",
        description: `Your appointment with ${doctor?.name} has been confirmed for ${formData.date} at ${timeSlot}.`,
        variant: "default",
      });
      
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        reason: "",
      });
      setTimeSlot("");
      onClose();
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!doctor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Book {type === "video" ? "Video Consultation" : "Appointment"}
          </DialogTitle>
          <DialogDescription>
            with {doctor.name}, {doctor.specialty}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center space-x-4 py-4">
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg">{doctor.name}</h3>
            <p className="text-sm text-slate-600">{doctor.specialty} • {doctor.experience}</p>
            <div className="flex items-center mt-1">
              <span className="text-amber-500">⭐</span>
              <span className="ml-1 text-sm font-medium">{doctor.ratings}</span>
              <span className="ml-1 text-xs text-slate-500">({doctor.totalRatings} ratings)</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="grid gap-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your contact number"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="date" className="text-sm font-medium flex items-center gap-1">
                <Calendar className="h-4 w-4" /> 
                Preferred Date
              </label>
              <Input
                id="date"
                name="date"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium flex items-center gap-1">
                <Clock className="h-4 w-4" /> 
                Preferred Time
              </label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {timeSlots.map((time) => (
                  <Button 
                    key={time} 
                    type="button"
                    variant={timeSlot === time ? "default" : "outline"}
                    className={`text-sm py-1 ${
                      timeSlot === time 
                        ? "bg-brand-600 hover:bg-brand-700 text-white" 
                        : "hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200"
                    }`}
                    onClick={() => setTimeSlot(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="reason" className="text-sm font-medium">Reason for Visit</label>
              <Textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Briefly describe your symptoms or reason for consultation"
                className="resize-none"
                rows={3}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-brand-600 hover:bg-brand-700"
              disabled={!timeSlot || isSubmitting}
            >
              {isSubmitting ? "Booking..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </form>
        
        <div className="text-xs text-slate-500 mt-4 text-center">
          By booking this appointment, you agree to our Terms of Service and Privacy Policy.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorBookingModal;
