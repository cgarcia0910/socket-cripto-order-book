import { InjectionToken } from "@angular/core";

export const SOCKET_CONFIG = new InjectionToken<ISocketConfig>('config');

export interface ISocketConfig {
    url: string;
    apiKey: string;
 }
 
 