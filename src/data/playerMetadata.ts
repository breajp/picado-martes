export interface PlayerMetadata {
    name: string;
    photo: string;
    role: string;
    famousCounterpart: string;
    nationality: string;
    intensity: number; // 1-100
    creativity: number; // 1-100
}

export const PLAYER_METADATA: Record<string, PlayerMetadata> = {
    "BARQUI": {
        name: "BARQUI",
        photo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop",
        role: "Deep-Lying Maestro",
        famousCounterpart: "Lionel Messi",
        nationality: "ARG",
        intensity: 88,
        creativity: 98
    },
    "CANA": {
        name: "CANA",
        photo: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=800&auto=format&fit=crop",
        role: "Elite Striker",
        famousCounterpart: "Cristiano Ronaldo",
        nationality: "POR",
        intensity: 95,
        creativity: 82
    },
    "CHALO": {
        name: "CHALO",
        photo: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=800&auto=format&fit=crop",
        role: "Wing Wizard",
        famousCounterpart: "Kylian Mbappé",
        nationality: "FRA",
        intensity: 92,
        creativity: 94
    },
    "COYO": {
        name: "COYO",
        photo: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=800&auto=format&fit=crop",
        role: "No-Nonsense Defender",
        famousCounterpart: "Virgil van Dijk",
        nationality: "NED",
        intensity: 96,
        creativity: 65
    },
    "DIEGO": {
        name: "DIEGO",
        photo: "https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=800&auto=format&fit=crop",
        role: "Modern Goalkeeper",
        famousCounterpart: "Thibaut Courtois",
        nationality: "BEL",
        intensity: 91,
        creativity: 70
    },
    "POCHO": {
        name: "POCHO",
        photo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
        role: "Box-to-Box Engine",
        famousCounterpart: "Kevin De Bruyne",
        nationality: "BEL",
        intensity: 89,
        creativity: 96
    },
    "KAI": {
        name: "KAI",
        photo: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=800&auto=format&fit=crop",
        role: "Technical Pivot",
        famousCounterpart: "Jude Bellingham",
        nationality: "ENG",
        intensity: 94,
        creativity: 91
    },
    "NICO B": {
        name: "NICO B",
        photo: "https://images.unsplash.com/photo-1516567727245-ad8c68f3ec1c?q=80&w=800&auto=format&fit=crop",
        role: "Pure Finisher",
        famousCounterpart: "Erling Haaland",
        nationality: "NOR",
        intensity: 97,
        creativity: 60
    }
};

export const getPlayerMetadata = (name: string): PlayerMetadata => {
    return PLAYER_METADATA[name] || {
        name,
        photo: `https://ui-avatars.com/api/?name=${name}&background=111&color=fff&size=512`,
        role: "Verified Performer",
        famousCounterpart: "N/A",
        nationality: "INT",
        intensity: 85,
        creativity: 85
    };
};
