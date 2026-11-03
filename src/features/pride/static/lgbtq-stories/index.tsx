"use client";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeroSection from "./components/HeroSection";
import StoriesList from "./components/StoriesList";
import StoryDetail from "./components/StoryDetail";
import { stories as storiesData } from "./data/stories";
import { PrideActivityHeader } from "../../components/PrideActivityHeader";
import { PrideFloatingOrbs } from "../../components/PrideFloatingOrbs";
import { goBack } from "@/lib/navigation";
import { triggerActivityWebhook } from "@/lib/webhook";
import { useRouter } from "next/navigation";

type View = "hero" | "list" | "detail";

const Index = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation("minis");
  const [view, setView] = useState<View>("hero");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang');
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [i18n]);

  const transition = useCallback((to: View, cb?: () => void) => {
    setTransitioning(true);
    setTimeout(() => {
      cb?.();
      setView(to);
      window.scrollTo({ top: 0 });
      requestAnimationFrame(() => setTransitioning(false));
    }, 300);
  }, []);

  const goToList = useCallback(() => transition("list"), [transition]);
  const goToDetail = useCallback(
    (i: number) => {
      triggerActivityWebhook();
      transition("detail", () => setSelectedIndex(i));
    },
    [transition]
  );
  const goBackToHero = useCallback(() => transition("hero"), [transition]);

  const handleHeaderBack = useCallback(() => {
    if (view === "detail") {
      goToList();
    } else if (view === "list") {
      goBackToHero();
    } else {
      goBack(undefined, router);
    }
  }, [view, goToList, goBackToHero, router]);

  return (
    <div className="min-h-screen bg-[#FDFCFE] relative overflow-hidden">
      <PrideFloatingOrbs />
      
      <div className="relative z-50 pt-6 pb-2">
        <div className="activity-container-lg">
          <PrideActivityHeader 
            title={t("LGBTQ+ Stories")} 
            subtitle={t("Real journeys of finding yourself")}
            onBack={handleHeaderBack}
            className="mb-0"
          />
        </div>
      </div>

      <div
        className="transition-opacity duration-300 relative z-10"
        style={{
          opacity: transitioning ? 0 : 1,
        }}
      >
        {view === "hero" && <HeroSection onReadStories={goToList} />}
        {view === "list" && <StoriesList onSelectStory={goToDetail} onBack={goBackToHero} />}
        {view === "detail" && (
          <StoryDetail story={storiesData[selectedIndex]} index={selectedIndex} onBack={goToList} />
        )}
      </div>
    </div>
  );
};

export default Index;
