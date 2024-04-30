import { GenezioDeploy, GenezioMethod, GenezioHttpRequest } from "@genezio/types";
import axios from 'axios';

@GenezioDeploy()
export class Data {
   @GenezioMethod({ type: "http"})
   async resources(request: GenezioHttpRequest) {
    const payload = request.body

    switch (request.http.method) {
        case "GET":
            await axios.get(`https://api.restful-api.dev/objects/10`);
            return { message: "GET request successful" };
        case "POST":
            await axios.post(`https://api.restful-api.dev/objects`, payload);
            return { message: "POST request successful" };
        default:
            return { message: "Method not found" };
       }
    }
}
