
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="py-20 bg-brand-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
            Take control of your healthcare journey today
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who have simplified their healthcare experience with MediQuick. Your health journey is just a click away.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/appointment">
              <Button size="lg" className="bg-brand-600 hover:bg-brand-700">
                Book Appointment
              </Button>
            </Link>
            <Link to="/doctors">
              <Button size="lg" variant="outline" className="border-brand-200 text-brand-600 hover:bg-brand-50">
                Find a Doctor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
