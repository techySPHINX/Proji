/**
 * @file projectController.ts
 * @description This file contains the controller functions for handling project-related operations.
 * @module Controllers/ProjectController
 */

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Retrieves all projects from the database.
 * 
 * @async
 * @function getProjects
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 * @throws {Error} - If there is an error retrieving projects.
 */
export const getProjects = async (
 req: Request,
 res: Response
): Promise<void> => {
 try {
  const projects = await prisma.project.findMany();
  res.json(projects);
 } catch (error: any) {
  res
   .status(500)
   .json({ message: `Error retrieving projects: ${error.message}` });
 }
};

/**
 * Creates a new project in the database.
 * 
 * @async
 * @function createProject
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 * @throws {Error} - If there is an error creating a project.
 */
export const createProject = async (
 req: Request,
 res: Response
): Promise<void> => {
 const { name, description, startDate, endDate } = req.body;
 try {
  const newProject = await prisma.project.create({
   data: {
    name,
    description,
    startDate,
    endDate,
   },
  });
  res.status(201).json(newProject);
 } catch (error: any) {
  res
   .status(500)
   .json({ message: `Error creating a project: ${error.message}` });
 }
};
