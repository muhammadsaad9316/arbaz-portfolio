'use client';

import React from 'react';
import styles from './SocialLinks.module.css';

interface SocialPlatform {
    platform: string;
    username: string;
    followers?: string; // Optional "Followers" count if desired
    color: string;
    hoverBg?: string; // Optional background for top layer
    url: string;
    iconPath: string;
    viewBox?: string;
}

// Internal static data for design definitions (icons, colors)
const socialDesign: Record<string, Omit<SocialPlatform, 'platform' | 'url' | 'username'>> = {
    'GitHub': {
        color: '#ffffff',
        hoverBg: '#1a1a1a',
        iconPath: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z'
    },
    'LinkedIn': {
        color: '#0077b5',
        iconPath: 'M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h5v-8.306c0-4.613 6.132-4.927 6.132 0v8.306h5v-10.418c0-7.361-8.526-7.14-10.457-3.46v-2.122z'
    },
    'Instagram': {
        color: '#e1306c',
        hoverBg: '#222',
        iconPath: 'M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z',
        viewBox: "0 0 448 512"
    },
    'Twitter': { // Mapping Twitter to X visual style or keeping Twitter icon?
        // DB says "Twitter" in seed.ts. Let's map it to X style or Twitter.
        // User's SocialLinks file has 'X'.
        // I will allow both keys but use X design for now or keep generic.
        color: '#ffffff',
        hoverBg: '#000',
        iconPath: 'M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM365.7 442h20L91 69h-20L365.7 442z',
        viewBox: "0 0 512 512"
    }
}

interface SocialLinksProps {
    items?: { name: string; url: string; icon?: string }[];
}

export default function SocialLinks({ items }: SocialLinksProps) {
    // Merge DB items with design definitions
    const socialData = items?.map(item => {
        // Handle name variations (Twitter vs X)
        let key = item.name;
        if (key === 'Twitter' && !socialDesign['Twitter'] && socialDesign['X']) key = 'X';

        const design = socialDesign[key] || socialDesign['GitHub']; // Fallback

        return {
            platform: item.name,
            username: '', // DB doesn't have username field explicitly in the seed (only name/url/icon). We can hide it or extract from URL? For now empty.
            url: item.url,
            ...design
        };
    }) || [];

    return (
        <div className={styles.wrapper}>
            {socialData.map((social) => (
                <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.icon}
                    style={{ '--hover-color': social.color, '--hover-bg': social.hoverBg || '#121212' } as React.CSSProperties}
                >
                    <div className={styles.tooltip}>
                        <span>{social.username}</span>
                        <span className={styles.platformName}>{social.platform}</span>
                    </div>

                    <div className={styles.layer}>
                        {/* 5 Spans for 3D stacking */}
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span className={styles.text}>
                            <svg
                                viewBox={social.viewBox || "0 0 24 24"}
                                className={styles.svgIcon}
                                style={{
                                    fill: social.platform === 'Instagram' ? 'url(#igGradient)' : 'currentColor',
                                    color: social.platform === 'Instagram' ? 'white' : 'currentColor' // Fallback
                                }}
                            >
                                {social.platform === 'Instagram' && (
                                    <defs>
                                        <linearGradient id="igGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: '#f09433', stopOpacity: 1 }} />
                                            <stop offset="25%" style={{ stopColor: '#e6683c', stopOpacity: 1 }} />
                                            <stop offset="50%" style={{ stopColor: '#dc2743', stopOpacity: 1 }} />
                                            <stop offset="75%" style={{ stopColor: '#cc2366', stopOpacity: 1 }} />
                                            <stop offset="100%" style={{ stopColor: '#bc1888', stopOpacity: 1 }} />
                                        </linearGradient>
                                    </defs>
                                )}
                                <path d={social.iconPath} />
                            </svg>
                        </span>
                    </div>
                </a>
            ))}
        </div>
    );
}
