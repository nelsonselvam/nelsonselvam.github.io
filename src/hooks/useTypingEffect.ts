import { useState, useEffect } from 'react';

interface UseTypingEffectOptions {
    text: string;
    speed?: number;
    onComplete?: () => void;
}

export function useTypingEffect({ text, speed = 50, onComplete }: UseTypingEffectOptions) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        } else if (currentIndex === text.length && !isComplete) {
            setIsComplete(true);
            onComplete?.();
        }
    }, [currentIndex, text, speed, onComplete, isComplete]);

    const reset = () => {
        setDisplayedText('');
        setCurrentIndex(0);
        setIsComplete(false);
    };

    return { displayedText, isComplete, reset };
}
