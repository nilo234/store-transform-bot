import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, X, Package, Zap, Timer, Sparkles, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoTutorialProps {
  videoSrc?: string; // Optional: URL to video file or YouTube embed
  posterImage?: string; // Optional: thumbnail image
}

export const VideoTutorial = ({ videoSrc, posterImage }: VideoTutorialProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hasVideo = !!videoSrc;

  const handlePlay = () => {
    if (hasVideo) {
      setIsPlaying(true);
    }
  };

  const handleClose = () => {
    setIsPlaying(false);
  };

  return (
    <motion.div 
      className="relative mt-12 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      {/* Video Container */}
      <div 
        className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted border-2 border-border/50 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handlePlay}
      >
        {/* Poster/Thumbnail */}
        {posterImage ? (
          <img 
            src={posterImage} 
            alt="How to use Neuvie strips" 
            className="w-full h-full object-cover"
          />
        ) : (
          /* Placeholder Design */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
            {/* Animated Strip Icons */}
            <div className="flex items-center gap-4 mb-6">
              {([Package, Zap, Timer, Sparkles] as LucideIcon[]).map((Icon, index) => (
                <motion.div
                  key={index}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-soft"
                  animate={isHovered ? { 
                    y: [0, -5, 0],
                    transition: { duration: 0.5, delay: index * 0.1 }
                  } : {}}
                >
                  <Icon className="w-5 h-5 md:w-7 md:h-7 text-primary" strokeWidth={1.5} />
                </motion.div>
              ))}
            </div>
            
            <p className="text-muted-foreground text-sm md:text-base mb-2">
              {hasVideo ? 'Watch the Tutorial' : 'Video Coming Soon'}
            </p>
            <p className="text-xs text-muted-foreground/70">
              Learn how to use Neuvie strips in 30 seconds
            </p>
          </div>
        )}

        {/* Play Button Overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-foreground/10 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className={`rounded-full w-16 h-16 md:w-20 md:h-20 ${hasVideo ? 'bg-primary hover:bg-primary/90' : 'bg-muted cursor-not-allowed'}`}
              disabled={!hasVideo}
            >
              <Play className="h-6 w-6 md:h-8 md:w-8 ml-1" fill="currentColor" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Coming Soon Badge */}
        {!hasVideo && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-accent/90 text-accent-foreground text-xs font-semibold rounded-full">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Caption */}
      <p className="text-center text-sm text-muted-foreground mt-4">
        {hasVideo ? 'Click to watch the full tutorial' : 'Upload your video to enable playback'}
      </p>

      {/* Video Modal */}
      {isPlaying && hasVideo && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-foreground hover:bg-muted"
              onClick={handleClose}
            >
              <X className="h-6 w-6" />
            </Button>
            
            {/* Video Player */}
            <div className="aspect-video rounded-xl overflow-hidden bg-black">
              {videoSrc?.includes('youtube') || videoSrc?.includes('youtu.be') ? (
                <iframe
                  src={videoSrc.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={videoSrc}
                  className="w-full h-full"
                  controls
                  autoPlay
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VideoTutorial;
