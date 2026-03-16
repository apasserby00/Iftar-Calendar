import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  MoonStar,
  UserRound,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { inviteDefaults, readInviteData } from "@/lib/invite";
import { cn } from "@/lib/utils";

const detailItems = [
  {
    key: "host",
    label: "Hosted by",
    icon: UserRound,
    accent: "from-amber-300/40 to-orange-300/10",
  },
  {
    key: "date",
    label: "Date",
    icon: CalendarDays,
    accent: "from-rose-300/35 to-amber-200/10",
  },
  {
    key: "time",
    label: "Iftar time",
    icon: Clock3,
    accent: "from-yellow-300/40 to-orange-200/10",
  },
  {
    key: "location",
    label: "Location",
    icon: MapPin,
    accent: "from-orange-300/35 to-rose-200/10",
  },
] as const;

const heroEase = [0.22, 1, 0.36, 1] as const;
const rsvpOptions = [
  {
    value: "yes",
    label: "Yes, I'll be there",
    response: "Looking forward to seeing you there.",
  },
  {
    value: "maybe",
    label: "Insha'Allah",
    response: "Insha'Allah, hope you can make it.",
  },
  {
    value: "no",
    label: "I can't make it",
    response: "No problem. Maybe another time.",
  },
] as const;

type RsvpValue = (typeof rsvpOptions)[number]["value"];

function App() {
  const invite = readInviteData(window.location.search);
  const prefersReducedMotion = useReducedMotion();
  const [selectedRsvp, setSelectedRsvp] = useState<RsvpValue | null>(null);
  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: heroEase },
      };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <BackgroundOrnaments reducedMotion={prefersReducedMotion} />

      <main className="relative z-10">
        <section className="container flex min-h-screen items-center py-8 sm:py-12">
          <motion.div
            className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]"
            {...animationProps}
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(70,29,20,0.9),rgba(28,11,9,0.96))] p-6 shadow-glow backdrop-blur xl:p-10">
              <div className="absolute inset-0 bg-stars bg-[length:22px_22px] opacity-20" />
              <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-orange-500/20 blur-3xl" />

              <div className="relative">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-amber-100/80"
                  initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.94 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                >
                  <MoonStar className="h-4 w-4" />
                  Ramadan Gathering
                </motion.div>

                <motion.h1
                  className="mt-6 max-w-2xl font-display text-5xl leading-[0.95] text-amber-50 sm:text-6xl xl:text-7xl"
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 28 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.75 }}
                >
                  {invite.guest}, you have been invited to Iftar.
                </motion.h1>

                <motion.p
                  className="mt-5 max-w-xl text-base leading-7 text-amber-50/80 sm:text-lg"
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.7 }}
                >
                  {invite.host} would love for you to join them to break fast
                  together. A simple evening, good company, and a warm welcome
                  await you.
                </motion.p>

                <motion.div
                  className="mt-8 grid gap-4 sm:grid-cols-2"
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.36, duration: 0.7 }}
                >
                  {detailItems.map((item, index) => {
                    const Icon = item.icon;
                    const value = invite[item.key];

                    return (
                      <Card
                        key={item.key}
                        className="border-white/10 bg-white/5 shadow-ember backdrop-blur"
                      >
                        <motion.div
                          initial={
                            prefersReducedMotion
                              ? undefined
                              : { opacity: 0, y: 18, scale: 0.98 }
                          }
                          animate={
                            prefersReducedMotion
                              ? undefined
                              : { opacity: 1, y: 0, scale: 1 }
                          }
                          transition={{ delay: 0.4 + index * 0.08, duration: 0.55 }}
                        >
                          <CardContent className="relative flex h-full gap-4 p-5">
                            <div
                              className={cn(
                                "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br text-amber-50",
                                item.accent,
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm uppercase tracking-[0.25em] text-amber-100/55">
                                {item.label}
                              </p>
                              <p className="mt-2 text-base leading-6 text-amber-50/90">
                                {value}
                              </p>
                            </div>
                          </CardContent>
                        </motion.div>
                      </Card>
                    );
                  })}
                </motion.div>

                <motion.div
                  className="mt-8 rounded-[1.75rem] border border-white/10 bg-black/10 p-4 backdrop-blur"
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.68, duration: 0.65 }}
                >
                  <p className="text-sm uppercase tracking-[0.26em] text-amber-100/60">
                    RSVP
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {rsvpOptions.map((option) => {
                      const isSelected = selectedRsvp === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setSelectedRsvp(option.value)}
                          className={cn(
                            "rounded-2xl border px-4 py-3 text-sm font-medium transition duration-300",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2a110d]",
                            isSelected
                              ? "border-amber-200/40 bg-amber-200/15 text-amber-50 shadow-ember"
                              : "border-white/10 bg-white/5 text-amber-50/80 hover:border-amber-100/20 hover:bg-white/10",
                          )}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                  {selectedRsvp ? (
                    <p className="mt-4 text-sm leading-6 text-amber-100/75">
                      {
                        rsvpOptions.find((option) => option.value === selectedRsvp)
                          ?.response
                      }
                    </p>
                  ) : (
                    <p className="mt-4 text-sm leading-6 text-amber-100/55">
                      A simple reply is enough.
                    </p>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

    </div>
  );
}

type BackgroundOrnamentsProps = {
  reducedMotion: boolean | null;
};

function BackgroundOrnaments({ reducedMotion }: BackgroundOrnamentsProps) {
  const floatingTransition = reducedMotion
    ? undefined
    : {
        duration: 9,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "mirror" as const,
        ease: "easeInOut" as const,
      };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_32%),linear-gradient(180deg,#160909_0%,#2f120d_35%,#140707_100%)]" />
      <motion.div
        className="absolute -left-16 top-12 h-64 w-64 rounded-full bg-amber-300/16 blur-3xl"
        animate={reducedMotion ? undefined : { x: [0, 18, -8], y: [0, 10, -6] }}
        transition={floatingTransition}
      />
      <motion.div
        className="absolute right-[-4rem] top-[22%] h-72 w-72 rounded-full bg-orange-400/14 blur-3xl"
        animate={reducedMotion ? undefined : { x: [0, -16, 8], y: [0, -18, 6] }}
        transition={
          reducedMotion
            ? undefined
            : { ...floatingTransition, duration: 11 }
        }
      />
      <motion.div
        className="absolute bottom-[-3rem] left-[18%] h-60 w-60 rounded-full bg-rose-300/12 blur-3xl"
        animate={reducedMotion ? undefined : { x: [0, 12, -10], y: [0, -10, 8] }}
        transition={
          reducedMotion
            ? undefined
            : { ...floatingTransition, duration: 10 }
        }
      />
      <div className="absolute inset-0 bg-stars bg-[length:24px_24px] opacity-[0.12]" />
    </div>
  );
}

export default App;
