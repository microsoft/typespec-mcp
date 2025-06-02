import type { Vec3 } from "./ts-types.js";

export interface Tools {

  readonly math: {
    /**
     * Adds two vectors together. Use this when you want to combine two vectors to
     * get a resultant vector. For example, adding a movement vector to a position
     * vector to get a new position.
     */
    addVector(v1: Vec3, v2: Vec3): Vec3 | Promise<Vec3>;

    /**
     * Subtracts one vector from another. Use this to find the difference between
     * two vectors. For example, calculating the direction and distance from one
     * point to another.
     */
    subVector(v1: Vec3, v2: Vec3): Vec3 | Promise<Vec3>;

    /**
     * Computes the cross product of two vectors. Use this to find a vector that is
     * perpendicular to both input vectors. This is useful in 3D graphics for
     * calculating surface normals or rotational axes.
     */
    crossProduct(v1: Vec3, v2: Vec3): Vec3 | Promise<Vec3>;

    /**
     * Computes the dot product of two vectors. Use this to find the scalar
     * projection of one vector onto another. This is useful for determining angles
     * between vectors or checking if they are pointing in the same direction.
     */
    dotProduct(v1: Vec3, v2: Vec3): number | Promise<number>;

  };
}

export let toolHandler: Tools = undefined as any;

export function setToolHandler(handler: Tools) {
  toolHandler = handler;
}