import React from 'react';
import {
  IonTitle, IonGrid, IonRow,
  IonCol, IonImg
} from '@ionic/react';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { camera } from 'ionicons/icons';

interface ContainerProps { }

const Gallery: React.FC<ContainerProps> = () => {
  const { photos, takePhoto } = usePhotoGallery();

  return (
    <div className="container">
      <IonTitle>Photo Gallery</IonTitle>

      <IonGrid>
        <IonRow>
          {photos.map((photo, index) => (
            <IonCol size="3" key={index}>
              <IonImg src={photo.base64 ?? photo.webviewPath} />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
      {/* <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab> */}
    </div>
  );
};

export default Gallery;
