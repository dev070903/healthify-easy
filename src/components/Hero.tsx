
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Calendar, Clock } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50 to-slate-50 -z-10"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-40 left-10 w-64 h-64 bg-medical-100 rounded-full blur-3xl opacity-60 -z-10"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-brand-100 rounded-full blur-3xl opacity-60 -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8 max-w-xl animate-slide-up">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-brand-100 text-brand-800 font-medium text-sm mb-4">
                Healthcare Made Simple
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 tracking-tight">
                Your Health, <span className="text-brand-600">Our Priority</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Book doctor appointments, order medicines, schedule lab tests, and access 
                telemedicine consultations - all in one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/doctors">
                <Button size="lg" className="bg-brand-600 hover:bg-brand-700 gap-2">
                  <Calendar className="h-5 w-5" />
                  Book Appointment
                </Button>
              </Link>
              <Link to="/medicines">
                <Button size="lg" variant="outline" className="gap-2">
                  <Search className="h-5 w-5" />
                  Order Medicines
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-brand-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Quick Service</p>
                  <p className="text-xs text-slate-600">24/7 Assistance</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-medical-100 flex items-center justify-center">
                  <Search className="h-5 w-5 text-medical-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Easy Search</p>
                  <p className="text-xs text-slate-600">Find the right doctor</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-400/20 to-medical-400/20 mix-blend-overlay"></div>
              <img 
                src="https://images.unsplash.com/photo-1638202993928-7d113511d8c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80" 
                alt="Doctor consultation" 
                className="w-full h-auto rounded-2xl object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg w-60 animate-float">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Search className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Trusted Professionals</h3>
                  <p className="text-xs text-slate-500 mt-1">Access to 1000+ verified doctors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
