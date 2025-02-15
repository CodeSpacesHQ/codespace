'use client';

import React from 'react';
import Image from 'next/image';
import styles from './letter.module.css';

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
        <div className={styles.letterContainer}>
            <div className={styles.content}>

                <audio
                    ref={audioRef}
                    src="https://framerusercontent.com/assets/s6Kcvm0lGpVdIimLMjrCJjPgd28.mp3"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                    loop
                />
                <div className={styles.audioPlayer}>
                    <div className={styles.audioControls}>
                        <button className={styles.playButton} onClick={togglePlay}>
                            <span>{isPlaying ? '❚❚' : '▶'}</span>
                        </button>
                        <div className={styles.progressBar} onClick={handleProgressBarClick}>
                            <div className={styles.progress} style={{ width: `${progress}%` }} />
                        </div>
                        <span className={styles.timestamp}>{currentTime} / {duration}</span>
                    </div>
                </div>

                <p className={styles.playText}>[hi play above track as you read this]</p>

                <div className={styles.letter}>
                    <p>by: clinton.</p>
                    <p>published: jan 1, 2025.</p>

                    <p>A New Year, A new beginning for everyone.</p>

                    <p>It&apos;s been a very long time since I last wrote to you, and honestly 2024 was one hell of a year!</p>

                    <p>The end of 2024 had us reflecting on the year, we recorded a 79% increase in membership, impacted over a thousand Gen Z individuals in tech, and organized our first physical conference with more than 1,000 attendees.</p>

                    <p>I remember when we kicked off in 2021 with a single goal at heart: reaching and connecting with more Gen Z in tech. While growing into one of Africa&apos;s fastest-growing communities for Gen Z in tech, we&apos;ve stayed true to our core values as both a community and organization.</p>

                    <p>In 2024, We launched our laptop initiatives. We started by giving laptops to few community members in Q1 to boost productivity and support them through. We organized interactive sessions with some of the industry&apos;s brightest minds (including Peace Itimi, Chisom Nwokwu, Emmy Cao, Nyah Macklin) among many others. Organized two major hackathons: Fusion Tech Fest and Wix Studio Hack (in partnership with Wix). We also held our International Women&apos;s Day event, celebrating African Gen Z women breaking bias in tech.</p>

                    <p>And guess what? We were also at Moonshot this year with plenty of swag!</p>

                    <div className={styles.imageGrid}>
                        <div className={styles.imageContainer}>
                            <Image
                                src="/images/team-meeting.jpg"
                                alt="Three people having a meeting in an office"
                                fill
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.imageContainer}>
                            <Image
                                src="/images/retro-screen.jpg"
                                alt="Retro screen with anime posters"
                                fill
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.imageContainer}>
                            <Image
                                src="/images/discord-chat.jpg"
                                alt="Discord chat interface"
                                fill
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.imageContainer}>
                            <Image
                                src="/images/sticky-notes.jpg"
                                alt="Sticky notes on window"
                                fill
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.imageContainer}>
                            <Image
                                src="/images/team-working.jpg"
                                alt="Team working together"
                                fill
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.imageContainer}>
                            <Image
                                src="/images/buildspace-logo.jpg"
                                alt="Buildspace logo"
                                fill
                                className={styles.image}
                            />
                        </div>
                    </div>

                    <p>2024 also saw the birth of our annual HackFest, Our second consecutive year and first time hosting it physically in Lagos Nigeria. The event brought together over a thousand Gen Z in tech in person and even more virtually for a day packed with insightful and fun activities, making it&apos;s way to history as one of the largest Gen Z-focused conferences gathering here in Nigeria. Beyond the numbers, Fusion Tech Fest 2024 introduced some of the best and biggest problem solver to handle various tracks we had.</p>

                    <p>Saw teams tackle everything from rural healthcare to financial inclusion. They weren&apos;t just coding side projects - they were solving actual problems Nigeria faces and affect millions of Nigerians daily.</p>

                    <p>One key thing about this was the practical focus. These developers weren&apos;t just chasing trendy tech - they were building solutions tailored for Nigerian realities. It was innovation with purpose.</p>

                    <p>While all this also count toward our goal for 2025 making it even more bigger, We&apos;re building a community that can make a tangible impact in Nigeria through technology and this is just another step forward!</p>

                    <p>Our efforts and results this year have not just helped us realize how far we&apos;ve come, but helped us prove that even with challenges, we cannot be stopped. Code Space is more than just a community, it&apos;s a movement. Looking back, this whole space you see today started as a simple WhatsApp conversation in 2021.</p>

                    <p>We had some big moments that defined the year!</p>

                    <p>Looking back on the year, I&apos;m incredibly proud of the progress we&apos;ve been able to accomplish as a team. Each passing day, we learn more about our efforts and the incredible partners, sponsors, and individuals who supported and embraced our vision. They continue to support us in empowering thousands of young African tech talents. Thanks to the amazing brands that make our mission even more rewarding!</p>

                    <p>Here&apos;s what to to expect in 2025</p>
                </div>
            </div>
        </div>
    );
} 