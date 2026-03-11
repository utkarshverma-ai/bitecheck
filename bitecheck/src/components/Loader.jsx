import React from 'react';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-ping"></div>
                </div>
            </div>
            <p className="text-emerald-800 font-bold tracking-widest text-xs uppercase animate-pulse">
                Fetching Fresh Data...
            </p>
        </div>
    );
};

export default Loader;
