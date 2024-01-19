'use client';

import { useState } from 'react';
import { PostDto } from '@/app/model/post.model';

export interface PostReplyBtnProps {
    data: PostDto;
}

export function PostReplyBtn({ data }: PostReplyBtnProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`relative`}>
            <button className={`${isOpen ? 'bg-red-800' : 'bg-red-400'} text-white text-xs px-2 py-1 mr-5 fs-2 uppercase rounded-sm`} onClick={() => setIsOpen(!isOpen)}>
                <span>reply</span>
            </button>
            <div className={`transition-transform ${isOpen ? '' : 'scale-0'} z-30 absolute bg-white mt-1 rounded-sm border border-neutral-300 text-sm shadow`}>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <tbody>
                        <tr className=" border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Email
                            </th>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <a href={`mailto:${data.email}`} className="text-blue-500">{data.email}</a>
                            </td>
                        </tr>
                        {data.phone &&
                            <tr className="bg-white dark:bg-gray-800">
                                <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Phone
                                </th>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    <a href={`tel:+1${data.phone}`} className="text-blue-500">{data.phone}</a>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}