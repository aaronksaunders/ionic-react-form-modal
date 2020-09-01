import React, { useState } from "react";
import {
  IonApp,
  IonButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle,
  IonItem,
} from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import MyModal from "./MyModal";

const App: React.FunctionComponent = () => {
  // tracks modal state
  const [showModal, setShowModal] = useState(false);

  // track state of my user
  const [myUser, setMyUser] = useState({ name: "Aaron" });

  // tracks state of modal response
  const [modalResp, setModalResp] = useState<{
    cancelled: boolean;
    data: any;
  } | null>(null);

  const onModalClose = (response: any) => {
    setShowModal(false);
    setModalResp(response);
    if (!response.cancelled) {
      setMyUser({ name: response.data.name });
    }
  };

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Test Modal Page</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          {showModal && (
            <MyModal
              isOpen={showModal}
              initialData={{ ...myUser }}
              onClose={onModalClose}
            />
          )}
          <div>
            <h3>DATA FROM MODAL</h3>
            <IonItem>{myUser.name}</IonItem>
            <div>
              <pre>{modalResp && JSON.stringify(modalResp, null, 2)}</pre>
            </div>
          </div>
          <IonButton
            onClick={() => {
              setShowModal(true);
            }}
          >
            SHOW MODAL
          </IonButton>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default App;
