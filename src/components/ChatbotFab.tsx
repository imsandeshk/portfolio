import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Send, X, Bot, Mail } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/contexts/ThemeContext";
import {
  getProfile,
  getProjects,
  getSkills,
  getEducation,
  getCertificates,
  getContact,
  Project,
  Skill,
  Education,
  Certificate,
} from "@/services/storageService";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  cta?: "contact";
  kind?: "projects" | "certificates";
  payload?: any[];
}

const ChatbotFab = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);

  const profile = useMemo(() => getProfile(), []);
  const projects = useMemo(() => getProjects(), []);
  const skills = useMemo(() => getSkills(), []);
  const education = useMemo(() => getEducation(), []);
  const certificates = useMemo(() => getCertificates(), []);
  const contact = useMemo(() => getContact(), []);

  useEffect(() => {
    if (!open) return;
    if (messages.length === 0) {
      setMessages([
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            `Hi! I'm Sandesh's assistant. Ask me about his skills, projects, education, or how to contact him.`,
        },
      ]);
    }
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const handleContactCTA = () => {
    setOpen(false);
    navigate("/", { replace: false });
    setTimeout(() => {
      const el = document.getElementById("contact");
      el?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const answerQuestion = (q: string): ChatMessage => {
    const text = q.toLowerCase();

    const reply = (
      content: string,
      options?: { cta?: "contact"; kind?: "projects" | "certificates"; payload?: any[] }
    ): ChatMessage => ({
      id: crypto.randomUUID(),
      role: "assistant",
      content,
      cta: options?.cta,
      kind: options?.kind,
      payload: options?.payload,
    });

    if (/(who are you|name|sandesh)/.test(text)) {
      return reply(`I'm an AI assistant for ${profile.name}, a ${profile.title}.`);
    }

    if (/(email|contact|reach|mail)/.test(text)) {
      return reply(`You can contact ${profile.name} at ${contact.email}.`, { cta: "contact" });
    }

    if (/(where|location|based)/.test(text)) {
      return reply(`${profile.name} is based in ${contact.location || profile.location || "Bengaluru"}.`);
    }

    if (/skill|stack|tech|tools/.test(text)) {
      const top = skills.slice(0, 10).map((s: Skill) => s.name).join(", ");
      return reply(`Key skills: ${top}.`);
    }

    if (/project|work|portfolio/.test(text)) {
      return reply("Here are Sandesh's projects. Swipe to explore.", {
        kind: "projects",
        payload: projects,
      });
    }

    if (/certificates?|achiev/.test(text)) {
      return reply("Certificates — swipe to see all.", {
        kind: "certificates",
        payload: certificates,
      });
    }

    if (/education|college|degree|stud/.test(text)) {
      const e = education[0] as Education | undefined;
      if (e) {
        return reply(`${e.degree} in ${e.field} at ${e.institution} (${new Date(e.startDate).getFullYear()}–${new Date(e.endDate).getFullYear()}).`);
      }
      return reply("Education details are not available right now.");
    }

    if (/resume|cv/.test(text)) {
      return reply("You can view the resume from the Resume page.");
    }

    return reply(
      "I can help with Sandesh's profile, skills, projects, or contact details. For other questions, please reach out via the Contact section.",
      "contact"
    );
  };

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    const delay = Math.min(1200, Math.max(500, trimmed.length * 30));
    setTimeout(() => {
      const aiMsg = answerQuestion(trimmed);
      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        aria-label="Open AI Chatbot"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
        style={{
          width: 56,
          height: 56,
          background:
            theme === "dark"
              ? "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)))"
              : "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
        }}
      >
        <Bot className="w-6 h-6 text-white mx-auto" />
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[min(420px,100vw)] p-0">
          <div className="flex h-full flex-col">
            <SheetHeader className="px-4 py-3 border-b border-white/10">
              <div className="flex items-center justify-between">
                <SheetTitle>Ask about Sandesh</SheetTitle>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </SheetHeader>

            {/* Messages */}
            <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-accent text-white"
                        : theme === "dark"
                        ? "bg-white/10 text-white"
                        : "bg-white text-foreground shadow"
                    }`}
                  >
                    <div>{m.content}</div>

                    {m.kind === "projects" && Array.isArray(m.payload) && (
                      <div className="mt-3 -mx-1">
                        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2">
                          {(m.payload as Project[]).map((p) => (
                            <a
                              key={p.id}
                              href={p.url || p.github || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="snap-start min-w-[220px] bg-background/30 rounded-xl border border-white/10 hover:border-accent/50 transition-colors p-3"
                            >
                              <div className="h-24 w-full rounded-lg overflow-hidden mb-2 bg-muted">
                                <img src={p.image || "/placeholder.svg"} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
                              </div>
                              <div className="font-medium text-sm line-clamp-1">{p.title}</div>
                              <div className="text-xs text-muted-foreground line-clamp-2">{p.description}</div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {m.kind === "certificates" && Array.isArray(m.payload) && (
                      <div className="mt-3 -mx-1">
                        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2">
                          {(m.payload as Certificate[]).map((c) => (
                            <div key={c.id} className="snap-start min-w-[220px] bg-background/30 rounded-xl border border-white/10 p-3">
                              <div className="h-24 w-full rounded-lg overflow-hidden mb-2 bg-muted">
                                <img src={c.image || "/placeholder.svg"} alt={c.title} loading="lazy" className="w-full h-full object-cover" />
                              </div>
                              <div className="font-medium text-sm line-clamp-1">{c.title}</div>
                              <div className="text-xs text-muted-foreground line-clamp-1">{c.issuer}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {m.cta === "contact" && (
                      <div className="mt-2">
                        <Button size="sm" variant="outline" onClick={handleContactCTA}>
                          <Mail className="w-4 h-4 mr-2" /> Contact
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className={`rounded-2xl px-3 py-2 text-sm ${theme === "dark" ? "bg-white/10 text-white" : "bg-white text-foreground shadow"}`}>
                    <span className="inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:120ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:240ms]" />
                    </span>
                  </div>
                </div>
              )}

              {messages.length === 0 && !typing && (
                <div className="text-sm text-muted-foreground">Start a conversation...</div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about skills, projects, contact..."
                />
                <Button onClick={sendMessage}>
                  <Send className="w-4 h-4 mr-1" />
                  Send
                </Button>
              </div>
              <div className="mt-2 text-[11px] text-muted-foreground">
                For non-profile questions, I’ll offer a quick contact option.
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ChatbotFab;
