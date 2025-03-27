
const testimonials = [
  {
    id: 1,
    name: "Rahul Singh",
    role: "Patient",
    content: "MediQuick has transformed how I manage my healthcare. The doctor appointment booking is seamless, and I can easily order my prescription medications. Highly recommended!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 2,
    name: "Priya Nair",
    role: "Patient",
    content: "As someone managing a chronic condition, I find the medicine subscription service extremely helpful. The home sample collection for lab tests has saved me so much time.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Patient",
    content: "The telemedicine consultation feature helped me get medical advice during the pandemic without leaving home. Their emergency service was prompt when my father needed urgent care.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-lg text-slate-600">
            Don't just take our word for it, hear what our users have to say about their experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-slate-50 rounded-xl p-6 border border-slate-100 shadow-sm relative card-lift"
            >
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 text-6xl text-brand-500 opacity-20">
                "
              </div>
              <p className="text-slate-600 mb-6 relative z-10">
                "{testimonial.content}"
              </p>
              <div className="flex items-center mt-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
