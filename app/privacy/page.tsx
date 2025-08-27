import { Calistoga } from "next/font/google";
import socialsData from "../../src/socials.json";

const giestCalistoga = Calistoga({
    variable: "--font-calistoga",
    weight: '400',
    subsets: ['latin'],
})

export default function Privacy(){
    const emailSocial = socialsData.socials.find(social => social.icon === 'mail');
    const websiteUrl = "https://rahullalwani.com";
    
    return (
        <div className="min-h-screen transition-all duration-100 dark:bg-background-black bg-white">
            <div className="max-w-3xl mx-auto p-4 pt-8 py-16">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className={`text-4xl font-bold text-black dark:text-white mb-4 ${giestCalistoga.className}`}>
                            Privacy Policy
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Last Updated: July 7, 2025
                        </p>
                    </div>

                    {/* Welcome Section */}
                    <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                        <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
                            About This Privacy Policy
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Welcome to my portfolio! I built{' '}
                            <a 
                                href={websiteUrl} 
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                rahullalwani.com
                            </a>
                            {' '}to showcase my development projects and connect with fellow developers. Your privacy matters to me, 
                            and this policy explains how I handle any information when you visit my site.
                        </p>
                    </section>

                    {/* What Information Section */}
                    <section>
                        <h2 className="text-2xl font-semibold text-black dark:text-white mb-6">
                            Information Collection Policy
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            My portfolio is designed with privacy in mind. As a developer, I understand the importance of data protection. 
                            This site operates as a static portfolio with minimal data collection - no user accounts, no tracking scripts, no data mining.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="border-l-4 border-blue-500 pl-6">
                                <h3 className="text-xl font-medium text-black dark:text-white mb-3">
                                    Interactive Features
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    When you interact with features like the chatbot assistant, conversations may be temporarily stored 
                                    for functionality purposes. I recommend avoiding sharing sensitive personal details in these interactions.
                                </p>
                            </div>
                            
                            <div className="border-l-4 border-purple-500 pl-6">
                                <h3 className="text-xl font-medium text-black dark:text-white mb-3">
                                    Scheduling & Meetings
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    When you schedule a meeting through the integrated Cal.com booking system, your scheduling data 
                                    is handled by Cal.com according to their privacy policy. Basic meeting details (time, date) may 
                                    be stored for calendar management and communication purposes.
                                </p>
                            </div>
                            
                            <div className="border-l-4 border-green-500 pl-6">
                                <h3 className="text-xl font-medium text-black dark:text-white mb-3">
                                    Communication
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    If you reach out through the contact form, email, or schedule a direct meeting, the information you choose to share is used 
                                    solely for responding to your inquiry and potential professional collaboration.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* How I Use Info Section */}
                    <section>
                        <h2 className="text-2xl font-semibold text-black dark:text-white mb-6">
                            How Information Is Used
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            Any information collected is used exclusively for the following purposes:
                        </p>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Maintaining website functionality and performance</span>
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Responding to professional inquiries and collaboration opportunities</span>
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Facilitating scheduled meetings and direct communication</span>
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Improving user experience based on constructive feedback</span>
                            </li>
                        </ul>
                    </section>

                    {/* Sharing Info Section */}
                    <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-8">
                        <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
                            Data Sharing Policy
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Your information stays private. I do not sell, lease, or share personal information with third parties. 
                            This portfolio operates independently without external tracking or advertising networks. If you accidentally 
                            share sensitive information, please contact me immediately and I&apos;ll help address the situation.
                        </p>
                    </section>

                    {/* Security Section */}
                    <section>
                        <h2 className="text-2xl font-semibold text-black dark:text-white mb-6">
                            Security Measures
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            I implement reasonable security measures to protect any information shared with me. However, 
                            as any security professional will tell you, no online system can guarantee 100% security. 
                            I encourage you to use discretion when sharing personal information online.
                        </p>
                    </section>

                    {/* Policy Updates Section */}
                    <section>
                        <h2 className="text-2xl font-semibold text-black dark:text-white mb-6">
                            Policy Updates
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            This privacy policy is effective as of July 7, 2025. I may update this policy occasionally to reflect 
                            changes in my practices or for legal compliance. Any significant changes will be clearly communicated, 
                            and I&apos;ll update the revision date at the top of this page.
                        </p>
                    </section>

                    {/* Contact Section */}
                    <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8">
                        <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
                            Questions or Concerns?
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            If you have questions about this privacy policy, concerns about your data, or suggestions for improvement, 
                            I&apos;m always happy to discuss. You can reach out through:
                        </p>
                        <div className="space-y-2 text-gray-700 dark:text-gray-300">
                            <p>
                                📧 Email:{' '}
                                <a 
                                    href={emailSocial?.href || "mailto:itsrahullalwani@gmail.com"} 
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium underline"
                                >
                                    {emailSocial?.href.replace('mailto:', '') || "itsrahullalwani@gmail.com"}
                                </a>
                            </p>
                            <p>
                                📅 Schedule a quick call through the contact page for immediate discussion
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}