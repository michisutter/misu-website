// projects.js - Project data
const projects = [
    {
        id: 1,
        title: "Rigi Lok7",
        image: "assets/img/projects/project-rigi.jpg",
        description: `Für das „Zeitreise Museum“ durften wir einen immersiven Erlebnisraum realisieren, der Besucherinnen und Besucher in eine komplett andere Welt eintauchen lässt. Ziel war es, komplexe historische Inhalte nicht nur informativ, sondern emotional spürbar zu vermitteln – in Form einer kuratierten Show mit präzise gesteuertem Ablauf.`,
        more: `Der rund 60m² große Raum wurde als vollständig atmosphärischer Erlebnisbereich konzipiert. Kern des Projekts war die Entwicklung eines perfekten Zusammenspiels aus Licht, Projektion und einem mehrkanaligen Audiosystem, das den Raum akustisch zum Leben erweckt. Dank einer fein abgestimmten Mehrkanal-Audiobespielung entstehen Klangbewegungen, räumliche Effekte und akustische Stimmungen, die Besucher vollständig umhüllen.
    Wir entwickelten den gesamten Showablauf – von der ersten Idee bis zum finalen Timing aller Medien. Die Steuerung sorgt dafür, dass Bild, Ton und Raumlicht sekundengenau miteinander interagieren und jede Show konsistent und zuverlässig abläuft.
    Im Audiobereich setzten wir auf ein präzise eingerichtetes DSP-System, inklusive detailliertem System-Tuning, um eine homogene, kraftvolle und zugleich saubere Klangwiedergabe zu erzielen.
    Das Ergebnis:
    Ein Erlebnisraum, der nicht nur Wissen vermittelt, sondern Emotionen auslöst. Die Show wird zum Highlight des Museums und begeistert Besucher jeden Alters durch eine perfekt orchestrierte Mischung aus Technik, Storytelling und Raumgefühl.`,
        tags: [
            { text: "Partner: Neroplan GmbH", link: "https://neroplan.ch" },
            { text: "Kunde: Rigi Bahnen AG", link: "https://rigi.ch" },
            "Jahr: 2026",
            "Leistungen: Mediensteuerung, Inbetriebnahme"
        ]
    },
    {
        id: 2,
        title: "Maison Cailler Broc",
        image: "assets/img/projects/project-cailler.jpg",
        description: "Modernisierung eines Konferenzzentrums mit State-of-the-Art Präsentationstechnik und Audiosteuerung.",
        more: "Provisorischer Text: Ausführliche Projektinformationen folgen. Schwerpunkte: Planung, Integration und Inbetriebnahme.",
        tags: ["Partner: Event Tech GmbH", "Kunde: Convention Center Basel", "Jahr: 2024"]
    },
    {
        id: 3,
        title: "Givaudan Schweiz",
        image: "assets/img/projects/project-givaudan.jpg",
        description: "Installation und Programmierung eines komplexen Mediensteuerungssystems für Vorlesungssäle.",
        more: "Provisorischer Text: Ausführliche Projektinformationen folgen. Schwerpunkte: Systemintegration, Automatisierung und Testing.",
        tags: ["Partner: UniTech Systems", "Kunde: Universität Bern", "Jahr: 2024"]
    },
    {
        id: 4,
        title: "Just Schweiz",
        image: "assets/img/projects/project-just.jpg",
        description: "Luxus-Hotel mit integrierter Steuerung für Beleuchtung, Audio und Videoverteilung in allen Räumen.",
        more: "Provisorischer Text: Ausführliche Projektinformationen folgen. Schwerpunkte: Hospitality-Integration, Benutzerführung und Maintenance.",
        tags: ["Partner: Hospitality Solutions", "Kunde: Grand Hotel Luzern", "Jahr: 2023"]
    },
    {
        id: 5,
        title: "Legionärspfad",
        image: "assets/img/projects/project-legionaerspfad.jpg",
        description: "Interaktive Medieninstallationen mit benutzerfreundlicher Steuerung für wechselnde Ausstellungen.",
        more: "Provisorischer Text: Ausführliche Projektinformationen folgen. Schwerpunkte: Interaktion, Content-Management und Ausstellungsbetrieb.",
        tags: ["Partner: Museum Tech", "Kunde: Kunstmuseum St. Gallen", "Jahr: 2023"]
    },
    {
        id: 6,
        title: "Kernkraftwerk Leibstadt",
        image: "assets/img/projects/project-leibstadt.jpg",
        description: "Komplette AV-Ausstattung für moderne Büroräume mit integrierter Mediensteuerung und Videokonferenzsystemen.",
        more: "Provisorischer Text: Ausführliche Projektinformationen folgen. Schwerpunkte: Netzwerk-AV, Videokonferenzintegration und Benutzerfreundlichkeit.",
        tags: ["Partner: AV Solutions AG", "Kunde: Tech Corp", "Jahr: 2025"]
    },
    {
        id: 7,
        title: "Bergkäserei Marbach",
        image: "assets/img/projects/project-marbach.jpg",
        description: "Modernisierung eines Konferenzzentrums mit State-of-the-Art Präsentationstechnik und Audiosteuerung.",
        more: "Provisorischer Text: Ausführliche Projektinformationen folgen. Schwerpunkte: Akustikoptimierung, Systemdesign und Schulung.",
        tags: ["Partner: Event Tech GmbH", "Kunde: Convention Center Basel", "Jahr: 2024"]
    },
    {
        id: 8,
        title: "Omega Museum",
        image: "assets/img/projects/project-omega.jpg",
        description: "Installation und Programmierung eines komplexen Mediensteuerungssystems für Vorlesungssäle.",
        more: "Provisorischer Text: Ausführliche Projektinformationen folgen. Schwerpunkte: Medientechnik, Automatisierung und Betriebssicherheit.",
        tags: ["Partner: UniTech Systems", "Kunde: Universität Bern", "Jahr: 2024"]
    },
    {
        id: 9,
        title: "Pfahlbaumuseum Unteruhldingen",
        image: "assets/img/projects/project-pfahlbaumuseum.jpg",
        description: "Luxus-Hotel mit integrierter Steuerung für Beleuchtung, Audio und Videoverteilung in allen Räumen.",
        more: "Provisorischer Text: Ausführliche Projektinformationen folgen. Schwerpunkte: Raumakustik, Medienverteilung und Nutzererlebnis.",
        tags: ["Partner: Hospitality Solutions", "Kunde: Grand Hotel Luzern", "Jahr: 2023"]
    },
    {
        id: 10,
        title: "Siemens Zug",
        image: "assets/img/projects/project-siemens-zug.jpg",
        description: "Interaktive Medieninstallationen mit benutzerfreundlicher Steuerung für wechselnde Ausstellungen.",
        more: "Provisorischer Text: Ausführliche Projektinformationen folgen. Schwerpunkte: Ausstellungstechnik, Content-Strategie und Wartung.",
        tags: ["Partner: Museum Tech", "Kunde: Kunstmuseum St. Gallen", "Jahr: 2023"]
    },
    {
        id: 11,
        title: "Tierpark Goldau",
        image: "assets/img/projects/project-tierpark-goldau.jpg",
        description: "Komplette AV-Ausstattung für moderne Büroräume mit integrierter Mediensteuerung und Videokonferenzsystemen.",
        more: "Provisorischer Text: Ausführliche Projektinformationen folgen. Schwerpunkte: Skalierbare AV-Architektur, Inbetriebnahme und Support.",
        tags: ["Partner: AV Solutions AG", "Kunde: Tech Corp", "Jahr: 2025"]
    },
    {
        id: 12,
        title: "Vogelwarte Sempach",
        image: "assets/img/projects/project-vogelwarte.jpg",
        description: "Modernisierung eines Konferenzzentrums mit State-of-the-Art Präsentationstechnik und Audiosteuerung.",
        more: "Provisorischer Text: Ausführliche Projektinformationen folgen. Schwerpunkte: Integrationsplanung, Betriebskonzepte und Benutzer-Schulungen.",
        tags: ["Partner: Event Tech GmbH", "Kunde: Convention Center Basel", "Jahr: 2024"]
    },
    {
        id: 13,
        title: "Zoo Zürich",
        image: "assets/img/projects/project-zoo-zuerich.jpg",
        description: "Installation und Programmierung eines komplexen Mediensteuerungssystems für Vorlesungssäle.",
        more: "Provisorischer Text: Ausführliche Projektinformationen folgen. Schwerpunkte: Medientechnik, Systemintegration und langfristige Betreuung.",
        tags: ["Partner: UniTech Systems", "Kunde: Universität Bern", "Jahr: 2024"]
    },
    {
        id: 14,
        title: "Zunftmuseum Zürich",
        image: "assets/img/projects/project-zunftmuseum.jpg",
        description: "Luxus-Hotel mit integrierter Steuerung für Beleuchtung, Audio und Videoverteilung in allen Räumen.",
        more: "Provisorischer Text: Ausführliche Projektinformationen folgen. Schwerpunkte: Designintegration, Audioqualität und Nachhaltigkeit.",
        tags: ["Partner: Hospitality Solutions", "Kunde: Grand Hotel Luzern", "Jahr: 2023"]
    }
];