"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export function GlobalPresence() {
  const offices = [
    { city: "San Francisco", region: "North America", address: "100 Market St, Suite 400" },
    { city: "London", region: "Europe", address: "1 Canada Square, Canary Wharf" },
    { city: "Singapore", region: "Asia Pacific", address: "8 Marina View, Asia Square" },
    { city: "Dubai", region: "Middle East", address: "DIFC, Gate Village 3" }
  ];

  return (
    <section className="py-24 bg-[#042B6B] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,transparent_0%,#042B6B_100%)] opacity-80 pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#007BFF]/15 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 drop-shadow-md">Global Presence</h2>
          <p className="text-lg text-[#E8ECEF]/80 font-medium leading-relaxed">
            With headquarters in major financial hubs and a fully remote workforce spanning 150+ countries, we are everywhere you need us to be.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offices.map((office, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:bg-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-15px_rgba(0,123,255,0.2)] hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#00B388] transition-all shadow-inner border border-white/5">
                <MapPin className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-black text-[#00B388] uppercase tracking-widest mb-2">{office.region}</p>
              <h3 className="text-2xl font-bold mb-2">{office.city}</h3>
              <p className="text-sm text-[#E8ECEF]/70 font-medium leading-relaxed">{office.address}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
