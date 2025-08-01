import React, { useState } from 'react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is AquaLink?",
      answer: "AquaLink is a modern, lightweight audio streaming library specifically designed for Discord bots. It provides seamless audio playback functionality with high performance and easy integration."
    },
    {
      question: "How do I get started with AquaLink?",
      answer: "You can install AquaLink via npm with 'npm install aqualink' and start integrating it into your Discord bot immediately. Check out our documentation for detailed setup instructions and examples."
    },
    {
      question: "Is AquaLink free to use?",
      answer: "Yes, AquaLink is completely free and open source. You can use it in both personal and commercial Discord bot projects without any licensing fees."
    },
    {
      question: "What Discord.js versions does AquaLink support?",
      answer: "AquaLink is designed to work with modern Discord.js versions. Check our documentation for specific version compatibility and requirements."
    },
    {
      question: "Can I use AquaLink for music bots?",
      answer: "Absolutely! AquaLink is perfect for creating Discord music bots with features like queue management, audio streaming, and playback controls."
    },
    {
      question: "How does AquaLink handle audio streaming?",
      answer: "AquaLink provides efficient audio streaming with built-in queue management, seamless track transitions, and optimized performance for Discord's voice channels."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Animated network pattern background */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="rgba(59, 130, 246, 0.3)" className="animate-pulse">
                <animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="20" cy="20" r="1.5" fill="rgba(168, 85, 247, 0.4)" className="animate-pulse">
                <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="80" cy="30" r="1" fill="rgba(34, 197, 94, 0.3)">
                <animate attributeName="r" values="0.5;2;0.5" dur="5s" repeatCount="indefinite" />
              </circle>
              <line x1="20" y1="20" x2="50" y2="50" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.5">
                <animate attributeName="opacity" values="0;0.6;0" dur="3s" repeatCount="indefinite" />
              </line>
              <line x1="50" y1="50" x2="80" y2="30" stroke="rgba(168, 85, 247, 0.15)" strokeWidth="0.5">
                <animate attributeName="opacity" values="0.1;0.5;0.1" dur="4s" repeatCount="indefinite" />
              </line>
            </pattern>
            <radialGradient id="glow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#network)" />
          <rect width="100%" height="100%" fill="url(#glow)" />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/70 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-green-400/50 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute top-1/6 right-1/3 w-1 h-1 bg-cyan-400/60 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-1/4 left-1/6 w-2 h-2 bg-blue-300/40 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}></div>
      </div>

      {/* Dynamic gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/25 to-blue-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s', animationDuration: '6s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s', animationDuration: '5s'}}></div>
      </div>

      {/* Overlay for content readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-transparent to-slate-950/60" />
      
      <div className="relative z-10 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-5 mt-8">Frequently Asked Questions</h1>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about AquaLink for Discord bots
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden transition-all duration-500 ease-out hover:border-primary/40 hover:bg-card/70 hover:shadow-lg hover:shadow-primary/5 hover:scale-[1.01] group"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300 ease-out hover:bg-primary/5"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-foreground pr-4 transition-colors duration-300 group-hover:text-primary/90">
                      {faq.question}
                    </h3>
                    <div className={`transform transition-all duration-500 ease-out ${openIndex === index ? 'rotate-180 text-primary' : 'text-muted-foreground group-hover:text-primary/70'}`}>
                      <svg 
                        className="w-6 h-6 transition-all duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>
                <div 
                  className={`transition-all duration-500 ease-out ${
                    openIndex === index 
                      ? 'max-h-[500px] opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                  style={{
                    overflow: 'hidden'
                  }}
                >
                  <div className={`px-6 pb-6 transition-all duration-400 ease-out ${
                    openIndex === index ? 'translate-y-0' : '-translate-y-2'
                  }`}>
                    <div className="border-t border-border/30 pt-4">
                      <p className="text-muted-foreground leading-relaxed transition-all duration-300">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for?
            </p>
            <a 
              href="https://github.com/toddythenoobdud/aqualink/issues" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Ask a Question on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
