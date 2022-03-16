import { storage } from './config';
import { getDownloadURL, uploadBytesResumable, ref, deleteObject } from 'firebase/storage'

export const uploadImage = (file) => {
    const fileName = file.name
    return new Promise((resolve, reject) => {
        const metadata = {
            contentType: file.type
        };
        const storageRef = ref(storage, 'images/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

                const progress = parseInt((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log(progress);
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    resolve(url);
                });
            }
        );
    });
};

export const deleteImage = (url) => {
    const imageName = url.split("/")[7].split("?")[0].split("%2F")[1]
    console.log(imageName)
    const desertRef = ref(storage, "images/" + imageName);
    deleteObject(desertRef).then().catch((err) => {
        console.log(err);
    })
};