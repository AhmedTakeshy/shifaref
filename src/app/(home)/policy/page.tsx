import Link from 'next/link'
import React from 'react'

export default function Policy() {
    return (
        <section className="container pt-20 flex flex-col">
            <h1 className="text-3xl font-semibold text-slate-900 mb-10">🍪 Cookies Policy</h1>
            <article className="flex flex-col space-y-6 p-4">
                <p className="text-sm text-gray-500">Last updated: January 22, 2025</p>
                <p className="text-gray-700">
                    This Cookies Policy explains what Cookies are and how We use them. You should read this policy so You can understand what type of cookies We use, or the information We collect using Cookies and how that information is used.
                </p>
                <p className="text-gray-700">
                    Cookies do not typically contain any information that personally identifies a user, but personal information that we store about You may be linked to the information stored in and obtained from Cookies. For further information on how We use, store, and keep your personal data secure, see our Privacy Policy.
                </p>
                <p className="text-gray-700">
                    We do not store sensitive personal information, such as mailing addresses, account passwords, etc., in the Cookies We use.
                </p>

                <h2 className="text-lg font-semibold text-gray-900">Interpretation and Definitions</h2>
                <h3 className="text-md font-medium text-gray-800">Interpretation</h3>
                <p className="text-gray-700">
                    The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                </p>
                <h3 className="text-md font-medium text-gray-800">Definitions</h3>
                <p className="text-gray-700">For the purposes of this Cookies Policy:</p>
                <ul className="list-disc pl-6 text-gray-700">
                    <li>
                        <strong>Company:</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Cookies Policy) refers to Shifaref.
                    </li>
                    <li>
                        <strong>Cookies:</strong> means small files that are placed on Your computer, mobile device, or any other device by a website, containing details of your browsing history on that website among its many uses.
                    </li>
                    <li>
                        <strong>Website:</strong> refers to Shifaref, accessible from{' '}
                        <Link
                            className="underline hover:text-blue-500"
                            href="https://shifaref.com"
                            rel="external nofollow noopener"
                            target="_blank"
                        >
                            https://shifaref.com
                        </Link>.
                    </li>
                    <li>
                        <strong>You:</strong> means the individual accessing or using the Website, or a company, or any legal entity on behalf of which such individual is accessing or using the Website, as applicable.
                    </li>
                </ul>

                <h2 className="text-lg font-semibold text-gray-900">The Use of Cookies</h2>
                <h3 className="text-md font-medium text-gray-800">Types of Cookies We Use</h3>
                <p className="text-gray-700">
                    Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.
                </p>
                <p className="text-gray-700">We use both session and persistent Cookies for the purposes set out below:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-4">
                    <li>
                        <p>
                            <strong>Necessary / Essential Cookies:</strong>
                        </p>
                        <p>Type: Session Cookies</p>
                        <p>Administered by: Us</p>
                        <p>
                            Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>Functionality Cookies:</strong>
                        </p>
                        <p>Type: Persistent Cookies</p>
                        <p>Administered by: Us</p>
                        <p>
                            Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.
                        </p>
                    </li>
                </ul>

                <h3 className="text-md font-medium text-gray-800">Your Choices Regarding Cookies</h3>
                <p className="text-gray-700">
                    If You prefer to avoid the use of Cookies on the Website, first You must disable the use of Cookies in your browser and then delete the Cookies saved in your browser associated with this website. You may use this option for preventing the use of Cookies at any time.
                </p>
                <p className="text-gray-700">
                    If You do not accept Our Cookies, You may experience some inconvenience in your use of the Website, and some features may not function properly.
                </p>
                <p className="text-gray-700">
                    If You&apos;d like to delete Cookies or instruct your web browser to delete or refuse Cookies, please visit the help pages of your web browser:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>
                        <p>
                            For Chrome: <Link className="underline hover:text-blue-500" href="https://support.google.com/accounts/answer/32050" rel="external nofollow noopener" target="_blank">Help Page</Link>
                        </p>
                    </li>
                    <li>
                        <p>
                            For Internet Explorer: <Link className="underline hover:text-blue-500" href="http://support.microsoft.com/kb/278835" rel="external nofollow noopener" target="_blank">Help Page</Link>
                        </p>
                    </li>
                    <li>
                        <p>
                            For Mozilla Firefox: <Link className="underline hover:text-blue-500" href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" rel="external nofollow noopener" target="_blank">Help Page</Link>
                        </p>
                    </li>
                    <li>
                        <p>
                            For Safari: <Link className="underline hover:text-blue-500" href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" rel="external nofollow noopener" target="_blank">Help Page</Link>
                        </p>
                    </li>
                </ul>

                <h3 className="text-md font-medium text-gray-800">More Information</h3>
                <p className="text-gray-700">
                    Learn more about cookies: <Link className="underline hover:text-blue-500" href="https://policies.google.com/technologies/cookies?hl=en-US" target="_blank">All About Cookies</Link>
                </p>
            </article>

        </section>
    )
}
