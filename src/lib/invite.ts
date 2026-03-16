export interface InviteData {
  guest: string;
  host: string;
  time: string;
  location: string;
  nights: string[];
}

export const inviteDefaults: InviteData = {
  guest: "Dear Friend",
  host: "The Rahman Family",
  time: "6:47 PM",
  location: "17 Lantern Crescent, Auburn",
  nights: ["Thu, 20 March", "Sat, 22 March", "Sun, 23 March"],
};

function sanitize(value: string | null, fallback: string) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

function readNightOptions(params: URLSearchParams) {
  const repeatedOptions = params
    .getAll("night")
    .map((value) => value.trim())
    .filter(Boolean);

  if (repeatedOptions.length > 0) {
    return repeatedOptions;
  }

  const combinedOptions = params.get("nights");
  if (!combinedOptions) {
    return inviteDefaults.nights;
  }

  const parsedOptions = combinedOptions
    .split("|")
    .map((value) => value.trim())
    .filter(Boolean);

  return parsedOptions.length > 0 ? parsedOptions : inviteDefaults.nights;
}

export function readInviteData(search: string): InviteData {
  const params = new URLSearchParams(search);

  return {
    guest: sanitize(params.get("guest"), inviteDefaults.guest),
    host: sanitize(params.get("host"), inviteDefaults.host),
    time: sanitize(params.get("time"), inviteDefaults.time),
    location: sanitize(params.get("location"), inviteDefaults.location),
    nights: readNightOptions(params),
  };
}
