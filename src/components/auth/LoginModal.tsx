
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/contexts/UserContext";

type LoginModalProps = {
  trigger: React.ReactNode;
};

export default function LoginModal({ trigger }: LoginModalProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { login, register } = useUser();
  
  // Login form state
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginUsername, loginPassword);
    if (success) setOpen(false);
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerUsername || !registerPassword) return;
    
    const success = await register(registerName, registerUsername, registerPassword);
    if (success) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {activeTab === "login" ? "Login to ClipSnap" : "Create an Account"}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")} className="mt-2">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-username">Username</Label>
                <Input 
                  id="login-username" 
                  placeholder="@username" 
                  value={loginUsername} 
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input 
                  id="login-password" 
                  type="password" 
                  value={loginPassword} 
                  onChange={(e) => setLoginPassword(e.target.value)} 
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Use "password" for demo accounts.
                </p>
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="mt-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input 
                  id="register-name" 
                  placeholder="Your name" 
                  value={registerName} 
                  onChange={(e) => setRegisterName(e.target.value)} 
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-username">Username</Label>
                <Input 
                  id="register-username" 
                  placeholder="@username" 
                  value={registerUsername} 
                  onChange={(e) => setRegisterUsername(e.target.value)} 
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input 
                  id="register-password" 
                  type="password" 
                  value={registerPassword} 
                  onChange={(e) => setRegisterPassword(e.target.value)} 
                  required
                />
              </div>
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
