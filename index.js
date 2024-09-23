import express from "express";
import bodyParser from "body-parser";
import { booking, saveToJSON } from "hotels-scraper-js";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';

booking.timeMultiplier = 5;

// Create the __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));    
app.use(bodyParser.urlencoded({ extended: true }));


const jsonFilePathDest = path.join(__dirname, 'dest_hotels.json');
const jsonFilePathS1 = path.join(__dirname, 's1.json');
const jsonFilePathS2 = path.join(__dirname, 's2.json');
const jsonFilePathS3 = path.join(__dirname, 's3.json');
const jsonFilePathS4 = path.join(__dirname, 's4.json');
const jsonFilePathS5 = path.join(__dirname, 's5.json');
const jsonFilePathS6 = path.join(__dirname, 's6.json');
const jsonFilePathS7 = path.join(__dirname, 's7.json');
const jsonFilePathS8 = path.join(__dirname, 's8.json');


app.get('/dest_hotels.json', (req, res) => {
    res.sendFile(jsonFilePathDest, (err) => {
        if (err) {
            console.error('Error sending JSON file:', err);
            res.status(500).send('Error sending JSON file');
        }
    });
});

app.get('/s1.json', (req, res) => {
    res.sendFile(jsonFilePathS1, (err) => {
        if (err) {
            console.error('Error sending JSON file:', err);
            res.status(500).send('Error sending JSON file');
        }
    });
});

app.get('/s2.json', (req, res) => {
    res.sendFile(jsonFilePathS2, (err) => {
        if (err) {
            console.error('Error sending JSON file:', err);
            res.status(500).send('Error sending JSON file');
        }
    });
});

app.get('/s3.json', (req, res) => {
    res.sendFile(jsonFilePathS3, (err) => {
        if (err) {
            console.error('Error sending JSON file:', err);
            res.status(500).send('Error sending JSON file');
        }
    });
});

app.get('/s4.json', (req, res) => {
    res.sendFile(jsonFilePathS4, (err) => {
        if (err) {
            console.error('Error sending JSON file:', err);
            res.status(500).send('Error sending JSON file');
        }
    });
});

app.get('/s5.json', (req, res) => {
    res.sendFile(jsonFilePathS5, (err) => {
        if (err) {
            console.error('Error sending JSON file:', err);
            res.status(500).send('Error sending JSON file');
        }
    });
});

app.get('/s6.json', (req, res) => {
    res.sendFile(jsonFilePathS6, (err) => {
        if (err) {
            console.error('Error sending JSON file:', err);
            res.status(500).send('Error sending JSON file');
        }
    });
});

app.get('/s7.json', (req, res) => {
    res.sendFile(jsonFilePathS7, (err) => {
        if (err) {
            console.error('Error sending JSON file:', err);
            res.status(500).send('Error sending JSON file');
        }
    });
});

app.get('/s8.json', (req, res) => {
    res.sendFile(jsonFilePathS8, (err) => {
        if (err) {
            console.error('Error sending JSON file:', err);
            res.status(500).send('Error sending JSON file');
        }
    });
});

app.get('/last-modified', (req, res) => {
    fs.stat(jsonFilePath, (err, stats) => {
        if (err) {
            return res.status(500).send('Error getting file stats');
        }
        res.json({ lastModified: stats.mtime });
    });
});

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/plan", async (req, res) => {
    const { start, destination, nights, departure } = req.query;

    // Render the plan.ejs template and pass the data
    res.render("plan.ejs", {
        start,
        destination,
        nights,
        departure,
        // hotels (if needed)
    });
});


app.get("/plan_h", async (req, res) => {
    const { start, destination, nights, departure, stops} = req.query;


    var waypoints_unfiltered = stops.split("USA")

    var waypoints = waypoints_unfiltered.filter(item => item !== "");

    



    // Define the async function to get hotels
    const getHotels = async (location) => {
        try {
            const hotels = await booking.getHotels(undefined, "USD", 5, location);
            return hotels;
        } catch (error) {
            console.error('Error fetching hotels:', error);
            return [];
        }
    };

    const getInfo = async (hotels) => {
        const results = [];
        for (const hotel of hotels) {
            results.push(hotel);
        }
        return results;
    };


    console.log("waypoints", waypoints)
    console.log(waypoints.length)

    var formattedAddressString = ''
    waypoints.forEach((item) => {
        var formatted = item.concat("USA |")
        // console.log("formatted", formatted)
        formattedAddressString += formatted
    })

    console.log("cooked:",formattedAddressString)


    try {
        // Process the item
        getHotels(destination + "USA").then(getInfo).then(data => saveToJSON(data, "dest_hotels"))
        getHotels(start).then(getInfo).then(data => saveToJSON(data, "start_hotels"))
        console.log(waypoints[0])
        getHotels(waypoints[0]+ "USA").then(getInfo).then(data => saveToJSON(data, `s1`));

        console.log(waypoints[1])
        getHotels(waypoints[1]+ "USA").then(getInfo).then(data => saveToJSON(data, `s2`));

        console.log(waypoints[2])
        getHotels(waypoints[2]+ "USA").then(getInfo).then(data => saveToJSON(data, `s3`));

        console.log(waypoints[3])
        getHotels(waypoints[3]+ "USA").then(getInfo).then(data => saveToJSON(data, `s4`));

        console.log(waypoints[4])
        getHotels(waypoints[4] + "USA").then(getInfo).then(data => saveToJSON(data, `s5`));
    } catch (error) {
        // console.error(`Error processing item ${item}:`, error);
        console.log("error")
    }


    try {
        // Process the item

        

    } catch (error) {
        // console.error(`Error processing item ${item}:`, error);
    }

    try {
        // Process the item

        

    } catch (error) {
        // console.error(`Error processing item ${item}:`, error);
    }

    try {
        // Process the item

        

    } catch (error) {
        // console.error(`Error processing item ${item}:`, error);
    }

    
    // Call the function to start processing


    // Render the plan.ejs template and pass the data
    res.render("plan_h.ejs", {
        start,
        destination,
        nights,
        departure,
        waypoints,
        stops,
        formattedAddressString
        // hotels (if needed)
    });
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
