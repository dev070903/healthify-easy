
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const EmergencySection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800"></div>
          
          <div className="relative z-10 px-6 py-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                24/7 Emergency Services
              </h2>
              <p className="text-red-100 text-lg mb-8">
                Immediate medical assistance for critical situations. Our emergency team is available round the clock to provide prompt and life-saving care.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-white text-red-600 hover:bg-red-50 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Emergency Helpline
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 w-full max-w-sm">
              <h3 className="text-white font-semibold text-xl mb-4">Emergency Contact</h3>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-white font-medium">Ambulance Service</p>
                  <a href="tel:102" className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
                    <Phone className="h-5 w-5" />
                    102
                  </a>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-white font-medium">MediQuick Emergency</p>
                  <a href="tel:+919876543210" className="text-xl font-bold text-white flex items-center gap-2 mt-1">
                    <Phone className="h-5 w-5" />
                    +91 98765 43210
                  </a>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-white font-medium">Bombay Hospital Emergency</p>
                  <a href="tel:+912222067676" className="text-xl font-bold text-white flex items-center gap-2 mt-1">
                    <Phone className="h-5 w-5" />
                    +91 22 2206 7676
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencySection;
