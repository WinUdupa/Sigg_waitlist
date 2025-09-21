/* eslint-disable react/no-unknown-property */
'use client';

import React from "react";
import Lanyard from "../components/Lanyard";
import EnhancedForm from "../components/EnhancedForm";

const Waitlist = () => {
  return (
    <div className="waitlist-page min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 relative overflow-hidden pb-10">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-cyan-900/20"></div>
        <div className="absolute top-1/4 left-0 w-96 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent rotate-12 blur-sm"></div>
        <div className="absolute top-1/2 right-0 w-80 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -rotate-12 blur-sm"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent rotate-45 blur-sm"></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden ">
        <img
          src="/clip-team.svg"
          alt="Footer Graphic"
          className="w-full h-full pointer-events-none select-none"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Lanyard */}
          <div className="relative z-10">
            <Lanyard />
          </div>

          {/* Right Side - Enhanced Form */}
          <div className="flex justify-center lg:justify-start order-1 lg:order-2">
            <EnhancedForm />
          </div>
        </div>
      </div>

      {/* Footer SVG from public */}
      
    </div>
  );
};

export default Waitlist;
