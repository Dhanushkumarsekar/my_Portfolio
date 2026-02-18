// import React, { useEffect, useState, useCallback } from "react";

// import { supabase } from "../supabase"; 

// import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views";
// import { useTheme } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import CardProject from "../components/CardProject";
// import TechStackIcon from "../components/TechStackIcon";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Certificate from "../components/Certificate";
// import { Code, Award, Boxes } from "lucide-react";

// // // Projects
// const addedProjects = [
//   {
//     id: 1,
//     Img: "/projects/isl.jpg",
//     Title: "Indian Sign Language Translator",
//     Description:
//       "AI-based real-time ISL translator using Deep Learning.",
//     Link: "",
//   },
//   {
//     id: 2,
//     Img: "/projects/glove.jpg",
//     Title: "Smart Sign Language Glove",
//     Description:
//       "IoT glove converting gestures into speech.",
//     Link: "",
//   },
//   {
//     id: 3,
//     Img: "/projects/turf.jpg",
//     Title: "Kovi Turf Booking App",
//     Description:
//       "Web platform for turf booking & payments.",
//     Link: "",
//   },
//   {
//     id: 4,
//     Img: "/projects/sos.jpg",
//     Title: "SOS Alert System",
//     Description:
//       "Emergency alert broadcasting system.",
//     Link: "",
//   },
// ];

// // Certificates
// const addedCertificates = [
//   { id: 1, Img: "/certificates/webdev.jpg" },
//   { id: 2, Img: "/certificates/cyber.jpg" },
//   { id: 3, Img: "/certificates/python.jpg" },
//   { id: 4, Img: "/certificates/employee.jpg" },
// ];



// const ToggleButton = ({ onClick, isShowingMore }) => (
//   <button
//     onClick={onClick}
//     className="
//       px-3 py-1.5
//       text-slate-300 
//       hover:text-white 
//       text-sm 
//       font-medium 
//       transition-all 
//       duration-300 
//       ease-in-out
//       flex 
//       items-center 
//       gap-2
//       bg-white/5 
//       hover:bg-white/10
//       rounded-md
//       border 
//       border-white/10
//       hover:border-white/20
//       backdrop-blur-sm
//       group
//       relative
//       overflow-hidden
//     "
//   >
//     <span className="relative z-10 flex items-center gap-2">
//       {isShowingMore ? "See Less" : "See More"}
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="16"
//         height="16"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className={`
//           transition-transform 
//           duration-300 
//           ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
//         `}
//       >
//         <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
//       </svg>
//     </span>
//     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
//   </button>
// );


// function TabPanel({ children, value, index, ...other }) {
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`full-width-tabpanel-${index}`}
//       aria-labelledby={`full-width-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: { xs: 1, sm: 3 } }}>
//           <Typography component="div">{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `full-width-tab-${index}`,
//     "aria-controls": `full-width-tabpanel-${index}`,
//   };
// }




// // techStacks tetap sama
// const techStacks = [
//   { icon: "html.svg", language: "HTML" },
//   { icon: "css.svg", language: "CSS" },
//   { icon: "javascript.svg", language: "JavaScript" },
//   { icon: "tailwind.svg", language: "Tailwind CSS" },
//   { icon: "reactjs.svg", language: "ReactJS" },
//   { icon: "vite.svg", language: "Vite" },
//   { icon: "nodejs.svg", language: "Node JS" },
//   { icon: "bootstrap.svg", language: "Bootstrap" },
//   { icon: "firebase.svg", language: "Firebase" },
//   { icon: "MUI.svg", language: "Material UI" },
//   { icon: "vercel.svg", language: "Vercel" },
//   { icon: "SweetAlert.svg", language: "SweetAlert2" },
// ];

// export default function FullWidthTabs() {
//   const theme = useTheme();
//   const [value, setValue] = useState(0);
//   const [projects, setProjects] = useState([]);
//   const [certificates, setCertificates] = useState([]);
//   const [showAllProjects, setShowAllProjects] = useState(false);
//   const [showAllCertificates, setShowAllCertificates] = useState(false);
//   const isMobile = window.innerWidth < 768;
//   const initialItems = isMobile ? 4 : 6;

//   useEffect(() => {
//     AOS.init({
//       once: false,
//     });
//   }, []);


