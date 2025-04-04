import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useState } from 'react';
import { heroVideo, smallHeroVideo } from '../utils';

const Hero = () => {
    const [videoSrc, setVideoSrc] = useState(window.innerWidth < 768 ? smallHeroVideo : heroVideo)

    const handleVideoSrcSet = () => {
        if(window.innerWidth < 768) {
            setVideoSrc(smallHeroVideo)
        } else {
            setVideoSrc(heroVideo)
        }
    }

    // Update video source on window resize
    useEffect(() => {
        window.addEventListener('resize', handleVideoSrcSet)
        return () => window.removeEventListener('resize', handleVideoSrcSet)
    }, []);

    // GSAP animation
    useEffect(() => {
        gsap.to('#hero', { opacity: 1, delay: 1.5 })
        gsap.to('#cta', { opacity: 1, y: -50, delay: 2.5 })
    }, [])

    return (
        <section className="w-full nav-height bg-black relative">
            <div className="h-5/6 w-full flex-center flex-col">
                <p id="hero" className="hero-title" style={{fontFamily: 'Poppins, sans-serif'}}>iPhone 15 Pro</p>
                <div className="md:w-10/12 w-9/12">
                <video className="pointer-events-none" autoPlay muted playsInline >
                    <source src={videoSrc} type="video/mp4" />
                </video>
                </div>
            </div>

            <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
                <a href="#highlights" className="btn">Buy</a>
                <p className="font-normal text-xl text-gray" style={{fontFamily: 'Poppins, sans-serif'}}>from $199/month or $999</p>
            </div>
        </section>
    );
};

export default Hero;
