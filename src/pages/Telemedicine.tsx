
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Search, Video, Clock, Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample doctors data for telemedicine
const telemedicineDoctors = [
  {
    id: 1,
    name: "Dr. Aditya Sharma",
    specialty: "Cardiologist",
    experience: "15+ years",
    ratings: 4.9,
    totalRatings: 120,
    consultationFee: 800,
    nextAvailable: "Today, 2:00 PM",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    languages: ["English", "Hindi"],
    availability: "Available today"
  },
  {
    id: 2,
    name: "Dr. Priya Mehta",
    specialty: "Neurologist",
    experience: "12+ years",
    ratings: 4.8,
    totalRatings: 98,
    consultationFee: 900,
    nextAvailable: "Today, 4:30 PM",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    languages: ["English", "Hindi", "Gujarati"],
    availability: "Available today"
  },
  {
    id: 3,
    name: "Dr. Rahul Patel",
    specialty: "Orthopedic Surgeon",
    experience: "18+ years",
    ratings: 4.7,
    totalRatings: 145,
    consultationFee: 850,
    nextAvailable: "Tomorrow, 10:00 AM",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
    languages: ["English", "Hindi"],
    availability: "Available tomorrow"
  },
  {
    id: 4,
    name: "Dr. Ananya Desai",
    specialty: "Pediatrician",
    experience: "10+ years",
    ratings: 4.9,
    totalRatings: 130,
    consultationFee: 750,
    nextAvailable: "Today, 6:15 PM",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    languages: ["English", "Hindi", "Bengali"],
    availability: "Available today"
  },
  {
    id: 5,
    name: "Dr. Vikram Singh",
    specialty: "Dermatologist",
    experience: "14+ years",
    ratings: 4.6,
    totalRatings: 88,
    consultationFee: 950,
    nextAvailable: "Tomorrow, 2:30 PM",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    languages: ["English", "Hindi", "Punjabi"],
    availability: "Available tomorrow"
  },
  {
    id: 6,
    name: "Dr. Nandini Joshi",
    specialty: "Gynecologist",
    experience: "16+ years",
    ratings: 4.9,
    totalRatings: 156,
    consultationFee: 900,
    nextAvailable: "Today, 7:00 PM",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    languages: ["English", "Hindi", "Marathi"],
    availability: "Available today"
  }
];

const specialties = [
  "All Specialties",
  "Cardiologist",
  "Neurologist",
  "Orthopedic Surgeon",
  "Pediatrician",
  "Dermatologist",
  "Gynecologist",
  "ENT Specialist",
  "Psychiatrist",
  "General Physician"
];

