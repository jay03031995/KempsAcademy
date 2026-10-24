"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { LinkifiedText } from "./LinkifiedText";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Which courses match an MBBS qualification?",
  "What workshops run under 3 days?",
  "Which programmes include supervised practical sessions?",
];

export function AskKemps({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [notConfigured, setNotConfigured] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function ask(question: string) {
    if (!question.trim() || loading) return;
    setError("");
    const nextMessages: Message[] = [...messages, { role: "user", content: question }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask-kemps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history: messages.slice(-6) }),
      });
      const json = await res.json();

      if (json.configured === false) {
        setNotConfigured(true);
        setLoading(false);
        return;
      }
      if (!res.ok || json.error) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      setMessages([...nextMessages, { role: "assistant", content: json.answer }]);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-charcoal/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <DialogPanel className="w-full sm:max-w-lg h-[85vh] sm:h-[600px] bg-white rounded-t-2xl sm:rounded-2xl shadow-[var(--shadow-card-hover)] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-blush px-5 py-4">
            <div>
              <Dialog.Title className="font-semibold text-plum">Ask Kemps</Dialog.Title>
              <p className="text-xs text-charcoal-muted">AI-generated answers from published Kemps content</p>
            </div>
            <button type="button" onClick={onClose} aria-label="Close Ask Kemps" className="rounded-full p-2 hover:bg-blush">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {notConfigured ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <p className="font-medium text-charcoal">Ask Kemps isn&apos;t set up yet.</p>
              <p className="text-sm text-charcoal-muted max-w-xs">
                The AI assistant needs an API key configured by the site admin. Use the search icon in the header to
                search courses, workshops, and trainers by keyword instead.
              </p>
            </div>
          ) : (
            <>
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
                {messages.length === 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-charcoal-muted">Try asking:</p>
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => ask(s)}
                        className="text-left text-sm rounded-xl border border-blush px-3 py-2 hover:bg-blush transition-colors duration-150"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user" ? "self-end bg-plum text-white" : "self-start bg-blush text-charcoal"
                  }`}>
                    {m.role === "assistant" && <span className="block text-[10px] uppercase tracking-wide text-gold-dark mb-1">AI-generated</span>}
                    <LinkifiedText text={m.content} />
                  </div>
                ))}
                {loading && <div className="self-start text-sm text-charcoal-muted">Thinking…</div>}
                {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
              </div>

              <form
                onSubmit={(e) => { e.preventDefault(); ask(input); }}
                className="border-t border-blush p-3 flex gap-2"
              >
                <label htmlFor="ask-kemps-input" className="sr-only">Ask a question</label>
                <input
                  id="ask-kemps-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about courses, eligibility, batches…"
                  className="flex-1 rounded-full border border-blush px-4 py-2.5 text-sm focus-visible:outline-2"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="rounded-full bg-plum text-white px-4 py-2.5 text-sm font-medium hover:bg-plum-dark transition-colors duration-200 disabled:opacity-60"
                >
                  Ask
                </button>
              </form>
            </>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
