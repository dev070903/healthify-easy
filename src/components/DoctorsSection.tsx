
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const doctors = [
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
  }
];

const DoctorsSection = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Top Doctors from Bombay Hospital
            </h2>
            <p className="text-lg text-slate-600">
              Book appointments with experienced specialists for quality healthcare services
            </p>
          </div>
          <Link to="/doctors">
            <Button variant="outline" className="text-brand-600 border-brand-600 hover:bg-brand-50">
              View All Doctors
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
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
                    >
                      <Calendar className="h-4 w-4" />
                      Book
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-brand-200 text-brand-700 hover:bg-brand-50 w-full flex items-center justify-center gap-2"
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
      </div>
    </section>
  );
};

export default DoctorsSection;
