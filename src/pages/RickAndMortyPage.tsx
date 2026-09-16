import { useState } from "react";
import {
IonButton,
IonCard,
IonCardContent,
IonCardHeader,
IonCardSubtitle,
IonCardTitle,
IonContent,
IonHeader,
IonPage,
IonSpinner,
IonText,
IonTitle,
IonToolbar,
IonGrid,
IonRow,
IonCol,
IonBadge
} from "@ionic/react";

interface Character {
id: number;
name: string;
status: string;
species: string;
image: string;
location: {
name: string;
};
}

const RickAndMortyPage: React.FC = () => {
const [characters, setCharacters] = useState<Character[]>([]);
const [cargando, setCargando] = useState<boolean>(false);
const [error, setError] = useState<string>("");

const cargarPersonajes = () => {
    setCargando(true);
    setError("");

    fetch("https://rickandmortyapi.com/api/character")
    .then((response) => {
        if (!response.ok) throw new Error("Error al consultar la API");
        return response.json();
      })
      .then((data) => {
        setCharacters(data.results);
      })
      .catch((err) => {
        console.error(err);
        setError("Ocurrió un error al cargar los personajes.");
      })
      .finally(() => {
        setCargando(false);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Rick & Morty Wiki</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1>Personajes de Rick and Morty</h1>
          <IonButton color="tertiary" onClick={cargarPersonajes} disabled={cargando}>
            {cargando ? "CARGANDO..." : "CARGAR PERSONAJES"}
          </IonButton>
        </div>

        {cargando && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <IonSpinner name="crescent" color="tertiary" />
            <p>Obteniendo personajes del multiverso...</p>
          </div>
        )}

        {error && (
          <IonText color="danger" style={{ textAlign: "center", display: "block" }}>
            <p>{error}</p>
          </IonText>
        )}

        {}
        <IonGrid>
          <IonRow>
            {characters.map((char) => (
              <IonCol size="12" size-md="6" size-lg="4" key={char.id}>
                <IonCard>
                  <img src={char.image} alt={char.name} style={{ width: "100%" }} />
                  <IonCardHeader>
                    <IonCardTitle>{char.name}</IonCardTitle>
                    <IonCardSubtitle>
                      <IonBadge color={char.status === "Alive" ? "success" : char.status === "Dead" ? "danger" : "medium"}>
                        {char.status}
                      </IonBadge>{" "}
                      - {char.species}
                    </IonCardSubtitle>
                  </IonCardHeader>

                  <IonCardContent>
                    <p><strong>Ubicación actual:</strong></p>
                    <p>{char.location.name}</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RickAndMortyPage;