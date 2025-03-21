
import CYODFATU from "../assets/hero/CYODFATU.jpg";
import EGF from "../assets/hero/EGF.jpg";
import FTTFI from "../assets/hero/FTTFI.jpg";

export const navigation = [
    {
        id: "0",
        title: "Explore",
        url: "#explore",
    },
    {
        id: "1",
        title: "My recipes",
        url: "#myrecipes",
    },
    {
        id: "2",
        title: "New account",
        url: "#signup",
        onlyMobile: true,
    },
    {
        id: "3",
        title: "Sign in",
        url: "#login",
        onlyMobile: true,
    },
];

export const features = [
    {
        id: "1",
        title: "Create your own dished for anyone to use!",
        imageUrl: CYODFATU,
    },
    {
        id: "2",
        title: "Find the tastiest foods imaginable!",
        imageUrl: FTTFI,
    },
    {
        id: "3",
        title: "Explore global flavors!",
        imageUrl: EGF,
    },
]