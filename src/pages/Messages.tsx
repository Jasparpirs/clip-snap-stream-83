
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ArrowLeft, Send, UserX } from "lucide-react";
import { useUser, User } from "@/contexts/UserContext";
import { toast } from "sonner";
import LoginModal from "@/components/auth/LoginModal";

// We'll now need to determine mutual followers for messaging
const Messages = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, followingUsers, isFollowing } = useUser();
  const [contacts, setContacts] = useState<User[]>([]);
  const [mutualContacts, setMutualContacts] = useState<User[]>([]);
  const [activeContact, setActiveContact] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [showChat, setShowChat] = useState(window.innerWidth >= 768);
  const [messages, setMessages] = useState<any[]>([]);
  
  // Load contacts and determine mutual followers
  useEffect(() => {
    if (isAuthenticated && followingUsers.length > 0) {
      // Filter for mutual followers - people who follow you and you follow them
      const mutual = followingUsers.filter(user => isFollowing(user.id));
      setMutualContacts(mutual);
      
      // Set all contacts for display
      setContacts(followingUsers);
      
      // If we have mutual contacts, set the first one as active
      if (mutual.length > 0 && !activeContact) {
        setActiveContact(mutual[0].id);
      }
      
      // Load stored messages
      loadMessages();
    }
  }, [isAuthenticated, followingUsers, isFollowing]);
  
  // Load messages from localStorage
  const loadMessages = () => {
    const storedMessages = localStorage.getItem('messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  };
  
  // Save messages to localStorage
  const saveMessages = (newMessages: any[]) => {
    localStorage.setItem('messages', JSON.stringify(newMessages));
    setMessages(newMessages);
  };
  
  const handleSend = () => {
    if (message.trim() && activeContact) {
      const newMessage = {
        id: Date.now(),
        sender: "me",
        receiver: activeContact,
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      const updatedMessages = [...messages, newMessage];
      saveMessages(updatedMessages);
      setMessage("");
      
      toast.success("Message sent");
    }
  };
  
  const handleBackToContacts = () => {
    setShowChat(false);
  };
  
  const handleSelectContact = (contactId: string) => {
    // Check if this is a mutual follower
    const isMutual = mutualContacts.some(contact => contact.id === contactId);
    
    if (isMutual) {
      setActiveContact(contactId);
      if (window.innerWidth < 768) {
        setShowChat(true);
      }
    } else {
      toast.error("You can only message people who follow you back");
    }
  };
  
  // Get messages for the active conversation
  const getConversationMessages = () => {
    if (!activeContact) return [];
    
    return messages.filter(msg => 
      (msg.sender === "me" && msg.receiver === activeContact) ||
      (msg.sender === activeContact && msg.receiver === "me")
    ).sort((a, b) => a.id - b.id);
  };
  
  // Check if a contact is mutual (both follow each other)
  const isMutualFollower = (contactId: string) => {
    return mutualContacts.some(contact => contact.id === contactId);
  };
  
  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="container py-12 flex flex-col items-center justify-center">
          <div className="text-center space-y-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold">Sign in to message</h1>
            <p className="text-muted-foreground">
              You need to be signed in to send and receive messages
            </p>
            <LoginModal 
              trigger={
                <Button size="lg" className="mt-4">Login to get started</Button>
              } 
            />
          </div>
        </div>
      </MainLayout>
    );
  }
  
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
                {contacts.length === 0 ? (
                  <div className="text-center p-4">
                    <p className="text-muted-foreground mb-2">
                      Follow people to message them
                    </p>
                    <Button variant="outline" size="sm" onClick={() => navigate("/following")}>
                      Find people to follow
                    </Button>
                  </div>
                ) : (
                  contacts.map((contact) => {
                    const canMessage = isMutualFollower(contact.id);
                    
                    return (
                      <button
                        key={contact.id}
                        className={cn(
                          "w-full text-left px-3 py-3 rounded-lg mb-1 transition-colors flex items-center animate-fade-in",
                          canMessage 
                            ? (activeContact === contact.id ? "bg-secondary" : "hover:bg-secondary/50") 
                            : "opacity-60 cursor-not-allowed",
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
                          </div>
                          
                          {canMessage ? (
                            <p className="text-xs truncate text-muted-foreground">
                              {contact.lastMessage || "Start a conversation"}
                            </p>
                          ) : (
                            <p className="text-xs truncate text-muted-foreground flex items-center">
                              <UserX className="h-3 w-3 mr-1" />
                              Doesn't follow you back
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
                
                {mutualContacts.length === 0 && contacts.length > 0 && (
                  <div className="mt-4 p-4 bg-secondary/20 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">
                      You can only message people who follow you back
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
          
          {/* Chat area */}
          <div className={cn(
            "flex-1 flex flex-col transition-all duration-300 ease-in-out",
            !showChat && "hidden md:flex"
          )}>
            {activeContact ? (
              <>
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/profile/${activeContact}`)}
                  >
                    View Profile
                  </Button>
                </div>
                
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    <div className="text-center">
                      <span className="text-xs bg-secondary px-2 py-1 rounded-md text-muted-foreground">
                        Today
                      </span>
                    </div>
                    
                    {getConversationMessages().length === 0 ? (
                      <div className="flex items-center justify-center h-40">
                        <p className="text-muted-foreground text-sm">
                          No messages yet. Start the conversation!
                        </p>
                      </div>
                    ) : (
                      getConversationMessages().map((msg) => (
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
                      ))
                    )}
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
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center p-4 max-w-md">
                  <h3 className="text-xl font-medium mb-2">Your Messages</h3>
                  {contacts.length === 0 ? (
                    <p className="text-muted-foreground mb-4">
                      Follow people to start messaging
                    </p>
                  ) : mutualContacts.length === 0 ? (
                    <p className="text-muted-foreground mb-4">
                      You can only message people who follow you back
                    </p>
                  ) : (
                    <p className="text-muted-foreground mb-4">
                      Select a conversation to start messaging
                    </p>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => navigate("/following")}
                  >
                    Find people
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
