# hello-world-app

poc, nestjs app, hello world, trace id, logging every method in service.

request

```bash
curl --location 'http://localhost:3001/hello/sync?name=hidayat'
```

response

```json
{
  "message": "hello hidayat",
  "traceId": "d983d347-ee3b-43a9-ae49-d758485335e6"
}
```

app console output

```json
{"traceId":"d983d347-ee3b-43a9-ae49-d758485335e6","level":"info","method":"getSyncHelloMsg","args":["hidayat"],"timestamp":"2025-06-06T07:54:05.843Z","result":"hello hidayat"}
{"traceId":"d983d347-ee3b-43a9-ae49-d758485335e6","level":"info","method":"syncHello","args":["hidayat"],"timestamp":"2025-06-06T07:54:05.843Z","result":{"message":"hello hidayat"}}
```
