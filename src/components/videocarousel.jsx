import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { pauseImg, playImg, replayImg } from '../utils';

const videocarousel = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    // indicator for video
    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    })

    const [loadedData, setLoadedData] = useState([]);
    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video; // destructured the values to use easily

    useGSAP(() => {
        // slider animation to move the video out of the screen and bring the next video in
        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'power2.inOut',
        })
        // to play the video when in view
        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none',
            },
            onComplete: () => {
                setVideo((prevVideo) => ({
                    ...prevVideo,
                    startPlay: true,
                    isPlaying: true,
                }))
            }
        })
    }, [isEnd, videoId]);


    
    // to play the videos
    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;
        if(span[videoId]) {
            // animate the progress of the video
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);
                    if(progress != currentProgress) {
                        currentProgress = progress;
                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 768 
                                ? '10vw' // mobile
                                : window.innerWidth < 1200
                                ? '10vw' // tablet
                                : '4vw' // laptop
                        });

                        // set the bg colour of the progress bar
                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: 'white',
                        });
                    }
                },
                
                // on completion of video replace thr progress bar with the indicator and change the bg colour 
                onComplete: () => {
                    // different width for progress bar when playing etc
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px'
                        });
                        gsap.to(span[videoId], {
                            backgroundColor: '#afafaf',
                        });
                    }
                },
            });

            if (videoId == 0) {
                anim.restart();
            }
            
            // update the progress bar
            const animUpdate = () => {
                anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration);
            };
            
            if (isPlaying) {
                gsap.ticker.add(animUpdate) // to update the progress of the video
            } else {
                gsap.ticker.remove(animUpdate) // to remove the progress of the video
            }
        }
    }, [videoId, startPlay])
    
    // for a specific current video
    useEffect(() => {
        if(loadedData.length > 3) {
            if(!isPlaying) {
                videoRef.current[videoId].pause(); // came to end and vid not playing
            } else {
                startPlay && videoRef.current[videoId].play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData])

    // all that can happen with the video
    const handleProcess = (type, i) => {
        switch(type) {
            case 'video-end':
                setVideo((prevVideo) => ({
                    ...prevVideo,
                    isEnd: true,
                    videoId: i + 1,
                }))
                break;
            case 'video-last':
                setVideo((prevVideo) => ({
                    ...prevVideo,
                    isLastVideo: true,
                }))
                break;
            case 'video-reset':
                setVideo((prevVideo) => ({
                    ...prevVideo,
                    isEnd: false,
                    videoId: 0,
                    isLastVideo: false,
                }))
                break;
            case 'play':
                setVideo((prevVideo) => ({
                    ...prevVideo,
                    isPlaying: !prevVideo.isPlaying,
                }))
                break;
            case 'pause':
                setVideo((prevVideo) => ({
                    ...prevVideo,
                    isPlaying: !prevVideo.isPlaying,
                }))
                break;
            default:
                return video;
        }
    }

    const handleLoadedMetadata = (i, e) => setLoadedData((previousVideo) => [...previousVideo, e])

    return (
        <>
            <div className='flex items-center'>
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id ="slider" className='sm:pr-20 pr-10'>
                        <div className='video-carousel_container'>
                            <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                                <video 
                                    id="video"
                                    playsInline 
                                    preload='auto' 
                                    muted
                                    className={`${
                                        list.id == 2 && 'translate-x-44'}
                                        pointer-events-none w-full h-full object-cover
                                    `}
                                    ref={(el) => (videoRef.current[i] = el)}
                                    onEnded={() => {
                                        i != 3 ? 
                                            handleProcess('video-end', i) 
                                            : handleProcess('video-last')
                                    }}
                                    onPlay={() => {
                                        setVideo((prevVideo) => ({
                                            ...prevVideo, // on playing video, display evt about it 
                                            isPlaying: true,
                                        }))
                                    }}
                                    onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                                >
                                    <source src={list.video} type="video/mp4"/>
                                </video>
                            </div>
                            <div className='absolute top-12 left-[5%] z-10'> 
                                {list.textLists.map((text) => (
                                    <p key={text} className='md:text-2xl text-xl font-medium'>
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='relative flex-center mt-10'> 
                <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full '>
                    {videoRef.current.map((_, i) => (  // to display the progress of the video
                        <span
                            key={i} 
                            ref={(el) => (videoDivRef.current[i] = el)} 
                            className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'
                        >
                            <span 
                                className='absolute h-full w-full rounded-full'
                                ref={(el) => (videoSpanRef.current[i] = el)}
                            />
                        </span>
                    ))}  
                </div>
                <button className='control-btn'>
                    <img 
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
                        onClick={isLastVideo 
                            ? () => handleProcess('video-reset')
                            : !isPlaying
                              ? () => handleProcess('play')
                                : () => handleProcess('pause')
                        }
                    />
                </button>
            </div>
        </>
    )
}

export default videocarousel;
