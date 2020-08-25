# Eventicle
An Event Management System for TUBITAK internship

## Description
This is an event management / registration system with portals for attendees and makers(officers).

The backend is developed using Spring queried using hibernate presisted using postgresql and realtime notificiations implemented using Stomp Websockets.

The frontend is developed using React and Material UI, with the help of with router, sockjs, stomp, google maps api and axios.

Navigate into these branches to run the backend and the frontend independently and their instructions.

There is also a mobile application for it developed using Flutter, which can be found [here](https://github.com/BalajSaleem/Eventicle-Flutter-App).


### Functionality for attendees
-View all events.

-VIew unregistered / registered events

-Apply for events

-Ask questions to the maker

-View Location of an event on the Map.

-Get notified whenever a new event is created, updated or deleted, or when a question is answered in one of their events.

-Get email notification regarding the event you have applied for along with a QR Code containing event details.

### Functionality for officers
-Create an event.

-VIew created events

-Update / Delete an event.

-View participants with name and details.

-View Attendence graph for created events.

-Answer questions posed by participants

-View Location of an event

-Get notified whenever of their created events gets an applicant, or a question is asked.

