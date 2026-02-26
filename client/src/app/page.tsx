"use client";

import Link from 'next/link';
import { CheckCircle, Layout, Shield, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">TaskManager</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
              <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
              <Link href="/login" className="hover:text-blue-600 transition-colors">Sign In</Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-8 animate-fade-in">
            <Zap className="w-3 h-3" />
            <span>Experience the future of productivity</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            Manage tasks with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Unmatched Precision.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10 leading-relaxed">
            A production-grade task management system designed for high-performance teams.
            Secure, beautiful, and blazingly fast.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 transform hover:-translate-y-1"
            >
              Start for Free
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-bold border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-all transform hover:-translate-y-1"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <Shield className="text-blue-600 w-6 h-6 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Enterprise Security</h3>
              <p className="text-gray-600">
                AES-256-CBC encryption for sensitive data and JWT authentication in HTTP-only cookies.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                <Layout className="text-indigo-600 w-6 h-6 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Intuitive UI</h3>
              <p className="text-gray-600">
                Modern dashboard with real-time filtering, search, and seamless pagination.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <Zap className="text-emerald-600 w-6 h-6 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Modular Design</h3>
              <p className="text-gray-600">
                Built with Next.js App Router and Clean Backend Architecture for extreme scalability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} TaskManager Pro. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
            `}</style>
    </div>
  );
}
