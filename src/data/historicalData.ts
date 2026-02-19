export interface MatchResult {
    date: string;
    year: number;
    location: string;
    results: Record<string, number>;
    comments?: string;
    guests?: string[];
    morfi?: string[]; // Jugadores que se quedaron a comer
    morfiLocation?: string;
    noMorfi?: boolean;
}

export const PLAYERS = [
    "BARQUI", "CANA", "CHALO", "COYO", "DIEGO", "FAUSTI", "KAI",
    "KUKA", "KQRI", "NICO B", "OBI", "OTTO", "POCHO", "TOLE",
    "CHIRO", "CHIQUI", "JR MOSQ", "FLORO", "FELO", "JUANI", "PEPI"
];

// --- REPRODUCTOR DE DATOS HISTÓRICOS ---
export const HISTORICAL_MATCHES: MatchResult[] = [
    // --- 2024 ---
    { date: "11/6", year: 2024, location: "Grun", results: { BARQUI: -1, CANA: 1, CHALO: -1, COYO: 1, FAUSTI: 1, JUANI: 1, KQRI: -1, "NICO B": -1, OBI: -1, POCHO: 1 }, morfi: ["BARQUI", "CANA", "CHALO", "COYO", "DIEGO", "FAUSTI", "FELO", "JUANI", "KAI", "KUKA", "KQRI", "NICO B", "OBI", "OTTO", "PEPI", "POCHO", "TOLE"], morfiLocation: "Bouchardo" },
    { date: "18/6", year: 2024, location: "Grun", results: { CHALO: 1, DIEGO: -1, FAUSTI: 1, KAI: 1, KUKA: -1, KQRI: -1, "NICO B": -1, OBI: -1, POCHO: 1 }, guests: ["SEBI D"], morfi: ["DIEGO", "FAUSTI", "OBI", "POCHO"], morfiLocation: "Rojo y Negro" },
    { date: "26/6", year: 2024, location: "Grun", results: { BARQUI: 1, CANA: -1, CHALO: -1, DIEGO: 1, FAUSTI: -1, JUANI: 1, KAI: 1, KUKA: -1, "NICO B": 1, POCHO: -1 }, morfi: ["BARQUI", "CHALO", "DIEGO", "FAUSTI", "POCHO"], morfiLocation: "Marucha" },
    { date: "3/7", year: 2024, location: "Grun", results: { CHALO: -1, COYO: 1, DIEGO: 1, FAUSTI: -1, FELO: -1, JUANI: 1, OBI: -1, POCHO: -1 }, comments: "9 GOLES DE DIFERENCIA", guests: ["JOACO", "BELDE"], morfi: ["CANA", "CHALO", "COYO", "DIEGO", "JUANI", "KAI", "OBI", "POCHO"], morfiLocation: "Marucha" },
    { date: "17/7", year: 2024, location: "Grun", results: { BARQUI: 1, CHALO: 1, COYO: 1, DIEGO: -1, FAUSTI: -1, KAI: -1, OBI: -1, OTTO: 1, POCHO: 1 }, guests: ["PANCHI"], morfi: ["CHALO", "COYO", "DIEGO", "JUANI", "OBI", "POCHO"], morfiLocation: "Marucha" },
    { date: "23/7", year: 2024, location: "Grun", results: { CANA: 1, COYO: 1, FAUSTI: -1, JUANI: 1, KAI: -1, KUKA: -1, KQRI: 1, OBI: -1, OTTO: 1, POCHO: -1 }, comments: "CHILENA DEL COYO", morfi: ["CANA", "COYO", "DIEGO", "JUANI", "OBI", "POCHO"], morfiLocation: "Marucha" },
    { date: "30/7", year: 2024, location: "Grun", results: { BARQUI: 1, CANA: -1, COYO: -1, FAUSTI: -1, JUANI: 1, KUKA: -1, KQRI: 1, "NICO B": 1, OBI: -1, POCHO: 1 }, comments: "ZAPATAZO DE OTTO" },
    { date: "6/8", year: 2024, location: "Banco Futbol", results: { BARQUI: -1, CANA: 1, CHALO: 1, COYO: -1, FAUSTI: 1, "NICO B": -1, OBI: -1, POCHO: 1, CHIRO: -1 }, guests: ["LAKER"], morfi: ["BARQUI", "CANA", "CHALO", "COYO", "FAUSTI", "OBI", "POCHO"], morfiLocation: "Cantina Florida" },
    { date: "13/8", year: 2024, location: "Futbol Ciudad", results: { CANA: 1, CHALO: 1, COYO: -1, DIEGO: -1, JUANI: 1, KUKA: -1, KQRI: 1, "NICO B": -1, OBI: -1, POCHO: 1 }, morfi: ["CANA", "CHALO", "COYO", "DIEGO", "JUANI", "KAI"], morfiLocation: "Marucha" },
    { date: "20/8", year: 2024, location: "Excursio", results: { BARQUI: 1, CANA: 1, CHALO: -1, COYO: -1, FAUSTI: 1, JUANI: 1, KAI: 1, OBI: -1, POCHO: -1, TOLE: -1 }, comments: "CHILENA DEL KAI", morfi: ["BARQUI", "CANA", "CHALO", "COYO", "FAUSTI", "JUANI", "KAI", "POCHO", "TOLE"], morfiLocation: "Carmin" },
    { date: "28/8", year: 2024, location: "Asturiano", results: { BARQUI: 1, CANA: 1, CHALO: -1, FAUSTI: -1, FELO: -1, JUANI: 1, KAI: -1, KUKA: 1, POCHO: -1 }, guests: ["LACH"], morfi: ["CANA", "CHALO", "FAUSTI", "FELO", "JUANI", "POCHO"], morfiLocation: "Viejo Norton" },
    { date: "3/9", year: 2024, location: "Grun", results: { CANA: -1, CHALO: -1, COYO: -1, FAUSTI: 1, JUANI: 1, OTTO: 1, POCHO: -1, TOLE: 1, CHIRO: -1, CHIQUI: 1 }, morfi: ["CHALO", "DIEGO", "JUANI", "OBI", "OTTO", "PEPI", "POCHO"], morfiLocation: "Marucha" },
    { date: "10/9", year: 2024, location: "Grun", results: { BARQUI: -1, CHALO: -1, COYO: 1, DIEGO: 1, FAUSTI: -1, JUANI: -1, KAI: 1, KQRI: 1, OBI: -1, OTTO: -1, POCHO: 1 }, comments: "Tijera del Kai", morfi: ["DIEGO"], morfiLocation: "marucha" },
    { date: "17/9", year: 2024, location: "Grun", results: { CHALO: -1, COYO: 1, DIEGO: 1, FAUSTI: -1, JUANI: 1, KUKA: -1, KQRI: 1, OBI: -1, TOLE: -1, CHIRO: 1 }, morfi: ["DIEGO"] },
    { date: "26/9", year: 2024, location: "Grun", results: { CANA: 1, CHALO: -1, COYO: -1, FELO: 1, JUANI: 1, KAI: -1, KUKA: -1, KQRI: 1, POCHO: -1, TOLE: 1 }, morfi: ["POCHO"], morfiLocation: "Bouchardo" },
    { date: "2/10", year: 2024, location: "KDT", results: { BARQUI: 1, CANA: 1, COYO: -1, DIEGO: -1, KUKA: -1, KQRI: 1, OTTO: 1, POCHO: 1, TOLE: -1, CHIQUI: -1 }, morfi: ["BARQUI", "COYO", "OBI"], morfiLocation: "Birras" },
    { date: "8/10", year: 2024, location: "El Poli", results: { BARQUI: 1, CANA: -1, CHALO: -1, COYO: -1, DIEGO: 1, KAI: 1, KQRI: -1, "NICO B": 1, OBI: -1, POCHO: 1 }, morfi: ["BARQUI", "CANA", "COYO", "DIEGO", "OBI", "OTTO", "PEPI", "POCHO"], morfiLocation: "la parraca" },
    { date: "23/10", year: 2024, location: "El Poli", results: { BARQUI: 1, DIEGO: 1, FAUSTI: -1, KAI: -1, KQRI: 1, POCHO: -1, TOLE: 1, CHIRO: 1 }, guests: ["Bello", "Joaco M"], morfi: ["DIEGO", "POCHO"], morfiLocation: "la parraca" },
    { date: "30/10", year: 2024, location: "El Poli", results: { BARQUI: -1, CANA: -1, COYO: 1, DIEGO: -1, FAUSTI: -1, JUANI: 1, KAI: -1, "NICO B": 1, POCHO: 1, FLORO: 1 }, morfi: ["CANA", "COYO", "FAUSTI", "KAI", "OBI", "POCHO", "TOLE"], morfiLocation: "Lo de Jose" },
    { date: "5/11", year: 2024, location: "KDT", results: { BARQUI: -1, CANA: -1, DIEGO: -1, JUANI: 1, KAI: -1, KUKA: 1, KQRI: 1, POCHO: 1, TOLE: -1, CHIRO: 1 }, noMorfi: true },
    { date: "12/11", year: 2024, location: "El Poli", results: { COYO: 1, DIEGO: 1, FAUSTI: -1, KAI: -1, KQRI: 1, "NICO B": -1, POCHO: 1, TOLE: -1, CHIRO: -1, CHIQUI: 1 }, comments: "Cancha de cemento", noMorfi: true },
    { date: "19/11", year: 2024, location: "Grun", results: { CANA: 1, COYO: -1, DIEGO: 1, FAUSTI: 1, KAI: 1, KUKA: 1, KQRI: -1, "NICO B": -1, OTTO: -1, POCHO: -1 }, comments: "Bondiolazo del coyo. Puskas Coyo", morfi: ["CANA", "FAUSTI", "OBI", "POCHO"], morfiLocation: "Marucha" },
    { date: "25/11", year: 2024, location: "Grun", results: { BARQUI: -1, CANA: -1, COYO: -1, FAUSTI: 1, KUKA: -1, POCHO: 1, TOLE: 1, FLORO: -1 }, guests: ["Jr mosq", "Druco"], noMorfi: true },
    { date: "10/12", year: 2024, location: "Grun", results: { CHALO: 1, COYO: -1, DIEGO: 1, FAUSTI: 1, KAI: -1, "NICO B": -1, OTTO: -1, POCHO: 1, TOLE: -1 }, morfi: ["CHALO", "COYO", "DIEGO", "FAUSTI", "KAI", "OBI", "POCHO", "TOLE", "CHIRO"], morfiLocation: "Marucha" },

    // --- 2025 ---
    { date: "7/1", year: 2025, location: "GRUN", results: { CANA: -1, CHALO: -1, DIEGO: 1, FAUSTI: -1, KAI: 1, OBI: -1, OTTO: -1, POCHO: 1, CHIRO: 1 }, guests: ["CALI"], morfi: ["CANA", "CHALO", "DIEGO", "FAUSTI", "KAI", "OBI", "OTTO", "POCHO"], morfiLocation: "Marucha" },
    { date: "14/1", year: 2025, location: "GRUN", results: { BARQUI: -1, CHALO: -1, DIEGO: -1, FAUSTI: -1, KAI: 1, KQRI: 1, OBI: 1, OTTO: 1, POCHO: 1, TOLE: -1 }, morfi: ["CHALO", "FAUSTI", "KQRI", "OBI", "POCHO"], morfiLocation: "MARUCHA" },
    { date: "21/1", year: 2025, location: "GRUN", results: { BARQUI: 1, CHALO: 1, COYO: 1, DIEGO: 1, FAUSTI: -1, KAI: -1, KQRI: -1, "NICO B": -1, OBI: -1, POCHO: 1 }, morfi: ["CHALO", "COYO", "DIEGO", "FAUSTI", "KAI", "NICO B", "OBI", "OTTO", "POCHO"], morfiLocation: "GRUN" },
    { date: "28/1", year: 2025, location: "GRUN", results: { CANA: -1, CHALO: 1, COYO: 1, DIEGO: -1, FAUSTI: -1, KAI: 1, OBI: 1, OTTO: -1, POCHO: -1, TOLE: 1 }, morfi: ["CANA", "CHALO", "COYO", "FAUSTI", "NICO B", "OBI", "OTTO", "POCHO"] },
    { date: "4/2", year: 2025, location: "GRUN", results: { CANA: 1, COYO: -1, DIEGO: -1, FAUSTI: -1, KAI: 1, KUKA: 1, KQRI: 1, OBI: -1, POCHO: 1, TOLE: -1 }, morfi: ["CANA", "DIEGO", "FAUSTI", "KAI", "KUKA", "KQRI", "OBI", "OTTO", "POCHO"], morfiLocation: "Besares" },
    { date: "11/2", year: 2025, location: "GRUN", results: { BARQUI: -1, DIEGO: 1, FAUSTI: 1, KAI: 1, KUKA: 1, OBI: -1, OTTO: -1, POCHO: 1, TOLE: -1 }, comments: "CHURRI MALA LECHE, CORTA LA CONTRA DE TOLE" },
    { date: "18/2", year: 2025, location: "GRUN", results: { BARQUI: -1, COYO: 1, FAUSTI: -1, KAI: 1, POCHO: 1, TOLE: -1, CHIQUI: 1, FELO: 1 }, guests: ["CHACO", "LAKER"] },
    { date: "25/2", year: 2025, location: "GRUN", results: { DIEGO: -1, FAUSTI: 1, KAI: 1, KUKA: 1, KQRI: -1, "NICO B": -1, OBI: -1, TOLE: 1, CHIQUI: 1 }, guests: ["TOMI DV"], morfi: ["DIEGO", "FAUSTI"], morfiLocation: "MARUCHA" },
    { date: "5/3", year: 2025, location: "GRUN", results: { CANA: -1, CHALO: 1, COYO: -1, DIEGO: 1, FAUSTI: -1, KAI: -1, KQRI: 1, OBI: -1, OTTO: 1, TOLE: 1 }, morfi: ["CANA", "CHALO", "COYO", "DIEGO", "FAUSTI", "OBI", "OTTO", "POCHO"], morfiLocation: "MARUCHA" },
    { date: "11/3", year: 2025, location: "GRUN", results: { CANA: 1, CHALO: -1, COYO: -1, DIEGO: 1, FAUSTI: 1, KUKA: 1, KQRI: -1, OBI: -1, OTTO: 1, POCHO: -1 }, morfi: ["CANA", "CHALO", "COYO", "DIEGO", "FAUSTI", "OTTO"], morfiLocation: "MARUCHA" },
    { date: "18/3", year: 2025, location: "KDT", results: { CANA: -1, CHALO: 1, COYO: 1, FAUSTI: 1, KAI: -1, KQRI: -1, "NICO B": 1, OBI: 1, OTTO: -1, POCHO: -1 } },
    { date: "26/3", year: 2025, location: "KDT", results: { CANA: -1, CHALO: -1, COYO: 1, FAUSTI: -1, KAI: 1, KQRI: 1, "NICO B": 1, OBI: 1, OTTO: -1, POCHO: -1 }, morfi: ["CANA", "CHALO", "COYO", "FAUSTI", "KAI", "NICO B", "OBI", "POCHO"], morfiLocation: "ALCORTA" },
    { date: "8/4", year: 2025, location: "Grun", results: { BARQUI: 1, CANA: 1, COYO: -1, DIEGO: -1, KUKA: 1, OBI: 1, OTTO: 1, POCHO: -1, TOLE: -1 }, guests: ["DRUCO"], morfi: ["DIEGO", "POCHO"], morfiLocation: "Marucha" },
    { date: "15/4", year: 2025, location: "Grun", results: {}, comments: "Chalo y Cana chocan se suspende", noMorfi: true },
    { date: "22/4", year: 2025, location: "El Poli", results: { BARQUI: 1, CANA: -1, COYO: -1, KAI: 1, "NICO B": -1, POCHO: 1, TOLE: 1, CHIRO: 1, CHIQUI: -1 }, guests: ["CALI"], morfi: ["BARQUI", "CANA", "COYO", "KAI", "NICO B", "POCHO", "TOLE"], morfiLocation: "Parraca" },
    { date: "29/4", year: 2025, location: "El Poli", results: { BARQUI: 1, CANA: 1, CHALO: 1, COYO: -1, DIEGO: -1, FAUSTI: 1, KQRI: -1, OBI: -1, OTTO: 1 }, morfi: ["CHALO", "COYO", "DIEGO", "FAUSTI", "OTTO"], morfiLocation: "Parraca" },
    { date: "6/5", year: 2025, location: "Grun", results: { BARQUI: -1, CANA: -1, CHALO: 1, COYO: -1, DIEGO: -1, FAUSTI: -1, KQRI: 1, OBI: 1, POCHO: 1, CHIRO: 1 }, morfi: ["BARQUI", "CANA", "CHALO", "COYO", "DIEGO", "FAUSTI", "NICO B", "OTTO"], morfiLocation: "Marucha" },
    { date: "13/5", year: 2025, location: "Grun", results: { BARQUI: 1, CHALO: 1, COYO: 1, FAUSTI: 1, OBI: -1, POCHO: -1, CHIRO: 1 }, comments: "VP vs torpe" },
    { date: "21/5", year: 2025, location: "Acassuso", results: { CANA: 1, CHALO: 1, COYO: -1, DIEGO: -1, FAUSTI: -1, KUKA: 1, KQRI: -1, OBI: -1, OTTO: 1, "JR MOSQ": 1 }, comments: "cumple coyo", morfi: ["CANA", "CHALO", "COYO", "DIEGO", "FAUSTI", "KUKA", "KQRI", "NICO B", "OBI", "OTTO", "POCHO", "JR MOSQ", "FLORO", "FELO", "JUANI", "PEPI"] },
    { date: "28/5", year: 2025, location: "KDT", results: { BARQUI: -1, CANA: 1, CHALO: 1, COYO: 1, DIEGO: -1, KAI: -1, OBI: -1, POCHO: 1, TOLE: -1, CHIRO: 1 }, morfi: ["BARQUI", "CANA", "CHALO", "COYO", "FAUSTI", "KAI", "OBI", "OTTO"], morfiLocation: "Tole" },
    { date: "3/6", year: 2025, location: "GRUN", results: { CHALO: -1, COYO: 1, KAI: 1, OBI: -1, OTTO: 1, TOLE: -1, CHIRO: -1 }, guests: ["3 TORPE", "FLORO"], noMorfi: true },
    { date: "18/6", year: 2025, location: "GRUN", results: { BARQUI: -1, COYO: -1, DIEGO: 1, FAUSTI: 1, KAI: -1, OBI: 1, OTTO: -1, POCHO: -1, TOLE: 1, CHIRO: 1 }, morfi: ["COYO", "DIEGO", "FAUSTI", "KAI", "OBI", "OTTO", "TOLE"], morfiLocation: "Marucha" },
    { date: "25/6", year: 2025, location: "GRUN", results: { CANA: -1, CHALO: -1, COYO: -1, DIEGO: 1, FAUSTI: -1, KAI: 1, OBI: -1, OTTO: 1, POCHO: 1, TOLE: 1 }, morfi: ["BARQUI", "CANA", "CHALO", "COYO", "DIEGO", "FAUSTI", "KAI", "OBI", "OTTO"], morfiLocation: "Marucha" },
    { date: "2/7", year: 2025, location: "GRUN", results: { FAUSTI: 1, KAI: 1, KUKA: 1, KQRI: -1, OBI: -1, OTTO: -1, TOLE: -1, CHIRO: 1 }, guests: ["GANDA", "FLORO", "PANCHI"], noMorfi: true },
    { date: "15/7", year: 2025, location: "GRUN", results: { BARQUI: 1, CHALO: 1, FAUSTI: -1, KAI: -1, "NICO B": 1, OBI: 1, TOLE: -1, "JR MOSQ": 1 }, guests: ["HANE", "LAKER"], morfi: ["BARQUI", "CHALO", "FAUSTI", "KAI", "NICO B", "POCHO"] },
    { date: "22/7", year: 2025, location: "Suspendido", results: { BARQUI: 1, COYO: -1, FAUSTI: 1, KAI: 1, OBI: -1, POCHO: -1, "JR MOSQ": 1 }, comments: "Lesion kai" },
    { date: "29/7", year: 2025, location: "GRUN", results: { BARQUI: -1, CHALO: -1, COYO: 1, KQRI: 1, OBI: 1, POCHO: 1, "JR MOSQ": -1 }, guests: ["Pantera", "Vasco"], noMorfi: true },
    { date: "5/8", year: 2025, location: "GRUN", results: { BARQUI: 1, CHALO: 1, COYO: -1, FAUSTI: 1, OBI: -1, OTTO: -1, POCHO: -1, TOLE: 1 }, guests: ["Sebi D", "Cali"], morfi: ["CHALO", "COYO", "FAUSTI", "KQRI", "NICO B", "OBI", "POCHO"], morfiLocation: "Marucha" },
    { date: "12/8", year: 2025, location: "GRUN", results: { BARQUI: -1, CHALO: -1, COYO: 1, FAUSTI: 1, KUKA: -1, OBI: -1, OTTO: 1, POCHO: -1, TOLE: 1 }, guests: ["Vasco"], morfi: ["BARQUI", "CHALO", "FAUSTI", "KQRI", "OBI", "OTTO"], morfiLocation: "Marucha" },
    { date: "27/8", year: 2025, location: "DISTRITO", results: { BARQUI: 1, FAUSTI: -1, OBI: -1, OTTO: -1, POCHO: 1, TOLE: 1 }, morfi: ["BARQUI", "FAUSTI", "POCHO"], morfiLocation: "San Genaro" },
    { date: "2/9", year: 2025, location: "GRUN", results: { BARQUI: -1, CHALO: -1, COYO: 1, FAUSTI: -1, KAI: 1, OBI: -1, OTTO: -1, POCHO: 1, TOLE: 1 }, morfi: ["BARQUI", "CHALO", "FAUSTI", "KQRI", "OBI", "OTTO"], morfiLocation: "Marucha" },
    { date: "9/9", year: 2025, location: "GRUN", results: {}, comments: "EMPATE", morfi: ["BARQUI", "CANA", "CHALO", "COYO", "DIEGO", "FAUSTI", "KAI", "KUKA", "NICO B", "OBI", "POCHO"], morfiLocation: "Marucha" },
    { date: "16/9", year: 2025, location: "GRUN", results: { BARQUI: -1, CANA: 1, COYO: 1, FAUSTI: -1, KAI: 1, KQRI: 1, "NICO B": -1, OBI: -1, TOLE: -1, "JR MOSQ": 1 }, morfiLocation: "Marucha" },
    { date: "23/9", year: 2025, location: "GRUN", results: { BARQUI: -1, COYO: 1, FAUSTI: 1, KAI: -1, KQRI: 1, OBI: 1, OTTO: 1, POCHO: -1, TOLE: -1 }, guests: ["Hane"], noMorfi: true },
    { date: "30/9", year: 2025, location: "GRUN", results: { BARQUI: -1, CHALO: -1, COYO: 1, FAUSTI: 1, KQRI: 1, OBI: -1, OTTO: 1, TOLE: -1 }, morfi: ["BARQUI", "FAUSTI", "OBI", "TOLE", "CHIRO"], morfiLocation: "Marucha" },
    { date: "7/10", year: 2025, location: "GRUN", results: { BARQUI: -1, CHALO: 1, COYO: 1, KQRI: 1, "NICO B": 1, OBI: -1, OTTO: -1 }, guests: ["Druco", "Hane", "MatiB"], morfi: ["CHALO", "COYO", "KAI", "KQRI", "NICO B", "POCHO"] },
    { date: "14/10", year: 2025, location: "DISTRITO", results: { BARQUI: -1, CHALO: 1, COYO: -1, FAUSTI: -1, KQRI: 1, OBI: -1, "NICO B": -1, OTTO: 1, "JR MOSQ": 1 }, guests: ["Druco"], morfi: ["BARQUI", "COYO", "OBI", "TOLE"] },
    { date: "21/10", year: 2025, location: "GRUN", results: { CHALO: -1, COYO: 1, FAUSTI: -1, "NICO B": 1, OBI: -1, OTTO: -1, TOLE: 1 }, guests: ["Druco", "Vasco", "Tomidb"], morfi: ["CHALO", "COYO", "FAUSTI", "OBI", "OTTO", "CHIRO"] },
    { date: "28/10", year: 2025, location: "GRUN", results: { CHALO: -1, COYO: -1, KQRI: -1, OBI: 1, "NICO B": -1, OTTO: 1, POCHO: 1, TOLE: -1, "JR MOSQ": 1 }, noMorfi: true },
    { date: "4/11", year: 2025, location: "DISTRITO", results: { BARQUI: -1, COYO: 1, DIEGO: 1, FAUSTI: -1, KQRI: 1, "NICO B": 1, OBI: -1, OTTO: -1, TOLE: -1, "JR MOSQ": 1 }, guests: ["Druco", "Hane"], morfi: ["BARQUI", "CHALO", "COYO", "DIEGO", "FAUSTI", "KAI", "KQRI", "NICO B", "OBI", "POCHO", "TOLE"] },
    { date: "10/11", year: 2025, location: "GRUN", results: { COYO: -1, DIEGO: 1, FAUSTI: 1, KAI: -1, KQRI: 1, "NICO B": 1, OTTO: -1, POCHO: -1 }, guests: ["Druco hane"], noMorfi: true },
    { date: "18/11", year: 2025, location: "DISTRITO", results: { CHALO: -1, DIEGO: -1, KAI: 1, KUKA: 1, KQRI: -1, "NICO B": -1, OBI: 1, OTTO: 1, POCHO: 1, "JR MOSQ": -1 }, guests: ["Druco Hane"], morfi: ["CHALO", "COYO", "DIEGO", "FAUSTI", "KAI", "KUKA", "OTTO", "POCHO", "TOLE"] },
    { date: "25/11", year: 2025, location: "GRUN", results: { COYO: 1, FAUSTI: -1, KAI: 1, KUKA: -1, KQRI: -1, OTTO: 1, POCHO: -1, "JR MOSQ": 1 }, comments: "lesion kqri", morfi: ["DIEGO", "FAUSTI", "KUKA", "KQRI", "POCHO"], morfiLocation: "GRUN" },
    { date: "2/12", year: 2025, location: "GRUN", results: { CHALO: -1, DIEGO: 1, KAI: 1, OBI: -1, "NICO B": -1, OTTO: -1, POCHO: 1, TOLE: 1 }, guests: ["Druco Hane"], morfi: ["CHALO", "COYO", "NICO B", "OTTO"], morfiLocation: "MARUCHA" },
];