//   const fetchData = useCallback(async () => {
//     try {
//       // Mengambil data dari Supabase secara paralel
//       const [projectsResponse, certificatesResponse] = await Promise.all([
//         supabase.from("projects").select("*").order('id', { ascending: true }),
//         supabase.from("certificates").select("*").order('id', { ascending: true }), 
//       ]);

//       // Error handling untuk setiap request
//       if (projectsResponse.error) throw projectsResponse.error;
//       if (certificatesResponse.error) throw certificatesResponse.error;

//       // Supabase mengembalikan data dalam properti 'data'
//       const projectData = projectsResponse.data || [];
//       const certificateData = certificatesResponse.data || [];

//       setProjects(projectData);
//       setCertificates(certificateData);

//       // Store in localStorage (fungsionalitas ini tetap dipertahankan)
//       localStorage.setItem("projects", JSON.stringify(projectData));
//       localStorage.setItem("certificates", JSON.stringify(certificateData));
//     } catch (error) {
//       console.error("Error fetching data from Supabase:", error.message);
//     }
//   }, []);



//   useEffect(() => {
//     // Coba ambil dari localStorage dulu untuk laod lebih cepat
//     const cachedProjects = localStorage.getItem('projects');
//     const cachedCertificates = localStorage.getItem('certificates');

//     if (cachedProjects && cachedCertificates) {
//         setProjects(JSON.parse(cachedProjects));
//         setCertificates(JSON.parse(cachedCertificates));
//     }
    
//     fetchData(); // Tetap panggil fetchData untuk sinkronisasi data terbaru
//   }, [fetchData]);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const toggleShowMore = useCallback((type) => {
//     if (type === 'projects') {
//       setShowAllProjects(prev => !prev);
//     } else {
//       setShowAllCertificates(prev => !prev);
//     }
//   }, []);

//   const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
//   const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

//   // Sisa dari komponen (return statement) tidak ada perubahan
//   return (
//     <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
//       {/* Header section - unchanged */}
//       <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
//         <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
//           <span style={{
//             color: '#6366f1',
//             backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
//             WebkitBackgroundClip: 'text',
//             backgroundClip: 'text',
//             WebkitTextFillColor: 'transparent'
//           }}>
//             Portfolio Showcase
//           </span>
//         </h2>
//         <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
//           Explore my journey through projects, certifications, and technical expertise. 
//           Each section represents a milestone in my continuous learning path.
//         </p>
//       </div>

//       <Box sx={{ width: "100%" }}>
//         {/* AppBar and Tabs section - unchanged */}
//         <AppBar
//           position="static"
//           elevation={0}
//           sx={{
//             bgcolor: "transparent",
//             border: "1px solid rgba(255, 255, 255, 0.1)",
//             borderRadius: "20px",
//             position: "relative",
//             overflow: "hidden",
//             "&::before": {
//               content: '""',
//               position: "absolute",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
//               backdropFilter: "blur(10px)",
//               zIndex: 0,
//             },
//           }}
//           className="md:px-4"
//         >
//           {/* Tabs remain unchanged */}
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             textColor="secondary"
//             indicatorColor="secondary"
//             variant="fullWidth"
//             sx={{
//               minHeight: "70px",
//               "& .MuiTab-root": {
//                 fontSize: { xs: "0.9rem", md: "1rem" },
//                 fontWeight: "600",
//                 color: "#94a3b8",
//                 textTransform: "none",
//                 transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//                 padding: "20px 0",
//                 zIndex: 1,
//                 margin: "8px",
//                 borderRadius: "12px",
//                 "&:hover": {
//                   color: "#ffffff",
//                   backgroundColor: "rgba(139, 92, 246, 0.1)",
//                   transform: "translateY(-2px)",
//                   "& .lucide": {
//                     transform: "scale(1.1) rotate(5deg)",
//                   },
//                 },
//                 "&.Mui-selected": {
//                   color: "#fff",
//                   background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
//                   boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
//                   "& .lucide": {
//                     color: "#a78bfa",
//                   },
//                 },
//               },
//               "& .MuiTabs-indicator": {
//                 height: 0,
//               },
//               "& .MuiTabs-flexContainer": {
//                 gap: "8px",
//               },
//             }}
//           >
//             <Tab
//               icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
//               label="Projects"
//               {...a11yProps(0)}
//             />
//             <Tab
//               icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
//               label="Certificates"
//               {...a11yProps(1)}
//             />
//             <Tab
//               icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
//               label="Tech Stack"
//               {...a11yProps(2)}
//             />
//           </Tabs>
//         </AppBar>

