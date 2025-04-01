
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Clock, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample lab tests data
const labTestsData = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    category: "Blood Test",
    description: "Measures different components and features of your blood",
    price: 600,
    discountPrice: 399,
    discountPercentage: 33,
    sampleCollection: "Blood",
    fasting: "8-10 hours",
    reportTime: "Same Day",
    homeCollection: true,
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    name: "Thyroid Profile (T3, T4, TSH)",
    category: "Hormone Test",
    description: "Measures thyroid function and helps diagnose thyroid disorders",
    price: 1200,
    discountPrice: 899,
    discountPercentage: 25,
    sampleCollection: "Blood",
    fasting: "10-12 hours",
    reportTime: "Next Day",
    homeCollection: true,
    image: "https://images.unsplash.com/photo-1631815588090-d1bcbe9b4b68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
  },
  {
    id: 3,
    name: "COVID-19 RT-PCR Test",
    category: "Infectious Disease",
    description: "Detects the presence of SARS-CoV-2 virus which causes COVID-19",
    price: 800,
    discountPrice: 699,
    discountPercentage: 13,
    sampleCollection: "Nasal Swab",
    fasting: "Not Required",
    reportTime: "24-48 Hours",
    homeCollection: true,
    image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 4,
    name: "Lipid Profile",
    category: "Cardiovascular",
    description: "Measures cholesterol and triglycerides to assess heart health",
    price: 850,
    discountPrice: 599,
    discountPercentage: 30,
    sampleCollection: "Blood",
    fasting: "12 hours",
    reportTime: "Same Day",
    homeCollection: true,
    image: "https://images.unsplash.com/photo-1649859394614-dc4f7290b7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 5,
    name: "Vitamin D Test",
    category: "Vitamin & Nutrition",
    description: "Measures the level of Vitamin D in your blood",
    price: 1500,
    discountPrice: 1199,
    discountPercentage: 20,
    sampleCollection: "Blood",
    fasting: "Not Required",
    reportTime: "Next Day",
    homeCollection: true,
    image: "https://images.unsplash.com/photo-1536064479547-7ee40b74b807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 6,
    name: "HbA1c (Glycated Hemoglobin)",
    category: "Diabetes",
    description: "Measures average blood glucose levels over the past 2-3 months",
    price: 750,
    discountPrice: 599,
    discountPercentage: 20,
    sampleCollection: "Blood",
    fasting: "Not Required",
    reportTime: "Same Day",
    homeCollection: true,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

const categories = [
  "All Categories",
  "Blood Test",
  "Hormone Test",
  "Infectious Disease",
  "Cardiovascular",
  "Vitamin & Nutrition",
  "Diabetes",
  "Kidney Function",
  "Liver Function",
  "Allergy Testing"
];

const LabTests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [homeCollectionOnly, setHomeCollectionOnly] = useState(false);

  const filteredTests = labTestsData.filter((test) => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         test.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || test.category === selectedCategory;
    const matchesHomeCollection = homeCollectionOnly ? test.homeCollection : true;
    
    return matchesSearch && matchesCategory && matchesHomeCollection;
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
                Book Lab Tests & Health Checkups
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                Sample collection at your home or visit a lab near you
              </p>
              
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search lab tests by name or category"
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
                    Search Tests
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Lab Tests listing */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                {filteredTests.length} Tests Available
              </h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="homeCollection"
                    checked={homeCollectionOnly}
                    onChange={() => setHomeCollectionOnly(!homeCollectionOnly)}
                    className="rounded border-gray-300 text-brand-600 shadow-sm focus:border-brand-300 focus:ring focus:ring-brand-200 focus:ring-opacity-50"
                  />
                  <label htmlFor="homeCollection" className="text-sm text-slate-700">Home collection only</label>
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
              {filteredTests.map((test) => (
                <Card key={test.id} className="border-none shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden card-lift">
                  <CardContent className="p-0">
                    <div className="aspect-video overflow-hidden bg-slate-100">
                      <img 
                        src={test.image} 
                        alt={test.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900">{test.name}</h3>
                          <p className="text-sm text-brand-600 font-medium">{test.category}</p>
                        </div>
                        {test.homeCollection && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                            <Home className="h-3 w-3" />
                            Home
                          </Badge>
                        )}
                      </div>
                      
                      <p className="mt-2 text-sm text-slate-600">{test.description}</p>
                      
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="flex items-center text-xs text-slate-600">
                          <Clock className="h-3 w-3 mr-1 text-slate-400" />
                          <span className="font-medium">Report: </span>
                          <span className="ml-1">{test.reportTime}</span>
                        </div>
                        <div className="flex items-center text-xs text-slate-600">
                          <Calendar className="h-3 w-3 mr-1 text-slate-400" />
                          <span className="font-medium">Fasting: </span>
                          <span className="ml-1">{test.fasting}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center space-x-2">
                        <span className="text-lg font-bold text-brand-700">₹{test.discountPrice}</span>
                        <span className="text-sm text-slate-500 line-through">₹{test.price}</span>
                        <span className="text-xs text-green-600 font-medium">{test.discountPercentage}% off</span>
                      </div>
                      
                      <Button 
                        variant="default" 
                        className="w-full mt-4 bg-brand-600 hover:bg-brand-700"
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredTests.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-slate-600">No lab tests found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Categories");
                    setHomeCollectionOnly(false);
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Our Lab Services?</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                We provide accurate, timely and affordable diagnostic services
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-brand-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Home className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Home Collection</h3>
                <p className="text-slate-600">
                  Samples collected at your doorstep by trained phlebotomists
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-brand-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-brand-600">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">NABL Certified</h3>
                <p className="text-slate-600">
                  All tests conducted in NABL accredited laboratories
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-brand-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Results</h3>
                <p className="text-slate-600">
                  Get test results delivered online within 24-48 hours
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-brand-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-brand-600">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                    <path d="M12 18v-7"></path>
                    <path d="M12 7V6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Doctor Consultation</h3>
                <p className="text-slate-600">
                  Free doctor consultation to help interpret your results
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

export default LabTests;
