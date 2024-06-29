import client from "../config/db";

module.exports = {
    getAllSensors: async (req: any, res: any): Promise<any> => {
        let sensors: any = await client.query('SELECT * FROM sensors');
        sensors = sensors.rows;
        const sensorMeasuresAddQuery: string = 'SELECT measures_types.type_id, measures_types.type_name, measures_types.type_units, sensors_measures.formula FROM sensors_measures JOIN measures_types ON sensors_measures.type_id = measures_types.type_id WHERE sensors_measures.sensor_id = $1';

        for (let i: number = 0; i < sensors.length; i++) {
            let sensorMeasure: any = await client.query(sensorMeasuresAddQuery, [sensors[i].sensor_id]);

            sensorMeasure = sensorMeasure.rows;
            if (sensorMeasure.length == 0) { continue; }
            sensorMeasure.forEach(measurement => {
                if (measurement.formula === "value") {
                    delete measurement.formula;
                }
            })

            sensors[i].sensors_measurements = sensorMeasure;
        }
        return sensors;
    },
    getSensorById: async (req: any, res: any, id: number): Promise<any> => {
        let sensor: any = await client.query('SELECT * FROM sensors WHERE sensor_id = $1', [id]);
        sensor = sensor.rows;

        const sensorMeasuresAddQuery: string = 'SELECT measures_types.type_id, measures_types.type_name, measures_types.type_units, sensors_measures.formula FROM sensors_measures JOIN measures_types ON sensors_measures.type_id = measures_types.type_id WHERE sensors_measures.sensor_id = $1';
        let sensorMeasure: any = await client.query(sensorMeasuresAddQuery, [sensor[0].sensor_id]);

        sensorMeasure = sensorMeasure.rows;
        sensorMeasure.forEach(measurement => {
            if (measurement.formula === "value") {
                delete measurement.formula;
            }
        })

        sensor[0].sensors_measurements = sensorMeasure;
        return sensor[0];
    },
    addNewSensor: async (req: any, res: any, body: string): Promise<any> => {
        const sensor = JSON.parse(body);

        if (sensor.sensor_name && sensor.sensor_name.trim() !== "") {
            const sensorsInsertQuery: string = 'INSERT INTO sensors (sensor_name) VALUES($1) RETURNING *';
            const insertedSensor = await client.query(sensorsInsertQuery, [sensor.sensor_name]);

            const sensorsMeasurementsInsertQuery: string = 'INSERT INTO sensors_measures(sensor_id, type_id, formula) VALUES($1, $2, $3)';

            for (let i: number = 0; i < sensor.sensors_measurements.length; i++) {
                await client.query(sensorsMeasurementsInsertQuery, [insertedSensor.rows[0].sensor_id, sensor.sensors_measurements[i].type_id, sensor.sensors_measurements[i].type_formula]);
            }
            return insertedSensor;
        } else {
            throw new Error(`sensor name is ${sensor.sensor_name}`);
        }
    },
    editSensor: async (req: any, res: any, id: number, body: string): Promise<void> => {
        const sensor = JSON.parse(body);

        if (sensor.sensor_name && sensor.sensor_name.trim() !== "") {
            const editQuery: string = 'UPDATE sensors SET sensor_name = $1 WHERE sensor_id = $2';
            await client.query(editQuery, [sensor.sensor_name, id]);
        } else {
            throw new Error(`sensor name is ${sensor.sensor_name}`);
        }
    },
    deleteSensor: async (req: any, res: any, id: number): Promise<void> => {
        const checkSensorQuery: string = 'SELECT sensor_id FROM meteostations_sensors WHERE sensor_id = $1';
        const sensors = await client.query(checkSensorQuery, [id]);
        if (sensors.rows.length !== 0) {
            throw new Error("Sensor is in meteostations_sensors!");
        }
        const deleteMSQuery: string = 'DELETE FROM meteostations_sensors WHERE sensor_id = $1';
        const deleteSensorQuery: string = 'DELETE FROM sensors WHERE sensor_id = $1';
        await client.query(deleteMSQuery, [id]);
        const result = await client.query(deleteSensorQuery, [id]);
        if (result.rowCount === 0) {
            throw new Error("Sensor not found!");
        }
    }
}