//         <SwipeableViews
//           axis={theme.direction === "rtl" ? "x-reverse" : "x"}
//           index={value}
//           onChangeIndex={setValue}
//         >
//           <TabPanel value={value} index={0} dir={theme.direction}>
//             <div className="container mx-auto flex justify-center items-center overflow-hidden">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
//                 {displayedProjects.map((project, index) => (
//                   <div
//                     key={project.id || index}
//                     data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
//                     data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
//                   >
//                     <CardProject
//                       Img={project.Img}
//                       Title={project.Title}
//                       Description={project.Description}
//                       Link={project.Link}
//                       id={project.id}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {projects.length > initialItems && (
//               <div className="mt-6 w-full flex justify-start">
//                 <ToggleButton
//                   onClick={() => toggleShowMore('projects')}
//                   isShowingMore={showAllProjects}
//                 />
//               </div>
//             )}
//           </TabPanel>


//           <TabPanel value={value} index={1} dir={theme.direction}>
//             <div className="container mx-auto flex justify-center items-center overflow-hidden">
//               <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
//                 {displayedCertificates.map((certificate, index) => (
//                   <div
//                     key={certificate.id || index}
//                     data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
//                     data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
//                   >
//                     <Certificate ImgSertif={certificate.Img} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {certificates.length > initialItems && (
//               <div className="mt-6 w-full flex justify-start">
//                 <ToggleButton
//                   onClick={() => toggleShowMore('certificates')}
//                   isShowingMore={showAllCertificates}
//                 />
//               </div>
//             )}
//           </TabPanel>

//           <TabPanel value={value} index={2} dir={theme.direction}>
//             <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
//                 {techStacks.map((stack, index) => (
//                   <div
//                     key={index}
//                     data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
//                     data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
//                   >
//                     <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </TabPanel>
//         </SwipeableViews>
//       </Box>
//     </div>
//   );
// }

import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabase";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";


// ===================== LOCAL PROJECTS =====================

const addedProjects = [
  {
    id: 1,
    Img: "src/projects/glove1.png",
    Title: "Indian Sign Language Translator",
    Description:
      "AI-based real-time ISL translator using Deep Learning.",
    Link: "",
  },
  {
    id: 2,
    Img: "src/projects/glove.png",
    Title: "Smart Sign Language Glove",
    Description:
      "IoT glove converting gestures into speech.",
    Link: "",
  },
  {
    id: 3,
    Img: "src/projects/gapp.png",
    Title: "GloveCom App",
    Description:
      "Web platform for turf booking & payments.",
    Link: "",
  },
  {
    id: 4,
    Img: "src/projects/gapp1.png",
    Title: "SOS Alert System",
    Description:
      "Emergency alert broadcasting system.",
    Link: "",
  },
];


// ===================== LOCAL CERTIFICATES =====================

const addedCertificates = [
  { id: 1, Img: "src/assets/C1.jpeg" },
  { id: 2, Img: "src/assets/C2.png" },
  { id: 3, Img: "src/assets/C3.png" },
  { id: 4, Img: "src/assets/C4.png" },
  { id: 5, Img: "src/assets/C5.png" },
  { id: 6, Img: "src/assets/C6.png" },
  { id: 7, Img: "src/assets/C7.png" },
  { id: 8, Img: "src/assets/C8.png" },
  { id: 9, Img: "src/assets/C9.png" },
  { id: 10, Img: "src/assets/C10.png" },
  { id: 11, Img: "src/assets/C11.png" },
  { id: 12, Img: "src/assets/C12.png" },
  { id: 13, Img: "src/assets/C13.png" },
  { id: 14, Img: "src/assets/C14.png" },
  { id: 15, Img: "src/assets/C15.png" },
  { id: 16, Img: "src/assets/C16.png" },
  { id: 17, Img: "src/assets/C17.png" },
  { id: 18, Img: "src/assets/C18.png" },
  { id: 19, Img: "src/assets/C19.png" },
  { id: 20, Img: "src/assets/C20.png" },
  { id: 21, Img: "src/assets/C21.png" },
  { id: 22, Img: "src/assets/C22.png" },
  { id: 23, Img: "src/assets/C23.png" },
  { id: 24, Img: "src/assets/C24.png" },
  { id: 25, Img: "src/assets/C11.png" },
  

];


