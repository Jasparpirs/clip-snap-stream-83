
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ArrowLeft, Send } from "lucide-react";

const contacts = [
  {
    id: "c1",
    name: "Alex Morgan",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Hey, did you see my new video?",
    timestamp: "2m ago",
    unread: true,
    online: true
  },
  {
    id: "c2",
    name: "Jamie Chen",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Thanks for the feedback on my stream",
    timestamp: "1h ago",
    unread: false,
    online: false
  },
  {
    id: "c3",
    name: "Taylor Swift",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "I'd love to collaborate on your next project!",
    timestamp: "3h ago",
    unread: true,
    online: true
  },
  {
    id: "c4",
    name: "Chris Evans",
    avatar: "https://i.pravatar.cc/150?img=4",
    lastMessage: "That video was amazing",
    timestamp: "1d ago",
    unread: false,
    online: false
  },
  {
    id: "c5",
    name: "Zoe Smith",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Let me know when you're free to chat",
    timestamp: "1d ago",
    unread: false,
    online: true
  }
];

// Sample messages for a conversation
const sampleMessages = [
  { id: 1, sender: "c1", text: "Hey, did you see my new video?", timestamp: "2:30 PM" },
  { id: 2, sender: "me", text: "Yes! It was amazing. I loved the editing!", timestamp: "2:32 PM" },
  { id: 3, sender: "c1", text: "Thanks! I spent a lot of time on it", timestamp: "2:33 PM" },
  { id: 4, sender: "c1", text: "Would you be interested in collabing soon?", timestamp: "2:35 PM" },
  { id: 5, sender: "me", text: "Definitely! I've been wanting to do a collab video", timestamp: "2:40 PM" },
  { id: 6, sender: "me", text: "What kind of video did you have in mind?", timestamp: "2:40 PM" },
  { id: 7, sender: "c1", text: "Maybe a challenge video or a day-in-the-life swap?", timestamp: "2:45 PM" },
];

const Messages = () => {
  const navigate = useNavigate();
  const [activeContact, setActiveContact] = useState(contacts[0].id);
  const [message, setMessage] = useState("");
  const [showChat, setShowChat] = useState(window.innerWidth >= 768);
  
  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };
  
  const handleBackToContacts = () => {
    setShowChat(false);
  };
  
  const handleSelectContact = (contactId: string) => {
    setActiveContact(contactId);
    if (window.innerWidth < 768) {
      setShowChat(true);
    }
  };
  
  return (
    <MainLayout>
      <div className="container py-4">
        <div className="border border-border rounded-lg overflow-hidden h-[calc(100vh-120px)] flex">
          {/* Contacts sidebar */}
          <div className={cn(
            "w-full max-w-xs border-r border-border bg-background/50 transition-all duration-300 ease-in-out",
            showChat && "hidden md:block"
          )}>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
              <h2 className="font-bold text-lg">Messages</h2>
              <div className="w-9"></div> {/* Spacer for alignment */}
            </div>
            <ScrollArea className="h-[calc(100vh-180px)]">
              <div className="p-2">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    className={cn(
                      "w-full text-left px-3 py-3 rounded-lg mb-1 hover:bg-secondary/50 transition-colors flex items-center animate-fade-in",
                      activeContact === contact.id && "bg-secondary"
                    )}
                    onClick={() => handleSelectContact(contact.id)}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      {contact.online && (
                        <span className="absolute bottom-0 right-2 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                      )}
                    </div>
                    
                    <div className="overflow-hidden flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-medium truncate">{contact.name}</h3>
                        <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
                      </div>
                      <p className={cn(
                        "text-xs truncate",
                        contact.unread ? "font-medium" : "text-muted-foreground"
                      )}>
                        {contact.lastMessage}
                      </p>
                    </div>
                    
                    {contact.unread && (
                      <span className="h-2 w-2 rounded-full bg-primary ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Chat area */}
          <div className={cn(
            "flex-1 flex flex-col transition-all duration-300 ease-in-out",
            !showChat && "hidden md:flex"
          )}>
            {/* Chat header */}
            <div className="p-4 border-b border-border flex items-center">
              {window.innerWidth < 768 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBackToContacts}
                  className="mr-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back to contacts</span>
                </Button>
              )}
              
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage 
                  src={contacts.find(c => c.id === activeContact)?.avatar} 
                  alt={contacts.find(c => c.id === activeContact)?.name} 
                />
                <AvatarFallback>
                  {contacts.find(c => c.id === activeContact)?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium">
                  {contacts.find(c => c.id === activeContact)?.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {contacts.find(c => c.id === activeContact)?.online ? "Online" : "Offline"}
                </p>
              </div>
              <Button variant="outline" size="sm">View Profile</Button>
            </div>
            
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-xs bg-secondary px-2 py-1 rounded-md text-muted-foreground">
                    Today
                  </span>
                </div>
                
                {sampleMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={cn(
                      "flex animate-fade-in",
                      msg.sender === "me" ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.sender !== "me" && (
                      <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                        <AvatarImage 
                          src={contacts.find(c => c.id === msg.sender)?.avatar} 
                          alt={contacts.find(c => c.id === msg.sender)?.name} 
                        />
                        <AvatarFallback>
                          {contacts.find(c => c.id === msg.sender)?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div>
                      <div className={cn(
                        "rounded-lg px-4 py-2 max-w-xs",
                        msg.sender === "me" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-secondary"
                      )}>
                        <p>{msg.text}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Message input */}
            <div className="p-4 border-t border-border flex items-center">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 mr-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4 mr-1" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
