import React, { useState } from 'react';
import {
  MessageSquareCode,
  Send,
  Sparkles,
  Bot,
  User,
  HelpCircle,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const CounselorChatPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: 'counselor',
      text: `Hello ${user?.name || 'there'}! 👋 I am your **Campus Placement AI Advisor**. 
      
Ask me anything about:
• Explaining CGPA dips or backlogs in interviews
• Structuring the 90-second "Tell me about yourself" elevator pitch
• Product-based vs. Service-based company interview preparation
• Handling behavioral questions with the **STAR Method**
• What to do if you don't have prior internship experience`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    'How should I explain a drop in my CGPA during 3rd semester?',
    'Tell me about yourself formula for college freshers',
    'What is the difference between Product and Service company interviews?',
    'Can I crack a 15+ LPA offer without prior internships?',
    'How to answer "Why our company?" without sounding generic',
  ];

  const handleSend = async (questionText) => {
    const query = questionText || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const data = await api.askCounselor(query.trim());
      const counselorMsg = {
        sender: 'counselor',
        text: data.answer,
        relatedTopics: data.relatedTopics,
      };
      setMessages((prev) => [...prev, counselorMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'counselor',
          text: 'Unable to reach the counselor server right now. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-slate-900">Campus Placement AI Advisor</h1>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
            Interactive Mentor
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Instant answers to college recruitment dilemmas, HR round strategies, and career roadmap queries.
        </p>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Popular queries:</span>
        </span>
        {suggestedQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition font-medium shadow-2xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col h-[540px] overflow-hidden">
        {/* Messages scroll area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m, idx) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={idx}
                className={`flex items-start space-x-3 ${
                  isUser ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold shadow-xs ${
                    isUser
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-900 text-white'
                  }`}
                >
                  {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-blue-400" />}
                </div>

                <div
                  className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-blue-700 text-white rounded-tr-none'
                      : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-none whitespace-pre-line'
                  }`}
                >
                  {m.text}

                  {m.relatedTopics && m.relatedTopics.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200/60">
                      <div className="text-[11px] font-bold text-slate-500 mb-1.5 uppercase">
                        Explore Follow-ups:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {m.relatedTopics.map((topic, tIdx) => (
                          <button
                            key={tIdx}
                            onClick={() => handleSend(topic)}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-blue-700 hover:bg-blue-50 transition"
                          >
                            {topic} →
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center space-x-3 text-xs text-slate-500">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <Bot className="w-4 h-4 text-blue-400" />
              </div>
              <div className="bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 flex items-center space-x-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                <span>Placement advisor is typing recommendations...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Ask any campus placement question (e.g. How to prepare for TCS Digital vs Google?)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-5 py-3 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm transition flex items-center space-x-1.5 disabled:opacity-50 shadow-xs"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
