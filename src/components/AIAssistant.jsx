import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, X, Minimize2, Maximize2, Zap } from 'lucide-react';

const SUGGESTED = [
  'What should I eat post-workout?',
  'How many calories for fat loss?',
  'Best protein sources for vegans?',
  'How to improve sleep quality?',
  'Create a 5-day workout plan',
];

const DEMO_CHAT = [
  { role: 'ai', text: "Hey Alex! 👋 I'm your AI fitness coach. I've analyzed your data — you're 84% to your calorie goal and crushed your protein target today! How can I help you?" },
  { role: 'user', text: 'What should I eat for dinner to hit my macros?' },
  { role: 'ai', text: "Based on your remaining macros (353 kcal, 38g protein, 55g carbs, 17g fat), I recommend:\n\n🍣 **Grilled Salmon (150g)** — 280 kcal, 36g protein\n🥗 **Mixed Greens Salad** — 45 kcal, 2g protein\n🍚 **Brown Rice (80g cooked)** — 105 kcal, 2g protein\n\nThis perfectly hits your remaining macros. Want me to add these to your food log?" },
];

const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 px-4 py-3 glass-card rounded-2xl rounded-bl-sm w-fit border border-[#EFE6DD]">
    {[0,1,2].map(i => (
      <div key={i} className={`w-2 h-2 rounded-full bg-[#C97B63] typing-dot`} style={{ animationDelay: `${i*0.2}s` }} />
    ))}
  </div>
);

