import React, { useState, useEffect } from 'react';

const PWAInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [platform, setPlatform] = useState('other');

    useEffect(() => {
        // Detect Platform
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIOS = /iphone|ipad|ipod/.test(userAgent);
        const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);

        if (isIOS) {
            setPlatform('ios');
        } else {
            setPlatform('android');
        }

        // Check if already dismissed
        const isDismissed = localStorage.getItem('pwa_prompt_dismissed');
        const now = new Date().getTime();

        // Show after 10 seconds of use, if not dismissed or dismissal expired (7 days)
        const canShow = !isDismissed || (now - parseInt(isDismissed) > 7 * 24 * 60 * 60 * 1000);

        const timer = setTimeout(() => {
            if (canShow && !window.matchMedia('(display-mode: standalone)').matches) {
                if (isIOS) {
                    setIsVisible(true);
                }
            }
        }, 10000);

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            if (canShow) {
                setIsVisible(true);
            }
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setIsVisible(false);
            setDeferredPrompt(null);
        }
    };

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('pwa_prompt_dismissed', new Date().getTime().toString());
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-24 left-4 right-4 z-[100] sm:bottom-10 sm:left-auto sm:right-10 sm:max-w-sm animate-bounce-in">
            <div className="cartoon-card bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] p-5 shadow-[8px_8px_0px_#000] relative">
                {/* Close Button */}
                <button
                    onClick={handleDismiss}
                    className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center border-2 border-white font-bold hover:scale-110 transition-transform"
                >
                    ×
                </button>

                <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-white border-4 border-black rounded-2xl flex-shrink-0 flex items-center justify-center shadow-[4px_4px_0px_#000] overflow-hidden">
                        <img src="/icon-192.png" alt="KakiJimat Icon" className="w-12 h-12" />
                    </div>

                    <div>
                        <h4 className="font-black text-lg text-black leading-tight">Get the App!</h4>
                        <p className="text-sm font-bold text-black/80 mt-1">
                            {platform === 'ios'
                                ? "Tap 'Share' and then 'Add to Home Screen' to save money on the go!"
                                : "Install KakiJimat for a better experience!"}
                        </p>
                    </div>
                </div>

                {platform === 'android' && deferredPrompt && (
                    <button
                        onClick={handleInstallClick}
                        className="cartoon-btn w-full mt-4 bg-black text-white py-2 text-sm"
                    >
                        Install KakiJimat
                    </button>
                )}

                {platform === 'ios' && (
                    <div className="mt-3 flex items-center justify-center gap-2 text-xs font-black bg-black/10 py-2 rounded-lg border-2 border-black/20">
                        <span>Share</span>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 11V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>→ Add to Home Screen</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PWAInstallPrompt;
