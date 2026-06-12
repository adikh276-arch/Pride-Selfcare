"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Mail, MessageCircle, Link } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
  title?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ 
  isOpen, 
  onClose, 
  url = window.location.href,
  title = "Share This Activity" 
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'bg-[#25D366]',
      url: `https://wa.me/?text=${encodeURIComponent(title + ': ' + url)}`
    },
    {
      name: 'LinkedIn',
      icon: <Link className="w-5 h-5" />,
      color: 'bg-[#0077B5]',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      color: 'bg-[#EA4335]',
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-8 z-[101] shadow-2xl safe-bottom"
          >
            <div className="max-w-md mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {shareOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:border-purple-100 hover:bg-purple-50/30 transition-all group"
                  >
                    <div className={`w-12 h-12 ${option.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      {option.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-600">{option.name}</span>
                  </a>
                ))}
                
                <button
                  onClick={handleCopy}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:border-purple-100 hover:bg-purple-50/30 transition-all group"
                >
                  <div className={`w-12 h-12 ${copied ? 'bg-green-500' : 'bg-gray-800'} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <Copy className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {copied ? 'Copied!' : 'Copy Link'}
                  </span>
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={onClose}
                  className="w-full py-4 rounded-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
