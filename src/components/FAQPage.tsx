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
    <div className="pt-20 pb-12">
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
  );
};

export default FAQPage;