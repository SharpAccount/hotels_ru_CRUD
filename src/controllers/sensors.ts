const errorHandler = require("../errorHandler");

class Sensors {

    private sensorService = require("../services/sensorServices");

    async getAllSensors(req: any, res: any): Promise<void> {
        try {
            const sensors =  await this.sensorService.getAllSensors(req, res);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(sensors));
        } catch(err) {
            errorHandler(req, res, 500, {message: "Error! Server internal error"})
        }
    }

    async getSensorById(req: any, res: any, id: number): Promise<void> {
        try {
            const sensors = await this.sensorService.getSensorById(req, res, id);

            res.writeHead(200);
            res.end(JSON.stringify(sensors));
        } catch(err) {
            errorHandler(req, res, 404, {message: "Error! Didn`t find this sensor!"})
        }
    }

    async addNewSensor(req: any, res: any): Promise<void> {
        try {
            let body: string = ""

            req.on("data", (chunk: string): void => {
                body += chunk;
            })

            req.on("end", async (): Promise<void> => {
                const createdSensor = await this.sensorService.addNewSensor(req, res, body);
                const result = await this.sensorService.getSensorById(req, res, createdSensor.rows[0].sensor_id);

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            })
        } catch(err) {
            errorHandler(req, res, 500, {message: "Internal server error!"})
        }
    }

    async editSensor(req: any, res: any, id: number): Promise<void> {
        let body: string = "";

        req.on("data", (chunk: string): void => {
            body += chunk;
        })

        req.on("end", async (): Promise<void> => {
            try {
                await this.sensorService.editSensor(req, res, id, body);
                const result = await this.sensorService.getSensorById(req, res, id);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            } catch(err) {
                errorHandler(req, res, 500, {message: "Internal server error!"});
            }
        })
    }

    async deleteSensor(req: any, res: any, id: number): Promise<void> {
        try {
            await this.sensorService.deleteSensor(req, res, id);

            res.writeHead(200);
            res.end();
        } catch(err) {
            errorHandler(req, res, 404, {message: err.message});
        }
    }
}

module.exports = new Sensors();