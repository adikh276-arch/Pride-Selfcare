import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

export function PrideStaticViewer() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const src = `/static/pride/${slug}/index.html`;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Back Header */}
      <div className="p-4 border-b border-gray-100 flex items-center bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <motion.button
          whileHover={{ x: -4, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/lgbtq-hub')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-[#64748B] font-bold text-sm hover:text-[#A855F7] transition-all"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
          Back to Hub
        </motion.button>
      </div>

      <div className="flex-1 w-full h-full relative">
        <iframe
          src={src}
          title={`PrideMantra ${slug}`}
          className="w-full h-full absolute inset-0"
          style={{
            border: "none",
          }}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}
