<template>
  <div>
    <button @click="startAuthentication">Authenticate</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

// Function to initialize Google API client
const initGoogleApiClient = async () => {
  try {
    // Load the Google Identity Services library
    await gapi.load('auth2');

    // Initialize the auth2 client with your client ID
    const auth2 = await gapi.auth2.init({
      client_id: '519386071351-rqcv4i0ojgbk8son24m2d0ldoflscc1i.apps.googleusercontent.com', // Replace with your actual client ID
    });

    return auth2;
  } catch (error) {
    throw new Error('Error initializing Google API client: ' + error.message);
  }
};

// Function to sign in the user
const signInUser = async (auth2) => {
  try {
    // Sign in the user
    const user = await auth2.signIn();
    return user;
  } catch (error) {
    throw new Error('Error signing in user: ' + error.message);
  }
};

// Function to initialize Google Calendar API client
const initCalendarApiClient = async () => {
  try {
    // Initialize the Google Calendar API client library
    await gapi.client.init({
      apiKey: 'YOUR_API_KEY', // Replace with your API key
      clientId: '519386071351-rqcv4i0ojgbk8son24m2d0ldoflscc1i.apps.googleusercontent.com', // Replace with your actual client ID
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
    });
  } catch (error) {
    throw new Error('Error initializing Google Calendar API client: ' + error.message);
  }
};

// Function to fetch calendar events
const fetchCalendarEvents = async () => {
  try {
    // After initializing the client, make the API request
    const response = await gapi.client.calendar.events.list({
      calendarId: 'primary', // Use 'primary' for the user's primary calendar
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10, // Adjust as needed
      orderBy: 'startTime',
    });

    return response.result.items;
  } catch (error) {
    throw new Error('Error fetching calendar events: ' + error.message);
  }
};

// Function to start authentication and fetch calendar events
const startAuthentication = async () => {
  try {
    // Initialize Google API client
    const auth2 = await initGoogleApiClient();

    // Sign in the user
    const user = await signInUser(auth2);
    console.log('User:', user);

    // Initialize Google Calendar API client
    await initCalendarApiClient();

    // Fetch calendar events
    const events = await fetchCalendarEvents();
    console.log('Calendar Events:', events);
  } catch (error) {
    console.error('Error during authentication or API request: ', error);
  }
};

// Execute the authentication process when the component is mounted
onMounted(() => {
  startAuthentication();
});
</script>



<!-- <script setup>
import { onMounted } from 'vue';

// Function to start authentication
const startAuthentication = async () => {
  try {
    // Load the Google Identity Services library
    await gapi.load('auth2');

    // Initialize the auth2 client with your client ID
    const auth2 = await gapi.auth2.init({
      client_id: '519386071351-rqcv4i0ojgbk8son24m2d0ldoflscc1i.apps.googleusercontent.com', // Replace with your actual client ID
    });

    // Sign in the user
    const user = await auth2.signIn();

    // User is signed in, you can access user information
    console.log('User:', user);

    // Initialize the Google Calendar API client library
    await gapi.client.init({
      apiKey: 'aizasybsp6hg1vkuv1emdjepds5ricnbb9crzae', // Replace with your API key
      clientId: '519386071351-rqcv4i0ojgbk8son24m2d0ldoflscc1i.apps.googleusercontent.com', // Replace with your actual client ID
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
    });

    // After initializing the client, make the API request
    const response = await gapi.client.calendar.events.list({
      calendarId: 'primary', // Use 'primary' for the user's primary calendar
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10, // Adjust as needed
      orderBy: 'startTime',
    });
    console.log('details', response);

    // Handle the response
    const events = response.result.items;
    console.log('Calendar Events:', events);
  } catch (error) {
    console.error('Error during authentication or API request: ', error);
  }
};

// Execute the authentication process when the component is mounted
onMounted(() => {
  startAuthentication();
});
</script> -->







<!-- <template>
  <div>
    <button @click="authorize">Authorize</button>
    <button @click="listEvents">List Events</button>
    <div v-if="events.length">
      <h2>Events:</h2>
      <ul>
        <li
          v-for="(event, index) in events"
          :key="index"
        >{{ event.summary }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { gapi } from "gapi-script"

export default {
  data() {
    return {
      events: [],
    };
  },
  methods: {
    authorize() {
      gapi.load('client:auth2', () => {
        gapi.client
          .init({
            apikey: 'aizasybsp6hg1vkuv1emdjepds5ricnbb9crzae',
            clientid: '519386071351-rqcv4i0ojgbk8son24m2d0ldoflscc1i.apps.googleusercontent.com',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            scope: 'https://www.googleapis.com/auth/calendar.readonly',
          })
          .then(() => {
            // Check if the user is already signed in
            const authInstance = gapi.auth2.getAuthInstance();
            if (!authInstance.isSignedIn.get()) {
              // User is not signed in, prompt for sign-in
              return authInstance.signIn();
            } else {
              // User is already signed in
              return Promise.resolve();
            }
          })
          .then(() => {
            // Handle authorization or API access here
            // You can now access Google Calendar API
            const calendarApi = gapi.client.calendar;
            // Perform your API requests here
          })
          .catch((error) => {
            console.error('Error initializing Google API client: ', error);
          });
      });
    },
    listEvents() {
      gapi.client.calendar.events
        .list({
          calendarId: 'primary', // Use 'primary' for the user's primary calendar
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10, // Adjust as needed
          orderBy: 'startTime',
        })
        .then((response) => {
          const events = response.result.items;
          this.events = events;
        })
        .catch((error) => {
          console.error('Error listing events: ', error);
        });
    },
  },
};
</script> -->

<style scoped>
/* Your component-specific styles here */
</style> 

<!-- <template>
  <div>
    <h1>Google Calendar API</h1>
    <button @click="getEvents">Get Events</button>
    <ul v-if="events">
      <li
        v-for="event in events"
        :key="event.id"
      >{{ event.summary }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { google } from 'googleapis';

const API_KEY = 'AIzaSyBsP6hG1VkUV1EmDJePDs5RIcNbb9cRzaE';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

console.log('google', google);
const client = new google.auth.OAuth2(API_KEY, '', SCOPES);

const events = ref([]);

const getEvents = async () => {
  try {
    const response = await client.request(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events'
    );
    events.value = response.data.items;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

onMounted(() => {
  getEvents();
});
</script> -->

