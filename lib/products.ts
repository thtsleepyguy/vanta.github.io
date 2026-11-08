export type Finish = {
  id: "titanium" | "obsidian" | "haze" | "graphite";
  name: string;
  descriptor: string;
  /** OKLCH values used by the WebGL renderer. DOM swatches use the matching CSS token. */
  oklch: [number, number, number];
};

export type ProductSlug = "one" | "buds" | "core";

export type Product = {
  slug: ProductSlug;
  name: string;
  category: string;
  line: string;
  summary: string;
  statement: string;
  conceptLabel: string;
  finishes: Finish[];
  storage?: { value: string; note: string }[];
  specs: { label: string; value: string }[];
  details: { title: string; body: string }[];
  views: { id: string; label: string }[];
  meta: { title: string; description: string };
};

const titanium: Finish = {
  id: "titanium",
  name: "Titanium",
  descriptor: "Warm, brushed, unchanged by light.",
  oklch: [0.79, 0.012, 82],
};

const obsidian: Finish = {
  id: "obsidian",
  name: "Obsidian",
  descriptor: "Satin black, with a green-black depth.",
  oklch: [0.235, 0.008, 270],
};

const haze: Finish = {
  id: "haze",
  name: "Haze",
  descriptor: "Translucent ice, cooler at the edges.",
  oklch: [0.86, 0.025, 220],
};

const graphite: Finish = {
  id: "graphite",
  name: "Graphite",
  descriptor: "Soft anodised grey, almost warm.",
  oklch: [0.42, 0.008, 260],
};

export const products: Product[] = [
  {
    slug: "one",
    name: "VANTA ONE",
    category: "Smartphone",
    line: "The object, reduced.",
    summary:
      "A single pane, a titanium rail, and a translucent back that keeps the engineering in view.",
    statement:
      "ONE is designed from the inside out. The back is frosted glass, not a lid: the board, the coil and the battery stay faintly visible, arranged like a plan rather than hidden like a secret.",
    conceptLabel: "Concept study · not for sale",
    finishes: [titanium, obsidian, haze],
    storage: [
      { value: "256 GB", note: "Everyday" },
      { value: "512 GB", note: "Recommended" },
      { value: "1 TB", note: "Archive" },
    ],
    specs: [
      { label: "Display", value: "6.3 in LTPO OLED, 1–120 Hz" },
      { label: "Frame", value: "Grade 5 titanium, one piece" },
      { label: "Back", value: "Frosted glass over aluminium" },
      { label: "Body", value: "149.8 × 71.2 × 7.6 mm" },
      { label: "Weight", value: "178 g" },
      { label: "Camera", value: "50 mm and 24 mm equivalent" },
      { label: "Storage", value: "256 GB / 512 GB / 1 TB" },
      { label: "System", value: "VANTA OS 1" },
    ],
    details: [
      {
        title: "The optical column",
        body: "Two lenses and a depth sensor share one milled rail. The glass sits flush with the back, so the phone can lie flat.",
      },
      {
        title: "The titanium rail",
        body: "A single continuous frame with four machined breaks for the antennas. Buttons are set into the rail, not onto it.",
      },
      {
        title: "The clear back",
        body: "Frosted glass diffuses the interior just enough to read. The wireless coil, battery and board are the only decoration.",
      },
    ],
    views: [
      { id: "front", label: "Front" },
      { id: "back", label: "Back" },
      { id: "edge", label: "Edge" },
    ],
    meta: {
      title: "VANTA ONE — a phone with nothing to hide",
      description:
        "A concept smartphone with a titanium rail, frosted glass back and visible internal architecture. A design study by VANTA.",
    },
  },
  {
    slug: "buds",
    name: "VANTA BUDS",
    category: "Wireless audio",
    line: "Sound without signature.",
    summary:
      "A two-part acoustic system in a milled aluminium case. No logo on the face, nothing between you and the recording.",
    statement:
      "BUDS is a quiet object. The case has no seam where your hand expects one, the buds have no painted marks, and the only light is a single ice-blue line while they charge.",
    conceptLabel: "Concept study · not for sale",
    finishes: [titanium, obsidian, haze],
    specs: [
      { label: "Driver", value: "11 mm dynamic" },
      { label: "Enclosure", value: "Milled aluminium" },
      { label: "Playback", value: "7 h, 32 h with case" },
      { label: "Connection", value: "Bluetooth LE Audio" },
      { label: "Charging", value: "USB-C, Qi2" },
      { label: "Weight", value: "4.6 g per bud" },
    ],
    details: [
      {
        title: "A case with one seam",
        body: "The lid and body are cut from the same billet, then separated by a 0.4 mm line. The hinge disappears into the wall.",
      },
      {
        title: "No face, just fit",
        body: "The acoustic chamber is the shape. There is no cap, no badge and no touch surface to misread.",
      },
      {
        title: "One light",
        body: "A single ice-blue filament shows charge. It dims rather than blinks, and it turns off when the case is closed.",
      },
    ],
    views: [
      { id: "open", label: "Open" },
      { id: "closed", label: "Closed" },
      { id: "bud", label: "Bud" },
    ],
    meta: {
      title: "VANTA BUDS — sound without signature",
      description:
        "A concept wireless audio system with a milled aluminium case, no face branding and a single charge light. A design study by VANTA.",
    },
  },
  {
    slug: "core",
    name: "VANTA CORE",
    category: "Connected object",
    line: "A quiet control surface.",
    summary:
      "A palm-sized dial that keeps a room's systems in one gesture. It does one thing well: it turns.",
    statement:
      "CORE is the opposite of an app. It has no feed, no notifications and no screen asking for attention. A single machined dial moves through light, sound and temperature with an 84-detent feel.",
    conceptLabel: "Concept study · not for sale",
    finishes: [titanium, graphite],
    specs: [
      { label: "Body", value: "64 × 64 × 24 mm" },
      { label: "Dial", value: "Machined aluminium, 84 detents" },
      { label: "Display", value: "2.1 in e-ink" },
      { label: "Radio", value: "Thread, Bluetooth LE" },
      { label: "Power", value: "USB-C, six-week target" },
      { label: "Materials", value: "Titanium, graphite, glass" },
    ],
    details: [
      {
        title: "One gesture",
        body: "Turn for level, press for room, press and turn for temperature. The dial has weight because the interaction has weight.",
      },
      {
        title: "A screen that waits",
        body: "The e-ink panel holds its last state without power. It shows one number at a time and never lights the room.",
      },
      {
        title: "No app required",
        body: "Thread keeps CORE on the local network. Setup is a code on the base, not an account.",
      },
    ],
    views: [
      { id: "top", label: "Top" },
      { id: "side", label: "Side" },
      { id: "detail", label: "Dial" },
    ],
    meta: {
      title: "VANTA CORE — a quiet control surface",
      description:
        "A concept connected object with one machined dial, an e-ink face and no feed. A design study by VANTA.",
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
