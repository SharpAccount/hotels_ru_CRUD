<h1>Как запустить проект:</h1>

- В любом клиенте postgreSQL открыть, например, локальгую базу данных(запущенную на localhost),
- Открыть SQL console, и вставить туда скрипт из db.sql, затем запустить его,
- Открыть терминал проекта и вввести в него следующие команды:
1. npm i
2. npm run dev
- Пути к API следующие:
  - localhost:8080 - начало пути,
  - GET /sensors - вывести все сенсоры,
  - GET /sensors/{sensor_id} - вывести сенсор по полю sensor_id,
  - DELETE /sensors/{sensor_id} - удалить сенсор по полю sensor_id,
  - PUT /sensors/{sensor_id} - изменить конкретный сенсор,
  - POST /sensors - добавить сенсор

<h3>Пример тела запроса для добавления/изменения сенсора</h3>
```JSON
{
    "sensor_name": "new_sensor1",
    "sensors_measurements": [
        {
            "type_id": 1,
            "type_formula": "ax^2"
        },
        {
            "type_id": 2
        },
        {
            "type_id": 3
        }
    ]
}