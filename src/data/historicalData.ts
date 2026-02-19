export interface MatchResult {
    date: string;
    year: number;
    location: string;
    results: Record<string, number>;
    comments?: string;
    guests?: string[];
}

export const PLAYERS = [
    "BARQUI", "CANA", "CHALO", "COYO", "DIEGO", "FAUSTI", "KAI",
    "KUKA", "KQRI", "NICO B", "OBI", "OTTO", "POCHO", "TOLE",
    "CHIRO", "CHIQUI", "JR MOSQ", "FLORO", "FELO", "JUANI", "PEPI"
];

export const HISTORICAL_MATCHES: MatchResult[] = [
    // --- 2024 ---
    { date: "11/6", year: 2024, location: "Grun", results: { BARQUI: -1, CANA: 1, CHALO: -1, COYO: 1, FAUSTI: 1, JUANI: 1, KQRI: -1, "NICO B": -1, OBI: -1, POCHO: 1 } },
    { date: "18/6", year: 2024, location: "Grun", results: { CHALO: 1, DIEGO: -1, FAUSTI: 1, KAI: 1, KUKA: -1, KQRI: -1, "NICO B": -1, OBI: -1, POCHO: 1 }, guests: ["SEBI D"] },
    { date: "26/6", year: 2024, location: "Grun", results: { BARQUI: 1, CANA: -1, CHALO: -1, DIEGO: 1, FAUSTI: -1, JUANI: 1, KAI: 1, KUKA: -1, "NICO B": 1, POCHO: -1 } },
    { date: "3/7", year: 2024, location: "Grun", results: { CHALO: -1, COYO: 1, DIEGO: 1, FAUSTI: -1, FELO: -1, JUANI: 1, OBI: -1, POCHO: -1 }, comments: "9 GOLES DE DIFERENCIA", guests: ["JOACO", "BELDE"] },
    { date: "17/7", year: 2024, location: "Grun", results: { BARQUI: 1, CHALO: 1, COYO: 1, DIEGO: -1, FAUSTI: -1, KAI: -1, OBI: -1, OTTO: 1, POCHO: 1 }, guests: ["PANCHI"] },
    { date: "23/7", year: 2024, location: "Grun", results: { CANA: 1, COYO: 1, FAUSTI: -1, JUANI: 1, KAI: -1, KUKA: -1, KQRI: 1, OBI: -1, OTTO: 1, POCHO: -1 }, comments: "CHILENA DEL COYO" },
    { date: "30/7", year: 2024, location: "Grun", results: { BARQUI: 1, CANA: -1, COYO: -1, FAUSTI: -1, JUANI: 1, KUKA: -1, KQRI: 1, "NICO B": 1, OBI: -1, POCHO: 1 }, comments: "ZAPATAZO DE OTTO" },
    { date: "6/8", year: 2024, location: "Banco Futbol", results: { BARQUI: -1, CANA: 1, CHALO: 1, COYO: -1, FAUSTI: 1, "NICO B": -1, OBI: -1, POCHO: 1, CHIRO: -1 }, guests: ["LAKER"] },
    { date: "13/8", year: 2024, location: "Futbol Ciudad", results: { CANA: 1, CHALO: 1, COYO: -1, DIEGO: -1, JUANI: 1, KUKA: -1, KQRI: 1, "NICO B": -1, OBI: -1, POCHO: 1 } },
    { date: "20/8", year: 2024, location: "Excursio", results: { BARQUI: 1, CANA: 1, CHALO: -1, COYO: -1, FAUSTI: 1, JUANI: 1, KAI: 1, OBI: -1, POCHO: -1, TOLE: -1 }, comments: "CHILENA DEL KAI" },
    { date: "28/8", year: 2024, location: "Asturiano", results: { BARQUI: 1, CANA: 1, CHALO: -1, FAUSTI: -1, FELO: -1, JUANI: 1, KAI: -1, KUKA: 1, POCHO: -1 }, guests: ["LACH"] },
    { date: "3/9", year: 2024, location: "Grun", results: { CANA: -1, CHALO: -1, COYO: -1, FAUSTI: 1, JUANI: 1, OTTO: 1, POCHO: -1, TOLE: 1, CHIRO: -1, CHIQUI: 1 } },
    { date: "10/9", year: 2024, location: "Grun", results: { BARQUI: -1, CHALO: -1, COYO: 1, DIEGO: 1, FAUSTI: -1, JUANI: -1, KAI: 1, KQRI: 1, OBI: -1, OTTO: -1, POCHO: 1 }, comments: "Tijera del Kai" },
    { date: "17/9", year: 2024, location: "Grun", results: { CHALO: -1, COYO: 1, DIEGO: 1, FAUSTI: -1, JUANI: 1, KUKA: -1, KQRI: 1, OBI: -1, TOLE: -1, CHIRO: 1 } },
    { date: "26/9", year: 2024, location: "Grun", results: { CANA: 1, CHALO: -1, COYO: -1, FELO: 1, JUANI: 1, KAI: -1, KUKA: -1, KQRI: 1, POCHO: -1, TOLE: 1 } },
    { date: "2/10", year: 2024, location: "KDT", results: { BARQUI: 1, CANA: 1, COYO: -1, DIEGO: -1, KUKA: -1, KQRI: 1, OTTO: 1, POCHO: 1, TOLE: -1, CHIQUI: -1 } },
    { date: "8/10", year: 2024, location: "El Poli", results: { BARQUI: 1, CANA: -1, CHALO: -1, COYO: -1, DIEGO: 1, KAI: 1, KQRI: -1, "NICO B": 1, OBI: -1, POCHO: 1 } },
    { date: "23/10", year: 2024, location: "El Poli", results: { BARQUI: 1, DIEGO: 1, FAUSTI: -1, KAI: -1, KQRI: 1, POCHO: -1, TOLE: 1, CHIRO: 1 }, guests: ["Bello", "Joaco M"] },
    { date: "30/10", year: 2024, location: "El Poli", results: { BARQUI: -1, CANA: -1, COYO: 1, DIEGO: -1, FAUSTI: -1, JUANI: 1, KAI: -1, "NICO B": 1, POCHO: 1, FLORO: 1 } },
    { date: "5/11", year: 2024, location: "KDT", results: { BARQUI: -1, CANA: -1, DIEGO: -1, JUANI: 1, KAI: -1, KUKA: 1, KQRI: 1, POCHO: 1, TOLE: -1, CHIRO: 1 } },
    { date: "12/11", year: 2024, location: "El Poli", results: { COYO: 1, DIEGO: 1, FAUSTI: -1, KAI: -1, KQRI: 1, "NICO B": -1, POCHO: 1, TOLE: -1, CHIRO: -1, CHIQUI: 1 }, comments: "Cancha de cemento" },
    { date: "19/11", year: 2024, location: "Grun", results: { CANA: 1, COYO: -1, DIEGO: 1, FAUSTI: 1, KAI: 1, KUKA: 1, KQRI: -1, "NICO B": -1, OTTO: -1, POCHO: -1 }, comments: "Bondiolazo del coyo. Puskas Coyo" },
    { date: "25/11", year: 2024, location: "Grun", results: { BARQUI: -1, CANA: -1, COYO: -1, FAUSTI: 1, KUKA: -1, POCHO: 1, TOLE: 1, FLORO: -1 }, guests: ["Jr mosq", "Druco"] },
    { date: "10/12", year: 2024, location: "Grun", results: { CHALO: 1, COYO: -1, DIEGO: 1, FAUSTI: 1, KAI: -1, "NICO B": -1, OTTO: -1, POCHO: 1, TOLE: -1 } },

    // --- 2025 ---
    { date: "7/1", year: 2025, location: "GRUN", results: { CANA: -1, CHALO: -1, DIEGO: 1, FAUSTI: -1, KAI: 1, OBI: -1, OTTO: -1, POCHO: 1, CHIRO: 1 }, guests: ["CALI"] },
    { date: "14/1", year: 2025, location: "GRUN", results: { BARQUI: -1, CHALO: -1, DIEGO: -1, FAUSTI: -1, KAI: 1, KQRI: 1, OBI: 1, OTTO: 1, POCHO: 1, TOLE: -1 } },
    { date: "21/1", year: 2025, location: "GRUN", results: { BARQUI: 1, CHALO: 1, COYO: 1, DIEGO: 1, FAUSTI: -1, KAI: -1, KQRI: -1, "NICO B": -1, OBI: -1, POCHO: 1 } },
    { date: "28/1", year: 2025, location: "GRUN", results: { CANA: -1, CHALO: 1, COYO: 1, DIEGO: -1, FAUSTI: -1, KAI: 1, OBI: 1, OTTO: -1, POCHO: -1, TOLE: 1 } },
    { date: "4/2", year: 2025, location: "GRUN", results: { CANA: 1, COYO: -1, DIEGO: -1, FAUSTI: -1, KAI: 1, KUKA: 1, KQRI: 1, OBI: -1, POCHO: 1, TOLE: -1 } },
    { date: "11/2", year: 2025, location: "GRUN", results: { BARQUI: -1, DIEGO: 1, FAUSTI: 1, KAI: 1, KUKA: 1, OBI: -1, OTTO: -1, POCHO: 1, TOLE: -1 }, comments: "CHURRI MALA LECHE, CORTA LA CONTRA DE TOLE" },
    { date: "18/2", year: 2025, location: "GRUN", results: { BARQUI: -1, COYO: 1, FAUSTI: -1, KAI: 1, POCHO: 1, TOLE: -1, CHIQUI: 1, FELO: 1 }, guests: ["CHACO", "LAKER"] },
    { date: "25/2", year: 2025, location: "GRUN", results: { DIEGO: -1, FAUSTI: 1, KAI: 1, KUKA: 1, KQRI: -1, "NICO B": -1, OBI: -1, TOLE: 1, CHIQUI: 1 }, guests: ["TOMI DV"] },
    { date: "5/3", year: 2025, location: "GRUN", results: { CANA: -1, CHALO: 1, COYO: -1, DIEGO: 1, FAUSTI: -1, KAI: -1, KQRI: 1, OBI: -1, OTTO: 1, TOLE: 1 } },
    { date: "11/3", year: 2025, location: "GRUN", results: { CANA: 1, CHALO: -1, COYO: -1, DIEGO: 1, FAUSTI: 1, KUKA: 1, KQRI: -1, OBI: -1, OTTO: 1, POCHO: -1 } },
    { date: "18/3", year: 2025, location: "KDT", results: { CANA: -1, CHALO: 1, COYO: 1, FAUSTI: 1, KAI: -1, KQRI: -1, "NICO B": 1, OBI: 1, OTTO: -1, POCHO: -1 } },
    { date: "26/3", year: 2025, location: "KDT", results: { CANA: -1, CHALO: -1, COYO: 1, FAUSTI: -1, KAI: 1, KQRI: 1, "NICO B": 1, OBI: 1, OTTO: -1, POCHO: -1 } },
    { date: "8/4", year: 2025, location: "Grun", results: { BARQUI: 1, CANA: 1, COYO: -1, DIEGO: -1, KUKA: 1, OBI: 1, OTTO: 1, POCHO: -1, TOLE: -1 }, guests: ["DRUCO"] },
    { date: "22/4", year: 2025, location: "El Poli", results: { BARQUI: 1, CANA: -1, COYO: -1, KAI: 1, NICO B: -1, POCHO: 1, TOLE: 1, CHIRO: 1, CHIQUI: -1 }, guests: ["CALI"] },
    { date: "29/4", year: 2025, location: "El Poli", results: { BARQUI: 1, CANA: 1, CHALO: 1, COYO: -1, DIEGO: -1, FAUSTI: 1, KQRI: -1, OBI: -1, OTTO: 1 } },
    { date: "6/5", year: 2025, location: "Grun", results: { BARQUI: -1, CANA: -1, CHALO: 1, COYO: -1, DIEGO: -1, FAUSTI: -1, KQRI: 1, OBI: 1, POCHO: 1, CHIRO: 1 } },
    { date: "13/5", year: 2025, location: "Grun", results: { BARQUI: 1, CHALO: 1, COYO: 1, FAUSTI: 1, OBI: -1, POCHO: -1, CHIRO: 1 } },
    { date: "21/5", year: 2025, location: "Acassuso", results: { CANA: 1, CHALO: 1, COYO: -1, DIEGO: -1, FAUSTI: -1, KUKA: 1, KQRI: -1, OBI: -1, OTTO: 1, JR MOSQ: 1 } },
    { date: "28/5", year: 2025, location: "KDT", results: { BARQUI: -1, CANA: 1, CHALO: 1, COYO: 1, DIEGO: -1, KAI: -1, OBI: -1, POCHO: 1, TOLE: -1, CHIRO: 1 } },
    { date: "3/6", year: 2025, location: "GRUN", results: { CHALO: -1, COYO: 1, KAI: 1, OBI: -1, OTTO: 1, TOLE: -1, CHIRO: -1 }, guests: ["3 TORPE", "FLORO"] },
    { date: "18/6", year: 2025, location: "GRUN", results: { BARQUI: -1, COYO: -1, DIEGO: 1, FAUSTI: 1, KAI: -1, OBI: 1, OTTO: -1, POCHO: -1, TOLE: 1, CHIRO: 1 } },
    { date: "25/6", year: 2025, location: "GRUN", results: { CANA: -1, CHALO: -1, COYO: -1, DIEGO: 1, FAUSTI: -1, KAI: 1, OBI: -1, OTTO: 1, POCHO: 1, TOLE: 1 } },
    { date: "2/7", year: 2025, location: "GRUN", results: { FAUSTI: 1, KAI: 1, KUKA: 1, KQRI: -1, OBI: -1, OTTO: -1, TOLE: -1, CHIRO: 1 }, guests: ["GANDA", "FLORO", "PANCHI"] },
    { date: "15/7", year: 2025, location: "GRUN", results: { BARQUI: 1, CHALO: 1, FAUSTI: -1, KAI: -1, NICO B: 1, OBI: 1, TOLE: -1, JR MOSQ: 1 }, guests: ["HANE", "LAKER"] },
    { date: "22/7", year: 2025, location: "Suspendido", results: { BARQUI: 1, COYO: -1, FAUSTI: 1, KAI: 1, OBI: -1, POCHO: -1, JR MOSQ: 1 } },
    { date: "29/7", year: 2025, location: "GRUN", results: { BARQUI: -1, CHALO: -1, COYO: 1, KQRI: 1, OBI: 1, POCHO: 1, JR MOSQ: -1 }, guests: ["Pantera", "Vasco"] },
    { date: "5/8", year: 2025, location: "GRUN", results: { BARQUI: 1, CHALO: 1, COYO: -1, FAUSTI: 1, OBI: -1, OTTO: -1, POCHO: -1, TOLE: 1 }, guests: ["Sebi D", "Cali"] },
    { date: "12/8", year: 2025, location: "GRUN", results: { BARQUI: -1, CHALO: -1, COYO: 1, FAUSTI: 1, KUKA: -1, OBI: -1, OTTO: 1, POCHO: -1, TOLE: 1 }, guests: ["Vasco"] },
    { date: "27/8", year: 2025, location: "DISTRITO", results: { BARQUI: 1, FAUSTI: -1, OBI: -1, OTTO: -1, POCHO: 1, TOLE: 1 } },
    { date: "2/9", year: 2025, location: "GRUN", results: { BARQUI: -1, CHALO: -1, COYO: 1, FAUSTI: -1, KAI: 1, OBI: -1, OBI: -1, OTTO: -1, POCHO: 1, TOLE: 1 } },
    { date: "16/9", year: 2025, location: "GRUN", results: { BARQUI: -1, CANA: 1, COYO: 1, FAUSTI: -1, KAI: 1, KQRI: 1, "NICO B": -1, OBI: -1, TOLE: -1, JR MOSQ: 1 } },
    { date: "23/9", year: 2025, location: "GRUN", results: { BARQUI: -1, COYO: 1, FAUSTI: 1, KAI: -1, KQRI: 1, OBI: 1, OTTO: 1, POCHO: -1, TOLE: -1 }, guests: ["Hane"] },
    { date: "30/9", year: 2025, location: "GRUN", results: { BARQUI: -1, CHALO: -1, COYO: 1, FAUSTI: 1, KQRI: 1, OBI: -1, OTTO: 1, TOLE: -1 } },
    { date: "7/10", year: 2025, location: "GRUN", results: { BARQUI: -1, CHALO: 1, COYO: 1, KQRI: 1, "NICO B": 1, OBI: -1, OTTO: -1 }, guests: ["Druco", "Hane", "MatiB"] },
    { date: "14/10", year: 2025, location: "DISTRITO", results: { BARQUI: -1, CHALO: 1, COYO: -1, FAUSTI: -1, KQRI: 1, OBI: -1, "NICO B": -1, OTTO: 1, JR MOSQ: 1 } },
    { date: "21/10", year: 2025, location: "GRUN", results: { CHALO: -1, COYO: 1, FAUSTI: -1, "NICO B": 1, OBI: -1, OTTO: -1, TOLE: 1 }, guests: ["Druco", "Vasco", "Tomidb"] },
    { date: "28/10", year: 2025, location: "GRUN", results: { CHALO: -1, COYO: -1, KQRI: -1, OBI: 1, "NICO B": -1, OTTO: 1, POCHO: 1, TOLE: -1, JR MOSQ: 1 } },
    { date: "4/11", year: 2025, location: "DISTRITO", results: { BARQUI: -1, COYO: 1, DIEGO: 1, FAUSTI: -1, KQRI: 1, "NICO B": 1, OBI: -1, OTTO: -1, TOLE: -1, JR MOSQ: 1 }, guests: ["Druco", "Hane"] },
    { date: "10/11", year: 2025, location: "GRUN", results: { COYO: -1, DIEGO: 1, FAUSTI: 1, KAI: -1, KQRI: 1, "NICO B": 1, OTTO: -1, POCHO: -1 }, guests: ["Druco hane"] },
    { date: "18/11", year: 2025, location: "DISTRITO", results: { CHALO: -1, DIEGO: -1, KAI: 1, KUKA: 1, KQRI: -1, "NICO B": -1, OBI: 1, OTTO: 1, POCHO: 1, JR MOSQ: -1 }, guests: ["Druco Hane"] },
    { date: "25/11", year: 2025, location: "GRUN", results: { COYO: 1, FAUSTI: -1, KAI: 1, KUKA: -1, KQRI: -1, OTTO: 1, POCHO: -1, JR MOSQ: 1 }, comments: "lesion kqri" },
    { date: "2/12", year: 2025, location: "GRUN", results: { CHALO: -1, DIEGO: 1, KAI: 1, OBI: -1, "NICO B": -1, OTTO: -1, POCHO: 1, TOLE: 1 }, guests: ["Druco Hane"] },
];
