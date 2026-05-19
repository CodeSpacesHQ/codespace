'use client';

import React from 'react';
import Image from 'next/image';
import './styles.scss';

export default function LetterPage() {
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState('0:00');
    const [duration, setDuration] = React.useState('1:44');

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            const progressPercent = (current / duration) * 100;
            setProgress(progressPercent);
            setCurrentTime(formatTime(current));
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(formatTime(audioRef.current.duration));
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (audioRef.current) {
            const progressBar = e.currentTarget;
            const rect = progressBar.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = x / rect.width;
            const time = percent * audioRef.current.duration;
            audioRef.current.currentTime = time;
        }
    };

    return (
        <div className="letter-container">
            <div className="content">
                <div className="logo">
                    <Image
                        src="/images/icon-black.png"
                        alt="Logo"
                        width={28}
                        height={28}
                        priority
                    />
                </div>

                <audio
                    ref={audioRef}
                    src="https://framerusercontent.com/assets/s6Kcvm0lGpVdIimLMjrCJjPgd28.mp3"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                    loop
                />
                <div className="audio-player">
                    <div className="audio-controls">
                        <button className="play-button" onClick={togglePlay}>
                            <span>{isPlaying ? '❚❚' : '▶'}</span>
                        </button>
                        <div className="progress-bar" onClick={handleProgressBarClick}>
                            <div className="progress" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="timestamp">{currentTime} / {duration}</span>
                    </div>
                </div>

                <div className="meta-info">
                    <p>[hi play above track as you read this]</p>
                    <p>by: clinton.</p>
                    <p>published: mar 3, 2025.</p>
                </div>

                <div className="text-content">
                    <h2>A New Year, A New Beginning for Everyone.</h2>

                    <h2>It&apos;s been a very long time since I last wrote to you. Honestly, 2024 was one hell of a year!</h2>

                    <h2>The end of 2024 had us reflecting on the year; we recorded a 79% increase in membership, impacted over a thousand Gen Z individuals in tech, and organized our first physical conference with more than 1,000 attendees.</h2>

                    <h2>I remember we kicked off Code Space in 2021 with a single goal: reaching and connecting with more Gen Z in tech. While growing into one of Africa&apos;s fastest-growing communities for Gen Z in tech, we&apos;ve stayed true to our core values as a community and organization.</h2>

                    <h2>In 2024, we launched our laptop initiatives. We empowered a few community members in Q1 to boost their productivity and support their careers. We organized interactive sessions with some of the industry&apos;s brightest minds (including Peace Itimi, Chisom Nwokwu, Emmy Cao, Nyah Macklin, and many others). We also held our International Day of the Girl Child event, celebrating African Gen Z women breaking the bias in tech.</h2>

                    <h2>And guess what? We were also at Moonshot with plenty of swag!</h2>

                    <h2>In 2024, we celebrated our annual HackConf with two major hackathons: Fusion Tech Fest and Wix Studio Hack (in partnership with Wix).</h2>

                    <div className="image-grid">
                        <div className="image-wrapper">
                            <Image
                                src="/images/letter/img-1.jpg"
                                alt="Moonshot swag in nature"
                                width={1600}
                                height={900}
                                className="main-image"
                                priority
                            />
                        </div>
                        <div className="image-wrapper">
                            <Image
                                src="/images/letter/img-2.jpg"
                                alt="Moonshot podcast recording session"
                                width={800}
                                height={450}
                                className="secondary-image"
                                priority
                            />
                        </div>
                        <div className="image-wrapper">
                            <Image
                                src="/images/letter/img-3.jpg"
                                alt="Moonshot team with mustaches"
                                width={800}
                                height={450}
                                className="secondary-image"
                                priority
                            />
                        </div>
                    </div>

                    <h2>Fusion Tech Fest marked our second consecutive year of organizing a large-scale hackathon and our first-ever in-person edition in Lagos, Nigeria. The event brought together over a thousand Gen Zs in tech, both in person and virtually, making history as one of Nigeria&apos;s largest Gen Z-focused tech conferences.</h2>

                    <h2>Aside from providing a platform for members of our community to connect, we will always remember Fusion Tech Fest for the quality of problem solvers who participated in various hackathon tracks. For the first time, we categorized our hackathon into software and hardware tracks. We saw teams develop mind-blowing AI and hardware solutions, tackling predominant issues affecting millions of Nigerians daily.</h2>

                    <h2>In 2024, we saw hackers and their teams innovate with purpose. All of these fuel our goals for Spacers HackConf 2025. This year, we hope to bring you and everyone in the community a bigger annual hackathon and conference. Spacers HackConf 2025 will provide a platform where you can ideate, innovate, and build world-class solutions.</h2>

                    <h2>Our efforts and results last year not only showed us how far we&apos;ve come but also proved that no challenge can stop us. Looking back, I&apos;m incredibly proud of the progress we&apos;ve made as a community. It&apos;s incredible to think that everything you see today started as a simple WhatsApp conversation in 2021. Since then, we&apos;ve made small decisions that continue to impact the careers of Gen Zs across Africa.</h2>

                    <h2>We remain eternally grateful to our partners, sponsors, and individuals who unfailingly join us in our walk to create not just a community but a launchpad for Gen Zs who are dreamers, innovators, and builders. Thank you to everyone for believing in our vision and empowering us to transform the lives of thousands of young African tech talents.</h2>

                    <div style={{ marginTop: 24 }}>
                        <p style={{ fontWeight: 700 }}>Clinton Imaro</p>
                        <p>
                            <em>Founder, Code Space</em>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 