const Telemedicine = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [availableToday, setAvailableToday] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filteredDoctors = telemedicineDoctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All Specialties" || doctor.specialty === selectedSpecialty;
    const matchesAvailability = availableToday ? doctor.availability.includes("today") : true;
    
    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeBookingForm = () => {
    setShowBookingForm(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Booking Form Popup */}
        {showBookingForm && selectedDoctor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Book Video Consultation</h2>
                    <p className="text-brand-600">with {selectedDoctor.name}</p>
                  </div>
                  <button 
                    onClick={closeBookingForm}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                      <img 
                        src={selectedDoctor.image} 
                        alt={selectedDoctor.name} 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{selectedDoctor.name}</h3>
                        <p className="text-sm text-slate-600">{selectedDoctor.specialty} • {selectedDoctor.experience}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Consultation Fee</h4>
                      <p className="text-lg font-bold text-brand-700">₹{selectedDoctor.consultationFee}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Next Available Slot</h4>
                      <p className="text-slate-700">{selectedDoctor.nextAvailable}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Select Date</label>
                      <Input 
                        type="date" 
                        min={new Date().toISOString().split('T')[0]} 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Select Time Slot</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"].map((time) => (
                          <Button 
                            key={time} 
                            variant="outline" 
                            className="text-sm py-1 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200"
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Health Issue</label>
                      <Textarea 
                        placeholder="Briefly describe your health concern..." 
                        className="resize-none"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    className="w-full bg-brand-600 hover:bg-brand-700"
                  >
                    Confirm Booking
                  </Button>
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    By booking this appointment, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      
        {/* Hero section */}
        <div className="bg-brand-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Video Consultation with Doctors
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                Book online appointments and consult doctors from the comfort of your home
              </p>
              
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search doctors by name or specialty"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <select
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500"
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                  >
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                  
                  <Button className="bg-brand-600 hover:bg-brand-700">
                    Search Doctors
                  </Button>
                </div>
                
                <div className="mt-4 flex items-center">
                  <input
                    type="checkbox"
                    id="availableToday"
                    checked={availableToday}
                    onChange={() => setAvailableToday(!availableToday)}
                    className="rounded border-gray-300 text-brand-600 shadow-sm focus:border-brand-300 focus:ring focus:ring-brand-200 focus:ring-opacity-50"
                  />
                  <label htmlFor="availableToday" className="ml-2 text-sm text-slate-700">Show doctors available today</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Doctors listing for telemedicine */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                {filteredDoctors.length} Doctors Available for Video Consultation
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-500">Sort by:</span>
                <select className="text-sm border-0 bg-transparent focus:ring-0">
                  <option>Earliest Available</option>
                  <option>Experience</option>
                  <option>Consultation Fee</option>
                </select>
              </div>
            </div>
            
            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDoctors.map((doctor) => (
                  <Card key={doctor.id} className="border-none shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-5">
                        <div className="flex items-start space-x-4">
                          <img 
                            src={doctor.image} 
                            alt={doctor.name} 
                            className="w-20 h-20 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="text-xl font-semibold text-slate-900">{doctor.name}</h3>
                            <p className="text-sm text-brand-600 font-medium">{doctor.specialty}</p>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                              <span className="ml-1 text-sm font-medium">{doctor.ratings}</span>
                              <span className="ml-1 text-xs text-slate-500">({doctor.totalRatings} ratings)</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center text-sm text-slate-600">
                            <span className="font-medium text-slate-700">Experience:</span>
                            <span className="ml-2">{doctor.experience}</span>
                          </div>
                          <div className="flex items-center text-sm text-slate-600">
                            <span className="font-medium text-slate-700">Languages:</span>
                            <span className="ml-2">{doctor.languages.join(", ")}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-1 text-green-600" />
                            <span className="text-green-600 font-medium">{doctor.nextAvailable}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold text-brand-700">₹{doctor.consultationFee}</span>
                            <span className="text-xs text-slate-500 block">Consultation Fee</span>
                          </div>
                          
                          <Button 
                            variant="default" 
                            className="bg-brand-600 hover:bg-brand-700 flex items-center gap-2"
                            onClick={() => handleBookAppointment(doctor)}
                          >
                            <Video className="h-4 w-4" />
                            Consult Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-slate-600">No doctors found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedSpecialty("All Specialties");
                    setAvailableToday(false);
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* How it works */}
        <div className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">How Telemedicine Works</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Consult with doctors online in 4 simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="relative">
                <div className="bg-white rounded-lg p-6 shadow-sm text-center relative z-10">
                  <div className="bg-brand-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Search className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Find a Doctor</h3>
                  <p className="text-slate-600">
                    Search for specialists based on your health concerns
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-8 h-0.5 bg-slate-200 -translate-y-1/2 -ml-4 z-0"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-lg p-6 shadow-sm text-center relative z-10">
                  <div className="bg-brand-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Book a Slot</h3>
                  <p className="text-slate-600">
                    Select a convenient time slot for your consultation
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-8 h-0.5 bg-slate-200 -translate-y-1/2 -ml-4 z-0"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-lg p-6 shadow-sm text-center relative z-10">
                  <div className="bg-brand-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-brand-600">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Make Payment</h3>
                  <p className="text-slate-600">
                    Complete your payment securely to confirm the booking
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-8 h-0.5 bg-slate-200 -translate-y-1/2 -ml-4 z-0"></div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                  <div className="bg-brand-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Video className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Video Consult</h3>
                  <p className="text-slate-600">
                    Connect with the doctor via video call at your scheduled time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Benefits of Telemedicine</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-brand-50 rounded-full p-2 mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Consult from Anywhere</h3>
                      <p className="text-slate-600">Access healthcare from the comfort of your home, office, or while traveling.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-50 rounded-full p-2 mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">No Travel or Waiting Time</h3>
                      <p className="text-slate-600">Skip the commute and waiting room. Join the video call at your scheduled time.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-50 rounded-full p-2 mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Privacy & Convenience</h3>
                      <p className="text-slate-600">Private consultations with licensed doctors at times that suit your schedule.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-50 rounded-full p-2 mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Digital Prescriptions</h3>
                      <p className="text-slate-600">Receive prescriptions and treatment plans digitally after your consultation.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-100 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Telemedicine Consultation" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Telemedicine;
