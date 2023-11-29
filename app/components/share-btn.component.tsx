'use client';

import React, { useEffect, useState } from 'react';
import { FeatherIcon } from './icons/feather-icon';

export interface ShareButtonProps {
    title?: string;
    url?: string;
}

export function ShareButton({ title, url }: ShareButtonProps) {

    const [shareUrl, setShareUrl] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);

    useEffect(() => {
        setShareUrl(url || document?.location.href);
    }, [url]);

    function shareHandler() {
        if (navigator.share) {
            navigator.share({
                title: `${title} for sale on KeepNothing`,
                url: shareUrl
            });
        } else {
            setIsOpen(!isOpen);
        }
    };

    function copyUrl() {
        navigator.clipboard.writeText(shareUrl);
        setIsCopied(true);
    }

    return (
        <div className="px-2 relative flex align-center">
            <button className={`hover:text-blue-300 ${isOpen ? 'text-blue-700' : ''}`} onClick={shareHandler}>
                <FeatherIcon name="share" size={20} />
            </button>
            <div className={`transition-transform ${isOpen ? '' : 'scale-0'} mt-7 z-30 absolute bg-white mt-1 rounded shadow border border-neutral-300 text-sm`}>
                <div className="px-3 py-2">
                    <p className="mb-2">Use this link for sharing:</p>
                    <div className="flex items-center">
                        <input className="w-64 p-2 border" type="text" value={shareUrl} readOnly />
                        <button className="p-2 border rounded bg-neutral-100 mx-2" onClick={copyUrl}>
                            {isCopied
                                ? <FeatherIcon name="check" size={20} className="text-blue-500 cursor-pointer" />
                                : <FeatherIcon name="copy" size={20} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
