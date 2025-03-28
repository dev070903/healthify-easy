
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const doctors = [
  { id: 1, name: "Dr. Priya Sharma", specialty: "Cardiologist", hospital: "Bombay Hospital" },
  { id: 2, name: "Dr. Rahul Mehta", specialty: "Neurologist", hospital: "Bombay Hospital" },
  { id: 3, name: "Dr. Amit Patel", specialty: "Orthopedic Surgeon", hospital: "Bombay Hospital" },
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", 
  "4:00 PM", "4:30 PM", "5:00 PM"
];

const Appointment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [isVirtual, setIsVirtual] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Appointment booked successfully",
        description: `Your appointment with ${doctors.find(d => d.id.toString() === selectedDoctor)?.name} is confirmed for ${date ? format(date, "PPP") : ""} at ${timeSlot}.`,
      });
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-slate-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">Book an Appointment</h1>
              <p className="text-center text-slate-600 mb-8">
                Schedule a consultation with our expert doctors
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-slate-900">1. Select a Doctor</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {doctors.map((doctor) => (
                      <div 
                        key={doctor.id}
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer transition-all",
                          selectedDoctor === doctor.id.toString() 
                            ? "border-brand-500 bg-brand-50 shadow-sm" 
                            : "border-slate-200 hover:border-brand-200"
                        )}
                        onClick={() => setSelectedDoctor(doctor.id.toString())}
                      >
                        <div className="font-semibold text-slate-900">{doctor.name}</div>
                        <div className="text-sm text-slate-600">{doctor.specialty}</div>
                        <div className="text-sm text-slate-500">{doctor.hospital}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-slate-900">2. Choose Date & Time</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Select Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => 
                              date < new Date(new Date().setHours(0, 0, 0, 0)) || 
                              date.getDay() === 0 // Disable Sundays
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Select Time Slot</Label>
                      <Select onValueChange={setTimeSlot} value={timeSlot}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-slate-900">3. Your Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="symptoms">Symptoms or Reason for Visit</Label>
                      <Textarea 
                        id="symptoms" 
                        value={symptoms} 
                        onChange={(e) => setSymptoms(e.target.value)} 
                        rows={3} 
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox 
                    id="virtual" 
                    checked={isVirtual} 
                    onCheckedChange={(checked) => {
                      if (typeof checked === 'boolean') setIsVirtual(checked);
                    }} 
                  />
                  <Label htmlFor="virtual" className="text-sm font-normal cursor-pointer">
                    I prefer a virtual consultation (telemedicine)
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-brand-600 hover:bg-brand-700 mt-4" 
                  disabled={isLoading || !selectedDoctor || !date || !timeSlot || !fullName || !phone}
                >
                  {isLoading ? "Processing..." : "Book Appointment"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Appointment;
