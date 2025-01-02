import React from 'react';
import { footerLinks } from '../constants';

const Footer = () => {
    return (
        <footer className="py-6 sm:px-10 px-6 bg-neutral-800 text-white">
            <div className="screen-max-width">
                <div className="mb-4">
                    <p className="font-semibold text-sm">
                        More ways to shop: {' '}
                        <span className="underline text-blue-500">Find an Apple Store</span>
                        {' '} or {' '}
                        <span className="underline text-blue-500"> other retailer</span>
                        {' '}near you.
                    </p>
                    <p>Or call 1-800-MY-APPLE.</p>
                </div>

                <div className="bg-neutral-600 my-4 h-[1px] w-full" />

                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <p className="font-semibold text-xs mb-4 md:mb-0">
                        Copyright @ 2024 Apple Inc. All rights reserved.
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
            </div>
        </footer>
    );
};

export default Footer;
