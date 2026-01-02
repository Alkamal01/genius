"use client";

import Image from "next/image";
import { Link } from "nextra-theme-docs";
import type { FC, ReactNode } from "react";
import Avatar from "boring-avatars";
import { LuChevronsLeftRight } from "react-icons/lu";
import { useState, useMemo } from "react";
import ProfilePopupModal from "./ProfilePopupModal";

interface ProfileCardProps {
  name: string;
  role?: string;
  avatar?: string;
  profile_card_link?: string;
  links?: {
    label: string;
    url: string;
    icon: ReactNode;
  }[];
  className?: string;
  fetchTelegramData: (handle: string) => Promise<any>;
  telegramCache: Map<string, any>,
}

export const ProfileCard: FC<ProfileCardProps> = ({
  name,
  role,
  profile_card_link,
  avatar,
  links = [],
  className,
  fetchTelegramData,
  telegramCache,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [telegramData, setTelegramData] = useState<any>(null);

  const telegramHandle = useMemo(() => {
    const telegramLink = links.find((l) =>
      l.label.toLowerCase().includes("message")
    );
    return telegramLink?.url.split("t.me/")[1] ?? null;
  }, [links]);

  const handleExpand = async () => {
    if (!isOpen && telegramHandle) {
      if (telegramCache.has(telegramHandle)) {
        // Use cached data
        setTelegramData(telegramCache.get(telegramHandle));
      } else {
        // Fetch and update the cache
        const data = await fetchTelegramData(telegramHandle);
        setTelegramData(data);
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={
        `relative flex flex-col items-center text-center rounded-xl 
        border p-4 transition hover:border-[#c362ff]/50 
        dark:border-neutral-700 bg-white dark:bg-gray-700/30 ${className}`
      }
    >
      <div className="absolute top-2 right-2 flex flex-row items-center">
        {/* Number to the left */}
        {telegramData ? (
          <span className="text-sm text-green-700 dark:text-green-400 mr-1 pointer-events-none">{telegramData.entries}</span>
        ) : (
          <span className="text-sm text-green-700 dark:text-green-400 mr-1 pointer-events-none"></span>
        )}
        {/* Expand Icon */}
        <button
          className="rotate-45 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          onClick={handleExpand}
          aria-label="Expand Profile"
        >
          {isOpen ? <LuChevronsLeftRight size={20} rotate={30} /> : <LuChevronsLeftRight size={20} />}
        </button>
      </div>
      <div className="relative w-20 h-20 mb-2">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <Avatar
            size={80}
            name={name}
            variant="beam" // Try others like 'marble', 'pixel', 'sunset', 'beam'
            square={false}
            colors={['#cd5aff', '#8067ff', '#ef64ff', '#ff4b85', '#000']}
          />
        )}
      </div>
      <p className="text-lg font-semibold text-gray-800 dark:text-white">{name}</p>
      {role && <Link href={profile_card_link} className="text-md">{role}</Link>}
      <div className="mt-2 flex flex-wrap justify-center gap-4">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
          >
            {link.icon}
            <span className="text-xs">{link.label}</span>
          </a>
        ))}
      </div>

      {/* Popup Modal */}
      <ProfilePopupModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        telegramHandle={telegramHandle}
        telegramData={telegramData}
      />
    </div>
  );
};
