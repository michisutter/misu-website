// projects.js - Project data
const projects = [
    {
        id: 1,
        title: "Rigi Lok7",
        image: "assets/img/projects/project-rigi.avif",
        description: `Auf der Rigi entsteht ein neues Erlebnismuseum mit Mehrkanal Audiosystem, gesteuertem Showablauf und einer modernen Steuerung.`,
        more: `misu kümmert sich um die Mediensteuerung und Inbetriebnahme der AV-Technik. Wir freuen uns, Teil dieses spannenden Projekts zu sein und gemeinsam mit unseren Kollegen von Neroplan, Tokyoblue und Otiger Media Systems die technische Umsetzung zu realisieren.`,
        tags: [
            { text: "Partner: Neroplan GmbH", link: "https://neroplan.ch" },
            { text: "Partner: Tokyoblue AG", link: "https://tokyoblue.ch" },
            { text: "Partner: Otiger Media Systems", link: "https://otiger.ch" },
            { text: "Kunde: Rigi Bahnen AG", link: "https://rigi.ch" },
            "Leistungen: Mediensteuerung, Inbetriebnahme"
        ]
    },
    {
        id: 2,
        title: "Maison Cailler Broc — Erlebnisrundgang",
        image: "assets/img/projects/project-cailler.avif",
        description: `Erlebnisrundgang durch acht Räume, mehrsprachig gesteuert, mit mechanischen Effekten sowie Licht‑ und Mediensteuerung.`,
        more: `Im Auftrag von Auviso wurde die technische Umsetzung des Besuchererlebnisses im Maison Cailler überarbeitet. Die Arbeiten erfolgten im angestellten Verhältnis bei der Tingo GmbH und umfassten die Erneuerung der Mediensteuerung, die Behebung bestehender Fehler sowie die technische Aktualisierung des Gesamtsystems. Das System steuert mehrsprachig Mechanik, Licht und Medien und ist für einen zuverlässigen Dauerbetrieb ausgelegt.`,
        tags: [
            { text: "Partner: Tingo GmbH", link: "https://www.tingo.ch" },
            { text: "Partner: Auviso", link: "https://auviso.ch" },
            { text: "Kunde: Maison Cailler", link: "https://www.cailler.ch" },
            "Leistungen: Mediensteuerung, Showablauf, Inbetriebnahme"
        ]
    },
    {
        id: 3,
        title: "Aroma Studio",
        image: "assets/img/projects/project-aroma.avif",
        description: "Gemeinsam mit Vision Inside hat misu das Aroma Studio technisch überarbeitet und auf den aktuellen Stand gebracht. Im Fokus standen eine neue Audiotechnik für Videokonferenzen sowie die Optimierung der bestehenden Infrastruktur für einen zuverlässigen täglichen Betrieb.",
        more: "Die Medienststeuerung wurde überarbeitet und stabilisiert, Abläufe vereinfacht und das Gesamtsystem neu abgestimmt. So ist das Studio heute wieder robust, wartungsarm und bereit für einen reibungslosen Einsatz in Meetings und Präsentationen.",
        tags: [
            { text: "Partner: Vision Inside", link: "https://www.vision-inside.ch" },
            { text: "Kunde: Aroma", link: "https://aroma.ch" },
            "Leistungen: Mediensteuerung, Audio-System-Tuning, Inbetriebnahme"
        ]
    },
    {
        id: 4,
        title: "Givaudan Schweiz",
        image: "assets/img/projects/project-givaudan.avif",
        description: "Bei Givaudan Schweiz wurden Meeting- und Boardrooms, Digital-Signage-Systeme, der Welcome-Bereich mit LED-Wänden, Eventräume sowie ein Ausstellungsbereich realisiert.",
        more: "Die Arbeiten erfolgten im angestellten Verhältnis bei Tingo und umfassten die Mediensteuerung, Digital Signage sowie Teile der Fachplanung und Projektleitung. Das Ergebnis ist eine konsistente, betriebssichere Medieninfrastruktur für unterschiedliche Nutzungen.",
        tags: [
            { text: "Partner: Tingo GmbH", link: "https://www.tingo.ch" },
            { text: "Kunde: Givaudan Schweiz", link: "https://givaudan.com" },
            "Leistungen: Mediensteuerung, Digital Signage, Fachplanung. Projektleitung, Inbetriebnahme"
        ]
    },
    {
        id: 5,
        title: "Legionärspfad Vindonissa",
        image: "assets/img/projects/project-legionaerspfad.avif",
        description: `Für den Legionärspfad Vindonissa, den römischen Erlebnispark am historischen Legionslager in Windisch, wurde eine mehrsprachige Preshow mit unterschiedlichen Showabläufen realisiert. Die Inszenierung bildet den Auftakt des Besucherrundgangs und verbindet Bild, Ton und Ablaufsteuerung zu einem eindrücklichen Einstieg.`,
        more: `Die Arbeiten erfolgten im angestellten Verhältnis bei Tingo und umfassten die Medien- und Showablaufsteuerung, die Fachplanung sowie das Audiosystem‑Tuning. Ziel war ein stabiler, präzise abgestimmter Betrieb der gesamten Inszenierung.`,
        tags: [
            { text: "Partner: Tingo GmbH", link: "https://www.tingo.ch" },
            { text: "Kunde: Legionärspfad Vindonissa", link: "https://www.legionaerpfad.ch" },
            "Leistungen: Mediensteuerung, Showablaufsteuerung, Fachplanung, Audio-Tuning"
        ]
    },
    {
        id: 6,
        title: "Zoo Zürich",
        image: "assets/img/projects/project-zoo-zuerich.avif",
        description: `Für den Zoo Zürich, Infocenter Masoala, wurde eine grossformatige 360°-Projektion mit Mehrkanal-Audiobespielung, Eventbetrieb und Showsteuerung umgesetzt.`,
        more: `Die Arbeiten erfolgten im angestellten Verhältnis bei Tingo und umfassten die Mediensteuerung, die Showablaufsteuerung, die Integration in die Gesamtsteuerung sowie das Mehrkanal-Audiosystem. Ziel war eine immersive, präzise synchronisierte Inszenierung für den täglichen Betrieb und Events.`,
        tags: [
            { text: "Partner: Tingo GmbH", link: "https://www.tingo.ch" },
            { text: "Kunde: Zoo Zürich / Masoala", link: "https://zoo.ch" },
            "Leistungen: Mediensteuerung, Showsteuerung, Mehrkanal-Audio, Systemintegration"
        ]
    },
    {
        id: 7,
        title: "Bergkäserei Marbach",
        image: "assets/img/projects/project-marbach.avif",
        description: `Für die Bergkäserei Marbach wurde ein Besucherrundgang mit Personenzählung, Audioguides, einer Preshow mit Timeslot-System sowie einer Ausstellung mit interaktiven Stationen umgesetzt.`,
        more: `Die Arbeiten erfolgten im angestellten Verhältnis bei Tingo und umfassten die Mediensteuerung, die Showablaufsteuerung sowie Digital‑Signage‑Lösungen. Ziel war ein stabiler, klar strukturierter Besucherfluss und ein zuverlässig gesteuerter Betrieb der gesamten Attraktion.`,
        tags: [
            { text: "Partner: Tingo GmbH", link: "https://www.tingo.ch" },
            { text: "Kunde: Bergkäserei Marbach", link: "https://www.kaeserei-marbach.ch" },
            "Leistungen: Mediensteuerung, Showablaufsteuerung, Digital Signage, Besucherfluss"
        ]
    },
    {
        id: 8,
        title: "Omega Museum",
        image: "assets/img/projects/project-omega.avif",
        description: `Für das Omega Museum wurde ein Erlebnismuseum mit 360°- und 270°-Projektionen, interaktiven Touchscreen-Stationen, mehrsprachigen Inhalten sowie einem Timeslot-System umgesetzt.`,
        more: `Die Arbeiten erfolgten im angestellten Verhältnis bei Tingo und umfassten die Mediensteuerung, die Konfiguration der Medienplayer sowie die Integration in die Haussteuerung. Ziel war ein stabiler, synchroner Betrieb aller Medien und ein klar strukturierter Ablauf für Besucherinnen und Besucher.`,
        tags: [
            { text: "Partner: Tingo GmbH", link: "https://www.tingo.ch" },
            { text: "Kunde: Omega Museum", link: "https://www.omegamuseum.com" },
            "Leistungen: Mediensteuerung, Medienplayer-Konfiguration, Haussteuerungsintegration"
        ]
    },
    {
        id: 9,
        title: "Pfahlbaumuseum Unteruhldingen",
        image: "assets/img/projects/project-pfahlbaumuseum.avif",
        description: `Für das Pfahlbaumuseum Unteruhldingen wurde ein Erlebnisrundgang durch drei Räume mit mehrsprachigen Shows, 360°-Projektion sowie Show- und Lichtsteuerung technisch erneuert und auf den aktuellen Stand gebracht.`,
        more: `Die Arbeiten umfassten die Erneuerung und Aktualisierung der Technik sowie die Inbetriebnahme, Mediensteuerung, Konfiguration der Medienplayer und Teile der Fachplanung. Ziel war ein stabiler, zeitgemässer Betrieb und ein zuverlässig abgestimmtes Zusammenspiel aller Medienkomponenten.`,
        tags: [
            { text: "Partner: Museum Tech", link: "https://museum-tech.example" },
            { text: "Kunde: Pfahlbaumuseum Unteruhldingen", link: "https://www.pfahlbauten.de" },
            "Leistungen: Mediensteuerung, Show- und Lichtsteuerung, Inbetriebnahme, Medienplayer-Konfiguration"
        ]
    },
    {
        id: 10,
        title: "Just Erlebniswelt",
        image: "assets/img/projects/project-just.avif",
        description: `Für Just Schweiz umfasste das Projekt einen Besucherrundgang mit 360°-Grossprojektion, Showsteuerung, Mehrkanal-Audio sowie eine interaktive Mediaguide-Steuerung. Das Erlebnis verbindet Bild, Ton und Interaktion zu einem durchgängigen, immersiven Rundgang.`,
        more: `Die Arbeiten erfolgten im angestellten Verhältnis bei Tingo und umfassten die Mediensteuerung, das Tuning des Audiosystems, die Inbetriebnahme sowie Teile der Fachplanung. Ziel war ein präzise abgestimmtes Zusammenspiel aller Komponenten für einen stabilen und hochwertigen Betrieb.`,
        tags: [
            { text: "Partner: Tingo GmbH", link: "https://www.tingo.ch" },
            { text: "Kunde: Just Schweiz", link: "https://www.just.swiss/just-welt/" },
            "Leistungen: Mediensteuerung, Audio-Tuning, Inbetriebnahme, Fachplanung"
        ]
    },
    {
        id: 11,
        title: "Tierpark Goldau",
        image: "assets/img/projects/project-tierpark-goldau.avif",
        description: `Für den Tierpark Goldau wurde im Bergsturzmuseum ein Erlebnisraum mit Bergsturz‑Simulator, Rüttelplattformen, Spezialeffekten sowie einer grossen LED‑Wand realisiert. Ergänzt wurde die Inszenierung durch Showsteuerung und Personenzählung.`,
        more: `Die Arbeiten erfolgten im angestellten Verhältnis bei Tingo und umfassten die Mediensteuerung, die Showablaufsteuerung, die Inbetriebnahme sowie die Integration der KNX‑Haussteuerung. Ziel war ein sicherer, präzise abgestimmter und zuverlässiger Betrieb der gesamten Erlebnisinstallation.`,
        tags: [
            { text: "Partner: Tingo GmbH", link: "https://www.tingo.ch" },
            { text: "Kunde: Tierpark Goldau / Bergsturzmuseum", link: "https://www.tierpark.ch" },
            "Leistungen: Mediensteuerung, Showablaufsteuerung, Inbetriebnahme, KNX-Integration"
        ]
    },
    {
        id: 12,
        title: "Vogelwarte Sempach",
        image: "assets/img/projects/project-vogelwarte.avif",
        description: `Für die Vogelwarte Sempach wurde eine Erlebnisausstellung über mehrere Räume mit Preshow, Audioguide, interaktiven Touchscreen-Stationen sowie einem RFID-System zur Besucherauswertung technisch überarbeitet.`,
        more: `Die Arbeiten erfolgten im angestellten Verhältnis bei Tingo und umfassten die Überarbeitung der Mediensteuerung, technische Updates sowie die Anpassung einzelner Showinhalte, inklusive einer neuen Robotershow.`,
        tags: [
            { text: "Partner: Tingo GmbH", link: "https://www.tingo.ch" },
            { text: "Kunde: Vogelwarte Sempach", link: "https://vogelwarte.ch" },
            "Leistungen: Mediensteuerung, Technische Updates, Audioguide, RFID-System"
        ]
    },
    {
        id: 13,
        title: "Kernkraftwerk Leibstadt",
        image: "assets/img/projects/project-leibstadt.avif",
        description: `Für das Kernkraftwerk Leibstadt wurde im Visitor Center ein multimediales Besuchererlebnis mit Guidefunktion, mehrsprachig interaktiven Räumen und Stationen sowie einem Auditorium mit Preshow umgesetzt.`,
        more: `Die Arbeiten erfolgten im angestellten Verhältnis bei Tingo und umfassten die Mediensteuerung, die Showablaufsteuerung, die Integration von KNX und Audio-Systemen sowie Teile der Fachplanung. Ziel war ein stabiler, verständlich bedienbarer und betriebssicherer Gesamtauftritt.`,
        tags: [
            { text: "Partner: Tingo GmbH", link: "https://www.tingo.ch" },
            { text: "Kunde: Kernkraftwerk Leibstadt", link: "https://www.leibstadt.ch" },
            "Leistungen: Mediensteuerung, Showablaufsteuerung, KNX-Integration, Audio-Systeme, Fachplanung"
        ]
    },
    {
        id: 14,
        title: "Zunftmuseum Zürich",
        image: "assets/img/projects/project-zunftmuseum.avif",
        description: `Für das Zunftmuseum Zürich wurde ein Erlebnismuseum über drei Räume mit jeweils eigener Show, mehrsprachigen Inhalten sowie interaktiven Stationen technisch aktualisiert.`,
        more: `Die Arbeiten erfolgten im angestellten Verhältnis bei Tingo und umfassten das Update der Mediensteuerung, die Inbetriebnahme sowie Teile der Fachplanung. Ziel war ein stabiler, zeitgemässer Betrieb und ein klar abgestimmter Ablauf der einzelnen Inszenierungen.`,
        tags: [
            { text: "Partner: Tingo GmbH", link: "https://www.tingo.ch" },
            { text: "Kunde: Zunftmuseum Zürich", link: "https://www.zunftstadt.ch/" },
            "Leistungen: Mediensteuerung, Inbetriebnahme, Fachplanung"
        ]
    }
 /*   {
        id: 15,
        title: "Siemens Zug",
        image: "assets/img/projects/project-siemens-zug.avif",
        description: `Für Siemens Zug umfasste das Projekt die Ausstattung von Meetingräumen, Boardrooms und Eventräumen sowie Digital-Signage-Lösungen im Headquarters- und Campus-Umfeld.`,
        more: `Die Arbeiten erfolgten im angestellten Verhältnis bei Tingo und umfassten die Mediensteuerung, die Audiokonfiguration aller Meetingräume, die Integration von Microsoft Teams Rooms sowie eine moderne Multikamera-Lösung. Ziel war eine einheitliche, leistungsfähige und benutzerfreundliche Medientechnik für Meetings und Events.`,
        tags: [
            { text: "Partner: Tingo GmbH", link: "https://www.tingo.ch" },
            { text: "Kunde: Siemens Zug", link: "https://www.siemens.com/ch/de/unternehmen/nachhaltigkeit/fertigstellung-campus-zug.html" },
            "Leistungen: Mediensteuerung, Audiokonfiguration, Teams Rooms Integration, Multikamerasystem"
        ]
    }*/
];