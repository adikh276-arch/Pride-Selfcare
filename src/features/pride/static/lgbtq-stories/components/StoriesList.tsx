"use client";
import { motion } from "framer-motion";
import StoryCard from "./StoryCard";
import { stories as storiesData } from "../data/stories";

interface StoriesListProps {
  onSelectStory: (index: number) => void;
  onBack: () => void;
}

const StoriesList = ({ onSelectStory, onBack }: StoriesListProps) => {
  return (
    <section className="activity-container-lg py-12 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <button 
            onClick={onBack}
            className="text-slate-400 hover:text-[#8B5CF6] font-semibold text-sm mb-4 flex items-center gap-2 transition-colors"
          >
            ← Back
          </button>
          <h2 className="text-3xl font-bold text-slate-900">Choose a Story</h2>
          <p className="text-slate-500 mt-2">Each voice is real. Each path is valid.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {storiesData.map((story, index) => (
          <StoryCard 
            key={story.name} 
            story={story} 
            index={index} 
            onClick={() => onSelectStory(index)} 
          />
        ))}
      </div>
    </section>
  );
};

export default StoriesList;
