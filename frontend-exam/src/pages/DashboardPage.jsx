// src/pages/Dashboard/DashboardPage.jsx

import React from "react";
import { useEffect, useRef, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { IconChevronRight } from "@tabler/icons-react";
// A reusable component for each article card
const ArticleCard = ({ article }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow-md mb-8 w-full max-w-6xl mx-auto">
      {/* Article Header */}
      <div className="flex items-start justify-between flex-wrap px-5 py-5">
        <div className="flex items-start space-x-4 flex-shrink-0">
          <span className="text-center text-xl font-bold text-[#b4550d] bg-[#fef3c7] w-8 h-8 rounded-full">
            {article.id}
          </span>
          <h2 className="text-xl font-semibold text-gray-800 whitespace-normal max-w-90">
            {article.headline}
          </h2>
        </div>
        <div className="flex items-center space-x-6 text-sm text-gray-500 mt-4 md:mt-0 flex-wrap justify-end">
          <div className="text-center">
            <span className="block font-medium">Engagement Score</span>
            <span className="block text-xl font-bold text-gray-800">
              {article.metrics.engagementScore}
            </span>
          </div>
          <div className="text-center">
            <span className="block font-medium">Velocity</span>
            <span className="block text-xl font-bold text-gray-800">
              {article.metrics.velocity}
            </span>
          </div>
          <div className="text-center">
            <span className="block font-medium">Comments</span>
            <span className="block text-xl font-bold text-gray-800">
              {article.metrics.comments}
            </span>
          </div>
          <div className="text-center">
            <span className="block font-medium">Shares</span>
            <span className="block text-xl font-bold text-gray-800">
              {article.metrics.shares}
            </span>
          </div>
          <div className="text-center">
            <span className="block font-medium">Articles</span>
            <span className="block text-xl font-bold text-gray-800">
              {article.metrics.articles}
            </span>
          </div>
          <div className="text-center">
            <span className="block font-medium">Est. Traffic</span>
            <span className="block text-xl font-bold text-gray-800">
              {article.metrics.estTraffic}
            </span>
          </div>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-6 gap-2 px-5">
        {article.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Article visual ${index + 1}`}
            className="w-full h-24 object-cover rounded-sm"
          />
        ))}
      </div>

      {/* Main Content (visible by default) */}
      <div className="grid grid-cols-1 md:grid-cols-4  text-sm  leading-none text-gray-700 mt-5">
        <div className="border-t border-[#f0f0ee] p-4">
          <h4 className="font-semibold text-gray-800">THE STORY</h4>
          <p className="mt-2 text-[14px] " style={{ whiteSpace: "pre-line" }}>
            {article.details.story}
          </p>
        </div>
        <div className="border-t border-l border-[#f0f0ee] p-4">
          <h4 className="font-semibold text-gray-800">WHY IT MATTERS TO YOU</h4>
          <p className="mt-2 text-[14px] text-justify" style={{ whiteSpace: "pre-line" }}>
            {article.details.whyItMatters}
          </p>
        </div>
        <div className="border-t border-l border-[#f0f0ee] p-4">
          <h4 className="font-semibold text-gray-800">
            WHO IS THIS IMPORTANT TO?
          </h4>
          <p className="mt-2 text-[14px] text-justify" style={{ whiteSpace: "pre-line" }}>
            {article.details.whoIsItImportantTo}
          </p>
        </div>
        <div className="border-t border-l border-[#f0f0ee] p-4">
          <h4 className="font-semibold text-gray-800">THE BIGGER PICTURE</h4>
          <p className="mt-2 text-[14px] text-justify" style={{ whiteSpace: "pre-line" }}>
            {article.details.theBiggerPicture}
          </p>
        </div>
      </div>

      {/* Expanded Content (conditional rendering based on state) */}
      {showDetails && (
        <div className="  pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-700">
            <div className="p-4">
              <h4 className="font-semibold text-gray-800">KEY DEVELOPMENTS</h4>
              <p className="mt-2 text-[14px] text-justify" style={{ whiteSpace: "pre-line" }}>
                {article.details.keyDevelopments}
              </p>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-800">WHAT'S NEXT</h4>
              <p className="mt-2 text-[14px] text-justify" style={{ whiteSpace: "pre-line" }}>
                {article.details.whatsNext}
              </p>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-800">REPERCUSSIONS</h4>
              <p className="mt-2 text-[14px] text-justify" style={{ whiteSpace: "pre-line" }}>
                {article.details.repercussions}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className=" text-center border-t p-2 border-gray-300">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-gray-800 font-semibold text-sm hover:underline flex items-center justify-center mx-auto"
        >
          {showDetails ? <>SHOW LESS DETAILS</> : <>SHOW MORE DETAILS</>}
        </button>
      </div>
    </div>
  );
};

// Main Dashboard Page Component
const DashboardPage = () => {
  // Mock data for two articles to match your design
  const articles = [
    {
      id: 1,
      headline:
        "Davao councilors ask Senate to petition ICC for Duterte's interim release",
      metrics: {
        engagementScore: 9,
        velocity: 9,
        comments: "12.3K",
        shares: "33.8K",
        articles: 42,
        estTraffic: 872,
      },
      images: [
        "https://tse2.mm.bing.net/th/id/OIP.zOGYiI5feDP1n_yUBkntzAHaFM?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",
        "https://media.assettype.com/sunstar%2F2024-10-29%2F6e4gmftz%2FRodrigo-Duterte-at-Senate-hearing.jpg?rect=0%2C34%2C750%2C422&w=1024&auto=format%2Ccompress&fit=max",
        "https://edgedavao.net/wp-content/uploads/2025/03/26council.jpeg",
        "https://images.gmanews.tv/regionaltv2023/content_images/article/resolution-for-site_2025_07_16_20_13_38.jpeg",
        "https://newsinfo.inquirer.net/files/2024/10/Rodrigo-Duterte-30October2024.jpg",
        "https://www.panaynews.net/wp-content/uploads/2019/12/Duterte.jpg",
      ],
      details: {
        story:
          "Legal Battle Over Jurisdiction: Duterte's defense challenges the ICC's authority, arguing the two-year window for post-withdrawal investigations expired. The ICC Appeals Chamber (3-2 vote) previously ruled the Philippines failed to demonstrate genuine domestic prosecution efforts.",
        whyItMatters:
          "1. Political and Diplomatic Implications.\n2. ICC Case Against Duterte: The ICC's arrest and prosecution of former President Rodrigo Duterte could polarize domestic politics, affecting President Marcos Jr.'s relationship with Duterte's supporters (including VP Sara Duterte) and opposition factions.\n3. Sovereignty Debate: Senate President Escudero's statement that the ICC case does not compromise Philippine sovereignty helps mitigate nationalist backlash, but the issue remains sensitive.",
        whoIsItImportantTo:
          "1. Supporters of Duterte argue that the charges are politically motivated and a form of international interference.\n2. There is strong support for Duterte, with claims that the charges are politically motivated.\n3. Critics insist that the deaths during the drug war demand justice and international accountability.",
        theBiggerPicture:
          "1. Davao City councilors passed a resolution urging the Philippine Senate to petition the ICC for former President Rodrigo Duterte's interim release, questioning the legitimacy of his continued detention.\n2. The appeal reignited national debate on whether the ICC still has jurisdiction over Duterte, with supporters emphasizing Philippine sovereignty and critics calling for justice for alleged drug war abuses.\n3. The move sparked widespread public discourse and media attention.",
        // Adding new properties for the "Show More Details" section
        keyDevelopments:
          "Legal Battle Over Jurisdiction: Duterte's defense challenges the ICC's authority, arguing the two-year window for post-withdrawal investigations expired. The ICC Appeals Chamber (3-2 vote) previously ruled the Philippines failed to demonstrate genuine domestic prosecution efforts.",
        whatsNext:
          "1. Political and Diplomatic implications.\n2. ICC Case Against Duterte: The ICC's arrest and prosecution of former President Rodrigo Duterte could polarize domestic politics, affecting President Marcos Jr.'s relationship with Duterte's supporters (including VP Sara Duterte) and opposition factions.\n3. Sovereignty Debate: Senate President Escudero's statement that the ICC case does not compromise Philippine sovereignty helps mitigate nationalist backlash, but the issue remains sensitive.",
        relevance:
          "1. Supporters of Duterte argue that the charges are politically motivated and a form of international interference.\n2. There is strong support for Duterte, with claims that the charges are politically motivated.\n3. Critics insist that the deaths during the drug war demand justice and international accountability.",
        repercussions:
          "1. Davao City councilors passed a resolution urging the Philippine Senate to petition the ICC for former President Rodrigo Duterte's interim release, questioning the legitimacy of his continued detention.\n2. The appeal reignited national debate on whether the ICC still has jurisdiction over Duterte, with supporters emphasizing Philippine sovereignty and critics calling for justice for alleged drug war abuses.\n3. The move sparked widespread public discourse and media attention.",
      },
    },
    {
      id: 2,
      headline:
        "Davao councilors ask Senate to petition ICC for Duterte's interim release",
      metrics: {
        engagementScore: 9,
        velocity: 9,
        comments: "12.3K",
        shares: "33.8K",
        articles: 42,
        estTraffic: 872,
      },
      images: [
        "https://tse2.mm.bing.net/th/id/OIP.zOGYiI5feDP1n_yUBkntzAHaFM?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",
        "https://media.assettype.com/sunstar%2F2024-10-29%2F6e4gmftz%2FRodrigo-Duterte-at-Senate-hearing.jpg?rect=0%2C34%2C750%2C422&w=1024&auto=format%2Ccompress&fit=max",
        "https://edgedavao.net/wp-content/uploads/2025/03/26council.jpeg",
        "https://images.gmanews.tv/regionaltv2023/content_images/article/resolution-for-site_2025_07_16_20_13_38.jpeg",
        "https://newsinfo.inquirer.net/files/2024/10/Rodrigo-Duterte-30October2024.jpg",
        "https://www.panaynews.net/wp-content/uploads/2019/12/Duterte.jpg",
      ],
      details: {
        story:
          "Legal battle over jurisdiction: Duterte's defense challenges the ICC's authority, arguing the two-year window for post-withdrawal investigations expired. The ICC Appeals Chamber (3-2 vote) previously ruled the Philippines failed to demonstrate genuine domestic prosecution efforts.",
        whyItMatters:
          "Political and Diplomatic implications. ICC Case Against Duterte: The ICC's arrest and prosecution of former President Rodrigo Duterte could polarize domestic politics, affecting President Marcos Jr.'s relationship with Duterte's supporters (including VP Sara Duterte) and opposition factions. Sovereignty Debate: Senate President Escudero's statement that the ICC case does not compromise Philippine sovereignty helps mitigate nationalist backlash, but the issue remains sensitive.",
        whoIsItImportantTo:
          "Supporters of Duterte argue that the charges are politically motivated and a form of international interference. There is strong support for Duterte, with claims that the charges are politically motivated. Critics insist that the deaths during the drug war demand justice and international accountability.",
        theBiggerPicture:
          "Davao City councilors passed a resolution urging the Philippine Senate to petition the ICC for former President Rodrigo Duterte's interim release, questioning the legitimacy of his continued detention. The appeal reignited national debate on whether the ICC still has jurisdiction over Duterte, with supporters emphasizing Philippine sovereignty and critics calling for justice for alleged drug war abuses. The move sparked widespread public discourse and media attention.",
        // Adding new properties for the "Show More Details" section
        keyDevelopments:
          "Legal Battle Over Jurisdiction: Duterte's defense challenges the ICC's authority, arguing the two-year window for post-withdrawal investigations expired. The ICC Appeals Chamber (3-2 vote) previously ruled the Philippines failed to demonstrate genuine domestic prosecution efforts.",
        whatsNext:
          "Political and Diplomatic implications. ICC Case Against Duterte: The ICC's arrest and prosecution of former President Rodrigo Duterte could polarize domestic politics, affecting President Marcos Jr.'s relationship with Duterte's supporters (including VP Sara Duterte) and opposition factions. Sovereignty Debate: Senate President Escudero's statement that the ICC case does not compromise Philippine sovereignty helps mitigate nationalist backlash, but the issue remains sensitive.",
        repercussions:
          "Supporters of Duterte argue that the charges are politically motivated and a form of international interference. There is strong support for Duterte, with claims that the charges are politically motivated. Critics insist that the deaths during the drug war demand justice and international accountability.",
        potentialImpact:
          "Davao City councilors passed a resolution urging the Philippine Senate to petition the ICC for former President Rodrigo Duterte's interim release, questioning the legitimacy of his continued detention. The appeal reignited national debate on whether the ICC still has jurisdiction over Duterte, with supporters emphasizing Philippine sovereignty and critics calling for justice for alleged drug war abuses. The move sparked widespread public discourse and media attention.",
      },
    },
  ];

  const [activeTab, setActiveTab] = useState("Judicial & Legal Challenges");

  const tabs = [
    "Judicial & Legal Challenges",
    "Social Security and Domestic Program Cuts",
    "Blockchain and the U.S. Securities Market",
    "National Security and Critical Infrastructure",
  ];

  const scrollRef = useRef(null);
  const [showRightFade, setShowRightFade] = useState(true);
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    // if scrolled near the end, hide gradient
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
    setShowRightFade(!atEnd);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll(); // check on mount
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  return (
    <DashboardLayout hideSidebar={false}>
      <div className="px-8 py-4">
        <h1 className="text-2xl font-bold   max-w-6xl mx-auto">
          Office of the President
        </h1>
        {/* Dashboard sections (tabs) */}
        <div className="relative flex justify-center mt-2 pb-4 px-2 max-w-6xl mx-auto">
          <div className="flex items-center w-full">
            {/* Scrollable Tabs */}
            <div
              ref={scrollRef}
              className="flex space-x-2 text-xs font-medium overflow-x-auto whitespace-nowrap custom-scrollbar-hide flex-1"
            >
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md border transition-colors duration-200
                ${
                  activeTab === tab
                    ? "bg-black text-white border-black"
                    : "bg-[#f0eee6] text-gray-800 border-[#f0eee6] hover:bg-[#f0eee6]"
                }
              `}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Fixed Gradient + Scroll Button */}
            <div className="relative flex items-center">
              {showRightFade && (
                <div className="absolute right-8 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none"></div>
              )}

              <button
                onClick={scrollRight}
                className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 focus:outline-none"
              >
                <IconChevronRight
                  className="w-5 h-5 text-gray-700"
                  stroke={2}
                />
              </button>
            </div>
          </div>
        </div>

        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
