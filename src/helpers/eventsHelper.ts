export type DayEvent = {
  "date": string,
  "time": string,
  "notification": {
    "isOn": boolean,
    "date": string,
    "time": string
  },
  "location": string,
  "repeat": "everyYear" | "everyMonth" | "everyDay",
  "event": string
};

export async function fetchEvents(year: number, month: number): Promise<DayEvent[]> {
  let result: DayEvent[] = [];
  try {
      const response = await fetch(`./${year}/${month.toString().padStart(2, "0")}.json`);
      if (!response.ok) {
          throw new Error("HTTP error " + response.status);
      }
      result = await response.json();
      // console.log("fetch result", result);
  } catch (error) {
      console.log(error);
  }
  return result;
};