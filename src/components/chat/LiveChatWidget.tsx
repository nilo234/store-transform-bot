import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hi there! Welcome to Neuvie. How can I help you today?",
    isBot: true,
    timestamp: new Date(),
  },
];

const quickReplies = [
  "Track my order",
  "Product questions",
  "Returns & refunds",
  "Speak to human",
];

const botResponses: Record<string, string> = {
  'track my order': "To track your order, please visit our shipping page or check your email for tracking information. Need more help? Type 'human' to speak with our team!",
  'product questions': "I'd be happy to help with product questions! What would you like to know about our oral strips? You can ask about ingredients, usage, or benefits.",
  'returns & refunds': "We offer a 14-day money-back guarantee on all products. Simply email team@tryneuvie.com with your order number to start a return. Full refund, no questions asked!",
  'speak to human': "I'll connect you with our support team! Please email team@tryneuvie.com or leave your message here and we'll respond within 24 hours.",
  'human': "I'll connect you with our support team! Please email team@tryneuvie.com or leave your message here and we'll respond within 24 hours.",
};

export function LiveChatWidget() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const isHomePage = location.pathname === '/';

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let response = "Thanks for your message! Our team will get back to you soon. For immediate assistance, email team@tryneuvie.com.";

      // Check for matching responses
      for (const [key, value] of Object.entries(botResponses)) {
        if (lowerText.includes(key)) {
          response = value;
          break;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    const confirmMessage: Message = {
      id: Date.now().toString(),
      text: `Thanks ${formData.name}! We've received your message and will reply to ${formData.email} within 24 hours.`,
      isBot: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, confirmMessage]);
    setShowForm(false);
    setFormData({ name: '', email: '', message: '' });
  };

  if (!isHomePage) return null;

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
            aria-label="Open chat"
          >
            <MessageCircle className="h-6 w-6" />
            {/* Notification dot */}
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-accent rounded-full border-2 border-background" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
            style={{ height: '500px', maxHeight: 'calc(100vh - 6rem)' }}
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold">Neuvie Support</h3>
                  <p className="text-xs text-primary-foreground/70 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    Online now
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      message.isBot
                        ? 'bg-muted text-foreground rounded-bl-none'
                        : 'bg-primary text-primary-foreground rounded-br-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-muted-foreground/50 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Replies */}
              {messages.length === 1 && !isTyping && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-xs font-medium transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              {/* Contact Form */}
              {showForm && (
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmitForm}
                  className="bg-muted/50 rounded-xl p-4 space-y-3"
                >
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-10"
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-10"
                  />
                  <Textarea
                    placeholder="Your message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="min-h-[80px] resize-none"
                  />
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </motion.form>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                  className="flex-1 h-11"
                />
                <Button
                  size="icon"
                  onClick={() => handleSend(input)}
                  disabled={!input.trim()}
                  className="h-11 w-11 rounded-full"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="w-full text-xs text-muted-foreground hover:text-primary mt-2 transition-colors"
              >
                {showForm ? 'Hide contact form' : 'Or leave us a message →'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
