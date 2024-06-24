// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../core/config/firebase.config";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Initialize Firebase
initializeApp(firebaseConfig);

const storage = getStorage()

interface Response {
    downloadURL: string | null,
    msg: string,
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
            msg: "File uploaded sucessfully"
            
        }
    } catch (error) {
        console.log(error)
        return {
            downloadURL: null,
            msg: "File not uploaded"
        } 
    }

}