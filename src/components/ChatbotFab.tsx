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
}

const ChatbotFab = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
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

    const reply = (content: string, cta?: "contact"): ChatMessage => ({
      id: crypto.randomUUID(),
      role: "assistant",
      content,
      cta,
    });

    if (/(who are you|name|sandesh)/.test(text)) {
      return reply(`I'm an AI assistant for ${profile.name}, a ${profile.title}.`);
    }

    if (/(email|contact|reach|mail)/.test(text)) {
      return reply(`You can contact ${profile.name} at ${contact.email}.`, "contact");
    }

    if (/(where|location|based)/.test(text)) {
      return reply(`${profile.name} is based in ${contact.location || profile.location || "Bengaluru"}.`);
    }

    if (/skill|stack|tech|tools/.test(text)) {
      const top = skills.slice(0, 10).map((s: Skill) => s.name).join(", ");
      return reply(`Key skills: ${top}.`);
    }

    if (/project|work|portfolio/.test(text)) {
      const pinned = projects.filter((p: Project) => p.pinned).slice(0, 3);
      if (pinned.length) {
        const lines = pinned.map((p) => `• ${p.title}${p.url ? ` — ${p.url}` : ""}`).join("\n");
        return reply(`Highlighted projects:\n${lines}`);
      }
      const lines = projects.slice(0, 3).map((p) => `• ${p.title}`).join("\n");
      return reply(`Some projects:\n${lines}`);
    }

    if (/certificates?|achiev/.test(text)) {
      const list = certificates.slice(0, 5).map((c: Certificate) => `• ${c.title} — ${c.issuer}`).join("\n");
      return reply(list ? `Certificates:\n${list}` : "No certificates available yet.");
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
    const aiMsg = answerQuestion(trimmed);
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
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
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-accent text-white"
                        : theme === "dark"
                        ? "bg-white/10 text-white"
                        : "bg-white text-foreground shadow"
                    }`}
                  >
                    {m.content}
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

              {messages.length === 0 && (
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