function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState(DEMO_CHAT);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, {
        role: 'ai',
        text: "Great question! Based on your fitness profile and current progress, I've analyzed the best approach for you. Keep up the amazing work — you're on track to reach your goal in about 6 weeks! 💪 Want me to adjust your nutrition plan?"
      }]);
    }, 1800);
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[520px] z-50 flex flex-col glass-card border border-[#EFE6DD] shadow-lg rounded-2xl overflow-hidden bg-[#F8F5F0]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#DFD0C2] border-b border-black/5 flex-shrink-0">
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-[#C97B63] flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#7A9A82] rounded-full border-2 border-[#DFD0C2] animate-pulse" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-[#2B2B2B] text-sm">FitAI Coach</p>
          <p className="text-xs text-[#6B705C]">Online · Powered by AI</p>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-black/5 transition-colors text-[#9B8B7E] hover:text-[#2B2B2B] cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'ai' && (
              <div className="w-7 h-7 rounded-lg bg-[#C97B63] flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
            )}
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
              msg.role === 'user'
                ? 'bg-[#C97B63] text-white rounded-br-sm shadow-sm'
                : 'glass-card text-[#2B2B2B] rounded-bl-sm border border-[#EFE6DD]'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#C97B63] flex items-center justify-center flex-shrink-0">
              <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <TypingIndicator />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested prompts */}
      <div className="px-3 py-2 border-t border-black/5 flex gap-2 overflow-x-auto scrollbar-hide flex-shrink-0 bg-[#EFE6DD]/45">
        {SUGGESTED.slice(0,3).map((s) => (
          <button key={s} onClick={() => send(s)}
            className="flex-shrink-0 text-xs px-3 py-1.5 glass-card rounded-full text-[#9B8B7E] hover:text-[#2B2B2B] hover:border-[#C97B63]/30 border border-[#EFE6DD] transition-all cursor-pointer">
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-black/5 flex-shrink-0 bg-[#EFE6DD]/30">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask your AI coach..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send(input)}
            className="input-dark text-sm py-2 flex-1 bg-white border border-[#EFE6DD]"
            id="ai-chat-input"
          />
          <button onClick={() => send(input)}
            className="w-9 h-9 rounded-xl bg-[#C97B63] hover:bg-[#b86b53] flex items-center justify-center flex-shrink-0 transition-all cursor-pointer">
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AIAssistant() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6B705C]/3 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <span className="badge-cyan mb-3 inline-flex"><Sparkles className="w-3 h-3" /> AI Coach</span>
          <h2 className="section-title">Your <span className="gradient-text">AI Fitness</span> Coach</h2>
          <p className="text-[#9B8B7E] mt-2 max-w-xl mx-auto">
            Powered by advanced AI — get personalized advice, meal plans, and workout recommendations 24/7
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Features */}
          <div className="space-y-4">
            {[
              { icon: '🍎', title: 'Smart Nutrition Analysis', desc: 'AI analyzes your eating patterns and suggests optimal meal timing, portion sizes, and nutrient timing for peak performance.' },
              { icon: '💪', title: 'Adaptive Workout Plans', desc: 'Personalized training programs that evolve with you. The AI adjusts intensity, volume, and exercises based on your progress.' },
              { icon: '😴', title: 'Recovery Optimization', desc: 'Monitor sleep quality, HRV, and recovery metrics. The AI recommends optimal rest periods and active recovery activities.' },
              { icon: '📊', title: 'Predictive Goal Tracking', desc: 'AI forecasts your progress based on current trends and alerts you before you fall off track.' },
            ].map((feat, i) => (
              <div key={i} className="glass-card-hover p-5 flex items-start gap-4 border border-[#EFE6DD]">
                <div className="text-2xl flex-shrink-0">{feat.icon}</div>
                <div>
                  <p className="font-semibold text-[#2B2B2B] mb-1">{feat.title}</p>
                  <p className="text-sm text-[#9B8B7E] leading-relaxed font-sans">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Chat UI preview */}
          <div className="relative">
            <div className="glass-card border border-[#EFE6DD] shadow-md rounded-2xl overflow-hidden bg-[#F8F5F0]">
              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-4 bg-[#DFD0C2] border-b border-black/5">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-[#C97B63] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#7A9A82] rounded-full border-2 border-[#DFD0C2] animate-pulse" />
                </div>
                <div>
                  <p className="font-semibold text-[#2B2B2B]">FitAI Coach</p>
                  <p className="text-xs text-[#6B705C]">Online · Analyzing your data...</p>
                </div>
                <div className="ml-auto flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#C96363]/60" />
                  <div className="w-3 h-3 rounded-full bg-[#D4A373]/60" />
                  <div className="w-3 h-3 rounded-full bg-[#7A9A82]/60" />
                </div>
              </div>

              {/* Demo messages */}
              <div className="p-5 space-y-4 bg-black/5">
                {DEMO_CHAT.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                    {msg.role === 'ai' && (
                      <div className="w-7 h-7 rounded-lg bg-[#C97B63] flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-[#C97B63] text-white rounded-br-sm shadow-sm'
                        : 'glass-card text-[#2B2B2B] rounded-bl-sm border border-[#EFE6DD]'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggested prompts */}
              <div className="px-5 py-3 border-t border-black/5 bg-[#EFE6DD]/30">
                <p className="text-xs text-[#9B8B7E] mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED.slice(0,3).map(s => (
                    <button key={s} onClick={() => setChatOpen(true)}
                      className="text-xs px-3 py-1.5 glass-card rounded-full text-[#9B8B7E] hover:text-[#2B2B2B] hover:border-[#C97B63]/30 border border-[#EFE6DD] transition-all cursor-pointer">
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="px-5 py-4 border-t border-black/5 bg-[#EFE6DD]/45">
                <div className="flex gap-3">
                  <input placeholder="Ask about fitness & nutrition..." readOnly onClick={() => setChatOpen(true)}
                    className="input-dark text-sm flex-1 cursor-pointer bg-white border border-[#EFE6DD]" />
                  <button onClick={() => setChatOpen(true)}
                    className="w-10 h-10 rounded-xl bg-[#C97B63] flex items-center justify-center hover:bg-[#b86b53] transition-all cursor-pointer">
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Glow */}
            <div className="absolute inset-0 bg-[#C97B63]/5 rounded-2xl blur-2xl -z-10" />
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        id="open-ai-chat"
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl bg-[#C97B63] hover:bg-[#b86b53] flex items-center justify-center shadow-md hover:scale-110 transition-all duration-300 neon-pulse cursor-pointer"
      >
        {chatOpen ? <X className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-white" />}
      </button>

      {chatOpen && <ChatWindow onClose={() => setChatOpen(false)} />}
    </section>
  );
}
