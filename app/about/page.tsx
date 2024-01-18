import { DbService } from '@/services/db.service';
import { Sidebar, SidebarMobile } from '../shared/sidebar';
import { FeatherIcon } from '../shared/icons/feather-icon';
import { Suspense } from 'react';
import { Spinner } from '../shared/spinner';

export default async function AboutPage() {
    const categories = await DbService.category.withCounts();

    return (
        <>
            <Suspense fallback={<Spinner />}>
                <SidebarMobile categories={categories} />
            </Suspense>
            <div className="p-2 md:px-32 flex flex-col items-center">
                <div className="p-4 font-light dark:bg-gray-800 dark:text-white bg-white text-gray-900">
                    <h1 className="text-xl font-normal py-5">Our Mission</h1>

                    <p className="py-2">
                        <strong><i>Keep Nothing</i></strong> was born out of the idea that as Christians, we should be
                        serving our community and helping those in need. In <i>Matthew chapter 25</i> Jesus emphasizes the importance
                        of caring for those in need:
                    </p>

                    <blockquote className="text-xl bg-neutral-100 italic border-l-4 pl-4 p-5 border-red-400">
                        <p>
                            &quot;For I was hungry and you gave me something to eat, I was thirsty and you gave
                            me something to drink, I was a stranger and you invited me in, I needed clothes
                            and you clothed me, I was sick and you looked after me, I was in prison and you
                            came to visit me.&quot;
                        </p>
                        <small className="text-neutral-400">- Matthew 25:35-36</small>
                    </blockquote>

                    <p className="py-2">
                        Ideally, this isn&apos;t just a place for classified ads, but a community where people can
                        connect and help each other through an open and fair marketplace.
                    </p>
                    <p className="py-2">
                        At the moment we have no church sponsors, but many of our local San Diego churches could
                        benefit from member classifieds, including&nbsp;
                        <a target="_blank" className="border-b border-dashed border-neutral-400" href="https://www.captivatesd.com/">Captivate</a>,&nbsp;
                        <a target="_blank" className="border-b border-dashed border-neutral-400" href="https://shadowmountain.org/">Shadow Mountain</a>,&nbsp;
                        <a target="_blank" className="border-b border-dashed border-neutral-400" href="https://www.sdrock.com/">The Rock</a>,
                        and many others.
                    </p>

                    <h1 className="text-xl font-normal py-5">Running this site</h1>

                    <p className="py-2">
                        This is an <a href="https://en.wikipedia.org/wiki/Open_source" target="_blank" className="border-b border-dashed border-neutral-400"><strong>open source</strong></a> project,
                        and we welcome contributions from anyone, technical or not. If you found a bug or are interested in helping out,
                        please reach out on <strong>Github</strong> using the links below.
                    </p>

                    <p className="py-2">
                        <strong>Running this website</strong> does in fact cost money, so if you would like to help out, please consider
                        donating to the project. Unfortunately, <strong>servers are expensive</strong> and we&apos;re not making any money here :)
                    </p>

                    <div className="text-center">
                        <a className="inline-flex uppercase px-4 py-2 rounded items-center bg-yellow-300 hover:bg-amber-300 border border-amber-400" target="_blank" href="https://www.buymeacoffee.com/felipemullen">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className="h-5 mr-2" src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee" />
                            <span className="font-semibold">Support this site $5</span>
                        </a>
                    </div>
                    <div className="flex items-center justify-center m-2 space-x-2">
                        <a href="https://github.com/felipemullen/keep-nothing" className="text-sm px-2 py-1 fs-2 text-white border border-neutral-400 hover:text-neutral-700 border bg-neutral-700 hover:bg-neutral-300 rounded-sm flex items-center">
                            <FeatherIcon className="me-1" name="github" size={14} />GitHub
                        </a>
                        <a href="https://github.com/felipemullen/keep-nothing/issues/new" className="text-sm px-2 py-1 fs-2 border border-neutral-400 hover:border-neutral-700 hover:bg-neutral-200 rounded-sm flex items-center">
                            <FeatherIcon className="me-1" name="trello" size={14} />Report a Bug
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}