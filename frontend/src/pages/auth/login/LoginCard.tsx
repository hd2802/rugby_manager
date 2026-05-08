import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

export function LoginCard() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // TODO: obviously come back to this if not being hosted on local host
            const res = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json()

            if(!res.ok) {
                setError(data.message || "Invalid username or password");
                return
            }

            localStorage.setItem("token", data.token)

            const payload = JSON.parse(atob(data.token.split('.')[1]))
            localStorage.setItem('userId', payload.id)

            window.location.href = '/'
        } catch(err) {
            setError('Something went wrong. Please try again')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardAction>
            <Button variant="link">
                <a href="/auth/signup" className="no-decoration">
                    Sign Up
                </a>
            </Button>
            </CardAction>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} id="login-form"> 
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    type="texts"
                    placeholder=""
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                </div>
                <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                    Forgot your password?
                    </a>
                </div>
                <Input 
                    id="password"
                    type="password"
                    required 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                </div>
            </div>
            </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
            <Button type="submit" form="login-form" className="w-full">
            Login
            </Button>
        </CardFooter>
        </Card>
    )
}