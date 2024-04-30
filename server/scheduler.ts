import { GenezioDeploy, GenezioMethod } from "@genezio/types";
import axios from 'axios';

@GenezioDeploy()
export class Scheduler {
   @GenezioMethod({ type: "cron", cronString: "0 * * * *" })
   async scheduledNotification() {
    try {
        const randomId = Math.floor(Math.random() * 20) + 1;

        const response = await axios.get(`https://api.restful-api.dev/objects/${randomId}`);

        return response;
      } catch (error) {
        console.error("Schedules task failed with err:", error);
        return "error";
      }
    }
}
