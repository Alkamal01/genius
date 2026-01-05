'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaTrophy, FaTimes, FaMedal, FaStar } from 'react-icons/fa'

const LEADERBOARD_DATA = [
    { rank: 1, team: 'Safro', score: 432, color: 'from-yellow-400 to-amber-500' },
    { rank: 2, team: 'Kurama', score: 354, color: 'from-gray-300 to-gray-400' },
    { rank: 3, team: 'Airchain', score: 315, color: 'from-amber-600 to-amber-700' },
    { rank: 4, team: 'Linx', score: 310 },
    { rank: 5, team: 'SkyFish', score: 300 },
    { rank: 6, team: 'DSE', score: 297 },
    { rank: 7, team: 'Edix', score: 287 },
    { rank: 8, team: 'Dev-Lords', score: 283 },
    { rank: 9, team: 'Tinkers', score: 277 },
]

function Confetti() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
            {[...Array(50)].map((_, i) => (
                <div
                    key={i}
                    className="absolute animate-confetti"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${3 + Math.random() * 2}s`,
                    }}
                >
                    <div
                        className="w-3 h-3 rotate-45"
                        style={{
                            backgroundColor: ['#cd5aff', '#ffd700', '#ef64ff', '#02b4ff', '#7faec2'][
                                Math.floor(Math.random() * 5)
                            ],
                        }}
                    />
                </div>
            ))}
        </div>
    )
}

function PodiumPlace({ rank, team, score, delay }: { rank: number; team: string; score: number; delay: string }) {
    const heights = { 1: 'h-32', 2: 'h-24', 3: 'h-20' }
    const colors = {
        1: 'from-yellow-400 via-amber-400 to-yellow-500',
        2: 'from-gray-300 via-gray-200 to-gray-400',
        3: 'from-amber-600 via-amber-500 to-amber-700'
    }
    const icons = {
        1: <FaTrophy className="text-yellow-400 text-4xl drop-shadow-lg" />,
        2: <FaMedal className="text-gray-300 text-3xl drop-shadow-lg" />,
        3: <FaMedal className="text-amber-600 text-3xl drop-shadow-lg" />,
    }
    const order = { 1: 'order-2', 2: 'order-1', 3: 'order-3' }

    return (
        <div
            className={`flex flex-col items-center ${order[rank as keyof typeof order]} animate-slideUp`}
            style={{ animationDelay: delay }}
        >
            <div className="mb-2 animate-bounce" style={{ animationDelay: `${parseFloat(delay) + 0.5}s` }}>
                {icons[rank as keyof typeof icons]}
            </div>
            <div className="text-center mb-2">
                <p className="font-bold text-lg text-white drop-shadow-lg">{team}</p>
                <p className="text-sm text-yellow-300 font-semibold">{score} pts</p>
            </div>
            <div
                className={`w-24 md:w-32 ${heights[rank as keyof typeof heights]} bg-gradient-to-b ${colors[rank as keyof typeof colors]} rounded-t-lg flex items-center justify-center shadow-2xl border-t-4 border-white/30`}
            >
                <span className="text-4xl font-black text-white/90 drop-shadow-lg">{rank}</span>
            </div>
        </div>
    )
}

export default function AnnouncementModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const [hasSeenAnnouncement, setHasSeenAnnouncement] = useState(true)

    useEffect(() => {
        const seen = localStorage.getItem('hackathon-results-seen-v1')
        if (!seen) {
            setHasSeenAnnouncement(false)
            setTimeout(() => {
                setIsOpen(true)
                setShowConfetti(true)
            }, 1000)
        }
    }, [])

    const handleClose = () => {
        setIsOpen(false)
        setShowConfetti(false)
        localStorage.setItem('hackathon-results-seen-v1', 'true')
    }

    const handleOpen = () => {
        setIsOpen(true)
        setShowConfetti(true)
    }

    if (!isOpen && hasSeenAnnouncement) {
        return (
            <button
                onClick={handleOpen}
                className="fixed bottom-4 right-4 z-40 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2 animate-pulse"
            >
                <FaTrophy className="text-yellow-400" />
                <span className="font-semibold">View Results</span>
            </button>
        )
    }

    if (!isOpen) return null

    return (
        <>
            {showConfetti && <Confetti />}

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={handleClose}
                />

                <div className="relative bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-purple-500/30 animate-modalSlideIn">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors"
                    >
                        <FaTimes size={24} />
                    </button>

                    <div className="relative overflow-y-auto max-h-[90vh] p-6 md:p-8">
                        <div className="text-center mb-8">
                            <div className="flex justify-center gap-2 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-400 text-xl animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                                ))}
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 mb-2">
                                🎉 HACKATHON RESULTS ARE IN! 🎉
                            </h2>
                            <p className="text-gray-300 text-lg">
                                Congratulations to all participating teams!
                            </p>
                        </div>

                        <div className="flex justify-center items-end gap-4 mb-12 pt-8">
                            <PodiumPlace rank={2} team="Kurama" score={354} delay="0.3s" />
                            <PodiumPlace rank={1} team="Safro" score={432} delay="0.1s" />
                            <PodiumPlace rank={3} team="Airchain" score={315} delay="0.5s" />
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 md:p-6 backdrop-blur-sm border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <FaMedal className="text-purple-400" />
                                Full Leaderboard
                            </h3>
                            <div className="space-y-2">
                                {LEADERBOARD_DATA.map((entry, index) => (
                                    <div
                                        key={entry.team}
                                        className={`flex items-center justify-between p-3 rounded-lg transition-all hover:scale-[1.02] ${index < 3
                                            ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/30'
                                            : 'bg-white/5 hover:bg-white/10'
                                            }`}
                                        style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${entry.rank === 1 ? 'bg-yellow-500 text-black' :
                                                entry.rank === 2 ? 'bg-gray-400 text-black' :
                                                    entry.rank === 3 ? 'bg-amber-600 text-white' :
                                                        'bg-gray-700 text-white'
                                                }`}>
                                                {entry.rank}
                                            </span>
                                            <span className="font-semibold text-white">{entry.team}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden hidden md:block">
                                                <div
                                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                                                    style={{ width: `${(entry.score / 100) * 100}%` }}
                                                />
                                            </div>
                                            <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 w-16 text-right">
                                                {entry.score}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-gray-400 text-sm mb-4">
                                These teams advance to the WADA Selection phase on January 15th!
                            </p>
                            <button
                                onClick={handleClose}
                                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
                            >
                                Continue to Site
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
