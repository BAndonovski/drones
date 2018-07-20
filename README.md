Assignment:  

```
A company has a number of drones flying around the country. You have been tasked to build a system to track the location of every drone in real-time. The system's dashboard will only display the last location of the drones, so the backend doesn't need to worry about the history. You can store the state of the application in-memory for simplicity reasons.

Each drone should be associated with a unique identifier, and should report its geo-location coordinates to the central server in real-time through a cellular modem connection. Cellular modem connections are expensive, therefore you need to make sure the drones report back their location using as little data as possible.

The dashboard should be a simple single-page application displaying the list of active drones, by their unique identifiers, along with their current speed. You should visually highlight the drones that have not been moving for more than 10 seconds.

Please provide a Dockerfile or a Docker Compose file so we can easily run your project.
```

# Drone reports
Drones report their location using a POST request to a predefined URL. In this demo it's http://localhost:3000.  
Since we need them to be cost effective, they're using this as a predefined format of their message:   
`{id}{timestamp}{latitude},{longitude}`  
- id: alphanumeric field, length 32
- timestamp: unix timestamp, lenth 10
- latitude & longitude, decimal values, comma separated (length can be varying)
Example:  
`e199da18f05143b8be603162bdae0207153190422041.991755,21.407693`

# Back end 
Back end is done using koa and has only two end points: 
- POST /api: used for posting drone updates
- GET /api: used by the front end to get latest data
- GET / used to access the front end

# Front end
The front end is a simple one pager done with vue. Uses fetch to get data on a 10 second interval.