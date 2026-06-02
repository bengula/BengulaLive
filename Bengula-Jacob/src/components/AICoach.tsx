/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { User, Send, Bot, Sparkles, AlertCircle, RefreshCw, Layers, CheckCircle2, UserCircle } from 'lucide-react';
import { ChatMessage, UserFinanceProfile } from '../types';
import { getCoachReply } from '../data/coachKnowledge';
import { images } from '../data/media';

export default function AICoach() {
  const [profile, setProfile] = useState<UserFinanceProfile>({
    name: "Wanjiku",
    age: "30",
    monthlySavings: "20,000",
    goal: "Sovereign Debt Passive Income",
    riskTolerance: "Moderate (Diversified wealth)"
  });

  const [profileSaved, setProfileSaved] = useState<boolean>(true);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize with greeting based on user profile
  useEffect(() => {
    const greeting = `Habari ${profile.name}!

I am the **Bengula Jacob Wealth Coach** — a curated guide to Kenyan markets drawn from Jacob's advisory playbook. I answer from a built-in knowledge base (no internet required), so for anything specific to your situation, **book a consultation** and Jacob will review it personally.

Based on your target goal of **\"${profile.goal}\"** and monthly saving block of **KSh ${profile.monthlySavings}**, we have a prime foundation to compile wealth safely!

**How would you like to start our financial education session today?** Feel free to ask me:
1. *How do I open a Central Bank CDS Account online through DhowCSD?*
2. *Can you explain the withholding tax protocol on standard bonds versus IFBs?*
3. *How should I divide KSh ${profile.monthlySavings} between Money Market Funds and Treasury Bills?*`;

    setMessages([
      {
        id: "greet-1",
        role: "assistant",
        content: greeting,
        timestamp: new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [profileSaved]); // Reset conversations if profile undergoes adjustments

  // Auto scroll to chat end
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (e?: React.FormEvent, predefinedWord?: string) => {
    e?.preventDefault();
    const query = predefinedWord || inputText;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);
    setErrorText('');

    // Offline, fully client-side responder — no API key or backend required.
    const replyText = getCoachReply(query, {
      name: profile.name,
      monthlySavings: profile.monthlySavings,
    });

    // Small delay to keep the conversational feel of the typing indicator.
    window.setTimeout(() => {
      setMessages(prev => [...prev, {
        id: "bot-" + Date.now(),
        role: "assistant",
        content: replyText,
        timestamp: new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })
      }]);
      setLoading(false);
    }, 600);
  };

  const quickPrompts = [
    "DhowCSD Setup Guidelines",
    "Bond Tax witholding rule",
    "T-Bills vs Money Market Funds",
    "Bengula Syndicate eligibility"
  ];

  // Manual fast Markdown wrapper to bold titles, handle bullets and lists beautifully
  const formatAIResponse = (text: string) => {
    return text.split('\n').map((line, index) => {
      let trimmed = line.trim();
      
      // Headers
      if (trimmed.startsWith('###')) {
        return (
          <h4 key={index} className="text-sm font-bold text-slate-900 pt-3 pb-1 border-b border-slate-200">
            {trimmed.replace('###', '').trim()}
          </h4>
        );
      }
      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        return (
          <p key={index} className="text-slate-900 font-bold text-xs mt-2">
            {trimmed.replace(/\*\*/g, '')}
          </p>
        );
      }

      // Check bullet items
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const content = trimmed.substring(2);
        return (
          <li key={index} className="list-disc list-inside text-slate-650 ml-4 text-xs leading-relaxed my-1 font-medium">
            {content.includes('**') ? (
              <span>
                <strong>{content.split('**')[1]}</strong>{content.split('**')[2] || ''}
              </span>
            ) : content}
          </li>
        );
      }

      // Numerics lists
      if (/^\d+\.\s/.test(trimmed)) {
        const content = trimmed.replace(/^\d+\.\s/, '');
        const number = trimmed.match(/^\d+/)?.[0] || '1';
        return (
          <li key={index} className="list-decimal list-inside text-slate-650 ml-4 text-xs leading-relaxed my-1 font-medium">
            <span className="font-extrabold text-blue-900 mr-1">{number}.</span>
            {content.includes('**') ? (
              <span>
                <strong>{content.split('**')[1]}</strong>{content.split('**')[2] || ''}
              </span>
            ) : content}
          </li>
        );
      }

      // Simple paragraphs
      return (
        <p key={index} className="text-xs text-slate-600 leading-relaxed font-normal my-1">
          {trimmed.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-slate-900 font-bold">{part}</strong> : part)}
        </p>
      );
    });
  };

  return (
    <div id="ai-coach-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
      
      {/* Target Profile customization */}
      <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        {/* Education banner */}
        <div className="relative h-28">
          <img
            src={images.education}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/55 to-transparent"></div>
          <span className="absolute bottom-3 left-6 text-[10px] font-bold text-amber-300 uppercase tracking-widest font-mono">Offline Wealth Coach</span>
        </div>

        <div className="p-6 md:p-8 space-y-4">
        <div className="border-b border-slate-150 pb-3">
          <h3 className="text-base font-bold text-blue-900 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-900" />
            Coaching Persona File
          </h3>
          <p className="text-[10px] text-slate-500 mt-0.5 font-medium leading-normal">
            Personalize your current financial numbers. The AI Coach adapts its sovereign models directly matching these data tiers.
          </p>
        </div>

        {profileSaved ? (
          // Saved Profile display
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-xs shadow-inner">
              <div className="flex justify-between items-center border-b border-slate-150 pb-2">
                <span className="text-slate-500 font-bold">Target User Title:</span>
                <span className="text-slate-900 font-extrabold">{profile.name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-150 pb-2">
                <span className="text-slate-500 font-bold">Planned Savings (Monthly):</span>
                <span className="text-emerald-700 font-extrabold font-mono">KSh {profile.monthlySavings}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-150 pb-2 border-b">
                <span className="text-slate-500 font-bold">Strategic Goal:</span>
                <span className="text-slate-800 font-bold text-right max-w-[150px] truncate">{profile.goal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold">Risk Segment:</span>
                <span className="text-slate-800 font-bold truncate">{profile.riskTolerance.split(' ')[0]}</span>
              </div>
            </div>

            <button
              id="btn-edit-coach-persona"
              onClick={() => setProfileSaved(false)}
              className="w-full py-2.5 px-3 rounded-lg border border-slate-205 text-xs text-slate-600 bg-slate-50 hover:text-blue-900 hover:bg-slate-100 transition flex items-center justify-center gap-1.5 cursor-pointer font-bold shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-blue-900" />
              <span>Adjust Persona Parameters</span>
            </button>
          </div>
        ) : (
          // Editable form
          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-slate-700 font-bold block">Your Preferred Name</label>
              <input
                id="input-persona-name"
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-205 focus:border-blue-900 focus:bg-white focus:ring-1 focus:ring-blue-900 rounded p-2 text-slate-800 focus:outline-none font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-bold block">Planned Savings (KSh / Month)</label>
              <input
                id="input-persona-savings"
                type="text"
                value={profile.monthlySavings}
                onChange={(e) => setProfile({ ...profile, monthlySavings: e.target.value })}
                className="w-full bg-slate-50 border border-slate-205 focus:border-blue-900 focus:bg-white focus:ring-1 focus:ring-blue-900 rounded p-2 text-slate-805 focus:outline-none font-mono font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-bold block">Investment Focus Goal</label>
              <select
                id="select-persona-goal"
                value={profile.goal}
                onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
                className="w-full bg-slate-50 border border-slate-205 focus:border-blue-900 focus:bg-white focus:ring-1 focus:ring-blue-900 rounded p-2 text-slate-800 focus:outline-none font-semibold cursor-pointer text-xs"
              >
                <option value="Sovereign Debt Passive Income">Sovereign Debt Passive Income</option>
                <option value="Syndicated Real Estate">Syndicated Real Estate</option>
                <option value="Starting Emergency Cushion">Starting Emergency Cushion</option>
                <option value="Long Term Blue-chip Stock Dividends">Long Term Stock Dividends</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-bold block">Risk Classification Tolerances</label>
              <select
                id="select-persona-risk"
                value={profile.riskTolerance}
                onChange={(e) => setProfile({ ...profile, riskTolerance: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-205 focus:border-blue-900 focus:bg-white focus:ring-1 focus:ring-blue-900 rounded p-2 text-slate-800 focus:outline-none cursor-pointer text-xs font-semibold"
              >
                <option value="Low (Bond/Treasury focus)">Low Capital Volatility Focus</option>
                <option value="Moderate (Diversified wealth)">Moderate Diversified Balance</option>
                <option value="High (Equities/Real estate)">High Alpha Alternative Assets</option>
              </select>
            </div>

            <button
              id="btn-save-coach-persona"
              onClick={() => setProfileSaved(true)}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-bold transition flex justify-center items-center gap-1 cursor-pointer shadow-md"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Apply & Reset Coach</span>
            </button>
          </div>
        )}
        </div>
      </div>

      {/* Main chat window */}
      <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl h-[480px] flex flex-col justify-between overflow-hidden relative shadow-sm">
        {/* Chat Title bar */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-900 animate-pulse" />
            <div>
              <span className="text-xs font-extrabold text-slate-900 block font-sans">Bengula Jacob Wealth Coach</span>
              <p className="text-[9px] text-slate-500 font-medium font-sans">Curated knowledge guide • Kenyan markets</p>
            </div>
          </div>
          <span className="text-[9px] bg-emerald-50 border border-emerald-200/50 text-emerald-800 py-0.5 px-2 rounded-full font-bold font-mono">Offline Knowledge Mode</span>
        </div>

        {/* Message logs */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-xs ${
                m.role === 'user' ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-blue-50 border-blue-105 text-blue-900'
              }`}>
                {m.role === 'user' ? <User className="w-4 h-4 text-slate-500" /> : <Bot className="w-4 h-4 text-blue-900" />}
              </div>
              <div className={`p-4.5 rounded-2xl text-xs space-y-1 border shadow-xs leading-relaxed font-normal ${
                m.role === 'user' 
                  ? 'bg-blue-900 text-white rounded-tr-none border-blue-900' 
                  : 'bg-slate-50 border-slate-201 text-slate-650 rounded-tl-none'
              }`}>
                {m.role === 'user' ? (
                  <p className="font-normal font-sans text-sm">{m.content}</p>
                ) : (
                  <div className="space-y-1.5 font-sans text-slate-700">
                    {formatAIResponse(m.content)}
                  </div>
                )}
                <span className={`text-[8px] text-right block pt-1.5 font-mono ${m.role === 'user' ? 'text-blue-100' : 'text-slate-400 font-medium'}`}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}

          {/* Prompting animation loader */}
          {loading && (
            <div className="flex gap-3 max-w-[85%] mr-auto">
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-blue-900 flex items-center justify-center animate-spin">
                <Sparkles className="w-4 h-4 text-blue-900" />
              </div>
              <div className="bg-slate-50 border border-slate-205 p-3 rounded-2xl rounded-tl-none animate-pulse flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-900 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-blue-900 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 bg-blue-900 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                <span className="text-[9px] font-extrabold text-slate-450 uppercase tracking-widest">Mapping Portfolios...</span>
              </div>
            </div>
          )}

          {errorText && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-xl text-xs flex gap-2 items-start max-w-sm mx-auto shadow-xs font-semibold">
              <AlertCircle className="w-4.5 h-4.5 shrink-0 text-red-600" />
              <div className="space-y-0.5">
                <p className="font-bold text-red-950">Analysis interruption</p>
                <p className="text-slate-550 text-[10px]">{errorText}</p>
              </div>
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        {/* Message Input Desk */}
        <div className="bg-slate-50 border-t border-slate-200 p-3 space-y-2">
          {/* Quick Prompts swiper chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={(e) => handleSendMessage(e, `Can you please detail: ${p}?`)}
                disabled={loading}
                className="bg-white hover:bg-blue-900 text-slate-600 hover:text-white border border-slate-200 hover:border-blue-900 px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition cursor-pointer shadow-xs"
              >
                {p}
              </button>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              id="input-ai-coach-message"
              type="text"
              disabled={loading}
              placeholder="Ask me anything: M-Akiba vs MMFs, DhowCSD accounts..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-white text-slate-800 text-xs py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 font-semibold"
            />
            <button
              id="btn-send-coach-msg"
              type="submit"
              disabled={loading}
              className="bg-blue-900 hover:bg-blue-800 text-white rounded-xl py-2 px-3.5 flex items-center justify-center cursor-pointer disabled:opacity-50 transition shadow-xs"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
