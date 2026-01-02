'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ImageCarousel({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    // Auto-advance every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [images.length])

    return (
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden shadow-2xl my-8 group">
            {/* Images */}
            {images.map((src, index) => (
                <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <Image
                        src={src}
                        alt={`Slide ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                </div>
            ))}

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all backdrop-blur-sm ${index === currentIndex
                                ? 'bg-white scale-125'
                                : 'bg-white/50 hover:bg-white/80'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Navigation Buttons (Hidden on mobile, visible on hover) */}
            <button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
            >
                ←
            </button>
            <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
            >
                →
            </button>
        </div>
    )
}
