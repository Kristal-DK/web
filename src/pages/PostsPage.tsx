import { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/react";

import "./PostsPage.css";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PostsPage: React.FC = () => {
  // 1: Crear el estado para almacenar publicaciones.
  const [posts, setPosts] = useState<Post[]>([]);

  // 2: Crear el estado para saber si los datos se están cargando.
  const [cargando, setCargando] = useState<boolean>(false);

  // 3: Crear el estado para almacenar errores.
  const [error, setError] = useState<string>("");

  const cargarPosts = () => {
    // - Indicar que comenzó la carga y limpiar errores previos
    setCargando(true);
    setError("");

    // - Utilizar fetch() para consultar la API
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Respuesta de red no ok");
        }
        return response.json();
      })
      .then((datos) => {
        // - Guardar los datos en el estado
        setPosts(datos);
      })
      .catch((err) => {
        console.error(err);
        setError("Ocurrió un error al cargar las publicaciones.");
      })
      .finally(() => {
        setCargando(false);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Taller 4: Ionic + React + APIs</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="intro">
          <h1>Publicaciones</h1>
          <p>
            Presiona el botón para obtener información desde JSONPlaceholder.
          </p>

          <IonButton onClick={cargarPosts} disabled={cargando}>
            {cargando ? "CARGANDO..." : "CARGAR PUBLICACIONES"}
          </IonButton>
        </div>

        {/* 5: Mostrar un IonSpinner mientras se realiza la petición. */}
        {cargando && (
          <div className="estado" style={{ textAlign: "center", margin: "20px 0" }}>
            <IonSpinner name="crescent" />
            <p>Cargando publicaciones...</p>
          </div>
        )}

        {/* 6: Mostrar el mensaje de error cuando corresponda. */}
        {error && (
          <IonText color="danger" style={{ textAlign: "center", display: "block" }}>
            <p>{error}</p>
          </IonText>
        )}

        <div className="posts-container">
          {/* 7: Recorrer las publicaciones utilizando posts.map(...) */}
          {posts.map((post) => (
            <IonCard key={post.id}>
              <IonCardHeader>
                <IonCardTitle>
                  #{post.id} - {post.title}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>{post.body}</IonCardContent>
            </IonCard>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PostsPage;