export interface InviteData {
  guest: string;
  host: string;
  date: string;
  time: string;
  location: string;
  message: string;
}

export const inviteDefaults: InviteData = {
  guest: "Dear Friend",
  host: "The Rahman Family",
  date: "Saturday, 22 March",
  time: "6:47 PM",
  location: "17 Lantern Crescent, Auburn",
  message:
    "We would be honoured to break fast with you and share a beautiful Ramadan evening together.",
};

function sanitize(value: string | null, fallback: string) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

export function readInviteData(search: string): InviteData {
  const params = new URLSearchParams(search);

  return {
    guest: sanitize(params.get("guest"), inviteDefaults.guest),
    host: sanitize(params.get("host"), inviteDefaults.host),
    date: sanitize(params.get("date"), inviteDefaults.date),
    time: sanitize(params.get("time"), inviteDefaults.time),
    location: sanitize(params.get("location"), inviteDefaults.location),
    message: sanitize(params.get("message"), inviteDefaults.message),
  };
}
