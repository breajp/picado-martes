export interface PlayerMetadata {
    name: string;
    photo: string;
    role: string;
    famousCounterpart: string;
    nationality: string;
    intensity: number;
    creativity: number;
}

export const PLAYER_METADATA: Record<string, PlayerMetadata> = {
    "BARQUI": {
        name: "BARQUI",
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08id74hDIn3S5f9e8tYgW-xX7HozvX8vO8A&s", // Messi style
        role: "Deep-Lying Maestro",
        famousCounterpart: "Lionel Messi",
        nationality: "ARG",
        intensity: 88,
        creativity: 98
    },
    "CANA": {
        name: "CANA",
        photo: "https://static.independent.co.uk/2023/12/12/09/Cristiano-Ronaldo.jpg?quality=75&s=500&width=800&auto=webp", // Ronaldo
        role: "Elite Striker",
        famousCounterpart: "Cristiano Ronaldo",
        nationality: "POR",
        intensity: 95,
        creativity: 82
    },
    "CHALO": {
        name: "CHALO",
        photo: "https://images2.minutemediacdn.com/image/upload/c_crop,w_4281,h_2408,x_0,y_112/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/GettyImages/mmsport/90min_en_international_web/01gzrjxt4j4901s90zhy.jpg", // Mbappe
        role: "Wing Wizard",
        famousCounterpart: "Kylian Mbappé",
        nationality: "FRA",
        intensity: 92,
        creativity: 94
    },
    "COYO": {
        name: "COYO",
        photo: "https://assets.goal.com/v3/assets/bltccd283e7a5796a32/bltc48995388c397cf1/640f1a4ed04eb118f6358ed0/Virgil_van_Dijk_Liverpool_2022-23.jpg", // Van Dijk
        role: "No-Nonsense Defender",
        famousCounterpart: "Virgil van Dijk",
        nationality: "NED",
        intensity: 96,
        creativity: 65
    },
    "DIEGO": {
        name: "DIEGO",
        photo: "https://th-thumbnailer.cdn-si-edu.com/vSnlX8fG0I6L_DkRDRqpx_15U7M=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/8e/bc/8ebc9120-74f4-4a94-874e-6eefcaac25a5/courtois.jpg", // Courtois
        role: "Modern Goalkeeper",
        famousCounterpart: "Thibaut Courtois",
        nationality: "BEL",
        intensity: 91,
        creativity: 70
    },
    "POCHO": {
        name: "POCHO",
        photo: "https://i.guim.co.uk/img/media/b76e82811a2f6ca267da3e2e4b48e35925a74e57/0_104_3116_1870/master/3116.jpg?width=1200&quality=85&auto=format&fit=max&s=867909240409a2b5e28a38a71b123d4a", // De Bruyne
        role: "Box-to-Box Engine",
        famousCounterpart: "Kevin De Bruyne",
        nationality: "BEL",
        intensity: 89,
        creativity: 96
    },
    "KAI": {
        name: "KAI",
        photo: "https://images.ps-aws.com/c?url=https%3A%2F%2Fimages.saymedia-content.com%2F.image%2FMTk4NjIyNDAyNjYyMTAwMjE0%2Fjude-bellingham.jpg", // Bellingham
        role: "Technical Pivot",
        famousCounterpart: "Jude Bellingham",
        nationality: "ENG",
        intensity: 94,
        creativity: 91
    }
};

export const getPlayerMetadata = (name: string): PlayerMetadata => {
    return PLAYER_METADATA[name] || {
        name,
        photo: `https://ui-avatars.com/api/?name=${name}&background=111&color=fff&size=512`,
        role: "Elite Collective Member",
        famousCounterpart: "Emerging Star",
        nationality: "INT",
        intensity: 85,
        creativity: 85
    };
};
