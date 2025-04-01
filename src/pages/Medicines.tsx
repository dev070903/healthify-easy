
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample medicines data
const medicinesData = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    manufacturer: "MediCorp Pharma",
    price: 120,
    discountPrice: 99,
    discountPercentage: 18,
    prescription: false,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2830&q=80"
  },
  {
    id: 2,
    name: "Azithromycin 250mg",
    category: "Antibiotics",
    manufacturer: "HealthFirst",
    price: 280,
    discountPrice: 235,
    discountPercentage: 16,
    prescription: true,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
  },
  {
    id: 3,
    name: "Cetrizine 10mg",
    category: "Allergy",
    manufacturer: "Wellness Pharma",
    price: 95,
    discountPrice: 85,
    discountPercentage: 10,
    prescription: false,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
  },
  {
    id: 4,
    name: "Metformin 500mg",
    category: "Diabetes",
    manufacturer: "DiaCare Labs",
    price: 150,
    discountPrice: 135,
    discountPercentage: 10,
    prescription: true,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 5,
    name: "Aspirin 150mg",
    category: "Pain Relief",
    manufacturer: "MediCorp Pharma",
    price: 85,
    discountPrice: 75,
    discountPercentage: 12,
    prescription: false,
    image: "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 6,
    name: "Amlodipine 5mg",
    category: "Blood Pressure",
    manufacturer: "CardioHealth",
    price: 210,
    discountPrice: 178,
    discountPercentage: 15,
    prescription: true,
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

const categories = [
  "All Categories",
  "Pain Relief",
  "Antibiotics",
  "Allergy",
  "Diabetes",
  "Blood Pressure",
  "Vitamins & Supplements",
  "Skin Care",
  "Digestive Health",
  "Respiratory Care"
];

const Medicines = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showPrescriptionOnly, setShowPrescriptionOnly] = useState(false);

  const filteredMedicines = medicinesData.filter((medicine) => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         medicine.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || medicine.category === selectedCategory;
    const matchesPrescription = showPrescriptionOnly ? medicine.prescription : true;
    
    return matchesSearch && matchesCategory && matchesPrescription;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero section */}
        <div className="bg-brand-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Online Pharmacy & Medicine Delivery
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                Order medicines online and get them delivered to your doorstep
              </p>
              
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search medicines by name or manufacturer"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <select
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  
                  <Button className="bg-brand-600 hover:bg-brand-700">
                    Search Medicines
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Medicines listing */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                {filteredMedicines.length} Medicines Available
              </h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="prescription"
                    checked={showPrescriptionOnly}
                    onChange={() => setShowPrescriptionOnly(!showPrescriptionOnly)}
                    className="rounded border-gray-300 text-brand-600 shadow-sm focus:border-brand-300 focus:ring focus:ring-brand-200 focus:ring-opacity-50"
                  />
                  <label htmlFor="prescription" className="text-sm text-slate-700">Prescription only</label>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-500">Sort by:</span>
                  <select className="text-sm border-0 bg-transparent focus:ring-0">
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Popularity</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMedicines.map((medicine) => (
                <Card key={medicine.id} className="border-none shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden card-lift">
                  <CardContent className="p-0">
                    <div className="aspect-video overflow-hidden bg-slate-100">
                      <img 
                        src={medicine.image} 
                        alt={medicine.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900">{medicine.name}</h3>
                          <p className="text-sm text-brand-600 font-medium">{medicine.category}</p>
                        </div>
                        {medicine.prescription && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            Rx
                          </Badge>
                        )}
                      </div>
                      
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center text-sm text-slate-600">
                          <span className="font-medium text-slate-700">Manufacturer:</span>
                          <span className="ml-2">{medicine.manufacturer}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center space-x-2">
                        <span className="text-lg font-bold text-brand-700">₹{medicine.discountPrice}</span>
                        <span className="text-sm text-slate-500 line-through">₹{medicine.price}</span>
                        <span className="text-xs text-green-600 font-medium">{medicine.discountPercentage}% off</span>
                      </div>
                      
                      <Button 
                        variant="default" 
                        className="w-full mt-4 bg-brand-600 hover:bg-brand-700 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredMedicines.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-slate-600">No medicines found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Categories");
                    setShowPrescriptionOnly(false);
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Delivery Process */}
        <div className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Get your medicines delivered in 3 simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-sm">
                  <Search className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Search & Order</h3>
                <p className="text-slate-600">
                  Browse our extensive catalog and place your order online
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-brand-600">
                    <path d="M21 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8"></path>
                    <path d="M21 10V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"></path>
                    <line x1="12" y1="2" x2="12" y2="4"></line>
                    <line x1="12" y1="16" x2="12" y2="14"></line>
                    <path d="M16 4h-2a2 2 0 1 0-4 0H8"></path>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Verification</h3>
                <p className="text-slate-600">
                  Our pharmacists verify your prescription if required
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-brand-600">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-slate-600">
                  Get your medicines delivered at your doorstep within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Medicines;
