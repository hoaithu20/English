/// <reference types="passport" />
declare const LocalStrategy_base: new (...args: any[]) => import("passport").Strategy & import("passport").StrategyCreatedStatic;
export declare class LocalStrategy extends LocalStrategy_base {
}
export {};
