import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDoc, doc } from 'firebase/firestore/lite';


//replace the following with Firebase project configuration
const firebaseConfig = {
  //...
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//return type
interface ApplicationStatus {
    status: string;
    dateReceived: string;
    applicationUrl?: string;
  }


export async function getApplicationStatus(applicationId: string): Promise<ApplicationStatus> {
    try {
      const applicationRef = doc(db, 'applications', applicationId); //references application in firebase
      const applicationSnap = await getDoc(applicationRef); //gets document
  
      //no application
      if (!applicationSnap.exists()) {
        throw new Error('Application not found'); 
      }
  
      const data = applicationSnap.data();
      return {
        status: data.status,
        dateReceived: data.dateReceived.toDate().toLocaleDateString(),
        applicationUrl: data.applicationUrl
      };
    } catch (error) {
      console.error('Error fetching application status:', error);
      throw error;
    }
}
  