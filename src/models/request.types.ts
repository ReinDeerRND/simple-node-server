import { Request } from "express";

export type RequestWithBody<B> = Request<{}, {}, B, {}>;

export type RequestWithParams<P> = Request<P, {}, {}, {}>;

export type RequestWithQueryParams<Q> = Request<{}, {}, {}, Q>;

export type RequestWithBodyAndParams<B,P> = Request<P, {}, B, {}>;

export type SearchParamsType = {
  name: string;
  /**  при получении данного параметра выбираются сущности,
   * у которых вес больше либо равен значению minWeight
   */
  minWeight: string;
  /** при получении данного параметра выбираются сущности,
   * у которых вес меньше либо равен значению maxWeight
   */
  maxWeight: string;
};
