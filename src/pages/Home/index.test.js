import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },

    {
      id: 2,
      type: "forum",
      date: "2022-05-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1500,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
  focus: [],
};

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !", undefined, { timeout: 2000 });
    });
  });
});

describe("When a page is created", () => {
  it("a list of event card is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByText("avril");
    // to implement
  });
  it("a list a people is displayed", async () => {
    render(<Home />);
    await screen.findByText("Samira");
    // to implement
  });
  it("a footer is displayed", async () => {
    render(<Home />);
    await screen.findByText("Notre derniére prestation");
    // to implement
  });

  it("an event card, with the last event, is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByText("boom");
    // to implement
  });
});

// TEST FONCTIONNEL OUVERTURE DE LA MODALE DANS LE HOME
describe("When i click on an event", () => {
  it("a modal is open", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByText("Conférence #productCON");
    fireEvent(
      await screen.findByText("Conférence #productCON"),
      new MouseEvent("click", {
        cancelable: true,
        bubbles: true,
      })
    );
    await screen.findByText("1300 participants");
  });
});

// TEST FONCTIONNEL LES DETAIL DANS LA MODAL
describe("we click on the last event", () => {
  it("the event detail is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByText("boom");
    fireEvent(
      await screen.findByText("boom"),
      new MouseEvent("click", {
        cancelable: true,
        bubbles: true,
      })
    );
    await screen.findByText("1300 participants");
  });
});
