import { useState, useEffect } from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage, useStorageItem } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory, FilesystemEncoding } from "@capacitor/core";

export interface Photo {
  filepath: string;
  webviewPath?: string;
  base64?: string;
  expense: any;
  timestamp: any;

}
const PHOTO_STORAGE = "photos";

export function usePhotoGallery() {
  const { get, set } = useStorage();
  const { deleteFile, getUri, readFile, writeFile } = useFilesystem();

  const [photos, setPhotos] = useState<Photo[]>([]);
  const { getPhoto } = useCamera();

  const savePicture = async (photo: CameraPhoto, filename: any, timestamp: string, expense: number): Promise<Photo> => {
    let base64Data: string;

    // "hybrid" will detect Cordova or Capacitor;
    if (isPlatform('hybrid')) {
      const file = await readFile({
        path: photo.path!
      });
      base64Data = file.data;
    } else {
      base64Data = await base64FromPath(photo.webPath!);
    }
    const savedFile = await writeFile({
      path: filename,
      data: base64Data,
      directory: FilesystemDirectory.Data
        });
  
    if (isPlatform('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        expense: 0.00,
        // webviewPath: photo.webPath
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
        timestamp: timestamp
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: timestamp,
        expense: 0.00,
        webviewPath: photo.webPath,
        timestamp: timestamp
      };
    }
  };

  useEffect(() => {
    const loadSaved = async () => {
      const photosString = await get('photos');
      const photosInStorage = (photosString ? JSON.parse(photosString) : []) as Photo[];
      
      let photosNotNull = photosInStorage.filter(function(p)  
      {
      return p != null
      });

      // If running on the web...
      if (!isPlatform('hybrid')) {
        for (let photo of photosNotNull) {
          if(photo.filepath != null && photo.base64 != null){
            const file = await readFile({
              path: photo.filepath,
              directory: FilesystemDirectory.Data
            });
            // Web platform only: Save the photo into the base64 field
            photo.base64 = `data:image/jpeg;base64,${file.data}`;            
          }

        }
      }
      setPhotos(photosNotNull);
    };
     loadSaved();
  }, [get, readFile]);

  const takePhoto = async () => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
  
    let date = new Date();
    let hr = date.getHours();
    let min = date.getMinutes();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const timestamp = hr + ':' + min + ' ' + day + '/' + month + '/' + year;
    const filename = date.getTime() + '.jpeg';

    const savedFileImage = await savePicture(cameraPhoto, filename, timestamp, 0);
    let newPhotos = [savedFileImage, ...photos];

    setPhotos(newPhotos);

    set(PHOTO_STORAGE,
      isPlatform('hybrid')
        ? JSON.stringify(newPhotos)
        : JSON.stringify(newPhotos.map(p => {
          // Don't save the base64 representation of the photo data,
          // since it's already saved on the Filesystem
          const photoCopy = { ...p };
          delete photoCopy.base64;
          return photoCopy;
        })));
  };

  const updateExpense = async (file:string, expense:any) => {
      let value = parseFloat(expense).toFixed(2);

      const photosString = await get('photos');
      const photosInStorage = (photosString ? JSON.parse(photosString) : []) as Photo[];

      let photo = photosInStorage.filter(x => x.filepath === file);


      let photosNotNull = photosInStorage.filter(function(p)  
      {
        return p.filepath != file
      });

      photo[0].expense = value;
      photo[0].timestamp = photo[0].timestamp == null ? 'no timestamp' : photo[0].timestamp;
      photo[0].filepath = new Date().getTime() + '.jpeg';
      photo[0].webviewPath = photo[0].webviewPath;


      let newPhotos = [photo[0], ...photosNotNull];

      setPhotos(newPhotos);

      set(PHOTO_STORAGE,
        isPlatform('hybrid')
          ? JSON.stringify(newPhotos)
          : JSON.stringify(newPhotos.map(p => {

            const photoCopy = { ...p };
            delete photoCopy.base64;

            return photoCopy;
          })));
  };
  
  return {
    photos,
    takePhoto,
    updateExpense
  };


}


