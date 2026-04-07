import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Bot, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { knowledgeBase, findKnowledgeBaseAnswer } from '@/lib/knowledgeBase';
import { supabase } from '@/integrations/supabase/client';

interface Msg {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME: Msg = {
  role: 'assistant',
  content:
    "Hi! I'm Krishnan's AI assistant. Ask me anything about divorce recovery, breakup healing, life coaching, or working with India's First Divorce Coach. How can I help you today?",
};

const SYSTEM_PROMPT = `You are Krishnan Govindan's AI assistant. Krishnan is India's First Divorce Coach, Life Strategist, and CEO of India Therapist. He helps people heal after divorce, breakups, and major life transitions. Use the knowledge base below to answer questions accurately and empathetically. Always be warm, supportive, and recommend booking a session for personalized help when appropriate.

KNOWLEDGE BASE:
${knowledgeBase}`;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Msg = { role: 'user', content: text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Call the Supabase Edge Function proxy — API key stays server-side
      const { data, error } = await supabase.functions.invoke('openai-chat', {
        body: {
          systemPrompt: SYSTEM_PROMPT,
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: text },
          ],
        },
      });

      if (error || !data?.reply) {
        // Fallback to local knowledge base if edge function fails
        const reply = findKnowledgeBaseAnswer(text);
        setMessages((m) => [...m, { role: 'assistant', content: reply }]);
      } else {
        setMessages((m) => [
          ...m,
          { role: 'assistant', content: data.reply as string },
        ]);
      }
    } catch {
      // Graceful fallback
      const reply = findKnowledgeBaseAnswer(text);
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-500/30 flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Open chat"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[calc(100vh-8rem)] bg-slate-900/95 backdrop-blur border border-purple-400/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-gradient-to-r from-purple-600/30 to-pink-600/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Coach Krishnan AI</h3>
                <p className="text-xs text-purple-200">India's First Divorce Coach</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    m.role === 'user'
                      ? 'bg-purple-500/30'
                      : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  }`}
                >
                  {m.role === 'user' ? (
                    <UserIcon className="w-4 h-4 text-purple-200" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                    m.role === 'user'
                      ? 'bg-purple-500/30 text-white rounded-tr-sm'
                      : 'bg-white/10 text-purple-50 rounded-tl-sm'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="px-3 py-2 rounded-2xl bg-white/10 text-purple-200 text-sm">
                  Thinking…
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-white/10 bg-slate-900/80">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask about divorce recovery…"
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-purple-300/50 focus:outline-none focus:border-purple-400"
                disabled={loading}
              />
              <Button
                onClick={send}
                disabled={loading || !input.trim()}
                size="icon"
                className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
