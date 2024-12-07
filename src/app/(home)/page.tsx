"use client";

import { usePaginatedQuery } from "convex/react";

import { api } from "@convex/_generated/api";

import { Navbar } from "./navbar";
import { TemplateGallery } from "./template-gallery";
import { DocumentsTable } from "./documents-table";
import { useSearchParam } from "@/hooks/use-search-param";

const Home = () => {
  const [search] = useSearchParam();
  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.getDocuments,
    { searchQuery: search },
    { initialNumItems: 5 },
  );

  if (!results) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
};
export default Home;
