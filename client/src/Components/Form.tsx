import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import emailjs from "@emailjs/browser";

import peopleSVG from "../assets/person.svg";
import pinSvg from "../assets/pin.svg";
import phoneSVG from "../assets/phone.svg";
import notesSVG from "../assets/notes.svg";
import calendarSVG from "../assets/calendar.svg";
import homeSVG from "../assets/home.svg";
import listSVG from "../assets/list.svg";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

interface FormData {
  fullName: string;
  email: string;
  propertyType: string;
  dateTime: string;
  phone: string;
  projectDescription: string;
  zipCode: string;
  consent: boolean;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    propertyType: "",
    dateTime: "",
    phone: "+1",
    projectDescription: "",
    zipCode: "",
    consent: false,
  });

  const formatPhoneNumber = (value: string) => {
    let digits = value.replace(/\D/g, "");
    if (digits.startsWith("1")) digits = digits.slice(1);
    digits = digits.substring(0, 10);
    const len = digits.length;
    if (len === 0) return "+1";
    if (len < 4) return `+1 ${digits}`;
    if (len < 7) return `+1 ${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `+1 ${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const validateEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

  const validateForm = () => {
    const { fullName, email, propertyType, dateTime, phone, consent } =
      formData;
    if (!fullName || !email || !propertyType || !dateTime || !phone) {
      alert("Please fill out all required fields.");
      return false;
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!consent) {
      alert("You must consent to data processing.");
      return false;
    }
    if (phone.replace(/\D/g, "").length !== 11) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const emailData: Record<string, unknown> = { ...formData };

    emailjs
      .send(
        "service_z1kts4q",
        "template_oa1sf8d",
        emailData,
        "bVummrcEQ6XZPb5g6"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Form submitted successfully!");
          setFormData({
            fullName: "",
            email: "",
            propertyType: "",
            dateTime: "",
            phone: "+1",
            projectDescription: "",
            zipCode: "",
            consent: false,
          });
        },
        (error) => {
          console.error("FAILED...", error);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="w-full bg-[#faf9f6] flex items-center justify-center py-12 px-6">
      <motion.div
        className="w-full max-w-[70rem] font-family-serif4 text-center md:text-left"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          variants={itemVariants}
          className="text-[#313742] font-bold text-3xl md:text-5xl leading-tight mb-4 px-[1rem]"
        >
          Get In Touch To Schedule A Consultation
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-[#313742] font-normal text-lg md:text-xl mb-12 max-w-3xl px-[1rem]"
        >
          Discover how we can transform your space. Contact us today to book
          your personalized interior design consultation.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          variants={containerVariants}
          className="w-full mx-auto px-2"
        >
          <motion.div variants={itemVariants} className="my-4">
            <label
              htmlFor="fullName"
              className="text-xl md:text-2xl font-semibold mb-3 flex gap-3 items-center"
            >
              <img src={peopleSVG} alt="" className="h-8 w-8 md:h-10 md:w-10" />{" "}
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter Your Full Name"
              className="w-full bg-white text-[#313742] rounded-2xl h-[3.5rem] md:h-[4rem] p-3 shadow-[0_3px_8px_rgb(0,0,0,0.15)]"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="my-4">
            <label
              htmlFor="email"
              className="text-xl md:text-2xl font-semibold mb-3 flex gap-3 items-center"
            >
              <img src={listSVG} alt="" className="h-8 w-8 md:h-10 md:w-10" />{" "}
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="w-full bg-white text-[#313742] rounded-2xl h-[3.5rem] md:h-[4rem] p-3 shadow-[0_3px_8px_rgb(0,0,0,0.15)]"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="my-4">
            <label
              htmlFor="propertyType"
              className="text-xl md:text-2xl font-semibold mb-3 flex gap-3 items-center"
            >
              <img src={homeSVG} alt="" className="h-8 w-8 md:h-10 md:w-10" />{" "}
              Type Of Property / Renovation
            </label>
            <input
              id="propertyType"
              type="text"
              value={formData.propertyType}
              onChange={handleChange}
              placeholder="e.g. House, Apartment, Office"
              className="w-full bg-white text-[#313742] rounded-2xl h-[3.5rem] md:h-[4rem] p-3 shadow-[0_3px_8px_rgb(0,0,0,0.15)]"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="my-4">
            <label
              htmlFor="dateTime"
              className="text-xl md:text-2xl font-semibold mb-3 flex gap-3 items-center"
            >
              <img
                src={calendarSVG}
                alt=""
                className="h-8 w-8 md:h-10 md:w-10"
              />{" "}
              Preferred Date And Time
            </label>
            <input
              id="dateTime"
              type="datetime-local"
              value={formData.dateTime}
              onChange={handleChange}
              className="w-full bg-white text-[#313742] rounded-2xl h-[3.5rem] md:h-[4rem] p-3 shadow-[0_3px_8px_rgb(0,0,0,0.15)]"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="my-4">
            <label
              htmlFor="phone"
              className="text-xl md:text-2xl font-semibold mb-3 flex gap-3 items-center"
            >
              <img src={phoneSVG} alt="" className="h-8 w-8 md:h-10 md:w-10" />{" "}
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="+1 XXX-XXX-XXXX"
              className="w-full bg-white text-[#313742] rounded-2xl h-[3.5rem] md:h-[4rem] p-3 shadow-[0_3px_8px_rgb(0,0,0,0.15)]"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="my-4">
            <label
              htmlFor="projectDescription"
              className="text-xl md:text-2xl font-semibold mb-3 flex gap-3 items-center"
            >
              <img src={notesSVG} alt="" className="h-8 w-8 md:h-10 md:w-10" />{" "}
              Brief Description Of Your Project
            </label>
            <textarea
              id="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              placeholder="Tell us about your vision, style preferences, budget, timeline..."
              className="w-full bg-white text-[#313742] rounded-2xl h-[8rem] md:h-[10rem] p-3 shadow-[0_3px_8px_rgb(0,0,0,0.15)]"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="my-4">
            <label
              htmlFor="zipCode"
              className="text-xl md:text-2xl font-semibold mb-3 flex gap-3 items-center"
            >
              <img src={pinSvg} alt="" className="h-8 w-8 md:h-10 md:w-10" />{" "}
              Zip Code Location
            </label>
            <input
              id="zipCode"
              type="text"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="Enter your zip code"
              className="w-full bg-white text-[#313742] rounded-2xl h-[3.5rem] md:h-[4rem] p-3 shadow-[0_3px_8px_rgb(0,0,0,0.15)]"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 my-4"
          >
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="w-6 h-6 border-2 border-[#3F3F3F] rounded-sm"
            />
            <label
              htmlFor="consent"
              className="text-[#3F3F3F] text-lg md:text-xl"
            >
              Consent To Data Processing
            </label>
          </motion.div>

          {/* SMS Info */}
          <motion.p
            variants={itemVariants}
            className="text-[1rem] md:text-[1.125rem] text-[#979EA7] px-[0.5rem] sm:px-[2rem] py-[0.5rem] leading-relaxed"
          >
            By providing my phone number, I consent to receive SMS text messages
            from Oraczewski Interiors Inc. for appointment reminders, marketing
            messages, and general two-way communication. Please check our
            privacy policy and terms and conditions for details.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="w-full flex justify-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="text-white text-2xl font-semibold rounded-2xl py-3 px-8 bg-[#FF9800] shadow-[0_3px_8px_rgb(0,0,0,0.25)]"
            >
              Submit Request
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Form;
