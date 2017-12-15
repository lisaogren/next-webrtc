# next-webrtc (soon to be WebRTC Roulette)

A demo webrtc video chat app made with Sails + Next + Socket.io

https://next-webrtc.carlogren.com

## Installation

Clone the project then install dependencies

```
git clone git@github.com:RasCarlito/next-webrtc.git && cd next-webrtc && npm install
```

## Development

Run the development server

```
sails lift
```

This will run the [Sails API](https://sailsjs.com/) server and the [Next.js](https://github.com/zeit/next.js/)
server integrated to Sails using [sails-hook-next](https://github.com/RasCarlito/sails-hook-next).

Visit the app at http://localhost:3000

### Production

To run environment in production mode first we need to build the Next.js app

```
npm run build
```

And then run the Sails server in production mode

```
sails lift --prod
```
Or
```
NODE_ENV=production node app.js
```
