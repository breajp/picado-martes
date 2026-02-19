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
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08id74hDIn3S5f9e8tYgW-xX7HozvX8vO8A&s",
        role: "Maestro del Mediocampo",
        famousCounterpart: "Lionel Messi",
        nationality: "ARG"
    },
    "CANA": {
        name: "CANA",
        photo: "https://static.independent.co.uk/2023/12/12/09/Cristiano-Ronaldo.jpg?quality=75&s=500&width=800&auto=webp",
        role: "Goleador de Élite",
        famousCounterpart: "Cristiano Ronaldo",
        nationality: "POR"
    },
    "CHALO": {
        name: "CHALO",
        photo: "https://images2.minutemediacdn.com/image/upload/c_crop,w_4281,h_2408,x_0,y_112/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/GettyImages/mmsport/90min_en_international_web/01gzrjxt4j4901s90zhy.jpg",
        role: "Mago por la Banda",
        famousCounterpart: "Kylian Mbappé",
        nationality: "FRA"
    },
    "COYO": {
        name: "COYO",
        photo: "https://assets.goal.com/v3/assets/bltccd283e7a5796a32/bltc48995388c397cf1/640f1a4ed04eb118f6358ed0/Virgil_van_Dijk_Liverpool_2022-23.jpg",
        role: "Muralla Defensiva",
        famousCounterpart: "Virgil van Dijk",
        nationality: "NED"
    },
    "DIEGO": {
        name: "DIEGO",
        photo: "https://th-thumbnailer.cdn-si-edu.com/vSnlX8fG0I6L_DkRDRqpx_15U7M=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/8e/bc/8ebc9120-74f4-4a94-874e-6eefcaac25a5/courtois.jpg",
        role: "Portero Moderno",
        famousCounterpart: "Thibaut Courtois",
        nationality: "BEL"
    },
    "POCHO": {
        name: "POCHO",
        photo: "https://i.guim.co.uk/img/media/b76e82811a2f6ca267da3e2e4b48e35925a74e57/0_104_3116_1870/master/3116.jpg?width=1200&quality=85&auto=format&fit=max&s=867909240409a2b5e28a38a71b123d4a",
        role: "Motor del Equipo",
        famousCounterpart: "Kevin De Bruyne",
        nationality: "BEL"
    },
    "KAI": {
        name: "KAI",
        photo: "https://images.ps-aws.com/c?url=https%3A%2F%2Fimages.saymedia-content.com%2F.image%2FMTk4NjIyNDAyNjYyMTAwMjE0%2Fjude-bellingham.jpg",
        role: "Pivote Técnico",
        famousCounterpart: "Jude Bellingham",
        nationality: "ENG"
    }
};

export const getPlayerMetadata = (name: string): PlayerMetadata => {
    return PLAYER_METADATA[name] || {
        name,
        photo: `https://ui-avatars.com/api/?name=${name}&background=111&color=fff&size=512`,
        role: "Miembro del Colectivo",
        famousCounterpart: "Estrella Emergente",
        nationality: "INT"
    };
};
