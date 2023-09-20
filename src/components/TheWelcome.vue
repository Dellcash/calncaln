<template>
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
            apiKey: 'AIzaSyC8A77KZVhLUZMpYMuZm9zkV6TVgn0oyZM',
            clientId: '470300798985-1rcbcnbcds8r15mm3ft11tk0qp0e9eh7.apps.googleusercontent.com',
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
</script>

<style scoped>
/* Your component-specific styles here */
</style>

