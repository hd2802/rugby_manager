import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { TeamDataProps } from "@/types/types";

export function TeamCard({ teamData, leagueName, handleSelectTeam, selectedTeam }: TeamDataProps) {
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img
                src="https://avatar.vercel.sh/shadcn1"
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
            />
            <CardHeader>
                <CardAction>
                    <Badge variant="secondary">{leagueName == "Premiership Rugby" ? "Prem" : leagueName} </Badge>
                </CardAction>
                <CardTitle>{teamData.name}</CardTitle>
                <CardDescription className="min-h-3/10">
                    A practical talk on component APIs, accessibility, and
                    shipping faster.
                </CardDescription>
            </CardHeader>
            <CardFooter className="h-16 flex items-center">
                <Button onClick={() => handleSelectTeam(teamData)} className="w-full">
                    Select Team
                </Button>
            </CardFooter>
        </Card>
    );
}
