# Shah Cloud Services

## Setup

1. [Create a Firebase App](https://console.firebase.google.com)
2. In Firebase, create a *firestore* **databse** (in test mode!)
3. In Firebase, create **storage**
4. In Firebase, set storage rules	 to the following

		service firebase.storage {
		  match /b/{bucket}/o {
		    match /{allPaths=**} {
		      allow read, write
		    }
		  }
		}

5. Clone the Git Repository Anywhere
6. Edit src/utility/config.js and replace the config data with the data from Firebase (go to Firebase Project Overview -> Add an App -> Web)
		
		let config = {
		    apiKey: "API_KEY",
			authDomain: "AUTH_DOMAIN",
			databaseURL: "DATABASE_URL",
			projectId: "PROJECT_ID",
			storageBucket: "STORAGE_BUCKET",
			messagingSenderId: "MESSAGING_SENDER_ID"		  };
		 
		export default config
7. Install Firebase Tools

		npm install -g firebase-tools
		firebase login
		firebase init
		
8. NPM Install
		
		npm install
		npm run-script build

9. Deploy

		firebase deploy