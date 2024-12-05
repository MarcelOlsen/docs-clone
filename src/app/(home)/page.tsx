"use client";

import { Navbar } from "./navbar";
import { TemplateGallery } from "./template-gallery";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

const Home = () => {
  const documents = useQuery(api.documents.getDocuments);

  if (!documents) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        {documents?.map((document, idx) => (
          <span key={idx}>{document?.title}</span>
        ))}
      </div>
    </div>
  );
};
export default Home;
