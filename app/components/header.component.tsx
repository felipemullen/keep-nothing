import React from 'react';
import { FeatherIcon } from './icons/feather-icon';

export function Header() {
    return (
        <nav className="fixed w-full bg-neutral-100 z-50 shadow-md p-2 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="mx-auto px-3 flex justify-between">
                <button className="md:hidden focus:outline-none px-3"></button>
                <a className="flex items-center" href="/">
                    <img src="https://cdn0.iconfinder.com/data/icons/shopping-76/100/Artboard_18-256.png" alt="logo" className="w-10" />
                    <span className="hidden sm:block">
                        <span className="text-sm md:text-2xl text-neutral-700 font-semibold">Keep Nothing</span>
                    </span>
                </a>
                <div className="flex items-center">
                    <a href="/likes" className="p-2">
                        <FeatherIcon name="heart" size={20} className="hover:text-red-300" fillColor="currentColor" />
                    </a>
                    <a href="/new">
                        <button className="bg-red-400 text-white text-sm px-2 py-1 fs-2 uppercase rounded-sm">New post</button>
                    </a>
                </div>
            </div>
        </nav>
    );
};
