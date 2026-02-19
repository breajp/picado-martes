export interface MatchResult {
    date: string;
    location: string;
    results: Record<string, number | null>;
}

export const PLAYERS = [
    "BARQUI", "CANA", "CHALO", "COYO", "DIEGO", "FAUSTI", "KAI",
    "KUKA", "KQRI", "NICO B", "OBI", "OTTO", "POCHO", "TOLE",
    "CHIRO", "CHIQUI", "JR MOSQ", "FLORO", "FELO"
];

export const HISTORICAL_MATCHES: MatchResult[] = [
    { date: "7/1", location: "GRUN", results: { CANA: -1, CHALO: -1, DIEGO: 1, FAUSTI: -1, KAI: 1, OBI: -1, OTTO: -1, POCHO: 1, CHIRO: 1 } },
    { date: "14/1", location: "GRUN", results: { BARQUI: -1, CHALO: -1, DIEGO: -1, FAUSTI: -1, KAI: 1, KQRI: 1, OBI: 1, POCHO: 1, TOLE: 1, CHIRO: -1 } },
    { date: "21/1", location: "GRUN", results: { BARQUI: 1, CHALO: 1, COYO: 1, DIEGO: 1, FAUSTI: -1, KAI: -1, KQRI: -1, OBI: -1, POCHO: 1, TOLE: -1 } },
    { date: "28/1", location: "GRUN", results: { CANA: -1, CHALO: 1, COYO: 1, DIEGO: -1, FAUSTI: -1, KAI: 1, "NICO B": 1, POCHO: -1, TOLE: -1, CHIRO: 1 } },
    { date: "4/2", location: "GRUN", results: { CANA: 1, COYO: -1, DIEGO: -1, FAUSTI: -1, KAI: 1, KUKA: 1, KQRI: 1, OBI: -1, POCHO: 1, TOLE: -1 } },
    { date: "11/2", location: "GRUN", results: { BARQUI: -1, DIEGO: 1, FAUSTI: 1, KAI: 1, KUKA: 1, OBI: -1, OTTO: -1, POCHO: 1, TOLE: -1 } },
    { date: "18/2", location: "GRUN", results: { BARQUI: -1, COYO: 1, FAUSTI: -1, KAI: 1, POCHO: 1, TOLE: -1, CHIQUI: 1, FELO: 1 } },
    { date: "25/2", location: "GRUN", results: { COYO: -1, DIEGO: 1, FAUSTI: 1, KAI: 1, KUKA: -1, KQRI: -1, "NICO B": -1, POCHO: 1, "JR MOSQ": 1 } },
    { date: "5/3", location: "GRUN", results: { CANA: -1, CHALO: 1, COYO: -1, DIEGO: 1, FAUSTI: -1, KAI: -1, KQRI: 1, OTTO: -1, POCHO: 1, CHIQUI: 1 } },
    { date: "11/3", location: "GRUN", results: { CANA: 1, CHALO: -1, COYO: -1, DIEGO: 1, FAUSTI: 1, KUKA: 1, KQRI: -1, OBI: 1, OTTO: -1, POCHO: -1 } },
    { date: "18/3", location: "KDT", results: { CANA: -1, CHALO: 1, COYO: 1, FAUSTI: 1, KAI: -1, KUKA: -1, KQRI: 1, "NICO B": 1, OBI: -1, POCHO: -1 } },
    { date: "26/3", location: "KDT", results: { CANA: -1, CHALO: -1, COYO: 1, FAUSTI: -1, KAI: 1, KUKA: 1, "NICO B": 1, OBI: 1, POCHO: -1, TOLE: -1 } },
    { date: "8/4", location: "Grun", results: { BARQUI: 1, CANA: 1, COYO: -1, DIEGO: -1, KUKA: 1, OBI: 1, OTTO: 1, POCHO: -1, TOLE: -1 } },
    { date: "22/4", location: "El Poli", results: { BARQUI: 1, CANA: -1, COYO: -1, KAI: 1, "NICO B": -1, POCHO: 1, TOLE: 1, CHIQUI: 1, "JR MOSQ": -1 } },
    { date: "29/4", location: "El Poli", results: { BARQUI: 1, CANA: 1, CHALO: 1, COYO: -1, DIEGO: -1, FAUSTI: 1, KUKA: -1, KQRI: -1, OBI: -1, TOLE: 1 } },
    { date: "6/5", location: "Grun", results: { BARQUI: -1, CANA: -1, CHALO: 1, COYO: -1, DIEGO: -1, FAUSTI: -1, KUKA: 1, "NICO B": 1, POCHO: 1, CHIQUI: 1 } },
    { date: "13/5", location: "Grun", results: { BARQUI: 1, CHALO: 1, COYO: 1, FAUSTI: 1, KQRI: -1, TOLE: -1, CHIQUI: 1 } },
    { date: "21/5", location: "Acassuso", results: { CANA: 1, CHALO: 1, COYO: -1, DIEGO: -1, FAUSTI: -1, KUKA: 1, KQRI: -1, OBI: -1, POCHO: 1, FELO: 1 } },
    { date: "28/5", location: "KDT", results: { BARQUI: -1, CANA: 1, CHALO: 1, COYO: 1, DIEGO: -1, KAI: -1, "NICO B": -1, OBI: 1, POCHO: -1, CHIQUI: 1 } },
    { date: "3/6", location: "GRUN", results: { CHALO: -1, COYO: 1, KAI: 1, "NICO B": -1, OTTO: 1, POCHO: -1, CHIQUI: -1 } },
    { date: "18/6", location: "GRUN", results: { BARQUI: -1, COYO: -1, DIEGO: 1, FAUSTI: 1, KAI: -1, "NICO B": 1, OTTO: -1, POCHO: -1, CHIQUI: 1, FELO: 1 } },
    { date: "25/6", location: "GRUN", results: { CANA: -1, CHALO: -1, COYO: -1, DIEGO: 1, FAUSTI: -1, KAI: 1, "NICO B": -1, POCHO: 1, TOLE: 1, CHIQUI: 1 } },
    { date: "2/7", location: "GRUN", results: { DIEGO: 1, FAUSTI: 1, KAI: 1, KQRI: -1, "NICO B": -1, POCHO: -1, CHIQUI: -1, FELO: 1 } },
    { date: "15/7", location: "GRUN", results: { BARQUI: 1, CHALO: 1, FAUSTI: -1, KAI: -1, KQRI: 1, "NICO B": 1, POCHO: -1, FELO: 1 } },
    { date: "22/7", location: "Suspendido", results: { BARQUI: 1, COYO: -1, FAUSTI: 1, KAI: 1, OBI: -1, POCHO: -1, FELO: 1 } },
    { date: "29/7", location: "GRUN", results: { BARQUI: -1, CHALO: -1, COYO: 1, FAUSTI: -1, KQRI: 1, "NICO B": 1, CHIRO: 1, "JR MOSQ": -1 } },
    { date: "5/8", location: "GRUN", results: { BARQUI: 1, CHALO: 1, COYO: -1, FAUSTI: 1, KQRI: -1, "NICO B": -1, OBI: -1, POCHO: 1 } },
    { date: "12/8", location: "GRUN", results: { BARQUI: -1, CHALO: -1, COYO: 1, FAUSTI: 1, KUKA: -1, KQRI: -1, "NICO B": 1, POCHO: -1, CHIRO: 1 } },
    { date: "27/8", location: "DISTRITO", results: { BARQUI: 1, FAUSTI: -1, KQRI: -1, OTTO: -1, POCHO: 1, TOLE: 1 } },
    { date: "2/9", location: "GRUN", results: { BARQUI: -1, CHALO: -1, COYO: 1, FAUSTI: -1, KAI: 1, KQRI: -1, "NICO B": -1, OBI: 1, POCHO: 1 } },
    { date: "16/9", location: "GRUN", results: { BARQUI: -1, CANA: 1, COYO: 1, FAUSTI: -1, KAI: 1, KUKA: 1, KQRI: -1, "NICO B": -1, CHIQUI: -1, FELO: 1 } },
    { date: "23/9", location: "GRUN", results: { BARQUI: -1, COYO: 1, FAUSTI: 1, KAI: -1, KUKA: 1, OBI: 1, OTTO: 1, POCHO: -1, TOLE: -1 } },
    { date: "30/9", location: "GRUN", results: { BARQUI: -1, CHALO: -1, COYO: 1, FAUSTI: 1, KUKA: 1, KQRI: -1, OBI: 1, CHIQUI: -1 } },
    { date: "7/10", location: "GRUN", results: { BARQUI: -1, CHALO: 1, COYO: 1, KUKA: 1, KQRI: 1, "NICO B": -1, OTTO: -1 } },
    { date: "14/10", location: "DISTRITO", results: { BARQUI: -1, CHALO: 1, COYO: -1, FAUSTI: -1, KUKA: 1, KQRI: -1, "NICO B": -1, POCHO: 1, FELO: 1 } },
    { date: "21/10", location: "GRUN", results: { CHALO: -1, COYO: 1, FAUSTI: -1, OBI: 1, OTTO: -1, POCHO: -1, CHIRO: 1 } },
    { date: "28/10", location: "GRUN", results: { CHALO: -1, COYO: -1, KUKA: -1, OBI: 1, OTTO: -1, POCHO: 1, TOLE: 1, CHIQUI: -1, "JR MOSQ": 1 } },
    { date: "4/11", location: "DISTRITO", results: { BARQUI: -1, COYO: 1, DIEGO: 1, FAUSTI: -1, KUKA: 1, KQRI: 1, "NICO B": -1, OBI: -1, POCHO: -1, FELO: 1 } },
    { date: "10/11", location: "GRUN", results: { COYO: -1, DIEGO: 1, FAUSTI: 1, KAI: -1, KUKA: 1, KQRI: 1, POCHO: -1, CHIQUI: -1 } },
    { date: "18/11", location: "DISTRITO", results: { CHALO: -1, DIEGO: -1, KAI: 1, KUKA: 1, KQRI: -1, "NICO B": -1, OBI: 1, OTTO: 1, POCHO: 1, CHIQUI: -1 } },
    { date: "25/11", location: "GRUN", results: { DIEGO: 1, KAI: -1, KUKA: 1, KQRI: -1, "NICO B": -1, OTTO: 1, POCHO: -1, FELO: 1 } },
    { date: "2/12", location: "GRUN", results: { CHALO: -1, DIEGO: 1, KAI: 1, KQRI: -1, "NICO B": -1, POCHO: -1, TOLE: 1, CHIRO: 1 } },
];
