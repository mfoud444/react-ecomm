import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Heading from "../components/common/Heading";
import Button from "../components/common/Button";
import { get } from "@/utils/request";
import Loading from "../components/common/Loading";
import StateError from "../components/common/StateError";

const WorkshopsPage = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setLoading(true);
        const response = await get({ url: "workshops", method: "GET" });
        setWorkshops(response.items || []);
      } catch (err) {
        setError("Failed to fetch workshops");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex h-[80vh] justify-center items-center">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="flex h-[80vh] justify-center items-center">
          <StateError message={error} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Heading 
          title="Art Workshops" 
          subtitle="Join Our Creative Sessions" 
          className="text-center mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop) => (
            <div key={workshop.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{workshop.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{workshop.description}</p>
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                  <span className="mr-4">📍 {workshop.location}</span>
                  <span>🕒 {new Date(workshop.startTime).toLocaleDateString()}</span>
                </div>
                <Button
                  text="Book Now"
                  bgColor="bg-primary"
                  textColor="text-white"
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WorkshopsPage;
