Running with Mario

This app uses GPS tracking to gamify a run like a real-life Mario game. 
- Use Google Maps to design routes and place coins on a route - https://developers.google.com/maps/documentation/javascript/examples/icon-simple
- Use phone GPS tracking
- Use phone gyroscope to emulate "punching" in the air to get a coin
- FB login APIs and publish onto FB account

Key models:
- Users have many levels, runs, and points*
- Levels have many runs
- Runs belong to users and levels. Runs have many points.
- Points belong to runs and users

* Points includes coins and lifelines



