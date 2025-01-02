import React from 'react';
import { footerLinks } from '../constants';
import { FaGithub, FaLinkedin, FaYoutube, FaBlog } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="py-6 sm:px-10 px-6 bg-neutral-800 text-white">
            <div className="screen-max-width">
                <div className="mb-4">
                    <p className="font-semibold text-sm">
                        More ways to shop: {' '}
                        <span className="underline text-blue cursor-pointer">Find an Apple Store</span>
                        {' '} or {' '}
                        <span className="underline text-blue cursor-pointer"> other retailer</span>
                        {' '}near you.
                    </p>
                    <p className='font-bold'>Or call 1-800-MY-APPLE.</p>
                </div>

                <div className="bg-neutral-600 my-4 h-[1px] w-full" />

                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <p className="font-semibold text-xs mb-4 md:mb-0">
                        Copyright @ 2025 Apple Inc. All rights reserved.
                    </p>

                    <div className="flex flex-wrap justify-center md:justify-end">
                        {footerLinks.map((link, i) => (
                            <p key={link} className="font-semibold text-xsmx-2 my-1">
                                {link}{' '}
                                {i !== footerLinks.length - 1 && (
                                    <span className="mx-2 text-gray-400">|</span>
                                )}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="bg-neutral-600 my-4 h-[1px] w-full" />

                <div className="flex flex-wrap items-center justify-center mt-4 space-x-4">
                    <span className="text-md text-gray-200 mt-2 md:mt-0">Created by Raahim Poonawala</span>
                    <a href="https://github.com/Raahim58/" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="text-gray-900 text-2xl hover:text-black" />
                    </a>
                    <a href="https://linkedin.com/in/raahim-poonawala" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-gray-900 text-2xl hover:text-blue" />
                    </a>
                    <a href="https://www.youtube.com/channel/UCCgYjtpAbT5_PQEYJlt3pCg" target="_blank" rel="noopener noreferrer">
                        <FaYoutube className="text-gray-900 text-2xl hover:text-red-500" />
                    </a>
                    <a href="https://tllai1.wixsite.com/raahim/home" target="_blank" rel="noopener noreferrer">
                        <FaBlog className="text-gray-900 text-2xl hover:text-green-500" />
                    </a>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
