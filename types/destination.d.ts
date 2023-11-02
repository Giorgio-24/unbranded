import Continent from "~/types/continent";

interface Image {
    id: number,
    baseUrl: string,
    mimeType: string,
    altText: null,
    title: string,
    thumbnailUrl: string | undefined
}

export default interface Destination {
    id: string,
    isActive: boolean,
    isVariantActive: boolean,
    isBookable: boolean,
    destinationLabel: string,
    slug: string,
    title: string,
    numberOfDays: number,
    thumbnailImage: {
        mobile: Image,
        desktop: Image
    },
    moods: {
        party: number,
        relax: number,
        nature: number,
        culture: number,
        history: number
    },
    airports: {
        inboundDepartureCode: string,
        inboundDepartureCity: string,
        inboundDepartureAirportName: string,
        outboundArrivalCode: string,
        outboundArrivalCity: string,
        outboundArrivalAirportName: string
    },
    flights: null,
    createdAt: string,
    updatedAt: string,
    feefoRating: null | {
        "merchantIdentifier": string,
        "rating": number,
        "count": number
    },
    toursCount: number,
    primaryDestination: {
        id: string,
        isoCodeAlpha2: string,
        isoCodeAlpha3: string,
        name: string,
        primaryContinent: Continent
    },
    bestTour: {
        id: string,
        isSalesActive: boolean,
        daysToCutOffDepositBalanceDate: number,
        startingDate: string,
        endingDate: string,
        price: number,
        basePrice: null,
        depositPrice: number,
        balancePrice: number,
        ageBadge: string,
        code: string,
        salesStatus: string,
        basePriceLabel: null,
        createdAt: string,
        updatedAt: string,
        flights: null,
        extra: {},
        balanceDueDate: string
    },
    productLine: {
        id: string,
        code: string,
        name: string,
        description: string
    },
    marketingLabel: null
}