// ===================== TOGGLE BUTTON =====================

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10"
  >
    {isShowingMore ? "See Less" : "See More"}
  </button>
);


// ===================== TAB PANEL =====================

function TabPanel({ children, value, index, ...other }) {
  return (
    <div hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


// ===================== TECH STACK =====================

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];


// ===================== MAIN COMPONENT =====================

export default function FullWidthTabs() {
  const theme = useTheme();

  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({ once: false });
  }, []);


  // ===================== FETCH DATA =====================

  const fetchData = useCallback(async () => {
    try {
      const [projectsResponse, certificatesResponse] = await Promise.all([
        supabase.from("projects").select("*").order("id", { ascending: true }),
        supabase.from("certificates").select("*").order("id", { ascending: true }),
      ]);

      const projectData =
        projectsResponse.data && projectsResponse.data.length > 0
          ? projectsResponse.data
          : addedProjects;

      const certificateData =
        certificatesResponse.data && certificatesResponse.data.length > 0
          ? certificatesResponse.data
          : addedCertificates;

      setProjects(projectData);
      setCertificates(certificateData);

    } catch (error) {
      console.warn("Supabase failed → Using local data");

      setProjects(addedProjects);
      setCertificates(addedCertificates);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  // ===================== DISPLAY =====================

  const displayedProjects = showAllProjects
    ? projects
    : projects.slice(0, initialItems);

  const displayedCertificates = showAllCertificates
    ? certificates
    : certificates.slice(0, initialItems);


  // ===================== UI =====================

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">

      <Box sx={{ width: "100%" }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: "transparent" }}>
          <Tabs value={value} onChange={(e, v) => setValue(v)} variant="fullWidth">
            <Tab icon={<Code />} label="Projects" />
            <Tab icon={<Award />} label="Certificates" />
            <Tab icon={<Boxes />} label="Tech Stack" />
          </Tabs>
        </AppBar>

        <SwipeableViews index={value} onChangeIndex={setValue}>

{/* ================= PROJECTS ================= */}

          <TabPanel value={value} index={0}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
              {displayedProjects.map((project, index) => (
                <CardProject
                  key={project.id || index}
                  Img={project.Img}
                  Title={project.Title}
                  Description={project.Description}
                  Link={project.Link}
                  id={project.id}
                />
              ))}
            </div>

            {projects.length > initialItems && (
              <div className="mt-6">
                <ToggleButton
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>


{/* ================= CERTIFICATES ================= */}

          <TabPanel value={value} index={1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {displayedCertificates.map((cert, index) => (
                <Certificate key={cert.id || index} ImgSertif={cert.Img} />
              ))}
            </div>

            {certificates.length > initialItems && (
              <div className="mt-6">
                <ToggleButton
                  onClick={() =>
                    setShowAllCertificates(!showAllCertificates)
                  }
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>


{/* ================= TECH STACK ================= */}

          <TabPanel value={value} index={2}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {techStacks.map((stack, index) => (
                <TechStackIcon
                  key={index}
                  TechStackIcon={stack.icon}
                  Language={stack.language}
                />
              ))}
            </div>
          </TabPanel>

        </SwipeableViews>
      </Box>
    </div>
  );
}





// import React, { useEffect, useState, useCallback } from "react";
// import { supabase } from "../supabase";

// import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views";
// import { useTheme } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import CardProject from "../components/CardProject";
// import TechStackIcon from "../components/TechStackIcon";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Certificate from "../components/Certificate";
// import { Code, Award, Boxes } from "lucide-react";


// // ===================== DATA ADDED ONLY =====================

// // Projects
// const addedProjects = [
//   {
//     id: 1,
//     Img: "/projects/isl.jpg",
//     Title: "Indian Sign Language Translator",
//     Description:
//       "AI-based real-time ISL translator using Deep Learning.",
//     Link: "",
//   },
//   {
//     id: 2,
//     Img: "/projects/glove.jpg",
//     Title: "Smart Sign Language Glove",
//     Description:
//       "IoT glove converting gestures into speech.",
//     Link: "",
//   },
//   {
//     id: 3,
//     Img: "/projects/turf.jpg",
//     Title: "Kovi Turf Booking App",
//     Description:
//       "Web platform for turf booking & payments.",
//     Link: "",
//   },
//   {
//     id: 4,
//     Img: "/projects/sos.jpg",
//     Title: "SOS Alert System",
//     Description:
//       "Emergency alert broadcasting system.",
//     Link: "",
//   },
// ];

// // Certificates
// const addedCertificates = [
//   { id: 1, Img: "/certificates/webdev.jpg" },
//   { id: 2, Img: "/certificates/cyber.jpg" },
//   { id: 3, Img: "/certificates/python.jpg" },
//   { id: 4, Img: "/certificates/employee.jpg" },
// ];


// // ===================== UI CODE UNCHANGED =====================

// function TabPanel({ children, value, index, ...other }) {
//   return (
//     <div hidden={value !== index} {...other}>
//       {value === index && (
//         <Box sx={{ p: { xs: 1, sm: 3 } }}>
//           <Typography component="div">{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// export default function FullWidthTabs() {
//   const theme = useTheme();
//   const [value, setValue] = useState(0);
//   const [projects, setProjects] = useState([]);
//   const [certificates, setCertificates] = useState([]);

//   const isMobile = window.innerWidth < 768;
//   const initialItems = isMobile ? 4 : 6;

//   useEffect(() => {
//     AOS.init({ once: false });
//   }, []);


// // ===================== FETCH (UNCHANGED) =====================

//   const fetchData = useCallback(async () => {
//     try {
//       const [projectsResponse, certificatesResponse] = await Promise.all([
//         supabase.from("projects").select("*"),
//         supabase.from("certificates").select("*"),
//       ]);

//       setProjects(
//         projectsResponse.data?.length
//           ? projectsResponse.data
//           : addedProjects
//       );

//       setCertificates(
//         certificatesResponse.data?.length
//           ? certificatesResponse.data
//           : addedCertificates
//       );
//     } catch (error) {
//       // fallback if supabase disabled
//       setProjects(addedProjects);
//       setCertificates(addedCertificates);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);


// // ===================== DISPLAY =====================

//   const displayedProjects = projects.slice(0, initialItems);
//   const displayedCertificates = certificates.slice(0, initialItems);

//   return (
//     <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">

//       <Box sx={{ width: "100%" }}>
//         <AppBar position="static" elevation={0} sx={{ bgcolor: "transparent" }}>
//           <Tabs
//             value={value}
//             onChange={(e, v) => setValue(v)}
//             variant="fullWidth"
//           >
//             <Tab icon={<Code />} label="Projects" />
//             <Tab icon={<Award />} label="Certificates" />
//             <Tab icon={<Boxes />} label="Tech Stack" />
//           </Tabs>
//         </AppBar>

//         <SwipeableViews
//           axis={theme.direction === "rtl" ? "x-reverse" : "x"}
//           index={value}
//           onChangeIndex={setValue}
//         >

// {/* ================= PROJECTS ================= */}

//           <TabPanel value={value} index={0}>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {displayedProjects.map((project, index) => (
//                 <CardProject
//                   key={project.id || index}
//                   Img={project.Img}
//                   Title={project.Title}
//                   Description={project.Description}
//                   Link={project.Link}
//                   id={project.id}
//                 />
//               ))}
//             </div>
//           </TabPanel>

// {/* ================= CERTIFICATES ================= */}

//           <TabPanel value={value} index={1}>
//             <div className="grid md:grid-cols-3 gap-6">
//               {displayedCertificates.map((cert, index) => (
//                 <Certificate
//                   key={cert.id || index}
//                   ImgSertif={cert.Img}
//                 />
//               ))}
//             </div>
//           </TabPanel>

// {/* ================= TECH STACK ================= */}

//           <TabPanel value={value} index={2}>
//             <div className="text-white text-center">
//               Tech Stack Section
//             </div>
//           </TabPanel>

//         </SwipeableViews>
//       </Box>
//     </div>
//   );
// }






// import React, { useEffect, useState, useCallback } from "react";
// import { supabase } from "../supabase";

// import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views";
// import { useTheme } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import CardProject from "../components/CardProject";
// import TechStackIcon from "../components/TechStackIcon";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Certificate from "../components/Certificate";
// import { Code, Award, Boxes } from "lucide-react";


// // ===================== ADDED DATA ONLY =====================

// const addedProjects = [
//   {
//     id: 1,
//     Img: "/projects/isl.jpg",
//     Title: "Indian Sign Language Translator",
//     Description:
//       "AI-based real-time ISL translator using Deep Learning.",
//     Link: "",
//   },
//   {
//     id: 2,
//     Img: "/projects/glove.jpg",
//     Title: "Smart Sign Language Glove",
//     Description:
//       "IoT glove converting gestures into speech.",
//     Link: "",
//   },
//   {
//     id: 3,
//     Img: "/projects/turf.jpg",
//     Title: "Kovi Turf Booking App",
//     Description:
//       "Web platform for turf booking & payments.",
//     Link: "",
//   },
//   {
//     id: 4,
//     Img: "/projects/sos.jpg",
//     Title: "SOS Alert System",
//     Description:
//       "Emergency alert broadcasting system.",
//     Link: "",
//   },
// ];

// const addedCertificates = [
//   { id: 1, Img: "/certificates/webdev.jpg" },
//   { id: 2, Img: "/certificates/cyber.jpg" },
//   { id: 3, Img: "/certificates/python.jpg" },
//   { id: 4, Img: "/certificates/employee.jpg" },
// ];


// // ===================== TOGGLE BUTTON =====================

// const ToggleButton = ({ onClick, isShowingMore }) => (
//   <button onClick={onClick} className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10">
//     {isShowingMore ? "See Less" : "See More"}
//   </button>
// );


// // ===================== TAB PANEL =====================

// function TabPanel({ children, value, index, ...other }) {
//   return (
//     <div hidden={value !== index} {...other}>
//       {value === index && (
//         <Box sx={{ p: { xs: 1, sm: 3 } }}>
//           <Typography component="div">{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };


// // ===================== TECH STACK =====================

// const techStacks = [
//   { icon: "html.svg", language: "HTML" },
//   { icon: "css.svg", language: "CSS" },
//   { icon: "javascript.svg", language: "JavaScript" },
//   { icon: "tailwind.svg", language: "Tailwind CSS" },
//   { icon: "reactjs.svg", language: "ReactJS" },
//   { icon: "vite.svg", language: "Vite" },
//   { icon: "nodejs.svg", language: "Node JS" },
//   { icon: "bootstrap.svg", language: "Bootstrap" },
//   { icon: "firebase.svg", language: "Firebase" },
//   { icon: "MUI.svg", language: "Material UI" },
//   { icon: "vercel.svg", language: "Vercel" },
//   { icon: "SweetAlert.svg", language: "SweetAlert2" },
// ];


// // ===================== MAIN COMPONENT =====================

// export default function FullWidthTabs() {
//   const theme = useTheme();

//   const [value, setValue] = useState(0);
//   const [projects, setProjects] = useState([]);
//   const [certificates, setCertificates] = useState([]);
//   const [showAllProjects, setShowAllProjects] = useState(false);
//   const [showAllCertificates, setShowAllCertificates] = useState(false);

//   const isMobile = window.innerWidth < 768;
//   const initialItems = isMobile ? 4 : 6;

//   useEffect(() => {
//     AOS.init({ once: false });
//   }, []);


//   // ===================== FETCH DATA =====================

//   const fetchData = useCallback(async () => {
//     try {
//       const [projectsResponse, certificatesResponse] = await Promise.all([
//         supabase.from("projects").select("*").order("id"),
//         supabase.from("certificates").select("*").order("id"),
//       ]);

//       setProjects(
//         projectsResponse.data?.length
//           ? projectsResponse.data
//           : addedProjects
//       );

//       setCertificates(
//         certificatesResponse.data?.length
//           ? certificatesResponse.data
//           : addedCertificates
//       );
//     } catch (error) {
//       setProjects(addedProjects);
//       setCertificates(addedCertificates);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);


//   // ===================== DISPLAY DATA =====================

//   const displayedProjects = showAllProjects
//     ? projects
//     : projects.slice(0, initialItems);

//   const displayedCertificates = showAllCertificates
//     ? certificates
//     : certificates.slice(0, initialItems);


//   // ===================== UI (UNCHANGED) =====================

//   return (
//     <div className="md:px-[10%] px-[5%] w-full bg-[#030014]" id="Portofolio">

//       <Box sx={{ width: "100%" }}>
//         <AppBar position="static" elevation={0} sx={{ bgcolor: "transparent" }}>
//           <Tabs value={value} onChange={(e, v) => setValue(v)} variant="fullWidth">
//             <Tab icon={<Code />} label="Projects" />
//             <Tab icon={<Award />} label="Certificates" />
//             <Tab icon={<Boxes />} label="Tech Stack" />
//           </Tabs>
//         </AppBar>

//         <SwipeableViews
//           axis={theme.direction === "rtl" ? "x-reverse" : "x"}
//           index={value}
//           onChangeIndex={setValue}
//         >

// {/* ================= PROJECTS ================= */}

//           <TabPanel value={value} index={0}>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {displayedProjects.map((project, index) => (
//                 <CardProject
//                   key={project.id || index}
//                   Img={project.Img}
//                   Title={project.Title}
//                   Description={project.Description}
//                   Link={project.Link}
//                   id={project.id}
//                 />
//               ))}
//             </div>

//             {projects.length > initialItems && (
//               <div className="mt-6">
//                 <ToggleButton
//                   onClick={() =>
//                     setShowAllProjects((prev) => !prev)
//                   }
//                   isShowingMore={showAllProjects}
//                 />
//               </div>
//             )}
//           </TabPanel>


// {/* ================= CERTIFICATES ================= */}

//           <TabPanel value={value} index={1}>
//             <div className="grid md:grid-cols-3 gap-6">
//               {displayedCertificates.map((cert, index) => (
//                 <Certificate
//                   key={cert.id || index}
//                   ImgSertif={cert.Img}
//                 />
//               ))}
//             </div>

//             {certificates.length > initialItems && (
//               <div className="mt-6">
//                 <ToggleButton
//                   onClick={() =>
//                     setShowAllCertificates((prev) => !prev)
//                   }
//                   isShowingMore={showAllCertificates}
//                 />
//               </div>
//             )}
//           </TabPanel>


// {/* ================= TECH STACK ================= */}

//           <TabPanel value={value} index={2}>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
//               {techStacks.map((stack, index) => (
//                 <TechStackIcon
//                   key={index}
//                   TechStackIcon={stack.icon}
//                   Language={stack.language}
//                 />
//               ))}
//             </div>
//           </TabPanel>

//         </SwipeableViews>
//       </Box>
//     </div>
//   );
// }






// import React, { useEffect, useState, useCallback } from "react";
// import { supabase } from "../supabase";

// import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views";
// import { useTheme } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import CardProject from "../components/CardProject";
// import TechStackIcon from "../components/TechStackIcon";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Certificate from "../components/Certificate";
// import { Code, Award, Boxes } from "lucide-react";


// // ===================== PROJECTS DATA =====================

// const addedProjects = [
//   {
//     id: 1,
//     Img: "/projects/isl.jpg",
//     Title: "Indian Sign Language Translator",
//     Description:
//       "AI-based real-time ISL translator using Deep Learning.",
//     Link: "",
//   },
//   {
//     id: 2,
//     Img: "/projects/glove.jpg",
//     Title: "Smart Sign Language Glove",
//     Description:
//       "IoT glove converting gestures into speech.",
//     Link: "",
//   },
//   {
//     id: 3,
//     Img: "/projects/turf.jpg",
//     Title: "Kovi Turf Booking App",
//     Description:
//       "Web platform for turf booking & payments.",
//     Link: "",
//   },
//   {
//     id: 4,
//     Img: "/projects/sos.jpg",
//     Title: "SOS Alert System",
//     Description:
//       "Emergency alert broadcasting system.",
//     Link: "",
//   },
// ];


// // ===================== CERTIFICATES DATA =====================

// const addedCertificates = [
//   { id: 1, Img: "/certificates/webdev.jpg" },
//   { id: 2, Img: "/certificates/cyber.jpg" },
//   { id: 3, Img: "/certificates/python.jpg" },
//   { id: 4, Img: "/certificates/employee.jpg" },
// ];


// // ===================== TOGGLE =====================

// const ToggleButton = ({ onClick, isShowingMore }) => (
//   <button onClick={onClick} className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium flex gap-2 bg-white/5 rounded-md border border-white/10">
//     {isShowingMore ? "See Less" : "See More"}
//   </button>
// );


// // ===================== TAB PANEL =====================

// function TabPanel({ children, value, index }) {
//   return (
//     <div hidden={value !== index}>
//       {value === index && (
//         <Box sx={{ p: { xs: 1, sm: 3 } }}>
//           <Typography component="div">{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }


// // ===================== TECH STACK =====================

// const techStacks = [
//   { icon: "html.svg", language: "HTML" },
//   { icon: "css.svg", language: "CSS" },
//   { icon: "javascript.svg", language: "JavaScript" },
//   { icon: "reactjs.svg", language: "ReactJS" },
// ];


// // ===================== MAIN =====================

// export default function FullWidthTabs() {
//   const theme = useTheme();

//   const [value, setValue] = useState(0);
//   const [projects, setProjects] = useState([]);
//   const [certificates, setCertificates] = useState([]);
//   const [showAllProjects, setShowAllProjects] = useState(false);
//   const [showAllCertificates, setShowAllCertificates] = useState(false);

//   const isMobile = window.innerWidth < 768;
//   const initialItems = isMobile ? 4 : 6;

//   useEffect(() => {
//     AOS.init({ once: false });
//   }, []);


//   // ===================== FIXED FETCH =====================

//   const fetchData = useCallback(async () => {
//     try {
//       const [projectsResponse, certificatesResponse] = await Promise.all([
//         supabase.from("projects").select("*"),
//         supabase.from("certificates").select("*"),
//       ]);

//       const projectData =
//         projectsResponse.data?.length > 0
//           ? projectsResponse.data
//           : addedProjects;

//       const certificateData =
//         certificatesResponse.data?.length > 0
//           ? certificatesResponse.data
//           : addedCertificates;

//       setProjects(projectData);
//       setCertificates(certificateData);

//     } catch (error) {
//       console.warn("Supabase failed → Using local data");

//       setProjects(addedProjects);
//       setCertificates(addedCertificates);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);


//   // ===================== DISPLAY =====================

//   const displayedProjects = showAllProjects
//     ? projects
//     : projects.slice(0, initialItems);

//   const displayedCertificates = showAllCertificates
//     ? certificates
//     : certificates.slice(0, initialItems);


//   // ===================== UI (UNCHANGED) =====================

//   return (
//     <div className="md:px-[10%] px-[5%] w-full bg-[#030014]" id="Portofolio">

//       <Box sx={{ width: "100%" }}>
//         <AppBar position="static" sx={{ bgcolor: "transparent" }}>
//           <Tabs value={value} onChange={(e, v) => setValue(v)} variant="fullWidth">
//             <Tab icon={<Code />} label="Projects" />
//             <Tab icon={<Award />} label="Certificates" />
//             <Tab icon={<Boxes />} label="Tech Stack" />
//           </Tabs>
//         </AppBar>

//         <SwipeableViews index={value} onChangeIndex={setValue}>

// {/* PROJECTS */}

//           <TabPanel value={value} index={0}>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {displayedProjects.map((project, index) => (
//                 <CardProject
//                   key={project.id || index}
//                   Img={project.Img}
//                   Title={project.Title}
//                   Description={project.Description}
//                   Link={project.Link}
//                   id={project.id}
//                 />
//               ))}
//             </div>
//           </TabPanel>


// {/* CERTIFICATES */}

//           <TabPanel value={value} index={1}>
//             <div className="grid md:grid-cols-3 gap-6">
//               {displayedCertificates.map((cert, index) => (
//                 <Certificate key={cert.id || index} ImgSertif={cert.Img} />
//               ))}
//             </div>
//           </TabPanel>


// {/* TECH STACK */}

//           <TabPanel value={value} index={2}>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//               {techStacks.map((stack, index) => (
//                 <TechStackIcon
//                   key={index}
//                   TechStackIcon={stack.icon}
//                   Language={stack.language}
//                 />
//               ))}
//             </div>
//           </TabPanel>

//         </SwipeableViews>
//       </Box>
//     </div>
//   );
// }





