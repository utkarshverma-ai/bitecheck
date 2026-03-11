import React from 'react';
import { NavLink } from 'react-router-dom';
import { Github, Linkedin, Search, Globe, Mail } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-16">
                    {/* Column 1: Brand & Mission */}
                    <div className="md:col-span-5 space-y-6">
                        <NavLink to="/" className="flex items-center gap-2 group w-fit">
                            <div className="bg-emerald-600 text-white p-1.5 rounded-lg group-hover:bg-emerald-700 transition-colors">
                                <Search size={20} strokeWidth={2.5} />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-gray-900">
                                BiteCheck
                            </span>
                        </NavLink>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-medium">
                            Empowering consumers with real-time food transparency. We simplify complex nutritional data to help you make healthier, more informed choices for a better lifestyle.
                        </p>
                        <div className="flex items-center gap-4 text-gray-400">
                            <Globe size={18} />
                            <span className="text-xs font-bold uppercase tracking-widest">Global Data Partner</span>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="md:col-span-3 space-y-6">
                        <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Navigation</h4>
                        <ul className="space-y-4">
                            <li>
                                <NavLink to="/" className="text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg text-sm font-bold transition-all inline-block -ml-3">
                                    Product Explorer
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className="text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg text-sm font-bold transition-all inline-block -ml-3">
                                    Our Mission
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Professional Connect */}
                    <div className="md:col-span-4 space-y-6">
                        <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Connect</h4>
                        <div className="flex flex-col gap-4">
                            <a 
                                href="https://www.linkedin.com/in/utkarsh-verma-ooo1" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-gray-500 hover:text-[#0077b5] hover:bg-blue-50/50 px-3 py-2 rounded-xl transition-all group -ml-3"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-[#0077b5]/10">
                                    <Linkedin size={18} />
                                </div>
                                <span className="text-sm font-bold">LinkedIn Profile</span>
                            </a>
                            <a 
                                href="https://github.com/utkarshverma-ai" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-xl transition-all group -ml-3"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-gray-100">
                                    <Github size={18} />
                                </div>
                                <span className="text-sm font-bold">GitHub Repository</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-gray-50 flex flex-col md:row items-center justify-between gap-6">
                    <p className="text-gray-400 text-xs font-medium">
                        © {currentYear} BiteCheck. Built by <span className="text-gray-900 font-bold">Utkarsh Verma</span>.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Powered by</span>
                        <span className="text-xs font-black text-emerald-600 uppercase tracking-tighter">Open Food Facts</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
