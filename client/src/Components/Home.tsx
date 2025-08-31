import { useEffect, useState } from "react";
import Karuzela1 from "../assets/Karuzela1.png";
import Karuzela2 from "../assets/Karuzela2.png";
import Karuzela3 from "../assets/Karuzela3.png";
import Karuzela4 from "../assets/Karuzela4.png";
import Karuzela5 from "../assets/Karuzela5.png";
import Karuzela6 from "../assets/Karuzela6.png";
import Karuzela7 from "../assets/Karuzela7.png";
import HomeImage2 from "../assets/HomeImg2.jpg";
import partner from "../assets/partner.svg";
import tools from "../assets/tools.svg";
import services from "../assets/services.svg";
import idea from "../assets/idea.svg";
import aboutUs1 from "../assets/aboutUs1.png";
import aboutUs2 from "../assets/aboutUs2.png";
import aboutUs3 from "../assets/aboutUs3.png";
import aboutUs4 from "../assets/aboutUs4.png";
import { motion, AnimatePresence } from "framer-motion";

const backgrounds = [
  Karuzela1,
  Karuzela2,
  Karuzela3,
  Karuzela4,
  Karuzela5,
  Karuzela6,
  Karuzela7,
];

const Home = () => {
  const [stanKaruzeli, setstanKaruzeli] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const backgroundImg = backgrounds[stanKaruzeli - 1];

  const handleChange = (newState: number) => {
    if (newState === stanKaruzeli || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setstanKaruzeli(newState);
    }, 300);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setstanKaruzeli((prev) => {
        const next = prev === 7 ? 1 : prev + 1;
        handleChange(next);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: i * 0.3 },
    }),
  };

  return (
    <>
      <div className="relative w-full h-[calc(100vh-6rem)] overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            zIndex: -2,
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={backgroundImg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url(${backgroundImg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              zIndex: -2,
            }}
          />
        </AnimatePresence>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem] text-[#F8F9FA] mb-4 md:mb-6 font-bold font-family-Geologica tracking-wide text-shadow-lg"
          >
            TOP QUALITY IN CALIFORNIA
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-[1rem] sm:text-[1.25rem] md:text-[1.5rem] text-white mb-6 md:mb-10 font-family-serif4 text-shadow-lg"
          >
            We do construction services in all Bay Area
          </motion.p>

          <motion.button
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="duration-300 ease-in-out text-[1.25rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] text-[#D3D3D3] w-full max-w-[20rem] sm:max-w-[30rem] md:max-w-[35rem] lg:max-w-[45rem] h-[4rem] sm:h-[5rem] md:h-[6.375rem] bg-black rounded-full hover:bg-white hover:text-black hover:scale-[1.05] cursor-pointer shadow-2xl tracking-wide font-family-Georama"
          >
            START YOUR RENOVATION TODAY
          </motion.button>
        </div>
      </div>

      <div className="bg-[#F6F3E8] py-16 w-full flex items-center justify-center">
        <div className="flex flex-col items-center w-[90%] max-w-[80rem]">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-family-serif4 text-center"
          >
            Welcome to Oraczewski Interiors
          </motion.h1>

          <div className="w-32 sm:w-64 h-[2px] bg-gray-900 my-8"></div>

          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="text-base sm:text-lg lg:text-xl lg:w-1/2 text-justify tracking-wide"
            >
              Where all-inclusive design meets home quality. Oraczewski
              Interiors is a team with a passion for creating elegant,
              functional, and timeless living spaces across Bay Area. Our
              tailored design process was created for individuals who value
              professionalism, transparency, and a full-service experience.
              <br />
              <br />
              From concept to completion, we deliver interior design solutions
              that balance aesthetics and practicality. With high-end
              residential projects in major cities and intimate locations alike,
              Interiors is known for crafting spaces that reflect each client’s
              unique lifestyle and taste.
              <br />
              <br />
              Our team is committed to providing top-quality service, seamless
              execution, and meticulous project management. We take pride in
              collaborating with trusted architects to deliver cohesive
              interiors that are not only beautiful but truly livable.
            </motion.p>

            <motion.img
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              src={HomeImage2}
              alt="Oraczewski Interiors"
              className="w-full lg:w-1/2 h-auto object-cover rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#12171b] h-full w-full flex items-center justify-center font-family-serif4">
        <div className="bg-[#12171b] w-[80rem] h-auto m-[4rem_auto]">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center font-bold leading-tight px-4"
          >
            How It Works
          </motion.h1>

          <div className="w-48 sm:w-64 md:w-80 lg:w-96 h-0.5 bg-[hsl(224,22%,30%)] mx-auto mb-8"></div>

          <div className="flex gap-[4.25rem] items-center justify-center ab:items-baseline flex-col text-center ab:flex-row">
            {[
              {
                img: aboutUs1,
                icon: idea,
                title: "Let's Talk Vision",
                text: "We begin with a conversation to understand your style, needs, and the function of your space. This helps us capture your vision from the start.",
              },
              {
                img: aboutUs2,
                icon: partner,
                title: "Plan & Agreement",
                text: "We outline a clear plan, budget, and timeline — ensuring everything is transparent and aligned with your expectations.",
              },
              {
                img: aboutUs3,
                icon: services,
                title: "Design & Preparation",
                text: "From selecting materials to finalizing layouts, we prepare every detail needed to bring your concept to life.",
              },
              {
                img: aboutUs4,
                icon: tools,
                title: "Execution",
                text: "Our team manages the entire process with precision, delivering high-quality results on time.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="flex flex-col items-center gap-[1rem] w-[70vw] ab:w-[16.75rem]"
              >
                <img src={step.icon} alt="" className="w-[50px] h-[50px]" />
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-[90%] ab:w-[18.25rem] h-[20rem] ab:h-auto object-cover rounded-2xl shadow-sm"
                />
                <h2 className="text-white text-[1.5rem]">
                  <span className="font-light">{i + 1}.</span> {step.title}
                </h2>
                <div className="w-[12rem] h-[1px] bg-[hsl(224,22%,33%)]"></div>
                <p className="text-white text-[1.25rem] font-light">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
