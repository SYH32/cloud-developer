import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Image Fillter Endpoint 
  // Takes an image file fillter it and return it.
  app.get("/filteredimage", async (req, res) => {
    const image_url = req.query.image_url;
    if (!image_url){
      return res.status(400).send({message: "Image Url is Requaired"});
    };
    const filteredImageURL = await filterImageFromURL(image_url);
    if (!filteredImageURL){
      return res.status(422).send({message: "Server Was Unable to proccess the request, Please Try Again."})
    }
    res.sendFile(filteredImageURL, () => deleteLocalFiles([filteredImageURL]));


  });

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();