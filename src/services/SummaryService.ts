import { ApiClient } from "./ApiClient";

export class SummaryService {
    private apiClient: ApiClient;

    constructor() {
        this.apiClient = new ApiClient('http://localhost:8020/api/v1');
    }

}