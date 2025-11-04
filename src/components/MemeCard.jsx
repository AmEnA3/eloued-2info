import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';

export default function MemeCard() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Hide the meme after 4 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <m.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-auto px-4"
                >
                    <div className="card bg-gradient-to-br from-slate-800/95 to-slate-900/95 border border-slate-700/50 backdrop-blur-md shadow-xl">
                        <div className="card-body p-4 flex items-center gap-3">
                            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                                <img 
                                    src="/memes/study.jpg" 
                                    alt="Study Meme"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="flex-1 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200 leading-tight">
                                ادخل تقرا ااا 
                            </p>
                        </div>
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
}