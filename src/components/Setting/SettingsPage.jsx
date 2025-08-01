"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";

// Updated contentData - removed 'faqs' and 'about-us'
const contentData = {
  "privacy-security": {
    title: "Privacy Policy",
    date: "Dec 4, 2019 21:42",
    text: `<h1>Privacy Policy</h1><p>1. Information We Collect</p>`,
  },
  "terms-conditions": {
    title: "Terms & Conditions",
    date: "Dec 4, 2019 21:42",
    text: `<h1>Terms & Conditions</h1><p>1. Acceptance of Terms</p><p>By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p><p>2. Intellectual Property</p><p>The Service and its original content, features and functionality are and will remain the exclusive property of [Your Company Name] and its licensors.</p><p>3. Links To Other Web Sites</p><p>Our Service may contain links to third-party web sites or services that are not owned or controlled by [Your Company Name].</p><p>[Your Company Name] has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that [Your Company Name] shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</p><p>4. Termination</p><p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p><p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p><p>5. Disclaimer</p><p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.</p><p>6. Governing Law</p><p>These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.</p><p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.</p><p>7. Changes</p><p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p><p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.</p>`,
  },
};

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const SettingsPage = ({ onBackClick }) => {
  const editor = useRef(null);
  // Set initial active tab to 'privacy-security' since 'about-us' is removed
  const [activeTab, setActiveTab] = useState("privacy-security");
  const [editableContent, setEditableContent] = useState("");
  const [tabContents, setTabContents] = useState(contentData);

  useEffect(() => {
    // Ensure the activeTab content is loaded
    if (tabContents[activeTab]) {
      setEditableContent(tabContents[activeTab].text);
    }
  }, [activeTab, tabContents]);

  const joditConfig = useMemo(
    () => ({
      readonly: false,
      spellcheck: false,
      buttons:
        "undo,redo,|,bold,italic,underline,strikethrough,|,ul,ol,|,link,cut,copy,paste,|,align,|,source",
      theme: "dark", // Changed Jodit theme to 'dark'
      toolbarButtonSize: "large",
      // Custom CSS for Jodit content area to ensure black background and white text
      // This is often handled by Jodit's 'dark' theme, but added for explicit control
      style: {
        backgroundColor: "#000000", // Black background
        color: "#FFFFFF", // White text
      },
    }),
    []
  );

  const handleSaveAndChange = () => {
    setTabContents((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], text: editableContent },
    }));
    showConfirmation(`Content for "${tabContents[activeTab].title}" saved!`);
  };

  const showConfirmation = (message) => {
    const confirmDialog = document.createElement("div");
    confirmDialog.className =
      "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";
    confirmDialog.innerHTML = `
      <div class="bg-black p-6 rounded-lg shadow-lg text-white"> {/* Changed to bg-black */}
        <p class="mb-4">${message}</p>
        <button id="confirmOkBtn" class="bg-cyan-400 hover:bg-cyan-300 text-white py-2 px-4 rounded-[4px] border-b-4 border-cyan-500">OK</button>
      </div>
    `;
    document.body.appendChild(confirmDialog);
    document.getElementById("confirmOkBtn").onclick = () => {
      document.body.removeChild(confirmDialog);
    };
  };

  return (
    <div className="bg-black rounded-2xl min-h-screen text-white p-6 sm:p-6 lg:p-8 ">
      <div className="flex items-center mb-6">
        {onBackClick && (
          <button
            onClick={onBackClick}
            className="text-gray-300 hover:text-white mr-4"
            aria-label="Go back"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        )}
        <h1 className="text-2xl sm:text-3xl font-semibold">Settings</h1>
      </div>

      <div className="border-b border-gray-700">
        <div className="md:w-full flex justify-start bg-black rounded-t-lg overflow-x-auto scrollbar-hide">
          {["privacy-security", "terms-conditions"].map(
            (
              tabId // Removed 'about-us' tab
            ) => (
              <button
                key={tabId}
                className={`flex-shrink-0 px-4 py-4 text-lg font-semibold relative ${
                  activeTab === tabId
                    ? "text-[#DCF3FF]"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab(tabId)}
              >
                {tabContents[tabId].title}
                {activeTab === tabId && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] -mb-[1px] bg-[#DCF3FF]"></span>
                )}
              </button>
            )
          )}
        </div>
      </div>

      <div className="bg-black p-4 rounded-b-lg -mt-px">
        {" "}
        {/* Changed to bg-black */}
        <>
          <h2 className="text-xl font-semibold mb-1">
            {tabContents[activeTab]?.title}
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            {tabContents[activeTab]?.date}
          </p>
          <div className="rounded-md mb-6 py-2">
            <JoditEditor
              className="jodit-custom-theme"
              ref={editor}
              value={editableContent}
              config={joditConfig}
              onChange={(newContent) => setEditableContent(newContent)}
            />
          </div>
        </>
        <div className="col-span-full mt-4">
          <button
            type="button"
            
            className="w-full mx-auto flex justify-center items-center rounded-[4px] bg-[#FFFF]  text-black py-2 font-semibold  shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition duration-300 ease-in-out hover:bg-[#E6E6E6] focus:outline-none"
          >
            Save & Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
