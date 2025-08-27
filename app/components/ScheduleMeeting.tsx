'use client'
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { CheckTick } from "../ui/icons/CheckTick";
import { CalenderIcon } from "../ui/icons/CalenderIcon";

export default function ScheduleMeeting() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"intro-call"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])

  return (
    <div className="mt-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full opacity-60"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full opacity-40"></div>
      
      <div className="relative p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-blue-200/50 dark:border-blue-800/50 shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Header with Icon */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gray-900 dark:bg-gray-100 rounded-xl flex items-center justify-center shadow-lg group">
            <CalenderIcon color="white" extraClass="dark:stroke-gray-900 group-hover:scale-110 transition-transform duration-300"/>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              Let&apos;s Connect
            </h3>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 leading-tight">
              1:1 Direct Call
            </span>
          </div>
        </div>
        
        {/* Description */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <CheckTick/>
            Skip back-and-forth emails
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <CheckTick/>
            Discuss opportunities & ideas
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <CheckTick/>
            Quick 15-minute call
          </div>
        </div>

        {/* CTA Button */}
        <button 
          data-cal-namespace="intro-call"
          data-cal-link="itsrahullalwani/intro-call"
          data-cal-config='{"layout":"month_view"}'
          className="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-800 dark:hover:bg-light-border focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition-all duration-300 flex items-center justify-center gap-3 group transform hover:-translate-y-1"
        >
          <span className="text-lg">Book Your Slot</span>
          <svg className="w-5 h-5 transform transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
          </svg>
        </button>
        
        {/* Bottom Note */}
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
          Pick your time • Let&apos;s chat
        </p>
      </div>
    </div>
  )
}
