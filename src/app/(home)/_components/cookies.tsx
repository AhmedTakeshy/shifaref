"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useGetCookie, useSetCookie } from 'cookies-next/client';
import { GoogleAnalytics } from '@next/third-parties/google';

type CookiesProps = {
    cookie: string;
};
export default function Cookies({ cookie }: CookiesProps) {
    const [cookieState, setCookieState] = useState<string>(cookie);
    const getCookie = useGetCookie();
    const setCookie = useSetCookie();
    useEffect(() => {
        const state = getCookie('cookie-consent-state');
        setCookieState(state || 'not-answered');
    }, [getCookie]);

    const handleConsent = (state: string) => {
        setCookie('cookie-consent-state', state);
        setCookieState(state);
    };

    if (cookieState === null) {
        return null;
    }

    if (cookieState === 'not-answered') {
        return (
            <div className="fixed sm:bottom-6 bottom-0 sm:left-10 left-0 w-full sm:max-w-sm rounded-lg border p-6 shadow-lg z-[51] bg-light-green-90">
                <h2 className="text-xl font-semibold text-slate-700">🍪 Use of cookies</h2>
                <p className="mb-4 mt-2 text-slate-600">
                    We use our own and third-party cookies to improve your experience and our services by analyzing how you use our website. For more information, please read our{' '}
                    <Link
                        href="/policy"
                        className="cursor-pointer underline hover:text-blue-500"
                        target='_blank'
                        rel={"noopener noreferrer"}
                        aria-label="More info"
                        aria-description='More info about cookies'
                    >
                        Cookies Policy
                    </Link>
                </p>
                <div className="text-right">
                    <button
                        onClick={() => {
                            handleConsent('accepted');
                        }}
                        className="text-md inline-block rounded-lg px-4 py-1 text-right font-semibold text-dark-green-15 transition duration-500 hover:bg-dark-green-40"
                    >
                        Accept
                    </button>
                </div>
            </div>
        );
    }

    if (cookieState === 'accepted') {
        return <GoogleAnalytics gaId={`${process.env.GA_ID}`} />;
    }

    return null;
}

