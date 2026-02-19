export interface PlayerMetadata {
    name: string;
    photo: string;
    role: string;
    famousCounterpart: string;
    nationality: string;
}

export const PLAYER_METADATA: Record<string, PlayerMetadata> = {
    "BARQUI": {
        name: "BARQUI",
        photo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop",
        role: "Playmaker",
        famousCounterpart: "Lionel Messi",
        nationality: "ARG"
    },
    "CANA": {
        name: "CANA",
        photo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
        role: "Finisher",
        famousCounterpart: "Cristiano Ronaldo",
        nationality: "POR"
    },
    "CHALO": {
        name: "CHALO",
        photo: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=800&auto=format&fit=crop",
        role: "Speedster",
        famousCounterpart: "Kylian Mbappé",
        nationality: "FRA"
    },
    "COYO": {
        name: "COYO",
        photo: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=800&auto=format&fit=crop",
        role: "Guardian",
        famousCounterpart: "Virgil van Dijk",
        nationality: "NED"
    },
    "DIEGO": {
        name: "DIEGO",
        photo: "https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=800&auto=format&fit=crop",
        role: "The Wall",
        famousCounterpart: "Thibaut Courtois",
        nationality: "BEL"
    },
};

// Default metadata for those not explicitly mapped
export const getPlayerMetadata = (name: string): PlayerMetadata => {
    return PLAYER_METADATA[name] || {
        name,
        photo: `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff&size=512`,
        role: "Wildcard",
        famousCounterpart: "Generic Legend",
        nationality: "INT"
    };
};
