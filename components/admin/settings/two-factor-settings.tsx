"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Mail, Smartphone } from "lucide-react"

export function TwoFactorSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [qrCodeUrl, setQrCodeUrl] = useState("/placeholder.svg?height=200&width=200")
  const [secretKey, setSecretKey] = useState("ABCD EFGH IJKL MNOP")
  const [activeTab, setActiveTab] = useState("app")

  const handleToggle2FA = (checked: boolean) => {
    if (checked) {
      // If enabling 2FA, show the setup process
      setIsLoading(true)
      // Simulate API call to generate QR code and secret key
      setTimeout(() => {
        setIsLoading(false)
        setIs2FAEnabled(true)
        toast({
          title: "Two-factor authentication enabled",
          description: "Please set up your authenticator app using the QR code or secret key.",
        })
      }, 1000)
    } else {
      // If disabling 2FA, confirm and disable
      if (
        window.confirm(
          "Are you sure you want to disable two-factor authentication? This will make your account less secure.",
        )
      ) {
        setIsLoading(true)
        // Simulate API call to disable 2FA
        setTimeout(() => {
          setIsLoading(false)
          setIs2FAEnabled(false)
          toast({
            title: "Two-factor authentication disabled",
            description: "Two-factor authentication has been disabled for your account.",
          })
        }, 1000)
      }
    }
  }

  const handleVerifyCode = () => {
    if (verificationCode.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter a valid 6-digit verification code.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    // Simulate API call to verify code
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Verification successful",
        description: "Two-factor authentication has been set up successfully.",
      })
      // Reset the form
      setVerificationCode("")
    }, 1000)
  }

  const handleSendEmail = () => {
    setIsLoading(true)
    // Simulate API call to send email
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Email sent",
        description: "A verification email has been sent to your email address.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
        <p className="text-sm text-muted-foreground">
          Add an extra layer of security to your account by enabling two-factor authentication.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <h4 className="font-medium">Two-Factor Authentication (2FA)</h4>
          <p className="text-sm text-muted-foreground">Protect your account with an additional security layer.</p>
        </div>
        <Switch checked={is2FAEnabled} onCheckedChange={handleToggle2FA} disabled={isLoading} aria-label="Toggle 2FA" />
      </div>

      {is2FAEnabled && (
        <Tabs defaultValue="app" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="app" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Authenticator App
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </TabsTrigger>
          </TabsList>
          <TabsContent value="app">
            <Card>
              <CardHeader>
                <CardTitle>Authenticator App</CardTitle>
                <CardDescription>
                  Use an authenticator app like Google Authenticator, Authy, or Microsoft Authenticator to get
                  two-factor authentication codes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <div className="rounded-md border bg-white p-2">
                    <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code for 2FA" className="h-40 w-40" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Scan this QR code with your authenticator app</p>
                    <p className="text-sm text-muted-foreground">
                      Or enter this code manually: <span className="font-mono font-medium">{secretKey}</span>
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="verification-code">Verification Code</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="verification-code"
                      placeholder="Enter 6-digit code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      maxLength={6}
                    />
                    <Button
                      onClick={handleVerifyCode}
                      disabled={isLoading || verificationCode.length !== 6}
                      className="bg-green-700 hover:bg-green-800"
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-2">
                <h4 className="text-sm font-medium">Recovery Codes</h4>
                <p className="text-sm text-muted-foreground">
                  Save these recovery codes in a secure place. You can use them to access your account if you lose your
                  device.
                </p>
                <div className="mt-2 w-full rounded-md bg-muted p-3 font-mono text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div>ABCD-EFGH-IJKL</div>
                    <div>MNOP-QRST-UVWX</div>
                    <div>1234-5678-9012</div>
                    <div>3456-7890-1234</div>
                    <div>5678-9012-3456</div>
                    <div>7890-1234-5678</div>
                  </div>
                </div>
                <Button variant="outline" className="mt-2">
                  Download Codes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Authentication</CardTitle>
                <CardDescription>Receive verification codes via email when signing in.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center gap-4">
                    <Mail className="h-8 w-8 text-green-700" />
                    <div>
                      <h4 className="font-medium">Email Verification</h4>
                      <p className="text-sm text-muted-foreground">
                        We'll send a verification code to your email address: admin@jalalnasser.com
                      </p>
                    </div>
                  </div>
                </div>
                <Button onClick={handleSendEmail} disabled={isLoading} className="bg-green-700 hover:bg-green-800">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Verification Email"
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      <div className="rounded-lg border p-4">
        <h4 className="font-medium">Recent Activity</h4>
        <p className="text-sm text-muted-foreground">
          Monitor recent sign-in activity to ensure your account hasn't been compromised.
        </p>
        <div className="mt-4 space-y-4">
          {[
            {
              device: "Windows PC",
              browser: "Chrome",
              location: "Riyadh, Saudi Arabia",
              ip: "192.168.1.1",
              time: "Today, 10:30 AM",
              current: true,
            },
            {
              device: "iPhone",
              browser: "Safari",
              location: "Riyadh, Saudi Arabia",
              ip: "192.168.1.2",
              time: "Yesterday, 3:45 PM",
              current: false,
            },
            {
              device: "MacBook Pro",
              browser: "Firefox",
              location: "Jeddah, Saudi Arabia",
              ip: "192.168.1.3",
              time: "May 10, 2023, 9:15 AM",
              current: false,
            },
          ].map((activity, index) => (
            <div key={index} className="flex items-start justify-between rounded-md border p-3">
              <div className="space-y-1">
                <p className="font-medium">
                  {activity.device} • {activity.browser}
                  {activity.current && (
                    <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                      Current
                    </span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.location} • {activity.ip}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              {!activity.current && (
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  Sign Out
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
