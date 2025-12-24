"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Play, Download, Clock, Film, Wand2, X } from "lucide-react";

interface GeneratedVideo {
  id: string;
  prompt: string;
  thumbnail: string;
  duration: number;
  createdAt: Date;
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState(5);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videos, setVideos] = useState<GeneratedVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<GeneratedVideo | null>(null);

  const generateVideo = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setProgress(0);

    // Simulate video generation with progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    // Simulate generation time
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const newVideo: GeneratedVideo = {
      id: Date.now().toString(),
      prompt: prompt,
      thumbnail: `https://picsum.photos/seed/${Date.now()}/800/450`,
      duration: duration,
      createdAt: new Date(),
    };

    setVideos([newVideo, ...videos]);
    setIsGenerating(false);
    setProgress(0);
    setPrompt("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Film className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Veo 3</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">إنشاء فيديو بالذكاء الاصطناعي</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            حوّل أفكارك إلى فيديوهات مذهلة
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            استخدم الذكاء الاصطناعي المتقدم لإنشاء مقاطع فيديو عالية الجودة من النص فقط
          </p>
        </motion.div>

        {/* Video Generation Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-12"
        >
          <div className="space-y-6">
            {/* Prompt Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                وصف الفيديو
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="صف الفيديو الذي تريد إنشاءه بالتفصيل... مثال: منظر طبيعي خلاب لشروق الشمس فوق الجبال مع طيور تحلق في السماء"
                className="w-full h-32 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                disabled={isGenerating}
              />
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  المدة (ثانية)
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isGenerating}
                >
                  <option value={5}>5 ثوانٍ</option>
                  <option value={10}>10 ثوانٍ</option>
                  <option value={15}>15 ثانية</option>
                  <option value={30}>30 ثانية</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  نسبة العرض إلى الارتفاع
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isGenerating}
                >
                  <option value="16:9">16:9 (أفقي)</option>
                  <option value="9:16">9:16 (عمودي)</option>
                  <option value="1:1">1:1 (مربع)</option>
                  <option value="4:3">4:3 (تقليدي)</option>
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateVideo}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>جاري الإنشاء... {progress}%</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  <span>إنشاء الفيديو</span>
                </>
              )}
            </button>

            {/* Progress Bar */}
            {isGenerating && (
              <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Generated Videos Gallery */}
        {videos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              الفيديوهات المُنشأة
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all cursor-pointer group"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative aspect-video bg-black/50">
                    <img
                      src={video.thumbnail}
                      alt={video.prompt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-sm text-gray-300 line-clamp-2 mb-3">
                      {video.prompt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{video.duration}s</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Download functionality
                        }}
                        className="flex items-center gap-1 hover:text-purple-400 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        <span>تحميل</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {videos.length === 0 && !isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Film className="w-10 h-10 text-gray-500" />
            </div>
            <p className="text-gray-400 text-lg">ابدأ بإنشاء أول فيديو لك</p>
          </motion.div>
        )}
      </main>

      {/* Video Preview Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl border border-white/10 max-w-4xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 left-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="aspect-video bg-black">
                  <img
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.prompt}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-semibold text-white mb-2">
                    {selectedVideo.prompt}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedVideo.duration} ثانية</span>
                    </div>
                    <div>
                      {selectedVideo.createdAt.toLocaleDateString("ar-EG")}
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" />
                    <span>تحميل الفيديو</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
