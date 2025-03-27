
import { Clock, Calendar, Phone, FileText, Search, User } from "lucide-react";

const features = [
  {
    icon: <Calendar className="h-6 w-6 text-brand-600" />,
    title: "Online Appointment Booking",
    description: "Book appointments with doctors at Bombay Hospital and other top hospitals with just a few clicks."
  },
  {
    icon: <Search className="h-6 w-6 text-brand-600" />,
    title: "Medicine Delivery",
    description: "Order prescription medications and get them delivered to your doorstep within hours."
  },
  {
    icon: <Clock className="h-6 w-6 text-brand-600" />,
    title: "Lab Tests at Home",
    description: "Schedule blood tests and other diagnostics at your home or preferred lab center."
  },
  {
    icon: <Phone className="h-6 w-6 text-brand-600" />,
    title: "Telemedicine Consultations",
    description: "Connect with doctors via video calls for non-emergency medical advice and follow-ups."
  },
  {
    icon: <FileText className="h-6 w-6 text-brand-600" />,
    title: "Digital Prescriptions",
    description: "Receive and manage digital prescriptions that can be used to order medicines instantly."
  },
  {
    icon: <User className="h-6 w-6 text-brand-600" />,
    title: "Health Records",
    description: "Store and access your medical records, lab reports, and prescriptions in one secure place."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Comprehensive Healthcare Solutions
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need for managing your healthcare needs in one seamless platform
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 card-lift"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
