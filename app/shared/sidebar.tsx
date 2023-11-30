'use client';

import React, { useState } from 'react';
import { FeatherIcon } from './icons/feather-icon';
import { CategoryWithCount } from '@/model/category.model';

export interface SidebarProps {
    categories: CategoryWithCount[];
}

export function SidebarMobile({ categories }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="md:hidden fixed left-0 top-0 z-50 m-1">
                <button className="focus:outline-none p-3" onClick={() => setIsOpen(!isOpen)}>
                    <FeatherIcon className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} name="menu" size={20} />
                </button>
            </div>
            <div className={`fixed top-0 left-0 h-screen w-full bg-white z-30 transition-transform ${isOpen ? '-translate-y-0' : '-translate-y-full'}`}>
                <div className="pt-16 px-3 py-5 shadow-md h-full overflow-hidden dark:bg-gray-800">
                    <p className="uppercase text-menu-caption-gray font-semibold text-xs mb-5">Categories</p>
                    <ul className="h-full pb-10 overflow-y-scroll">
                        {categories.map((category) => (
                            <a key={category._id} href={`/category/${category.shortName}`}>
                                <li className="font-light py-2 border-b text-lg text-neutral-500">
                                    {category.label}
                                    {category.postCount > 0 && <span className="text-sm ml-1 text-rose-300">({category.postCount})</span>}
                                </li>
                            </a>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export function SidebarDesktop({ categories }: SidebarProps) {
    return (
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <p className="uppercase text-menu-caption-gray font-semibold text-xs px-4 mb-5">Categories</p>
                <ul className="pl-4 text-base">
                    {categories.map((category) => (
                        <a key={category._id} href={`/category/${category.shortName}`}>
                            <li className="font-light text-neutral-500">
                                {category.label}
                                {category.postCount > 0 && <span className="text-xs ml-1 text-rose-300">({category.postCount})</span>}
                            </li>
                        </a>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export function Sidebar({ categories }: SidebarProps) {
    return (
        <>
            <SidebarMobile categories={categories} />
            <SidebarDesktop categories={categories} />
        </>
    );
}
