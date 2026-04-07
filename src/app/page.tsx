"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Star, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PinDialog } from "@/components/chorechamp/PinDialog";
import { ChoreChampProvider, useChoreChamp } from "@/lib/chorechamp-context";

function LandingContent() {
  const router = useRouter();
  const { data, updateSettings, verifyPin } = useChoreChamp();
  const [pinOpen, setPinOpen] = useState(false);
  const [kidSelectOpen, setKidSelectOpen] = useState(false);

  const handleParentSuccess = () => {
    setPinOpen(false);
    updateSettings({ mode: "parent" });
    router.push("/chorechamp/parent");
  };

  const handleKidSelect = (kidId: string) => {
    updateSettings({ mode: "kid", activeKidId: kidId });
    router.push("/chorechamp/kid");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-purple-50 flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-8 text-center">
        <Trophy className="h-20 w-20 mx-auto text-primary" />
        <h1 className="text-4xl font-black tracking-tight text-gray-900 mt-4">
          Chore<span className="text-primary">Champ</span>
        </h1>
        <p className="text-gray-500 mt-2 text-lg">Earn screen time. Be a champ!</p>
      </div>

      {/* Mode selection */}
      {!kidSelectOpen ? (
        <div className="w-full max-w-sm space-y-4">
          <Button
            onClick={() => setPinOpen(true)}
            className="w-full h-20 text-lg font-semibold bg-cc-purple hover:bg-cc-purple/90 text-white rounded-2xl shadow-lg shadow-cc-purple/25 transition-all hover:scale-[1.02]"
          >
            <ShieldCheck className="h-6 w-6 mr-3" />
            I&apos;m a Parent
          </Button>

          <Button
            onClick={() => setKidSelectOpen(true)}
            className="w-full h-20 text-lg font-semibold bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-lg shadow-primary/25 transition-all hover:scale-[1.02]"
          >
            <Star className="h-6 w-6 mr-3" />
            I&apos;m a Kid
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-sm">
          <h2 className="text-xl font-bold text-center mb-4">Who are you?</h2>
          <div className="grid grid-cols-2 gap-3">
            {data.settings.kids.map((kid) => (
              <button
                key={kid.id}
                onClick={() => handleKidSelect(kid.id)}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-md border-2 border-transparent hover:border-primary transition-all hover:scale-[1.03]"
              >
                <span className="text-5xl mb-2">{kid.avatarEmoji}</span>
                <span className="font-semibold text-gray-900">{kid.name}</span>
              </button>
            ))}
          </div>
          <Button
            variant="ghost"
            className="w-full mt-4 text-gray-500"
            onClick={() => setKidSelectOpen(false)}
          >
            Back
          </Button>
        </div>
      )}

      <PinDialog
        open={pinOpen}
        onOpenChange={setPinOpen}
        onVerify={verifyPin}
        onSuccess={handleParentSuccess}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <ChoreChampProvider>
      <LandingContent />
    </ChoreChampProvider>
  );
}
