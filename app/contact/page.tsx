'use client'
import { Calistoga } from "next/font/google"
import { useState } from "react"
import Link from "next/link"
import socialsData from "../../src/socials.json"

const giestCalistoga = Calistoga({
    variable: "--font-calistoga",
    weight: '400',
    subsets: ['latin'],
})

export default function Contact(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const emailSocial = socialsData.socials.find(social => social.icon === 'mail')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('idle')
        
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                }),
            })

            if (response.ok) {
                setSubmitStatus('success')
                setFormData({ name: '', email: '', message: '' })
            } else {
                setSubmitStatus('error')
            }
        } catch (e) {
            setSubmitStatus('error')
            console.log(e)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-3xl m-auto p-4 pt-8 pb-8">
            <h1 className={`font-bold text-5xl dark:text-white text-black mb-8 ${giestCalistoga.className}`}>
                Contact me
            </h1>
            
            <div className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-light-border dark:border-gray-200 bg-white dark:bg-background-black text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all duration-200"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-light-border dark:border-gray-200 bg-white dark:bg-background-black text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Message Field */}
                    <div>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Leave feedback about the site, career opportunities or just to say hello etc."
                            required
                            rows={6}
                            className="w-full px-4 py-3 rounded-lg border border-light-border dark:border-gray-200 bg-white dark:bg-background-black text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all duration-200 resize-vertical"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 dark:hover:bg-light-border focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <svg className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M5 12h16" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                            <p className="text-green-800 dark:text-green-200 font-medium">
                                Message sent successfully! I&apos;ll get back to you soon.
                            </p>
                        </div>
                    )}
                    
                    {submitStatus === 'error' && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-red-800 dark:text-red-200 font-medium">
                                Something went wrong. Please try again or email me directly.
                            </p>
                        </div>
                    )}
                </form>

                {/* Privacy Policy Link */}
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    By submitting this form, I agree to the{' '}
                    <Link 
                        href="/privacy" 
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
                    >
                        privacy policy
                    </Link>
                    .
                </div>

                {/* Alternative Contact */}
                <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-light-border dark:border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Prefer email?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                        You can also reach me directly at:
                    </p>
                    <a 
                        href={emailSocial?.href || "mailto:itsrahullalwani@gmail.com"}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium underline transition-colors"
                    >
                        {emailSocial?.href.replace('mailto:', '') || "itsrahullalwani@gmail.com"}
                    </a>
                </div>
            </div>
        </div>
    )
}