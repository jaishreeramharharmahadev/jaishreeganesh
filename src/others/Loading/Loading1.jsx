import React from "react";
import logo from "../../assets/GTTechnovationLogo.png"; // place logo in same folder
import { motion } from "framer-motion";

export default function Loading1() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <motion.img
        src={logo}
        alt="GT Technovation Logo"
        className="w-32 h-32"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
      />
    </div>
  );
}