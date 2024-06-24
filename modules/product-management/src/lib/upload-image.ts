// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../core/config/firebase.config";
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage'
import { DeleteImageError } from "../core/errors/deleteImageError";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Initialize Firebase
initializeApp(firebaseConfig);

const storage = getStorage()

interface Response {
    downloadURL: string | null,
    msg: string,
    operation: number // 1 for good operation, 0  for bad operation
}

export async function deleteImageLib(id: string): Promise<Response> {
    const imageRef = ref(storage, `files/${id}`)

    // Delete the file
    try {
        await deleteObject(imageRef);
        return {
            downloadURL: null,
            msg: "Image deleted successfully!",
            operation: 1
        };
    } catch (error) {
        return {
            downloadURL: null,
            msg: "An error occurred",
            operation: 0
        };
    }
}

export async function uploadImageLib(file: Uint8Array, fileName: string, mimitype: string): Promise<Response> {
    try {

        const storageRef = ref(storage, `files/${fileName}`)

        const metadata = {
            contentType: mimitype
        }


        const snapshot = await uploadBytesResumable(storageRef, file, metadata)
        const downloadURL = await getDownloadURL(snapshot.ref)

        return {
            downloadURL: downloadURL,
            msg: "File uploaded sucessfully",
            operation: 1
        }
    } catch (error) {
        console.log(error)
        return {
            downloadURL: null,
            msg: "File not uploaded",
            operation: 0
        }
    }

}