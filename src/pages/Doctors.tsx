
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Phone, Search, ListChecks } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoctorBookingModal from "@/components/DoctorBookingModal";
import BookingHistoryModal from "@/components/BookingHistoryModal";

// Sample doctors data
const doctorsData = [
  {
    id: 1,
    name: "Dr. Aditya Sharma",
    specialty: "Cardiologist",
    hospital: "Bombay Hospital",
    experience: "15+ years",
    ratings: 4.9,
    totalRatings: 120,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: 2,
    name: "Dr. Priya Mehta",
    specialty: "Neurologist",
    hospital: "Bombay Hospital",
    experience: "12+ years",
    ratings: 4.8,
    totalRatings: 98,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: 3,
    name: "Dr. Rahul Patel",
    specialty: "Orthopedic Surgeon",
    hospital: "Bombay Hospital",
    experience: "18+ years",
    ratings: 4.7,
    totalRatings: 145,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
  },
  {
    id: 4,
    name: "Dr. Ananya Desai",
    specialty: "Pediatrician",
    hospital: "Children's Hospital",
    experience: "10+ years",
    ratings: 4.9,
    totalRatings: 130,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 5,
    name: "Dr. Vikram Singh",
    specialty: "Dermatologist",
    hospital: "Skin & Care Clinic",
    experience: "14+ years",
    ratings: 4.6,
    totalRatings: 88,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: 6,
    name: "Dr. Nandini Joshi",
    specialty: "Gynecologist",
    hospital: "Women's Health Center",
    experience: "16+ years",
    ratings: 4.9,
    totalRatings: 156,
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
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
  "Psychiatrist"
];

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All Specialties" || doctor.specialty === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });

  const handleBookClick = (doctor: any) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const handleConsultClick = (doctor: any) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const handleShowHistory = () => {
    // Prompt for email to see appointments
    const email = prompt("Please enter your email address to view your appointments:");
    if (email) {
      setUserEmail(email);
      setShowHistoryModal(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Doctor booking modal */}
        <DoctorBookingModal 
          doctor={selectedDoctor} 
          isOpen={showBookingModal} 
          onClose={() => setShowBookingModal(false)}
          type={selectedDoctor?.specialty === "Psychologist" ? "video" : "in-person"}
          onBookingSuccess={() => {
            if (userEmail) {
              setShowHistoryModal(true);
            }
          }}
        />

        {/* Booking history modal */}
        <BookingHistoryModal
          isOpen={showHistoryModal}
          onClose={() => setShowHistoryModal(false)}
          userEmail={userEmail}
        />
        
        {/* Hero section */}
        <div className="bg-brand-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Find the Right Doctor for Your Health Needs
              </h1>
              <p className="text-lg text-slate-600 mb-6">
                Book in-person or online video consultations with verified doctors
              </p>
              
              <div className="flex justify-center mb-8">
                <Button
                  onClick={handleShowHistory}
                  variant="outline"
                  className="flex items-center gap-2 border-brand-600 text-brand-700 hover:bg-brand-50"
                >
                  <ListChecks className="h-4 w-4" />
                  View Your Appointments
                </Button>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search doctors by name or hospital"
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
              </div>
            </div>
          </div>
        </div>
        
        {/* Doctors listing */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                {filteredDoctors.length} Doctors Available
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-500">Sort by:</span>
                <select className="text-sm border-0 bg-transparent focus:ring-0">
                  <option>Relevance</option>
                  <option>Experience</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="border-none shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden card-lift">
                  <CardContent className="p-0">
                    <div className="aspect-[3/2] overflow-hidden">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900">{doctor.name}</h3>
                          <p className="text-sm text-brand-600 font-medium">{doctor.specialty}</p>
                        </div>
                        <div className="bg-brand-50 px-2 py-1 rounded-md flex items-center">
                          <span className="text-brand-700 font-medium text-sm">⭐ {doctor.ratings}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center text-sm text-slate-600">
                          <span className="font-medium text-slate-700">Hospital:</span>
                          <span className="ml-2">{doctor.hospital}</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-600">
                          <span className="font-medium text-slate-700">Experience:</span>
                          <span className="ml-2">{doctor.experience}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mt-5">
                        <Button 
                          variant="default" 
                          className="bg-brand-600 hover:bg-brand-700 w-full flex items-center justify-center gap-2"
                          onClick={() => handleBookClick(doctor)}
                        >
                          <Calendar className="h-4 w-4" />
                          Book
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-brand-200 text-brand-700 hover:bg-brand-50 w-full flex items-center justify-center gap-2"
                          onClick={() => handleConsultClick(doctor)}
                        >
                          <Phone className="h-4 w-4" />
                          Consult
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredDoctors.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-slate-600">No doctors found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedSpecialty("All Specialties");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Doctors;
