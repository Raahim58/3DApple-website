import { chipImg, frameImg, frameVideo } from '../utils';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';
import { animateWithGsap } from '../utils/animations';

// make the game and gpu vid keep playing
const HowItWorks = () => {
    const videoRef = useRef();

    useGSAP(() => {
        gsap.from('#chip', {
            scrollTrigger: {
                trigger: '#chip',
                toggleActions: 'play pause reverse restart',
                start: '20% bottom',
            },
            scale: 2,
            opacity: 0,
            duration: 2,
            ease: 'power2.inOut',
        });
        animateWithGsap('.g_fadeIn', { y: 0, opacity: 1, duration: 1, ease: 'power2.inOut' });
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.play(); // Start playing the video
        }
    }, []);

    return (
        <section className='common-padding'>
            <div className='screen-max-width'>
                <div id='chip' className='flex-center w-full my-20'>
                    <img src={chipImg} alt='chip' width={180} height={180} />
                </div>
                <div className='flex flex-col items-center'>
                    <h2 className='hiw-title'>
                        A17 Pro chip.
                        <br /> A monster win for gaming.
                    </h2>
                    <p className='text-gray-200 font-semibold text-xl md:text-2xl py-10 text-center'>
                        It's here. The biggest redesign in the history of Apple GPUs.
                    </p>
                </div>
                <div className='mt-10 md:mt-20 mb-14'>
                    <div className='relative h-full flex-center'>
                        <div className='overflow-hidden'>
                            <img src={frameImg} alt='frame' className='bg-transparent relative z-10' />
                        </div>
                        <div className='hiw-video'>
                            <video
                                className='pointer-events-none'
                                playsInline
                                preload='none'
                                muted
                                autoPlay
                                loop // Add loop attribute here
                                ref={videoRef}
                            >
                                <source src={frameVideo} type='video/mp4' />
                            </video>
                        </div>
                    </div>
                    <p className='text-gray-200 font-semibold text-center mt-3'>Honkai: Star Rail</p>
                </div>
                <div className='hiw-text-container'>
                    <div className='flex flex-1 flex-col justify-center'>
                        <p className='hiw-text g_text g_fadeIn'>
                            A17 Pro is an entirely new class of iPhone chip that delivers our {''}
                            <span className='text-white'>
                                best graphic performance by far.
                            </span>
                        </p>
                        <p className='hiw-text g_fadeIn'>
                            Mobile {' '}
                            <span className='text-white'>
                                games will look and feel so immersive {' '}
                            </span>
                            with incredibly detailed environments and characters.
                        </p>
                    </div>
                    <div className='flex-1 flex-justify-center flex-col g_fadeIn'>
                        <p className='text-gray-200 text-xl font-normal md:font-semibold'>new</p>
                        <p className='hiw-bigtext'>PRO-CLASS GPU</p>
                        <p className='text-gray-200 text-xl font-normal md:font-semibold'>with 6 cores</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
